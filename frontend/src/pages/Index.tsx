import { HeroSection } from '@/components/HeroSection';
import { PreorderSection } from '@/components/PreorderSection';
import { InteractiveStory } from '@/components/InteractiveStory';
import { FooterSection } from '@/components/FooterSection';
import { TopBar } from '@/components/TopBar';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <HeroSection />
      <InteractiveStory />
      <PreorderSection />
      <FooterSection />
    </div>
  );
};

export default Index;
