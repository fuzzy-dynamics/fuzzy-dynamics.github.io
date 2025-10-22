import { useState, useEffect, useCallback, useMemo } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { KeplerOrbit } from './KeplerOrbit';
import demo2 from '@/assets/demo2.jpg';
import demo3 from '@/assets/demo3.png';
import demo4 from '@/assets/demo4.png';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface CompanyLogo {
  name: string;
  logo: string;
  darkLogo?: string;
  alt: string;
  url: string;
  className?: string;
}

interface CarouselImage {
  src: string;
  alt: string;
  position?: 'left' | 'right';
}

// ============================================================================
// CONFIGURATION
// ============================================================================

/** Desktop carousel images - full width display */
const HERO_IMAGES: CarouselImage[] = [
  { src: demo2, alt: 'Theatre visualization - implementation view' },
  { src: demo3, alt: 'Theatre visualization - synthesis workspace' },
  { src: demo4, alt: 'Theatre visualization - analysis view' }
];

/** Mobile carousel images - split into left/right views for detail */
const MOBILE_HERO_IMAGES: CarouselImage[] = [
  { src: demo2, alt: 'Theatre visualization - implementation view (left)', position: 'left' },
  { src: demo2, alt: 'Theatre visualization - implementation view (right)', position: 'right' },
  { src: demo3, alt: 'Theatre visualization - synthesis workspace (left)', position: 'left' },
  { src: demo3, alt: 'Theatre visualization - synthesis workspace (right)', position: 'right' },
  { src: demo4, alt: 'Theatre visualization - analysis view (left)', position: 'left' },
  { src: demo4, alt: 'Theatre visualization - analysis view (right)', position: 'right' }
];

/** Carousel timing and behavior configuration */
const CAROUSEL_CONFIG = {
  AUTO_CYCLE_INTERVAL: 5000, // Auto-advance every 5 seconds
  TRANSITION_DURATION: 700, // Fade transition duration in ms
  MIN_SWIPE_DISTANCE: 50, // Minimum px distance to trigger navigation
  MOBILE_BREAKPOINT: 640, // Tailwind 'sm' breakpoint
} as const;

// Company logos for trust section
const companies: CompanyLogo[] = [
  {
    name: "Google",
    logo: "/logos/google-logo.svg",
    alt: "Google logo",
    url: "https://google.com"
  },
  {
    name: "Anthropic",
    logo: "/logos/anthropic-logo.svg",
    darkLogo: "/logos/anthropic-logo-dark.svg",
    alt: "Anthropic logo",
    url: "https://anthropic.com",
    className: "h-6 sm:h-8 md:h-10"
  },
  {
    name: "Salesforce",
    logo: "/logos/salesforce-logo.svg",
    alt: "Salesforce logo",
    url: "https://salesforce.com"
  },
  {
    name: "Microsoft",
    logo: "/logos/microsoft-logo.svg",
    alt: "Microsoft logo",
    url: "https://microsoft.com"
  },
  {
    name: "Uber",
    logo: "/logos/uber-logo.svg",
    darkLogo: "/logos/uber-logo-dark.svg",
    alt: "Uber logo",
    url: "https://uber.com",
    className: "h-6 sm:h-6 md:h-8"
  }
];

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

