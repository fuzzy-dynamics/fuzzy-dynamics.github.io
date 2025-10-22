import { FooterSection } from '@/components/FooterSection';
import { TopBar } from '@/components/TopBar';
import { useMarkdownContent } from '@/hooks/useMarkdownContent';
import ReactMarkdown from 'react-markdown';

const Privacy = () => {
  // Load markdown content seamlessly without intermediate loading states
  const markdownContent = useMarkdownContent('/blogs/privacy.md');

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TopBar />
      
      {/* Content Section - matches standard page pattern */}
      <div className="flex-grow">
        <div className="pt-24 pb-16">
          <div className="container mx-auto px-8 sm:px-16">
            {/* Privacy Header - Full Width */}
            <div className="max-w-4xl mb-12">
              <div className="tech-mono mb-3 sm:mb-4 text-sm sm:text-sm">
                LEGAL / PRIVACY & SECURITY
              </div>
              <h1 className="text-4xl font-bold mb-4 text-primary text-left">
                Privacy & Security
              </h1>
              <div className="text-sm text-muted-foreground">
                Last updated: October 2025
              </div>
            </div>

            {/* Privacy Content - Constrained Width */}
            <article className="max-w-3xl mx-auto">
              <div className="space-y-8">
                <ReactMarkdown
                  components={{
                    h1: ({children}) => <h1 className="text-3xl font-bold mb-6 text-foreground">{children}</h1>,
                    h2: ({children}) => <h2 className="text-2xl font-semibold mb-4 text-foreground mt-8">{children}</h2>,
                    h3: ({children}) => <h3 className="text-lg font-medium mb-3 text-foreground mt-6">{children}</h3>,
                    p: ({children}) => <p className="text-lg text-foreground leading-relaxed mb-4">{children}</p>,
                    ul: ({children}) => <ul className="list-disc list-outside pl-6 space-y-2 mb-4 ml-4 marker:text-primary">{children}</ul>,
                    li: ({children}) => <li className="text-lg text-foreground leading-relaxed">{children}</li>,
                    strong: ({children}) => <strong className="font-semibold text-foreground">{children}</strong>,
                    code: ({children}) => <code className="bg-muted px-2 py-1 rounded text-sm font-mono">{children}</code>,
                    a: ({href, children}) => <a href={href} className="text-primary hover:underline">{children}</a>,
                  }}
                >
                  {markdownContent}
                </ReactMarkdown>
              </div>
            </article>
          </div>
        </div>
      </div>
      
      <FooterSection />
    </div>
  );
};

export default Privacy;