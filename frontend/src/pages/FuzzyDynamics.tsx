import { Link } from "react-router-dom";
import octopiLogo from "@/assets/octopi.svg";
import { Seo } from "@/components/Seo";

const FuzzyDynamics = () => {
  return (
    <div className="min-h-screen bg-white text-foreground">
      <Seo
        title="Fuzzy Dynamics (FYDY)"
        description="Fuzzy Dynamics is an AI research lab working on machine cognition. Home of OpenScientist, an AI research studio now in private beta."
        path="/"
      />
      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-3 sm:py-4">
          <Link to="/" className="flex items-center gap-3 w-fit">
            <img
              src="/logo.svg"
              alt="Fuzzy Dynamics Logo"
              className="w-4 h-4 sm:w-[18px] sm:h-[18px]"
            />
            <span className="text-sm sm:text-base font-normal tracking-[-0.01em] whitespace-nowrap">
              Fuzzy Dynamics
            </span>
          </Link>
        </div>
      </div>

      {/* Content */}
      <main className="pt-28 sm:pt-32 md:pt-40 pb-24 px-4 sm:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Launch Banner */}
          <div className="flex justify-center">
            <Link
              to="/openscientist"
              className="inline-flex items-center gap-3 rounded-full bg-muted/40 hover:bg-muted transition-colors pl-2 pr-5 py-2"
            >
              <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium tracking-wide">
                NEW
              </span>
              <span className="text-sm sm:text-base flex items-center gap-2">
                We have launched
                <span className="inline-flex items-center gap-0">
                  <img
                    src={octopiLogo}
                    alt="OpenScientist"
                    className="w-5 h-5 sm:w-6 sm:h-6"
                  />
                  <span className="font-serif">OpenScientist</span>
                </span>
              </span>
            </Link>
          </div>

          {/* Big Title */}
          <h1 className="mt-10 sm:mt-14 text-center text-muted-foreground/50 font-thin uppercase leading-[1.05] tracking-[-0.01em] text-[14vw] sm:text-[10vw] md:text-[7vw] lg:text-[80px]">
            <span className="block">Machine</span>
            <span className="block">Cognition</span>
          </h1>

          {/* Body */}
          <div className="mt-16 sm:mt-20 font-serif text-base sm:text-lg leading-relaxed text-foreground space-y-6">
            <p>
              Fuzzy Dynamics is an AI research lab currently in stealth. We are
              making machines that{" "}
              <strong>continually and efficiently learn from experience</strong>
              . This is the paradigm shift we need for superintelligence.
            </p>

            <p>
              We believe that safe ASI is the most important technical problem
              of our time. It must understand and act on the real world
              autonomously. It must be cooperative enough to preserve human
              freedom or agency. Every leap in human history can be tied to
              the scaling and democratization of a technology. But this one
              will be the largest shift in how we organize, create, and
              distribute value since agriculture.
            </p>

            <p>
              LLMs and the era of scaling human data have been remarkable, but
              they are not sufficient. Human data is finite and retrospective.
              Language is a "thin slice of reality". There's no continual
              learning, no efficient world models, and no principled way to
              steer agents in open worlds.
            </p>

            <p>
              Our founding team includes ICPC World Finalists and Physics and
              Astronomy Olympiad alumni. We work with leading researchers across
              reinforcement learning, world models, robotics, and neuroscience.
              These are the fields we believe converge into machine cognition.
            </p>
          </div>

          {/* Section — Updates */}
          <div className="mt-10 sm:mt-12">
            <h2 className="text-2xl sm:text-3xl font-medium">Updates</h2>

            <div className="mt-4 font-serif text-base sm:text-lg leading-relaxed text-foreground space-y-6">
              {/*
              <p>
                Our work is organized around three commitments. <strong>Experience</strong>:
                learning good representations and rewards continually from streams of interaction,
                not from static corpora. <strong>Efficiency</strong>: planning and reasoning in
                latent space with persistent memory, without ignoring the hardware lottery.{" "}
                <strong>Actively</strong>: building actors, not passive agents — systems that
                evaluate their own internal states, generate rewards for learning, and do new
                causal discovery rather than only observing.
              </p>
              */}

              <p>
                <Link
                  to="/openscientist"
                  className="underline decoration-muted-foreground/40 underline-offset-4 hover:decoration-foreground"
                >
                  <span className="font-serif">OpenScientist</span>
                </Link>
                , our AI Research Studio, is now in private beta. We built it to
                run our own research. Now it is quite integral to how we study,
                plan, and run experiments. We are rolling it out to a small
                group of labs and researchers who we believe will push it the
                furthest.
              </p>
              <p>
                If you are a researcher, lab, or team working on hard problems
                and want early access to what we are building, we would like to
                hear from you at{" "}
                <a
                  href="mailto:team@fydy.ai"
                  className="underline decoration-muted-foreground/40 underline-offset-4 hover:decoration-foreground"
                >
                  team@fydy.ai
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="container mx-auto px-4 sm:px-8 py-8 max-w-3xl">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <div>© 2026 Fuzzy Dynamics</div>
            <a
              href="mailto:team@fydy.ai"
              className="hover:text-foreground transition-colors"
            >
              team@fydy.ai
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FuzzyDynamics;
