import { HeroSection } from '@/components/HeroSection';
import { MemorySection } from '@/components/MemorySection';
import { AgentArchitectureSection } from '@/components/AgentArchitectureSection';
import { HypothesisEvolutionSection } from '@/components/HypothesisEvolutionSection';
import { SymbolicReasoningSection } from '@/components/SymbolicReasoningSection';
import { PreorderSection } from '@/components/PreorderSection';
import { InteractiveStory } from '@/components/InteractiveStory';
import { FooterSection } from '@/components/FooterSection';
import { TopBar } from '@/components/TopBar';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <HeroSection />
      
      {/* Grid Layout for Feature Sections */}
      <div className="container mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-4 sm:py-6 md:py-8">
        <div className="max-w-7xl mx-auto border border-border relative">
          {/* Continuous vertical middle line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2 z-10"></div>
          
          <div className="grid grid-rows-4">
            <div className="border-b border-border">
              <MemorySection />
            </div>
            <div className="border-b border-border">
              <AgentArchitectureSection />
            </div>
            <div className="border-b border-border">
              <HypothesisEvolutionSection />
            </div>
            <div>
              <SymbolicReasoningSection />
            </div>
          </div>
        </div>
      </div>
      
      <PreorderSection />
      <FooterSection showTopBorder={false} />
    </div>
  );
};

export default Index;
