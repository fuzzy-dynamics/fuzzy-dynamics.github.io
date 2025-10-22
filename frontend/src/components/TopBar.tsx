import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export const TopBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToPreorderSection = () => {
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

  const handleNavigation = () => {
    // Close mobile menu if open
    setIsMenuOpen(false);
    // Scroll to top when navigating
    window.scrollTo(0, 0);
  };

  const handleJoinAccess = () => {
    // Close mobile menu if open
    setIsMenuOpen(false);
    
    // Check if we're already on the home page
    if (location.pathname === '/') {
      // We're on the home page, scroll directly to preorder section
      scrollToPreorderSection();
    } else {
      // We're on another page, navigate to home page first
      navigate('/');
      
      // Wait a bit for navigation to complete, then scroll to preorder section
      setTimeout(() => {
        scrollToPreorderSection();
      }, 100);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-4 sm:gap-6 lg:gap-8 xl:gap-12">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0" onClick={handleNavigation}>
            <img src="/src/assets/icon.png" alt="Theatre Logo" className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9" />
            <span className="text-lg sm:text-xl lg:text-[22px] xl:text-2xl font-medium text-foreground whitespace-nowrap" style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>Theatre</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8 2xl:gap-10 ml-auto">
            <Link to="/blog" className="nav-link font-sans text-sm lg:text-base xl:text-[17px] whitespace-nowrap" onClick={handleNavigation}>Blog</Link>
            <Link to="/research" className="nav-link font-sans text-sm lg:text-base xl:text-[17px] whitespace-nowrap" onClick={handleNavigation}>Research</Link>
            <button
              className="nav-mono font-sans text-sm lg:text-base xl:text-[17px] px-3 lg:px-4 xl:px-5 py-2 lg:py-2.5 rounded-md transition-colors duration-200 bg-[hsl(var(--muted-hover))] hover:text-foreground whitespace-nowrap flex-shrink-0"
              onClick={handleJoinAccess}
            >
              Join
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors flex-shrink-0"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && isMobile && (
          <div className="md:hidden mt-3 sm:mt-4 pb-3 sm:pb-4 border-t border-border">
            <nav className="flex flex-col gap-1 sm:gap-2 pt-3 sm:pt-4">
              <Link
                to="/blog"
                className="nav-link font-sans text-base sm:text-[17px] block py-2 sm:py-2.5 px-2 rounded-md hover:bg-muted/50 transition-colors"
                onClick={handleNavigation}
              >
                Blog
              </Link>
              <Link
                to="/research"
                className="nav-link font-sans text-base sm:text-[17px] block py-2 sm:py-2.5 px-2 rounded-md hover:bg-muted/50 transition-colors"
                onClick={handleNavigation}
              >
                Research
              </Link>
              <button
                className="nav-mono font-sans text-base sm:text-[17px] px-3 py-2 sm:py-2.5 rounded-md transition-colors duration-200 bg-[hsl(var(--muted-hover))] hover:text-foreground text-left block mt-2"
                onClick={handleJoinAccess}
              >
                Join
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}; 