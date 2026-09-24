import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';

/**
 * SafeImage Component
 * Handles graceful image loading with fallback image and fallback gradient placeholder
 * Prevents broken image icons and provides smooth transitions.
 */
export default function SafeImage({
  src,
  fallbackSrc,
  alt = 'A&H IMPEX Textile Product',
  className = '',
  aspectRatio = '',
  zoomOnHover = false,
  loading = 'eager',
  ...props
}) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    setImgSrc(src);
    setHasError(false);
    
    // Check if image is already loaded in browser cache
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
    }
  }, [src]);

  const handleError = () => {
    if (fallbackSrc && imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
    } else {
      setHasError(true);
    }
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  if (hasError) {
    return (
      <div
        className={`bg-brand-900 flex flex-col items-center justify-center p-6 text-center border border-white/5 relative overflow-hidden ${className}`}
        style={aspectRatio ? { aspectRatio } : undefined}
      >
        <div className="w-12 h-12 rounded-full bg-brand-800 flex items-center justify-center mb-3 text-brand-300 border border-brand-500/20">
          <FontAwesomeIcon icon={faLayerGroup} className="text-xl" />
        </div>
        <p className="text-xs uppercase tracking-wider text-brand-300 font-medium font-mono">A&amp;H IMPEX</p>
        <p className="text-xs text-slate-400 mt-1 line-clamp-1">{alt}</p>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden bg-brand-950 ${className}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {/* Background placeholder while image loads */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-brand-900/60 animate-pulse z-0" />
      )}
      <img
        ref={imgRef}
        src={imgSrc}
        alt={alt}
        loading={loading}
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        className={`w-full h-full object-cover transition-transform duration-500 relative z-10 ${
          zoomOnHover ? 'group-hover:scale-105' : ''
        }`}
        {...props}
      />
    </div>
  );
}
