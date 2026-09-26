import logging
from django.core.mail import send_mail, EmailMultiAlternatives
from django.conf import settings
from django.template.loader import render_to_string
from django.utils.html import strip_tags

logger = logging.getLogger(__name__)


def send_inquiry_email_notifications(inquiry):
    """
    Sends automated email notifications when a user submits an RFQ or contact form:
    1. To Company Commercial Export Desk (info@ah-impex.com or configured COMPANY_NOTIFICATION_EMAIL).
    2. To the Client acknowledging receipt of their inquiry.
    """
    company_email = getattr(settings, 'COMPANY_NOTIFICATION_EMAIL', 'info@ah-impex.com')
    from_email = getattr(settings, 'DEFAULT_FROM_EMAIL', 'A&H Impex Export <no-reply@ah-impex.com>')

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
            .button {{ display: inline-block; background: #C5A880; color: #0f172a; text-decoration: none; padding: 12px 24px; font-weight: bold; font-size: 13px; border-radius: 8px; margin-top: 20px; }}
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

    try:
        msg = EmailMultiAlternatives(
            subject=company_subject,
            body=company_plain_message,
            from_email=from_email,
            to=[company_email],
            reply_to=[inquiry.email] if inquiry.email else None
        )
        msg.attach_alternative(company_html_message, "text/html")
        msg.send(fail_silently=False)
        inquiry.email_sent_to_company = True
        logger.info(f"✅ Successfully sent RFQ notification to company: {company_email}")
        print(f"✅ [EMAIL SUCCESS] Sent RFQ #{inquiry.id} to company: {company_email}")
    except Exception as e:
        logger.error(f"❌ Failed to send email to company ({company_email}). Error: {str(e)}")
        print(f"❌ [EMAIL ERROR] Failed sending to company ({company_email}): {str(e)}")

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

        try:
            msg = EmailMultiAlternatives(
                subject=client_subject,
                body=client_plain_message,
                from_email=from_email,
                to=[inquiry.email]
            )
            msg.attach_alternative(client_html_message, "text/html")
            msg.send(fail_silently=False)
            inquiry.email_sent_to_client = True
            logger.info(f"✅ Successfully sent confirmation email to client: {inquiry.email}")
            print(f"✅ [EMAIL SUCCESS] Sent confirmation email to client: {inquiry.email}")
        except Exception as e:
            logger.error(f"❌ Failed to send confirmation email to client ({inquiry.email}). Error: {str(e)}")
            print(f"❌ [EMAIL ERROR] Failed sending to client ({inquiry.email}): {str(e)}")

    inquiry.save(update_fields=['email_sent_to_company', 'email_sent_to_client'])
