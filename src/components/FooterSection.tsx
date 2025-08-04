import { Github, Mail, ExternalLink } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export const FooterSection = () => {
  const { theme, setTheme } = useTheme();
  
  const getIndicatorPosition = () => {
    switch (theme) {
      case 'system': return 'translateX(0%)';
      case 'light': return 'translateX(100%)';
      case 'dark': return 'translateX(200%)';
      default: return 'translateX(0%)';
    }
  };
  
  return (
    <footer className="bg-background">
      <div className="container mx-auto px-8 sm:px-16 pb-10 sm:pb-14">
        <div className="max-w-7xl mx-auto pt-4 border-t border-muted-foreground/20">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end space-y-8 sm:space-y-0">
            {/* Brand */}
            <div className="space-y-3 sm:space-y-4 text-center sm:text-left">
              <h3 className="text-xl sm:text-2xl font-bold">Theatre</h3>
              <p className="text-muted-foreground">
                AI for Discovery & Engineering
              </p>
            </div>

            {/* Privacy, Terms & Research Links */}
            <div className="flex flex-col items-center sm:items-end gap-2">
              <a href="/research" className="text-sm text-muted-foreground hover:text-foreground hover:underline inline-flex items-center gap-1">
                Research
                <ExternalLink size={14} />
              </a>
              <a href="/privacy" className="text-sm text-muted-foreground hover:text-foreground hover:underline inline-flex items-center gap-1">
                Privacy and Security
                <ExternalLink size={14} />
              </a>
              <a href="/terms" className="text-sm text-muted-foreground hover:text-foreground hover:underline inline-flex items-center gap-1">
                Terms of Service
                <ExternalLink size={14} />
              </a>
            </div>
          </div>

          <div className="mt-4 pt-4 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
            <div className="flex items-center justify-center sm:justify-start gap-4 mb-4 sm:mb-0">
              <a 
                href="https://github.com/fuzzy-dynamics" 
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a 
                href="mailto:team@fydy.ai" 
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
              
              {/* Theme Selector */}
              <div 
                aria-label="toggle site theme" 
                role="radiogroup" 
                className="bg-muted/50 group relative flex overflow-visible opacity-100 h-7 transition-opacity duration-200 rounded-full border border-border"
              >
                <div aria-hidden className="absolute inset-0 h-full w-full border border-border rounded-full" />
                <div 
                  aria-hidden 
                  className="indicator group-focus-within:outline-primary border-border absolute inset-0 z-10 h-full w-7 border transition-transform duration-150 group-focus-within:outline-2 group-focus-within:outline-offset-2 rounded-full bg-background shadow-sm" 
                  style={{ transform: getIndicatorPosition() }}
                />
                
                {/* System Theme */}
                <label className="label z-10 flex aspect-square w-7 translate-z-0 cursor-pointer items-center justify-center rounded-full transition-colors duration-150">
                  <input 
                    className="sr-only" 
                    type="radio" 
                    name="theme" 
                    value="system"
                    checked={theme === 'system'}
                    onChange={() => setTheme('system')}
                  />
                  <div className="theme-icon-system" />
                </label>
                
                {/* Light Theme */}
                <label className="label z-10 flex aspect-square w-7 translate-z-0 cursor-pointer items-center justify-center rounded-full transition-colors duration-150">
                  <input 
                    className="sr-only" 
                    type="radio" 
                    name="theme" 
                    value="light"
                    checked={theme === 'light'}
                    onChange={() => setTheme('light')}
                  />
                  <div className="theme-icon-light" />
                </label>
                
                {/* Dark Theme */}
                <label className="label z-10 flex aspect-square w-7 translate-z-0 cursor-pointer items-center justify-center rounded-full transition-colors duration-150">
                  <input 
                    className="sr-only" 
                    type="radio" 
                    name="theme" 
                    value="dark"
                    checked={theme === 'dark'}
                    onChange={() => setTheme('dark')}
                  />
                  <div className="theme-icon-dark" />
                </label>
              </div>
            </div>
            <div className="text-center sm:text-right">
              © 2025 FYDY. Powered by Biryani.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};