import React, { useState } from 'react';
import { Layers } from 'lucide-react';

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
  ...props
}) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleError = () => {
    if (fallbackSrc && imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
    } else {
      setHasError(true);
    }
  };

  if (hasError) {
    return (
      <div
        className={`bg-gradient-to-br from-navy-900 via-navy-850 to-navy-800 flex flex-col items-center justify-center p-6 text-center border border-white/5 relative overflow-hidden ${className}`}
        style={aspectRatio ? { aspectRatio } : undefined}
      >
        <div className="absolute inset-0 bg-fabric-weave opacity-20 pointer-events-none" />
        <div className="w-12 h-12 rounded-full bg-navy-750 flex items-center justify-center mb-3 text-gold-400 border border-gold-500/20">
          <Layers className="w-6 h-6" />
        </div>
        <p className="text-xs uppercase tracking-wider text-gold-400/80 font-medium">A&H IMPEX</p>
        <p className="text-xs text-slate-400 mt-1 line-clamp-1">{alt}</p>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden bg-navy-900 ${className}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {/* Background skeleton loader while image loads */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 animate-pulse" />
      )}
      <img
        src={imgSrc}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={handleError}
        className={`w-full h-full object-cover transition-all duration-700 ${
          isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        } ${zoomOnHover ? 'group-hover:scale-105 duration-500' : ''}`}
        {...props}
      />
    </div>
  );
}
