import { FooterSection } from '@/components/FooterSection';
import { TopBar } from '@/components/TopBar';
import { Search, FileText, Code, Eye, Zap, Shield, Users, Settings, Network, Workflow } from 'lucide-react';
import { useState } from 'react';

const Enterprise = () => {
  const [activeTab, setActiveTab] = useState(0);

  const TheaterWorkflow = [
    {
      icon: Search,
      title: "Explore",
      description: "Continuous discovery and experimentation. Hypothesis generation, knowledge graphs, and active memory that surfaces insights across your work."
    },
    {
      icon: Code,
      title: "Build",
      description: "Spec-driven development with agent hooks. Specifications as source of truth, live review as code evolves, context that never rots."
    },
    {
      icon: Eye,
      title: "Review",
      description: "Universal review beyond code. Spatial navigation, graph visualization, DITO version control for reasoning chains and changes."
    },
    {
      icon: FileText,
      title: "Plan",
      description: "Orchestration across your stack. Context flows from discovery to tickets, unified view across Linear, GitHub, Jira."
    },
    {
      icon: Zap,
      title: "Automate",
      description: "Semi-autonomous workflows with human oversight. Reliable automation that preserves agency while AI amplifies capability."
    }
  ];

  const keyDifferentiators = [
    {
      icon: Network,
      title: "Global Context & Continual Learning",
      description: "Persistent knowledge graphs and active memory that compounds over time. Context never lost when people leave.",
      bullets: [
        "Graph RAG and semantic indexing across all work",
        "Active memory that surfaces connections and insights",
        "Density over volume: memory that thinks, not stores"
      ],
      quote: "Prevent context rot at scale"
    },
    {
      icon: Search,
      title: "Hypothesis to Execution",
      description: "From vague intuition to validated findings. Evolutionary hypothesis generation with sandboxed experimentation.",
      bullets: [
        "Multi-agent debates and tournament-style ranking",
        "Computational discovery and verification loops",
        "Memory that learns from experiments"
      ],
      quote: "AI co-scientist, not just search"
    },
    {
      icon: FileText,
      title: "Spec as Source of Truth",
      description: "Specifications are testable, composable, executable artifacts. Code is compilation output, not source.",
      bullets: [
        "Intent conflict finder, ambiguity highlighters",
        "Agent hooks for background automations",
        "Specification Server Protocol for co-thinking"
      ],
      quote: "Intent → spec → code → validation"
    },
    {
      icon: Eye,
      title: "Universal Review with DITO",
      description: "Spatial visualization and version control for everything: code, research, specs, reasoning chains.",
      bullets: [
        "Graph navigation of dependencies and changes",
        "DITO: version control for memory and compute",
        "Review beyond code: hypotheses, plans, reasoning"
      ],
      quote: "Agency as AI accelerates production"
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
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      <TopBar />

      {/* Background gradient effects */}
      <div className="fixed inset-0 pointer-events-none opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      </div>

      {/* Content Section - flex-grow to push footer down */}
      <div className="flex-grow relative z-10">
        <div className="pt-32 pb-24">
          <div className="container mx-auto px-8 sm:px-16">
            {/* Hero Section */}
            <div className="mb-32 text-center max-w-6xl mx-auto">
              <div className="tech-mono mb-6 sm:mb-8 text-sm tracking-wider opacity-80">
                THEATER FOR ENTERPRISE
              </div>
              <h1 className="text-5xl sm:text-5xl md:text-5xl font-bold mb-8 text-primary leading-none">
                Cognition of your<br />Company
              </h1>
              <p className="text-xl sm:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-12">
                As AI writes more code and produces more research, the bottleneck shifts. Capture your entire
                company in a space where humans preserve control while AI amplifies capability.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <a
                  href="mailto:team@fydy.ai"
                  className="group inline-flex items-center gap-3 text-xl font-semibold text-foreground hover:text-primary transition-all duration-300 cursor-pointer bg-transparent border-none p-0"
                >
                  <span className="border-b-2 border-foreground group-hover:border-primary transition-colors duration-300">
                    Talk to Our Team
                  </span>
                  <span className="text-2xl group-hover:translate-x-2 transition-transform duration-300">→</span>
                </a>
              </div>
            </div>

            {/* Real-World Impact */}
            <div className="mb-32">
              <div className="text-center mb-8">
                <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-foreground">Why Teams Choose Theater</h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Addressing fundamental bottlenecks that slow down engineering teams as they scale.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3">
                {realWorldBenefits.map((benefit, index) => (
                  <div key={index} className={`text-center p-12 ${index !== realWorldBenefits.length - 1 ? 'md:border-r border-border' : ''}`}>
                    <div className="text-5xl sm:text-6xl font-bold text-primary mb-4">{benefit.stat}</div>
                    <div className="font-bold mb-3 text-foreground text-lg">{benefit.label}</div>
                    <div className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Differentiators */}
            <div className="mb-32 max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-foreground">What Makes Theater Different</h2>
                <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                  Built for teams addressing the real challenges of discovery and engineering at scale.
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-8">
                {/* Tab Buttons */}
                <div className="md:w-1/3 space-y-2 md:pr-8 md:border-r border-border">
                  {keyDifferentiators.map((differentiator, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTab(index)}
                      className={`w-full text-left px-6 py-4 rounded-lg transition-all duration-300 ${
                        activeTab === index
                          ? 'text-foreground bg-muted/30'
                          : 'text-muted-foreground hover:bg-muted/50'
                      }`}
                    >
                      {differentiator.title}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="md:w-2/3 space-y-4 md:pl-8">
                  <h3 className="text-3xl font-bold text-foreground">{keyDifferentiators[activeTab].title}</h3>
                  <div className="text-base font-medium text-primary italic border-l-2 border-primary pl-4 py-1">
                    "{keyDifferentiators[activeTab].quote}"
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed">{keyDifferentiators[activeTab].description}</p>
                  <ul className="space-y-2 ml-6">
                    {keyDifferentiators[activeTab].bullets.map((bullet, i) => (
                      <li key={i} className="text-base text-muted-foreground flex items-start gap-3">
                        <span className="text-primary mt-1">•</span>
                        <span className="leading-relaxed">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Paradigm Shift Section */}
            <div className="mb-32">
              <div className="text-center mb-16">
                <div className="tech-mono mb-4 text-sm text-muted-foreground tracking-wider">
                  THE PARADIGM SHIFT
                </div>
                <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
                  Three Fundamental Changes
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="group bg-card/50 backdrop-blur border border-border/50 rounded-2xl p-10 hover:shadow-2xl hover:border-primary/50 transition-all duration-500 hover:-translate-y-2">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                    <Search className="w-9 h-9 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-foreground">Continuous Discovery</h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    Theater maintains full context of your space and proactively surfaces relevant insights from your company corpus, citing sources as you work.
                  </p>
                </div>

                <div className="group bg-card/50 backdrop-blur border border-border/50 rounded-2xl p-10 hover:shadow-2xl hover:border-primary/50 transition-all duration-500 hover:-translate-y-2">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                    <FileText className="w-9 h-9 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-foreground">Spec Management</h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    Maintain separate projects that sync with each other to power your spec-driven development workflow.
                  </p>
                </div>

                <div className="group bg-card/50 backdrop-blur border border-border/50 rounded-2xl p-10 hover:shadow-2xl hover:border-primary/50 transition-all duration-500 hover:-translate-y-2">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                    <Eye className="w-9 h-9 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-foreground">Universal Review</h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    A unique system that helps you review any changes made by your coworkers or their agents, preserving oversight and control as AI accelerates production.
                  </p>
                </div>
              </div>
            </div>

            {/* Theater's Complete Workflow */}
            {/* <div className="mb-32">
              <div className="text-center mb-16">
                <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-foreground">
                  The Complete Platform
                </h2>
                <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                  Explore, Build, Review, Plan, and Automate in one unified flow. Powered by <span className="text-foreground font-semibold">Chord infrastructure</span> for memory and continuity across all modes.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {TheaterWorkflow.map((stage, index) => (
                  <div key={index} className="group bg-card/50 backdrop-blur border border-border/50 rounded-xl p-8 hover:shadow-xl hover:border-primary/30 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-primary/15 to-primary/5 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                        <stage.icon className="w-7 h-7 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-3 text-foreground">{stage.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{stage.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-muted/80 to-muted/40 rounded-2xl p-8 border border-border/50">
                <p className="text-muted-foreground text-lg leading-relaxed">
                  <strong className="text-foreground">Why this matters:</strong> Most tools fragment the workflow. Theater unifies discovery, planning, building, and review with global context that compounds over time.
                </p>
              </div>
            </div> */}

            {/* Enterprise-Grade Infrastructure */}
            <div className="mb-32">
              <div className="text-center mb-16">
                <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-foreground">Enterprise-Grade Infrastructure</h2>
                <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                  Security, scale, and integration built from the ground up.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="group bg-card/50 backdrop-blur border border-border/50 rounded-xl p-8 hover:shadow-xl hover:border-primary/30 transition-all duration-300">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary/15 to-primary/5 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Shield className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-bold mb-3 text-foreground text-lg">Security & Privacy</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Privacy Mode, SOC 2 Type II (in progress), zero data retention with AI providers, regional hosting
                  </p>
                </div>

                <div className="group bg-card/50 backdrop-blur border border-border/50 rounded-xl p-8 hover:shadow-xl hover:border-primary/30 transition-all duration-300">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary/15 to-primary/5 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Settings className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-bold mb-3 text-foreground text-lg">Deployment Options</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Cloud, VPC, and on-premise installations for maximum data sovereignty and control
                  </p>
                </div>

                <div className="group bg-card/50 backdrop-blur border border-border/50 rounded-xl p-8 hover:shadow-xl hover:border-primary/30 transition-all duration-300">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary/15 to-primary/5 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Workflow className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-bold mb-3 text-foreground text-lg">Deep Integration</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    GitHub, GitLab, Linear, Jira, Notion, Slack. Context flows across your entire stack
                  </p>
                </div>

                <div className="group bg-card/50 backdrop-blur border border-border/50 rounded-xl p-8 hover:shadow-xl hover:border-primary/30 transition-all duration-300">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary/15 to-primary/5 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-bold mb-3 text-foreground text-lg">Team Controls</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Privacy enforcement, audit trails, SSO, admin controls for enterprise governance
                  </p>
                </div>
              </div>
            </div>

            {/* What We're Not */}
            <div className="mb-20 bg-card/30 backdrop-blur border border-border/50 rounded-2xl p-10 md:p-12">
              <h3 className="text-3xl font-bold mb-8 text-foreground text-center">What Theater Isn't</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-muted-foreground max-w-5xl mx-auto">
                <div className="flex gap-3">
                  <span className="text-primary text-xl flex-shrink-0">•</span>
                  <div>
                    <strong className="text-foreground text-lg">Not just another AI code editor.</strong> We're rethinking the entire workflow from discovery to deployment.
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-primary text-xl flex-shrink-0">•</span>
                  <div>
                    <strong className="text-foreground text-lg">Not replacing human judgment.</strong> Theater amplifies capabilities while preserving agency and accountability.
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-primary text-xl flex-shrink-0">•</span>
                  <div>
                    <strong className="text-foreground text-lg">Not a fully-featured enterprise platform yet.</strong> We're in alpha, building with select teams to get this right.
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-primary text-xl flex-shrink-0">•</span>
                  <div>
                    <strong className="text-foreground text-lg">Not overpromising capabilities.</strong> We're solving real problems, not chasing AI hype.
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center max-w-5xl mx-auto mb-16">
              <h2 className="text-5xl sm:text-6xl font-bold mb-8 text-foreground leading-tight">
                Ready to Rethink<br />Discovery & Experimentation?
              </h2>
              <p className="text-xl sm:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-4xl mx-auto">
                We're working closely with select engineering teams in alpha. Let's discuss your needs, deployment requirements, and how Theater fits your workflow.
              </p>

              <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-16">
                <a
                  href="mailto:team@fydy.ai"
                  className="group inline-flex items-center gap-3 text-2xl font-bold text-foreground hover:text-primary transition-all duration-300 cursor-pointer bg-transparent border-none p-0"
                >
                  <span className="border-b-2 border-foreground group-hover:border-primary transition-colors duration-300">
                    Schedule a Conversation
                  </span>
                  <span className="text-2xl group-hover:translate-x-2 transition-transform duration-300">→</span>
                </a>

                <span className="text-muted-foreground hidden sm:block text-xl">or</span>

                <a
                  href="mailto:team@fydy.ai"
                  className="text-xl text-muted-foreground hover:text-foreground transition-colors duration-300 font-medium"
                >
                  team@fydy.ai
                </a>
              </div>

              <div className="p-8 bg-gradient-to-r from-muted/80 to-muted/40 rounded-2xl border border-border/50">
                <p className="text-muted-foreground leading-relaxed text-lg">
                  <strong className="text-foreground">Alpha Program:</strong> We're building Theater with early enterprise partners who understand where discovery and engineering are headed. Current focus areas include ML research teams, platform engineering, and organizations shipping AI-assisted code to production.
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