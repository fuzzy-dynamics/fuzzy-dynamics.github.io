import { FooterSection } from '@/components/FooterSection';
import { TopBar } from '@/components/TopBar';
import { useNavigate } from 'react-router-dom';

const Pricing = () => {
  const navigate = useNavigate();

  const handleJoinAccess = () => {
    // Navigate to homepage first
    navigate('/');
    
    // Wait a bit for navigation to complete, then scroll to preorder section
    setTimeout(() => {
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
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TopBar />
      
      {/* Content Section - flex-grow to push footer down */}
      <div className="flex-grow">
        <div className="pt-24 pb-16">
          <div className="container mx-auto px-8 sm:px-16">
            <div className="mb-16">
              <div className="tech-mono mb-3 sm:mb-4 text-sm sm:text-sm">
                PRICING / PLANS & TIERS
              </div>
              <h1 className="text-4xl font-bold mb-4 text-primary text-left">Pricing</h1>
              <p className="text-lg text-muted-foreground text-left">Choose the plan that works best for you.</p>
              
              <div className="flex flex-col gap-3 sm:gap-4 justify-start items-start mt-6">
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

            {/* Pricing Plans */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Free Plan */}
              <div className="relative bg-card border-2 border-border rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2 text-foreground">Free</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-foreground">$0</span>
                    <span className="text-muted-foreground">/mon/user</span>
                  </div>
                  <p className="text-muted-foreground mb-8">Perfect for getting started.</p>
                  <button className="w-full py-3 px-6 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-300">
                    Get Started
                  </button>
                </div>
              </div>

              {/* Pro Plan */}
              <div className="relative bg-card border-2 border-border rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  {/* <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span> */}
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2 text-foreground">Pro</h3>
                  <div className="mb-6">
                    <span className="text-2xl font-semibold text-muted-foreground">Coming Soon</span>
                  </div>
                  <p className="text-muted-foreground mb-8">Advanced features for growing teams.</p>
                  <button className="w-full py-3 px-6 bg-muted text-muted-foreground rounded-lg font-semibold cursor-not-allowed">
                    Coming Soon
                  </button>
                </div>
              </div>

              {/* Max Plan */}
              <div className="relative bg-card border-2 border-border rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2 text-foreground">Max</h3>
                  <div className="mb-6">
                    <span className="text-2xl font-semibold text-muted-foreground">Coming Soon</span>
                  </div>
                  <p className="text-muted-foreground mb-8">Enterprise-grade capabilities.</p>
                  <button className="w-full py-3 px-6 bg-muted text-muted-foreground rounded-lg font-semibold cursor-not-allowed">
                    Coming Soon
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <FooterSection />
    </div>
  );
};

export default Pricing;