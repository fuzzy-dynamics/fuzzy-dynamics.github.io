import { Github, Mail, ExternalLink, Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export const FooterSection = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
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
                AI for Discovery & Experimenting
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
              {/* <a href="/terms" className="text-sm text-muted-foreground hover:text-foreground hover:underline inline-flex items-center gap-1">
                Terms of Service
                <ExternalLink size={14} />
              </a> */}
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

              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="p-1 rounded-md bg-muted/50 border border-border hover:bg-muted transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
            <div className="text-center sm:text-right">
              © 2025 FYDY Inc.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};