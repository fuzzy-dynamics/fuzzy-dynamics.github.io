import { Github, Mail, ExternalLink } from "lucide-react";

interface FooterSectionProps {
  showTopBorder?: boolean;
}

export const FooterSection = ({ showTopBorder = true }: FooterSectionProps) => {

  return (
    <footer className="bg-background">
      <div className="container mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 pb-8 sm:pb-10 md:pb-14">
        <div className={`max-w-7xl mx-auto pt-8 ${showTopBorder ? 'border-t border-muted-foreground/20' : ''}`}>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end space-y-8 sm:space-y-0">
            {/* Brand */}
            <div className="space-y-3 sm:space-y-4 text-center sm:text-left">
              <h3 className="text-xl sm:text-2xl font-bold">Theater</h3>
              <p className="text-muted-foreground">
                AI for Discovery & Experimentation
                {/* <br/>by FYDY */}
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
            </div>
            <div className="text-center sm:text-right">
              © 2025 FYDY
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};