/** Check if an image should be rendered (current, previous, or next) */
const shouldRenderImage = (
  index: number,
  currentIndex: number,
  totalImages: number
): boolean => {
  const isPrevious = index === getPreviousIndex(currentIndex, totalImages);
  const isNext = index === getNextIndex(currentIndex, totalImages);
  return index === currentIndex || isPrevious || isNext;
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const HeroSection = () => {
  const { isDark } = useTheme();

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

  // ========================================
  // Computed Values
  // ========================================

  /** Select appropriate image set based on viewport */
  const carouselImages = useMemo(
    () => (isMobile ? MOBILE_HERO_IMAGES : HERO_IMAGES),
    [isMobile]
  );

  // ========================================
  // Navigation Handlers
  // ========================================

  /** Navigate to a specific index with transition */
  const navigateToIndex = useCallback((index: number) => {
    setIsTransitioning(true);
    setCurrentImageIndex(index);
    setTimeout(() => setIsTransitioning(false), CAROUSEL_CONFIG.TRANSITION_DURATION);
  }, []);

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
    if (dragState.isDragging) return;

    const interval = setInterval(() => {
      navigateToIndex(getNextIndex(currentImageIndex, carouselImages.length));
    }, CAROUSEL_CONFIG.AUTO_CYCLE_INTERVAL);

    return () => clearInterval(interval);
  }, [carouselImages.length, dragState.isDragging, currentImageIndex, navigateToIndex]);

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
    <section className="relative flex flex-col bg-background pt-20 sm:pt-24 md:pt-20 lg:pt-20 pb-[60px]">
      {/* Main Hero Content */}
      <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-2 sm:py-4 md:py-4 lg:py-2">
        <div className="max-w-7xl mx-auto">
          {/* Top Row: Text and Kepler */}
          <div className="md:grid md:grid-cols-2 md:gap-12 lg:gap-16 xl:gap-20">
            {/* Text Content */}
            <div className="text-center md:text-left mb-2 md:mb-0 md:flex md:flex-col md:justify-center">
              <div className="tech-mono mb-3 sm:mb-4 text-sm">
                THEATRE / HUMAN-AI COLLABORATION
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 sm:mb-6 tracking-tight leading-tight" style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
                <span className="font-bold whitespace-nowrap">AI for Discovery</span><br />
                <span className="font-normal text-primary relative whitespace-nowrap">& Experimentation</span>
              </h1>
              
              <p className="text-lg md:text-lg lg:text-[19px] mb-3 sm:mb-6 md:mb-8 max-w-xl md:max-w-none mx-auto md:mx-0 px-2 sm:px-0 whitespace-pre-line text-muted-foreground" style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontWeight: 400, lineHeight: 1.6 }}>
                Towards continual learning for research and validation loops.
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

            {/* Kepler's Law Visualization - Right side on desktop, below text on mobile */}
            <div className="flex justify-center items-center mb-4 md:mb-0">
              <div className="w-full max-w-sm md:max-w-md xl:max-w-lg 2xl:max-w-lg h-[400px] md:h-[500px]">
                <KeplerOrbit />
              </div>
            </div>
          </div>

          {/* Image Carousel */}
          <div className="flex flex-col gap-4 mt-8">
            {/* Carousel container - responsive height and cropping */}
            <div
              className="relative w-full rounded-lg border border-border bg-background/50
                         p-2 sm:p-3 md:p-4 lg:p-5
                         h-[500px] sm:h-[400px] md:h-[500px] lg:h-[600px]
                         overflow-hidden touch-pan-y cursor-grab active:cursor-grabbing select-none"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseLeave}
            >
              {carouselImages.map((image, index) => {
                const isActive = index === currentImageIndex;

                // Only render current and adjacent images for performance
                if (!shouldRenderImage(index, currentImageIndex, carouselImages.length)) {
                  return null;
                }

                // Calculate opacity with drag feedback
                let opacity = isActive ? 1 : 0;
                if (dragState.isDragging && isActive) {
                  const swipeProgress = Math.abs(dragState.offset) / 100;
                  opacity = Math.max(0, 1 - swipeProgress);
                }

                // Determine image positioning (mobile split view)
                const objectPosition =
                  isMobile && image.position
                    ? `object-${image.position}`
                    : 'object-center';

                return (
                  <div
                    key={index}
                    className="absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out"
                    style={{
                      opacity,
                      pointerEvents: isActive ? 'auto' : 'none',
                      transform: 'translateZ(0)', // GPU acceleration
                      willChange: isActive || isTransitioning ? 'opacity' : 'auto',
                    }}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className={`w-full h-full object-cover sm:object-contain ${objectPosition}`}
                      draggable={false}
                      loading={isActive ? 'eager' : 'lazy'}
                    />
                  </div>
                );
              })}
            </div>

            {/* Navigation indicators */}
            <div className="flex gap-2 sm:gap-3 justify-center" role="tablist" aria-label="Carousel navigation">
              {carouselImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => navigateToIndex(index)}
                  className={`h-1.5 sm:h-2 rounded-full transition-all duration-500 ease-in-out ${
                    index === currentImageIndex
                      ? 'w-8 sm:w-10 bg-primary'
                      : 'w-1.5 sm:w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  role="tab"
                  aria-selected={index === currentImageIndex}
                  aria-label={`View ${image.alt}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Integrated Trust Section */}
      <div className="pt-8 sm:pt-10 md:pt-12 pb-4 sm:pb-6 md:pb-10">
        <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          <div className="max-w-7xl mx-auto text-center">
            <div className="tech-mono mb-4 sm:mb-6 text-sm text-muted-foreground">
              {/* Mobile version - two lines */}
              <div className="block sm:hidden">
                <div>EARLY ADOPTERS FROM</div>
              </div>
              {/* Desktop version - single line */}
              <div className="hidden sm:block">
                EARLY ADOPTERS FROM
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-10 sm:gap-14 md:gap-20">
              {companies.map((company, index) => (
                <a 
                  key={index} 
                  href={company.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center hover:scale-105 transition-transform duration-300 cursor-pointer"
                >
                  <img 
                    src={isDark && company.darkLogo ? company.darkLogo : company.logo}
                    alt={company.alt}
                    className={`w-auto object-contain transition-all duration-300 ${
                      company.className || "h-8 sm:h-10 md:h-12"
                    }`}
                    onError={(e) => {
                      // Fallback to company name if logo fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement!.innerHTML = `<span class="text-xl sm:text-2xl font-bold text-muted-foreground/80">${company.name}</span>`;
                    }}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};