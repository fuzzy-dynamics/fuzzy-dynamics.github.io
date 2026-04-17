import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { KeplerOrbit } from './KeplerOrbit';
import { TrustSection } from './TrustSection';
import demo2 from '@/assets/demo2.jpg';
import demo3 from '@/assets/demo3.png';
import demo1 from '@/assets/demo1.mp4';
import demo4 from '@/assets/demo4.png';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface CarouselImage {
  src: string;
  alt: string;
  type?: 'image' | 'video';
}

// ============================================================================
// CONFIGURATION
// ============================================================================

/** Carousel images - same for both desktop and mobile */
const HERO_IMAGES: CarouselImage[] = [
  { src: demo2, alt: 'OpenScientist visualization - implementation view' },
  { src: demo3, alt: 'OpenScientist visualization - synthesis workspace' },
  { src: demo1, alt: 'OpenScientist visualization - demo', type: 'video' },
  { src: demo4, alt: 'OpenScientist visualization - analysis view' }
];

/** Carousel timing and behavior configuration */
const CAROUSEL_CONFIG = {
  AUTO_CYCLE_INTERVAL: 5000, // Auto-advance every 5 seconds
  TRANSITION_DURATION: 700, // Fade transition duration in ms
  MIN_SWIPE_DISTANCE: 50, // Minimum px distance to trigger navigation
  MOBILE_BREAKPOINT: 640, // Tailwind 'sm' breakpoint
} as const;

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/** Navigate to next index in circular array */
const getNextIndex = (current: number, length: number): number => {
  return (current + 1) % length;
};

