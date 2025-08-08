import { useNavigate } from "react-router-dom";
import { FooterSection } from '@/components/FooterSection';
import { TopBar } from '@/components/TopBar';

const Research = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TopBar />
      
      {/* Hero Section - flex-grow to push footer down */}
      <div className="flex-grow flex flex-col">
        <div className="pt-24 pb-16 flex-grow flex items-center">
          <div className="container mx-auto px-8 sm:px-16 w-full">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-16 items-start">
              
              {/* Left Side - Research Content */}
              <div className="space-y-6 order-1">
                <div className="tech-mono mb-3 sm:mb-4 text-sm sm:text-sm">
                  RESEARCH / PUBLICATIONS
                </div>
                <h1 className="text-4xl font-bold mb-4 text-primary text-left">Research</h1>
                <p className="text-lg text-muted-foreground text-left max-w-3xl mb-8">
                  Publications from the team, coming soon.
                </p>
                
                <div className="flex flex-col gap-3 sm:gap-4 justify-start items-start">
                  <button 
                    className="group inline-flex items-center gap-2 text-lg sm:text-xl font-semibold text-foreground hover:text-primary transition-colors duration-300 cursor-pointer bg-transparent border-none p-0"
                    onClick={handleGoHome}
                  >
                    <span className="border-b-2 border-foreground group-hover:border-primary transition-colors duration-300">
                      Go back home
                    </span>
                    <span className="text-xl group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </button>
                </div>
              </div>

              {/* Right Side - Philosophical Quote */}
              <div className="order-2 mt-8 xl:mt-0">
                <blockquote className="nav-mono text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-foreground leading-relaxed text-right">
                  <br className="hidden xl:block"/><br className="hidden xl:block"/>"What is a symbol that<br /> you and I may know it,<br /><br />
                  what are we that symbols<br /> may be known to us, and<br /><br />
                  how may we arrange rocks so<br />they may know a symbol too?"
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <FooterSection />
    </div>
  );
};

export default Research;