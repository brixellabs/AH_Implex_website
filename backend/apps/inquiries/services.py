import os
import json
import logging
import urllib.request
import urllib.error
from django.core.mail import EmailMultiAlternatives
from django.conf import settings

logger = logging.getLogger(__name__)


def _send_via_brevo(api_key, from_email, to_email, subject, html_content, reply_to=None):
    url = "https://api.brevo.com/v3/smtp/email"
    sender_name = "A&H IMPEX"
    sender_email = from_email
    if "<" in from_email and ">" in from_email:
        sender_name = from_email.split("<")[0].strip()
        sender_email = from_email.split("<")[1].replace(">", "").strip()

    payload = {
        "sender": {"name": sender_name, "email": sender_email},
        "to": [{"email": to_email}],
        "subject": subject,
        "htmlContent": html_content
    }
    if reply_to:
        payload["replyTo"] = {"email": reply_to}

    data = json.dumps(payload).encode('utf-8')
    req = urllib.request.Request(
        url,
        data=data,
        headers={
            "api-key": api_key,
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        method="POST"
    )
    with urllib.request.urlopen(req, timeout=12) as response:
        return response.status in (200, 201, 202)


def _send_via_resend(api_key, from_email, to_email, subject, html_content, reply_to=None):
    url = "https://api.resend.com/emails"
    
    sender = from_email
    if not sender or "dummy" in sender or "no-reply" in sender:
        sender = "A&H IMPEX <onboarding@resend.dev>"

    payload = {
        "from": sender,
        "to": [to_email] if isinstance(to_email, str) else to_email,
        "subject": subject,
        "html": html_content
    }
    if reply_to:
        payload["reply_to"] = reply_to

    data = json.dumps(payload).encode('utf-8')
    req = urllib.request.Request(
        url,
        data=data,
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
            "User-Agent": "AH-IMPEX-Web/1.0"
        },
        method="POST"
    )
    try:
        with urllib.request.urlopen(req, timeout=12) as response:
            logger.info(f"[Resend Response] {res_data}")
            return response.status in (200, 201, 202)
    except urllib.error.HTTPError as e:
        err_msg = e.read().decode('utf-8')
        logger.error(f"[Resend API HTTP Error {e.code}] {err_msg}")
        print(f"[Resend HTTP {e.code}] {err_msg}")
        raise Exception(f"Resend API ({e.code}): {err_msg}")


def _send_via_sendgrid(api_key, from_email, to_email, subject, html_content, reply_to=None):
    url = "https://api.sendgrid.com/v3/mail/send"
    sender_name = "A&H IMPEX"
    sender_email = from_email
    if "<" in from_email and ">" in from_email:
        sender_name = from_email.split("<")[0].strip()
        sender_email = from_email.split("<")[1].replace(">", "").strip()

    payload = {
        "personalizations": [{"to": [{"email": to_email}]}],
        "from": {"email": sender_email, "name": sender_name},
        "subject": subject,
        "content": [{"type": "text/html", "value": html_content}]
    }
    if reply_to:
        payload["reply_to"] = {"email": reply_to}

    data = json.dumps(payload).encode('utf-8')
    req = urllib.request.Request(
        url,
        data=data,
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        },
        method="POST"
    )
    with urllib.request.urlopen(req, timeout=12) as response:
        return response.status in (200, 201, 202)


def dispatch_single_email(to_email, subject, html_content, plain_content, reply_to=None, from_email=None):
    """
    Universal Email Dispatcher:
    1. First tries HTTPS REST APIs (Brevo / Resend / SendGrid) -> 100% UNBLOCKED ON RENDER!
    2. Falls back to standard Django SMTP.
    """
    from_addr = from_email or getattr(settings, 'DEFAULT_FROM_EMAIL', 'A&H IMPEX <export@ah-impex.com>')
    
    brevo_key = getattr(settings, 'BREVO_API_KEY', '') or os.getenv('BREVO_API_KEY', '')
    resend_key = getattr(settings, 'RESEND_API_KEY', '') or os.getenv('RESEND_API_KEY', '')
    sendgrid_key = getattr(settings, 'SENDGRID_API_KEY', '') or os.getenv('SENDGRID_API_KEY', '')

    # 1. Try Brevo HTTP API (Port 443 - Works on Render)
    if brevo_key:
        try:
            if _send_via_brevo(brevo_key, from_addr, to_email, subject, html_content, reply_to):
                logger.info(f"[Brevo HTTPS API] Successfully sent email to {to_email}")
                print(f"[Brevo HTTPS API] Sent to {to_email}")
                return True
        except Exception as e:
            logger.error(f"[Brevo API Error] {str(e)}")
            print(f"[Brevo API Error] {str(e)}")

    # 2. Try Resend HTTP API (Port 443 - Works on Render)
    if resend_key:
        try:
            if _send_via_resend(resend_key, from_addr, to_email, subject, html_content, reply_to):
                logger.info(f"[Resend HTTPS API] Successfully sent email to {to_email}")
                print(f"[Resend HTTPS API] Sent to {to_email}")
                return True
        except Exception as e:
            logger.error(f"[Resend API Error] {str(e)}")
            print(f"[Resend API Error] {str(e)}")

    # 3. Try SendGrid HTTP API (Port 443 - Works on Render)
    if sendgrid_key:
        try:
            if _send_via_sendgrid(sendgrid_key, from_addr, to_email, subject, html_content, reply_to):
                logger.info(f"[SendGrid HTTPS API] Successfully sent email to {to_email}")
                print(f"[SendGrid HTTPS API] Sent to {to_email}")
                return True
        except Exception as e:
            logger.error(f"[SendGrid API Error] {str(e)}")
            print(f"[SendGrid API Error] {str(e)}")

    # 4. Fallback to Standard Django SMTP (Port 587/465)
    try:
        msg = EmailMultiAlternatives(
            subject=subject,
            body=plain_content,
            from_email=from_addr,
            to=[to_email],
            reply_to=[reply_to] if reply_to else None
        )
        msg.attach_alternative(html_content, "text/html")
        msg.send(fail_silently=False)
        logger.info(f"[SMTP] Successfully dispatched email to {to_email}")
        print(f"[SMTP] Sent to {to_email}")
        return True
    except Exception as e:
        logger.error(f"[SMTP Error] Failed sending to {to_email}: {str(e)}")
        print(f"[SMTP Error] Failed sending to {to_email}: {str(e)}")
        return False


