import { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface CompanyLogo {
  name: string;
  logo: string;
  darkLogo?: string;
  alt: string;
  url: string;
  className?: string;
}

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

export const HeroSection = () => {
  const { isDark } = useTheme();
  const fullText = 'With evolving persistent memory \nand context that doesn\'t rot.';
  const startText = 'With';
  const [displayedText, setDisplayedText] = useState(startText);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    let currentIndex = startText.length;
    const typingSpeed = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--typing-speed'));
    const typingDelay = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--typing-delay'));

    const typeText = () => {
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
        setTimeout(typeText, typingSpeed);
      } else {
        setIsTypingComplete(true);
      }
    };

    // Start typing after the configured delay
    const typingTimer = setTimeout(typeText, typingDelay);

    return () => clearTimeout(typingTimer);
  }, [fullText, startText]);

  const handleJoinAccess = () => {
    const preorderSection = document.getElementById('preorder');
    if (preorderSection) {
      // Dynamically get the actual header height for responsive design
      const topBar = document.querySelector('.fixed.top-0') as HTMLElement;
      // Use design system spacing (1rem = 16px) for buffer, calculate fallback based on typical header size
      const spacingBuffer = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16; // 1rem
      const fallbackHeight = topBar ? topBar.offsetHeight : (spacingBuffer * 5); // 5rem fallback if element not found
      const headerHeight = topBar ? topBar.offsetHeight + spacingBuffer : fallbackHeight;
      
      const elementPosition = preorderSection.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative min-h-[75vh] sm:min-h-[80vh] md:min-h-[90vh] lg:min-h-[85vh] xl:min-h-[80vh] 2xl:min-h-[75vh] flex flex-col bg-background pt-12 sm:pt-16">
      {/* Main Hero Content */}
      <div className="flex-1 md:flex-1 flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 md:py-8">
          <div className="md:grid md:grid-cols-2 md:gap-12 lg:gap-16 xl:gap-20 max-w-7xl mx-auto">
            {/* Text Content */}
            <div className="text-center md:text-left mb-2 sm:mb-4 md:mb-0 md:pl-12 lg:pl-20 xl:pl-24 md:flex md:flex-col md:justify-center md:h-[28rem] xl:h-[32rem]">
              <div className="tech-mono mb-3 sm:mb-4 text-sm sm:text-sm">
                THEATRE / HUMAN-AI COLLABORATION
              </div>
              <h1 className="text-5xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 sm:mb-6 tracking-tight leading-tight">
                <span className="whitespace-nowrap">AI for Discovery</span><br />
                <span className="text-primary relative whitespace-nowrap">& Experimenting</span>
              </h1>
              
              <p className="nav-mono text-lg sm:text-xl md:text-xl lg:text-2xl text-muted-foreground mb-3 sm:mb-6 md:mb-8 max-w-xl md:max-w-none mx-auto md:mx-0 leading-tight sm:leading-relaxed px-2 sm:px-0 min-h-[3rem] sm:min-h-[3.5rem] md:min-h-[4rem] whitespace-pre-line">
                {displayedText}
                {!isTypingComplete && (
                  <span className="inline-block ml-1 text-primary">_</span>
                )}
                {isTypingComplete && (
                  <span className="inline-block ml-2 text-primary">↵</span>
                )}
              </p>

              <div className="flex flex-col gap-3 sm:gap-4 justify-center md:justify-start items-center md:items-start">
                <button 
                  className="group inline-flex items-center gap-2 text-lg sm:text-xl font-semibold text-foreground hover:text-primary transition-colors duration-300 cursor-pointer bg-transparent border-none p-0"
                  onClick={handleJoinAccess}
                >
                  <span className="border-b-2 border-foreground group-hover:border-primary transition-colors duration-300">
                    Join Early Access
                  </span>
                  <span className="text-xl group-hover:translate-x-1 transition-transform duration-300">→</span>
                </button>
              </div>
            </div>

            {/* SVG Drawing - Only visible on larger screens */}
            <div className="hidden md:flex justify-start items-center md:pr-4 lg:pr-6 xl:pr-8 2xl:pr-12">
              <div className="w-full max-w-md xl:max-w-lg 2xl:max-w-lg md:ml-0 lg:ml-0 xl:ml-8 2xl:ml-12 h-full">
                <img 
                  src={"/cool.svg"} 
                  alt="Abstract artistic drawing" 
                  className="w-full h-full object-contain aspect-square opacity-90 hover:opacity-100 transition-opacity duration-500 drop-shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Integrated Trust Section */}
      <div className="pb-4 sm:pb-6 md:pb-10">
        <div className="container mx-auto px-4 sm:px-6">
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
            
            <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 md:gap-16">
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