import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, CableCar } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export const TopBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 bg-background transition-shadow duration-200 ${isScrolled ? 'shadow-sm' : ''}`}>
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2" onClick={handleNavigation}>
            <CableCar className="w-8 h-8 text-foreground" />
            <span className="text-xl font-semibold text-foreground">Theatre</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/blog" className="nav-link font-sans text-base" onClick={handleNavigation}>Blog</Link>
            <Link to="/pricing" className="nav-link font-sans text-base" onClick={handleNavigation}>Pricing</Link>
            <Link to="/enterprise" className="nav-link font-sans text-base" onClick={handleNavigation}>Enterprise</Link>
            <button 
              className="nav-mono font-sans text-base px-3 py-2 rounded-md transition-colors duration-200 bg-[hsl(var(--muted-hover))] hover:text-foreground"
              onClick={handleJoinAccess}
            >
              Join
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && isMobile && (
          <div className="md:hidden mt-4 pb-4 border-t border-border">
            <div className="flex flex-col space-y-2 pt-4">
              <Link 
                to="/blog" 
                className="nav-link font-sans text-base block py-2"
                onClick={handleNavigation}
              >
                Blog
              </Link>
              <Link 
                to="/pricing" 
                className="nav-link font-sans text-base block py-2"
                onClick={handleNavigation}
              >
                Pricing
              </Link>
              <Link 
                to="/enterprise" 
                className="nav-link font-sans text-base block py-2"
                onClick={handleNavigation}
              >
                Enterprise
              </Link>
              <button 
                className="nav-mono font-sans text-base px-3 py-2 rounded-md transition-colors duration-200 bg-[hsl(var(--muted-hover))] hover:text-foreground text-left block"
                onClick={handleJoinAccess}
              >
                Join
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 