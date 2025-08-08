import { FooterSection } from '@/components/FooterSection';
import { TopBar } from '@/components/TopBar';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { Search, FileText, Code, Eye, Zap, Shield, Users, Settings, Brain, Network, Workflow } from 'lucide-react';

interface CompanyLogo {
  name: string;
  logo: string;
  darkLogo?: string;
  alt: string;
  url: string;
  className?: string;
}

// Company logos for trust section
const companies: CompanyLogo[] = [
  {
    name: "Google",
    logo: "/logos/google-logo.svg",
    alt: "Google logo",
    url: "https://google.com"
  },
  {
    name: "Anthropic",
    logo: "/logos/anthropic-logo.svg",
    darkLogo: "/logos/anthropic-logo-dark.svg",
    alt: "Anthropic logo",
    url: "https://anthropic.com",
    className: "h-6 sm:h-8 md:h-10"
  },
  {
    name: "Salesforce",
    logo: "/logos/salesforce-logo.svg",
    alt: "Salesforce logo",
    url: "https://salesforce.com"
  },
  {
    name: "Microsoft", 
    logo: "/logos/microsoft-logo.svg",
    alt: "Microsoft logo",
    url: "https://microsoft.com"
  },
  {
    name: "Uber",
    logo: "/logos/uber-logo.svg",
    darkLogo: "/logos/uber-logo-dark.svg",
    alt: "Uber logo",
    url: "https://uber.com",
    className: "h-6 sm:h-6 md:h-8"
  }
];