/** Navigate to previous index in circular array */
const getPreviousIndex = (current: number, length: number): number => {
  return current === 0 ? length - 1 : current - 1;
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const HeroSection = () => {
  // ========================================
  // State Management
  // ========================================

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [dragState, setDragState] = useState({
    isDragging: false,
    startX: 0,
    offset: 0,
  });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mobileCarouselHeight, setMobileCarouselHeight] = useState<number | null>(null);
  const [videoDuration, setVideoDuration] = useState<number | null>(null);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // ========================================
  // Computed Values
  // ========================================

  /** Use same images for all viewports */
  const carouselImages = HERO_IMAGES;

  // ========================================
  // Navigation Handlers
  // ========================================

  /** Navigate to a specific index with transition */
  const navigateToIndex = useCallback((index: number) => {
    setIsTransitioning(true);
    setCurrentImageIndex(index);
    setTimeout(() => setIsTransitioning(false), CAROUSEL_CONFIG.TRANSITION_DURATION);
  }, []);

  /** Handle indicator clicks to navigate to specific slide */
  const handleIndicatorClick = useCallback(
    (index: number) => {
      setHasUserInteracted(true);
      navigateToIndex(index);
    },
    [navigateToIndex]
  );

  /** Handle swipe completion and determine navigation direction */
  const handleSwipeEnd = useCallback(() => {
    const { offset } = dragState;
    const distance = -offset;
    const isLeftSwipe = distance > CAROUSEL_CONFIG.MIN_SWIPE_DISTANCE;
    const isRightSwipe = distance < -CAROUSEL_CONFIG.MIN_SWIPE_DISTANCE;

    // Reset drag state
    setDragState({ isDragging: false, startX: 0, offset: 0 });

    // Navigate if swipe threshold met
    if (isLeftSwipe) {
      navigateToIndex(getNextIndex(currentImageIndex, carouselImages.length));
    } else if (isRightSwipe) {
      navigateToIndex(getPreviousIndex(currentImageIndex, carouselImages.length));
    }
  }, [dragState, currentImageIndex, carouselImages.length, navigateToIndex]);

  // ========================================
  // Event Handlers (Touch & Mouse)
  // ========================================

  const onDragStart = useCallback((clientX: number) => {
    setHasUserInteracted(true);
    setDragState({ isDragging: true, startX: clientX, offset: 0 });
  }, []);

  const onDragMove = useCallback((clientX: number) => {
    if (!dragState.isDragging) return;
    const offset = clientX - dragState.startX;
    setDragState((prev) => ({ ...prev, offset }));
  }, [dragState.isDragging, dragState.startX]);

  const onTouchStart = (e: React.TouchEvent) => onDragStart(e.targetTouches[0].clientX);
  const onTouchMove = (e: React.TouchEvent) => onDragMove(e.targetTouches[0].clientX);
  const onTouchEnd = handleSwipeEnd;

  const onMouseDown = (e: React.MouseEvent) => onDragStart(e.clientX);
  const onMouseMove = (e: React.MouseEvent) => onDragMove(e.clientX);
  const onMouseUp = handleSwipeEnd;
  const onMouseLeave = () => dragState.isDragging && handleSwipeEnd();

  // ========================================
  // Side Effects
  // ========================================

  /** Detect mobile viewport on mount and resize */
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < CAROUSEL_CONFIG.MOBILE_BREAKPOINT);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  /** Auto-cycle through carousel images */
  useEffect(() => {
    // Pause auto-cycle if user has interacted or is currently dragging
    if (hasUserInteracted || dragState.isDragging) return;

    const currentImage = carouselImages[currentImageIndex];
    const isVideo = currentImage?.type === 'video';

    // Use video duration if available, otherwise use default interval
    const delay = isVideo && videoDuration
      ? videoDuration * 1000 // Convert to milliseconds
      : CAROUSEL_CONFIG.AUTO_CYCLE_INTERVAL;

    const interval = setInterval(() => {
      navigateToIndex(getNextIndex(currentImageIndex, carouselImages.length));
    }, delay);

    return () => clearInterval(interval);
  }, [carouselImages, carouselImages.length, dragState.isDragging, currentImageIndex, navigateToIndex, videoDuration, hasUserInteracted]);

  /** Calculate dynamic carousel height for mobile based on widest image */
  useEffect(() => {
    if (!isMobile) {
      setMobileCarouselHeight(null);
      return;
    }

    const calculateHeight = () => {
      // Get container width (accounting for page padding)
      const container = document.querySelector('.container');
      if (!container) return;

      const containerWidth = container.clientWidth;
      // Account for carousel padding (p-2 on mobile = 8px each side) and border (1px each side)
      const availableWidth = containerWidth - 16 - 2;

      // Load all base images and find the widest aspect ratio
      const imagePromises = HERO_IMAGES.map((img) => {
        return new Promise<number>((resolve) => {
          const image = new Image();
          image.onload = () => {
            const aspectRatio = image.naturalWidth / image.naturalHeight;
            resolve(aspectRatio);
          };
          image.onerror = () => resolve(16 / 9); // Fallback aspect ratio
          image.src = img.src;
        });
      });

      Promise.all(imagePromises).then((aspectRatios) => {
        // Find the widest aspect ratio (largest value = needs most height relative to width)
        const widestAspectRatio = Math.max(...aspectRatios);
        // Calculate height based on available width and widest aspect ratio
        const calculatedHeight = availableWidth / widestAspectRatio;
        // Add padding back (8px top + 8px bottom)
        const totalHeight = calculatedHeight + 16;
        setMobileCarouselHeight(totalHeight);
      });
    };

    calculateHeight();

    // Recalculate on window resize
    const handleResize = () => {
      const timeoutId = setTimeout(calculateHeight, 150);
      return () => clearTimeout(timeoutId);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  // ========================================
  // Scroll Navigation
  // ========================================

  /** Smooth scroll to preorder section with header offset */
  const handleJoinAccess = () => {
    const preorderSection = document.getElementById('preorder');
    if (!preorderSection) return;

    const topBar = document.querySelector('.fixed.top-0') as HTMLElement;
    const spacingBuffer = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    const headerHeight = topBar
      ? topBar.offsetHeight + spacingBuffer
      : spacingBuffer * 5;

    const elementPosition = preorderSection.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - headerHeight;

    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
  };

  return (
      <section className="relative flex flex-col bg-background pt-20 sm:pt-24 md:pt-20 lg:pt-20 pb-4 sm:pb-6 md:pb-6">
      {/* Main Hero Content */}
      <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-0 sm:py-2 md:py-4 lg:py-2">
        <div className="max-w-7xl mx-auto">
          {/* Top Row: Text and Kepler */}
          <div className="md:grid md:grid-cols-2 md:gap-12 lg:gap-16 xl:gap-20">
            {/* Text Content */}
            <div className="text-center md:text-left mb-2 sm:mb-3 md:mb-0 md:flex md:flex-col md:justify-center">
              <div>
              <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 sm:mb-6 tracking-tight leading-tight">
                <span className="font-bold whitespace-nowrap">
                  AI for Discovery
                </span><br />
                <span className="font-normal text-primary relative whitespace-nowrap">
                  & Experimentation
                </span>
              </h1>
              
              <p className="text-lg md:text-lg lg:text-[19px] mb-3 sm:mb-6 md:mb-8 max-w-xl md:max-w-none mx-auto md:mx-0 px-2 sm:px-0 whitespace-pre-line text-muted-foreground" style={{ fontWeight: 400, lineHeight: 1.6 }}>
                Democratizing Science.
              </p>

              <div className="flex flex-col gap-3 sm:gap-4 justify-center md:justify-start items-center md:items-start">
                <button 
                  className="group inline-flex items-center gap-2 text-lg sm:text-xl md:text-xl font-semibold text-foreground hover:text-primary transition-colors duration-300 cursor-pointer bg-transparent border-none p-0"
                  onClick={handleJoinAccess}
                >
                  <span className="border-b-2 border-foreground group-hover:border-primary transition-colors duration-300">
                    Join Early Access
                  </span>
                  <span className="text-xl group-hover:translate-x-1 transition-transform duration-300">→</span>
                </button>
              </div>
              </div>
            </div>

            {/* Kepler's Law Visualization - Hidden on mobile, visible on desktop */}
            <div className="hidden md:flex justify-center items-center mb-4 md:mb-0">
              <div className="w-full max-w-sm md:max-w-md xl:max-w-lg 2xl:max-w-lg h-[400px] md:h-[500px]">
                <KeplerOrbit />
              </div>
            </div>
          </div>

          {/* Image Carousel */}
          <div className="flex flex-col gap-4 mt-4 md:mt-8">
            {/* Carousel container - responsive height and cropping */}
            <div
              className="relative w-full rounded-lg border border-border bg-background/50
                         p-2 sm:p-3 md:p-4 lg:p-5
                         md:h-[500px] lg:h-[600px]
                         overflow-hidden touch-pan-y cursor-grab active:cursor-grabbing select-none"
              style={{
                height: isMobile && mobileCarouselHeight
                  ? `${mobileCarouselHeight}px`
                  : isMobile
                    ? '280px'
                    : undefined
              }}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseLeave}
            >
              <div
                className="relative w-full h-full flex"
                style={{
                  transform: `translateX(calc(-${currentImageIndex * 100}% + ${dragState.isDragging ? dragState.offset : 0}px))`,
                  transition: dragState.isDragging ? 'none' : isTransitioning ? 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'transform 0.5s ease-out'
                }}
              >
                {carouselImages.map((image, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-full h-full"
                  >
                    {image.type === 'video' ? (
                      <video
                        ref={(el) => {
                          if (index === currentImageIndex) {
                            videoRef.current = el;
                          }
                        }}
                        src={image.src}
                        className="w-full h-full object-contain object-center"
                        autoPlay
                        loop
                        muted
                        playsInline
                        onLoadedMetadata={(e) => {
                          const video = e.currentTarget;
                          setVideoDuration(video.duration);
                        }}
                      />
                    ) : (
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-contain object-center"
                        draggable={false}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation indicators */}
            <div className="flex gap-2 sm:gap-3 justify-center" role="tablist" aria-label="Carousel navigation">
              {carouselImages.map((image, index) => {
                const isActive = currentImageIndex === index;

                return (
                  <button
                    key={index}
                    onClick={() => handleIndicatorClick(index)}
                    className={`h-1.5 sm:h-2 rounded-full transition-all duration-500 ease-in-out ${
                      isActive
                        ? 'w-8 sm:w-10 bg-primary'
                        : 'w-1.5 sm:w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                    }`}
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`View ${image.alt}`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <TrustSection />
    </section>
  );
};
