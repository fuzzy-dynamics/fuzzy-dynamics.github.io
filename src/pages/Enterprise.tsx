import { FooterSection } from '@/components/FooterSection';
import { TopBar } from '@/components/TopBar';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { Shield, Users, Zap, Lock, HeadphonesIcon, Globe, BarChart3, Settings } from 'lucide-react';

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

  const enterpriseFeatures = [
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "SOC 2 Type II compliance, end-to-end encryption, and advanced access controls to protect your most sensitive research and engineering data."
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Advanced user management, role-based permissions, and collaborative workspaces designed for large engineering and research teams."
    },
    {
      icon: Zap,
      title: "Dedicated Resources",
      description: "Priority compute allocation, guaranteed uptime SLA, and dedicated infrastructure for mission-critical discovery workflows."
    },
    {
      icon: Lock,
      title: "Data Sovereignty", 
      description: "On-premises deployment options, data residency controls, and complete audit trails for regulatory compliance requirements."
    },
    {
      icon: HeadphonesIcon,
      title: "Premium Support",
      description: "24/7 dedicated support team, custom onboarding, training sessions, and direct access to our engineering team."
    },
    {
      icon: Globe,
      title: "Custom Integrations",
      description: "Seamless integration with your existing tools, APIs, and workflows. Custom connectors for enterprise systems and databases."
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Comprehensive usage analytics, team performance insights, and detailed reporting for organizational oversight."
    },
    {
      icon: Settings,
      title: "Custom Configuration",
      description: "Tailored AI models, custom deployment configurations, and specialized workflows for your unique use cases."
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
                ENTERPRISE / SECURE AI COLLABORATION
              </div>
              <h1 className="text-4xl font-bold mb-4 text-primary text-left">Enterprise AI Platform</h1>
              <p className="text-lg text-muted-foreground text-left max-w-3xl">
                Scale your organization's discovery and engineering capabilities with enterprise-grade AI collaboration tools. 
                Built for security, compliance, and seamless integration with your existing workflows.
              </p>
              
              <div className="flex flex-col gap-3 sm:gap-4 justify-start items-start mt-6">
                <button 
                  className="group inline-flex items-center gap-2 text-lg sm:text-xl font-semibold text-foreground hover:text-primary transition-colors duration-300 cursor-pointer bg-transparent border-none p-0"
                  onClick={handleJoinAccess}
                >
                  <span className="border-b-2 border-foreground group-hover:border-primary transition-colors duration-300">
                    Request Enterprise Demo
                  </span>
                  <span className="text-xl group-hover:translate-x-1 transition-transform duration-300">→</span>
                </button>
              </div>
            </div>

            {/* Trust Section - Alpha Community Members */}
            <div className="mb-16 py-8">
              <div className="max-w-7xl mx-auto text-center">
                <div className="tech-mono mb-4 sm:mb-6 text-sm text-muted-foreground">
                  {/* Mobile version - two lines */}
                  <div className="block sm:hidden">
                    <div>ALPHA COMMUNITY MEMBERS FROM</div>
                  </div>
                  {/* Desktop version - single line */}
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
                          // Fallback to company name if logo fails to load
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

            {/* Commented out old trust section
            <div className="mb-16 py-8 border-t border-b border-border">
              <div className="tech-mono text-sm text-muted-foreground mb-6 text-center">
                TRUSTED BY LEADING ORGANIZATIONS
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                {trustedCompanies.map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-primary mb-1">{item.count}</div>
                    <div className="text-sm text-muted-foreground">{item.name}</div>
                  </div>
                ))}
              </div>
            </div>
            */}

            {/* Features Grid */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-4 text-foreground text-left">Enterprise Features</h2>
              <p className="text-lg text-muted-foreground text-left mb-12">
                Everything you need to deploy AI-powered discovery at organizational scale.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {enterpriseFeatures.map((feature, index) => (
                  <div key={index} className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <feature.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Enterprise Benefits */}
            <div className="mb-16 bg-muted rounded-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-4 text-foreground text-left">Why Enterprise Teams Choose Theatre</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
                  <div className="font-semibold mb-1">Uptime SLA</div>
                  <div className="text-sm text-muted-foreground">Guaranteed availability for mission-critical workflows</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">10x</div>
                  <div className="font-semibold mb-1">Faster Discovery</div>
                  <div className="text-sm text-muted-foreground">Accelerate research and development cycles</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                  <div className="font-semibold mb-1">Expert Support</div>
                  <div className="text-sm text-muted-foreground">Dedicated technical support when you need it</div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-4 text-foreground">Ready to Transform Your Organization?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join leading enterprises using Theatre to accelerate discovery and engineering excellence. 
                Get a personalized demo and see how we can transform your workflows.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button 
                  className="group inline-flex items-center gap-2 text-lg font-semibold text-foreground hover:text-primary transition-colors duration-300 cursor-pointer bg-transparent border-none p-0"
                  onClick={handleJoinAccess}
                >
                  <span className="border-b-2 border-foreground group-hover:border-primary transition-colors duration-300">
                    Schedule Demo
                  </span>
                  <span className="text-xl group-hover:translate-x-1 transition-transform duration-300">→</span>
                </button>
                
                <span className="text-muted-foreground hidden sm:block">or</span>
                
                <a 
                  href="mailto:enterprise@theatre.ai" 
                  className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  enterprise@theatre.ai
                </a>
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