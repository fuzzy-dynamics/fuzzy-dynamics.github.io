import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, CableCar } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export const TopBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

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
          <Link to="/" className="flex items-center space-x-2">
            <CableCar className="w-8 h-8 text-foreground" />
            <span className="text-xl font-semibold text-foreground">Theatre</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/blog" className="nav-link font-sans text-base">Blog</Link>
            <Link to="/pricing" className="nav-link font-sans text-base">Pricing</Link>
            <Link to="/enterprise" className="nav-link font-sans text-base">Enterprise</Link>
            <button className="nav-mono font-sans text-base px-3 py-2 rounded-md transition-colors duration-200 bg-[hsl(var(--muted-hover))] hover:text-foreground">
              Sign In
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
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                to="/pricing" 
                className="nav-link font-sans text-base block py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link 
                to="/enterprise" 
                className="nav-link font-sans text-base block py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Enterprise
              </Link>
              <button 
                className="nav-mono font-sans text-base px-3 py-2 rounded-md transition-colors duration-200 bg-[hsl(var(--muted-hover))] hover:text-foreground text-left block"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 