const Enterprise = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const handleJoinAccess = () => {
    navigate('/');
    
    setTimeout(() => {
      const preorderSection = document.getElementById('preorder');
      if (preorderSection) {
        const topBar = document.querySelector('.fixed.top-0') as HTMLElement;
        const spacingBuffer = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
        const fallbackHeight = topBar ? topBar.offsetHeight : (spacingBuffer * 5);
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

  const theatreWorkflow = [
    {
      icon: Search,
      title: "Research",
      description: "Persistent knowledge graphs, specialized databases, and discovery artifacts that prevent context rot across your team."
    },
    {
      icon: FileText,
      title: "Plan", 
      description: "Structured communication and spec-driven development that scales beyond individual coding to entire project lifecycles."
    },
    {
      icon: Code,
      title: "Build",
      description: "Agentic coding with symbolic reasoning and context preservation. IDE++ that understands your entire system, not just files."
    },
    {
      icon: Eye,
      title: "Review",
      description: "Spatial navigation of codebases and changes. Visual understanding of complexity to keep humans meaningfully in the loop."
    },
    {
      icon: Zap,
      title: "Automate",
      description: "Semi-autonomous workflows with human oversight. Reliable automation that preserves human agency and accountability."
    }
  ];

  const enterpriseCapabilities = [
    {
      icon: Brain,
      title: "Beyond Coding Tools",
      description: "Theatre isn't just an IDE. It's a complete platform for how teams discover, plan, and build complex systems together.",
      details: "Research studios, knowledge graphs, spec-driven development, and visual collaboration tools."
    },
    {
      icon: Shield,
      title: "Privacy Mode & Security",
      description: "Enterprise-grade privacy controls with zero data retention policies. Your research and code stay yours.",
      details: "SOC 2 roadmap, on-premises options, privacy mode for all features, audit trails."
    },
    {
      icon: Network,
      title: "Context Preservation",
      description: "Prevent context rot as your projects scale. Persistent knowledge that grows with your team's understanding.",
      details: "Semantic indexing, relationship mapping, institutional knowledge retention."
    },
    {
      icon: Users,
      title: "Human-in-the-Loop",
      description: "AI amplifies human judgment rather than replacing it. Review and verify everything before complexity drowns your team.",
      details: "Visual code navigation, transparent AI decisions, human oversight at every automation step."
    }
  ];

  const realWorldBenefits = [
    {
      stat: "40%",
      label: "Less Time on Post-Code Issues",
      description: "Engineers spend less time debugging and fixing issues after code is written"
    },
    {
      stat: "Persistent",
      label: "Team Knowledge",
      description: "Discoveries and insights don't get lost when team members leave or projects evolve"
    },
    {
      stat: "Visual",
      label: "Complexity Navigation", 
      description: "Understand large codebases and changes through spatial and graphical interfaces"
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TopBar />
      
      {/* Content Section - flex-grow to push footer down */}
      <div className="flex-grow">
        <div className="pt-24 pb-16">
          <div className="container mx-auto px-8 sm:px-16">
            <div className="mb-16">
              <div className="tech-mono mb-3 sm:mb-4 text-sm sm:text-sm">
                ENTERPRISE / AI FOR DISCOVERY & ENGINEERING
              </div>
              <h1 className="text-4xl font-bold mb-4 text-primary text-left">
                Enterprise
              </h1>
              <p className="text-lg text-muted-foreground text-left max-w-3xl">
                Theatre transforms the entire development lifecycle, from discovery to production deployment. 
                We're building the platform for teams who want to preserve human control and prevent context rot while scaling AI assisted development.
              </p>
              
              <div className="flex flex-col gap-3 sm:gap-4 justify-start items-start mt-6">
                <button 
                  className="group inline-flex items-center gap-2 text-lg sm:text-xl font-semibold text-foreground hover:text-primary transition-colors duration-300 cursor-pointer bg-transparent border-none p-0"
                  onClick={handleJoinAccess}
                >
                  <span className="border-b-2 border-foreground group-hover:border-primary transition-colors duration-300">
                    Join Our Alpha
                  </span>
                  <span className="text-xl group-hover:translate-x-1 transition-transform duration-300">→</span>
                </button>
              </div>
            </div>

            {/* Trust Section - Alpha Community Members */}
            <div className="mb-16 py-8">
              <div className="max-w-7xl mx-auto text-center">
                <div className="tech-mono mb-4 sm:mb-6 text-sm text-muted-foreground">
                  <div className="block sm:hidden">
                    <div>ALPHA COMMUNITY MEMBERS FROM</div>
                  </div>
                  <div className="hidden sm:block">
                    ALPHA COMMUNITY MEMBERS FROM
                  </div>
                </div>
                
                <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 md:gap-16">
                  {companies.map((company, index) => (
                    <a 
                      key={index} 
                      href={company.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center hover:scale-105 transition-transform duration-300 cursor-pointer"
                    >
                      <img 
                        src={isDark && company.darkLogo ? company.darkLogo : company.logo}
                        alt={company.alt}
                        className={`w-auto object-contain transition-all duration-300 ${
                          company.className || "h-8 sm:h-10 md:h-12"
                        }`}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.parentElement!.innerHTML = `<span class="text-xl sm:text-2xl font-bold text-muted-foreground/80">${company.name}</span>`;
                        }}
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Theatre's Complete Workflow */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-4 text-foreground text-left">
                Research → Plan → Build → Review → Automate
              </h2>
              <p className="text-lg text-muted-foreground text-left mb-12">
                Theatre covers the entire development lifecycle, not just coding. Each stage keeps humans in control while AI amplifies capabilities.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {theatreWorkflow.map((stage, index) => (
                  <div key={index} className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <stage.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2 text-foreground">{stage.title}</h3>
                        <p className="text-sm text-muted-foreground">{stage.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-muted/50 rounded-lg p-6 border border-border">
                <p className="text-sm text-muted-foreground">
                  <strong>Why this matters:</strong> Most AI coding tools focus only on the "Build" phase. Theatre recognizes that great software emerges from the entire discovery and engineering process—from initial research to ongoing maintenance.
                </p>
              </div>
            </div>

            {/* Enterprise Capabilities */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-4 text-foreground text-left">Built for Enterprise Reality</h2>
              <p className="text-lg text-muted-foreground text-left mb-12">
                We're designing Theatre from the ground up to address the real challenges of building complex systems at scale.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {enterpriseCapabilities.map((capability, index) => (
                  <div key={index} className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <capability.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2 text-foreground">{capability.title}</h3>
                        <p className="text-muted-foreground mb-3">{capability.description}</p>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground bg-muted/50 rounded p-3">
                      {capability.details}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Real-World Impact */}
            <div className="mb-16 bg-muted rounded-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-4 text-foreground text-left">Why Teams Choose Theatre</h2>
              <p className="text-lg text-muted-foreground mb-8">
                We're addressing the fundamental challenges that slow down engineering teams as they scale.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {realWorldBenefits.map((benefit, index) => (
                  <div key={index}>
                    <div className="text-3xl font-bold text-primary mb-2">{benefit.stat}</div>
                    <div className="font-semibold mb-1">{benefit.label}</div>
                    <div className="text-sm text-muted-foreground">{benefit.description}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* What We're Not */}
            <div className="mb-16 border border-border rounded-lg p-8">
              <h3 className="text-xl font-semibold mb-4 text-foreground">What Theatre Isn't</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-muted-foreground">
                <div>
                  <strong className="text-foreground">Not just another AI code editor.</strong> We're rethinking the entire development workflow, from research to deployment.
                </div>
                <div>
                  <strong className="text-foreground">Not replacing human judgment.</strong> Theatre amplifies human capabilities while preserving human agency and accountability.
                </div>
                <div>
                  <strong className="text-foreground">Not a fully-featured enterprise platform yet.</strong> We're in alpha, building with early enterprise teams to get this right.
                </div>
                <div>
                  <strong className="text-foreground">Not overpromising on capabilities.</strong> We're focused on solving real problems, not chasing AI hype.
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-4 text-foreground">Ready to Rethink Development?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join our alpha program and help us build the future of AI-assisted engineering. 
                We're working closely with select enterprise teams to understand real-world needs.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button 
                  className="group inline-flex items-center gap-2 text-lg font-semibold text-foreground hover:text-primary transition-colors duration-300 cursor-pointer bg-transparent border-none p-0"
                  onClick={handleJoinAccess}
                >
                  <span className="border-b-2 border-foreground group-hover:border-primary transition-colors duration-300">
                    Join Alpha Program
                  </span>
                  <span className="text-xl group-hover:translate-x-1 transition-transform duration-300">→</span>
                </button>
                
                <span className="text-muted-foreground hidden sm:block">or</span>
                
                <a 
                  href="mailto:team@fydy.ai" 
                  className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  team@fydy.ai
                </a>
              </div>

              <div className="mt-8 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Alpha Access:</strong> We're currently working with a small number of enterprise teams. 
                  Join our waitlist to be notified when we expand access.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <FooterSection />
    </div>
  );
};

export default Enterprise;