import React from 'react';

type CollageImage = { src: string; alt?: string; label?: string; objectPosition?: string; fit?: 'cover' | 'contain' };

export const PinnedCollage: React.FC<{
  images: CollageImage[];
  align?: 'left' | 'right' | 'top';
  overflowExtras?: boolean;
}> = ({ images, align = 'right', overflowExtras = false }) => {
  const im = images?.[0];
  if (!im) return null;

  const tilt = align === 'left' ? -2 : align === 'right' ? 2 : -1;

  return (
    <div className={`relative w-full`}>
      <div
        className={`pinboard-polaroid ${align === 'top' ? 'mx-auto' : ''}`}
        style={{
          transform: `rotate(${tilt}deg)`,
          maxWidth: align === 'top' ? '100%' : '560px',
        }}
      >
        <div className="pinboard-tape pinboard-tape--tl" />
        <div className="pinboard-tape pinboard-tape--tr" />
        <div
          className={`group relative w-full ${
            align === 'top' ? 'aspect-[16/9]' : 'aspect-[3/2] md:aspect-[4/3]'
          } rounded-[10px] overflow-hidden focus-within:ring-1 focus-within:ring-ring`}
          tabIndex={0}
          aria-label={im.alt || 'Image'}
        >
          <img
            src={im.src}
            alt={im.alt || ''}
            className={`w-full h-full ${im.fit === 'contain' ? 'object-contain' : 'object-cover'}`}
            style={im.objectPosition ? ({ objectPosition: im.objectPosition } as React.CSSProperties) : undefined}
            loading="lazy"
            decoding="async"
            onError={(e) => {
              const el = e.target as HTMLImageElement;
              el.style.display = 'none';
            }}
          />

          {/* Snappy glass label (no darkening) */}
          <div
            className="pointer-events-none absolute left-3 right-3 bottom-3 sm:left-4 sm:right-4 sm:bottom-4 transform-gpu opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0 transition-[opacity,transform] duration-200 ease-out"
            aria-hidden
            style={{ willChange: 'opacity, transform' }}
          >
            <div className="glass-panel px-3 py-2 sm:px-4 sm:py-3">
              <div className="text-sm sm:text-base font-medium leading-snug">
                {im.label || im.alt || 'Untitled image'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {overflowExtras && images.length > 1 && (
        <div
          className={`mt-4 flex flex-col gap-4 ${
            align === 'left' ? 'items-start' : align === 'right' ? 'items-end' : 'items-center'
          }`}
        >
          {images.slice(1).map((extra, idx) => (
            <div
              key={extra.src + idx}
              className="pinboard-polaroid"
              style={{
                transform: `rotate(${idx % 2 === 0 ? (align === 'left' ? 3 : -3) : (align === 'left' ? -2 : 2)}deg)`,
                maxWidth: align === 'top' ? '100%' : '520px',
                width: '100%',
              }}
            >
              <div className="pinboard-tape pinboard-tape--tl" />
              <div className="pinboard-tape pinboard-tape--tr" />
              <div
                className="group relative w-full aspect-[3/2] md:aspect-[4/3] rounded-[10px] overflow-hidden focus-within:ring-1 focus-within:ring-ring"
                tabIndex={0}
                aria-label={extra.alt || 'Image'}
              >
                <img
                  src={extra.src}
                  alt={extra.alt || ''}
                  className={`w-full h-full ${extra.fit === 'contain' ? 'object-contain' : 'object-cover'}`}
                  style={extra.objectPosition ? ({ objectPosition: extra.objectPosition } as React.CSSProperties) : undefined}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    const el = e.target as HTMLImageElement;
                    el.style.display = 'none';
                  }}
                />

                {/* Snappy glass label (no darkening) */}
                <div
                  className="pointer-events-none absolute left-3 right-3 bottom-3 sm:left-4 sm:right-4 sm:bottom-4 transform-gpu opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0 transition-[opacity,transform] duration-200 ease-out"
                  aria-hidden
                  style={{ willChange: 'opacity, transform' }}
                >
                  <div className="glass-panel px-3 py-2 sm:px-4 sm:py-3">
                    <div className="text-sm sm:text-base font-medium leading-snug">
                      {extra.label || extra.alt || 'Untitled image'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