def send_inquiry_email_notifications(inquiry):
    """
    Sends automated email notifications when a user submits an RFQ or contact form:
    1. To Company Commercial Export Desk (info@ah-impex.com or configured COMPANY_NOTIFICATION_EMAIL).
    2. To the Client acknowledging receipt of their inquiry.
    """
    company_email = getattr(settings, 'COMPANY_NOTIFICATION_EMAIL', 'info@ah-impex.com')
    from_email = getattr(settings, 'DEFAULT_FROM_EMAIL', 'A&H Impex Export <export@ah-impex.com>')

    # -------------------------------------------------------------
    # 1. SEND NOTIFICATION TO COMPANY
    # -------------------------------------------------------------
    company_subject = f"🔥 New Export Inquiry / RFQ #{inquiry.id}: {inquiry.company} ({inquiry.name})"
    
    company_html_message = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <style>
            body {{ font-family: 'Segoe UI', Arial, sans-serif; background-color: #0f172a; color: #f8fafc; padding: 20px; }}
            .container {{ max-width: 650px; margin: 0 auto; background: #1e293b; border-radius: 12px; border: 1px solid #334155; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.4); }}
            .header {{ background: linear-gradient(135deg, #1e3a8a, #0f172a); padding: 25px 30px; border-bottom: 2px solid #C5A880; }}
            .header h1 {{ margin: 0; color: #ffffff; font-size: 22px; font-weight: 700; }}
            .header p {{ margin: 5px 0 0 0; color: #C5A880; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; }}
            .content {{ padding: 30px; }}
            .inquiry-badge {{ display: inline-block; background: #C5A880; color: #0f172a; font-weight: bold; font-size: 11px; padding: 4px 10px; border-radius: 9999px; text-transform: uppercase; margin-bottom: 15px; }}
            .table-details {{ width: 100%; border-collapse: collapse; margin-top: 15px; }}
            .table-details td {{ padding: 12px 14px; border-bottom: 1px solid #334155; font-size: 14px; }}
            .table-details td.label {{ color: #94a3b8; width: 35%; font-weight: 600; }}
            .table-details td.val {{ color: #f8fafc; font-weight: 500; }}
            .notes-box {{ background: #0f172a; border-left: 4px solid #C5A880; padding: 15px; border-radius: 6px; margin-top: 20px; font-size: 14px; line-height: 1.6; color: #e2e8f0; }}
            .footer {{ background: #0f172a; padding: 20px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #334155; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>A&amp;H IMPEX</h1>
                <p>Commercial Export Desk Notification</p>
            </div>
            <div class="content">
                <span class="inquiry-badge">New Commercial RFQ #{inquiry.id}</span>
                <h2 style="color: #ffffff; margin-top: 0; font-size: 18px;">New Direct Buyer Quotation Request</h2>
                <p style="color: #cbd5e1; font-size: 14px; margin-bottom: 20px;">
                    A new export inquiry has been submitted through the web portal. Review details below:
                </p>
                <table class="table-details">
                    <tr><td class="label">Client Name:</td><td class="val">{inquiry.name}</td></tr>
                    <tr><td class="label">Company / Importer:</td><td class="val"><strong>{inquiry.company}</strong></td></tr>
                    <tr><td class="label">Email Address:</td><td class="val"><a href="mailto:{inquiry.email}" style="color: #60a5fa;">{inquiry.email}</a></td></tr>
                    <tr><td class="label">Phone / WhatsApp:</td><td class="val">{inquiry.phone or 'Not Provided'}</td></tr>
                    <tr><td class="label">Product Category:</td><td class="val">{inquiry.category}</td></tr>
                    <tr><td class="label">Target Product:</td><td class="val"><strong>{inquiry.product_title or 'Catalog Selection'}</strong></td></tr>
                    <tr><td class="label">Order Volume / Container:</td><td class="val">{inquiry.volume}</td></tr>
                    <tr><td class="label">Destination Port / Country:</td><td class="val">{inquiry.port or 'FOB Karachi (Default)'}</td></tr>
                    <tr><td class="label">Submission Date & Time:</td><td class="val">{inquiry.date}</td></tr>
                </table>
                <div class="notes-box">
                    <strong style="color: #C5A880; display: block; margin-bottom: 5px;">Buyer Specifications & Notes:</strong>
                    {inquiry.notes or 'No additional notes specified.'}
                </div>
            </div>
            <div class="footer">
                &copy; A&amp;H Impex Textile Manufacturer &amp; Global Exporter. All Rights Reserved.
            </div>
        </div>
    </body>
    </html>
    """

    company_plain_message = f"""
    NEW EXPORT INQUIRY / RFQ #{inquiry.id}
    ======================================
    Client: {inquiry.name}
    Company: {inquiry.company}
    Email: {inquiry.email}
    Phone: {inquiry.phone}
    Category: {inquiry.category}
    Product: {inquiry.product_title}
    Volume: {inquiry.volume}
    Destination Port: {inquiry.port}
    Date: {inquiry.date}

    Specifications / Notes:
    {inquiry.notes}
    """

    sent_company = dispatch_single_email(
        to_email=company_email,
        subject=company_subject,
        html_content=company_html_message,
        plain_content=company_plain_message,
        reply_to=inquiry.email,
        from_email=from_email
    )
    if sent_company:
        inquiry.email_sent_to_company = True

    # -------------------------------------------------------------
    # 2. SEND CONFIRMATION TO CLIENT
    # -------------------------------------------------------------
    if inquiry.email:
        client_subject = f"Receipt Confirmation: Your RFQ #{inquiry.id} to A&H Impex"
        client_html_message = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <style>
                body {{ font-family: 'Segoe UI', Arial, sans-serif; background-color: #f8fafc; color: #1e293b; padding: 20px; }}
                .container {{ max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }}
                .header {{ background: #0f172a; padding: 25px 30px; text-align: center; }}
                .header h1 {{ margin: 0; color: #ffffff; font-size: 22px; }}
                .header p {{ margin: 5px 0 0 0; color: #C5A880; font-size: 12px; letter-spacing: 1px; }}
                .content {{ padding: 30px; line-height: 1.6; }}
                .highlight-box {{ background: #f1f5f9; border-left: 4px solid #C5A880; padding: 15px; border-radius: 4px; margin: 20px 0; }}
                .footer {{ background: #0f172a; padding: 20px; text-align: center; font-size: 12px; color: #94a3b8; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>A&amp;H IMPEX</h1>
                    <p>TEXTILE MANUFACTURER &amp; GLOBAL EXPORTER</p>
                </div>
                <div class="content">
                    <p>Dear <strong>{inquiry.name}</strong>,</p>
                    <p>
                        Thank you for contacting <strong>A&amp;H Impex</strong>. We have successfully received your Request for Quote (RFQ) reference <strong>#{inquiry.id}</strong>.
                    </p>
                    <div class="highlight-box">
                        <strong>Inquiry Summary:</strong><br>
                        &bull; <strong>Product:</strong> {inquiry.product_title or inquiry.category}<br>
                        &bull; <strong>Volume / Quantity:</strong> {inquiry.volume}<br>
                        &bull; <strong>Destination Port:</strong> {inquiry.port or 'FOB Karachi'}
                    </div>
                    <p>
                        Our International Export Desk is currently reviewing your specifications and will provide you with a formal FOB / CIF price quotation, lab dip schedule, and container loading specs within 24 business hours.
                    </p>
                    <p>
                        If you have urgent queries, feel free to reach our team on WhatsApp directly or reply to this email.
                    </p>
                    <p style="margin-top: 25px;">
                        Warm Regards,<br>
                        <strong>Export Commercial Division</strong><br>
                        A&amp;H Impex Global Textiles<br>
                        <a href="mailto:{company_email}" style="color: #2563eb;">{company_email}</a>
                    </p>
                </div>
                <div class="footer">
                    &copy; A&amp;H Impex. All rights reserved.
                </div>
            </div>
        </body>
        </html>
        """

        client_plain_message = f"""
        Dear {inquiry.name},

        Thank you for contacting A&H Impex. We have received your Request for Quote #{inquiry.id}.
        Summary:
        - Product: {inquiry.product_title or inquiry.category}
        - Volume: {inquiry.volume}
        - Port: {inquiry.port}

        Our Commercial Export Desk will reach out with a formal quotation and swatch availability within 24 hours.

        Best Regards,
        A&H Impex Global Export Desk
        {company_email}
        """

        sent_client = dispatch_single_email(
            to_email=inquiry.email,
            subject=client_subject,
            html_content=client_html_message,
            plain_content=client_plain_message,
            reply_to=company_email,
            from_email=from_email
        )
        if sent_client:
            inquiry.email_sent_to_client = True

    inquiry.save(update_fields=['email_sent_to_company', 'email_sent_to_client'])

