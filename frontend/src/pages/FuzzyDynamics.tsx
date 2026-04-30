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
              src="/logo-color.svg"
              alt="Fuzzy Dynamics Logo"
              className="w-4 h-4 sm:w-[18px] sm:h-[18px]"
            />
            <span className="text-sm sm:text-base font-medium tracking-[0.025em] whitespace-nowrap text-foreground/70">
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
                <span className="inline-flex items-center gap-1.5 leading-none">
                  <img
                    src={octopiLogo}
                    alt="OpenScientist"
                    className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 translate-y-[1px] sm:translate-y-[2px]"
                  />
                  <span className="font-serif leading-none">OpenScientist</span>
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
              freedom or agency. Every leap in human history can be tied to the
              scaling and democratization of a technology. But this one will be
              the largest shift in how we organize, create and distribute value
              since agriculture.
            </p>

            <p>
              LLMs and the era of scaling human data have been remarkable, but
              they are not sufficient. Human data is finite and retrospective.
              Language is a "thin slice of reality". There's no continual
              learning, no efficient world models and no principled way to steer
              agents in open worlds.
            </p>

            <p>
              Our founding team includes ICPC World Finalists and Physics &
              Astronomy Olympiad alumni. We are working with leading researchers
              across reinforcement learning, world models, robotics and
              neuroscience. These are the fields we believe converge into
              machine cognition.
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
                evaluate their own internal states, generate rewards for learning and do new
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
                plan and run experiments. We are rolling it out to a small group
                of labs and researchers who we believe will push it the
                furthest.
              </p>
              <p>
                If you or your team are working on hard problems and want early
                access to what we are building, we would like to hear from you
                at{" "}
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

          {/* Section — Join us */}
          <div className="mt-10 sm:mt-12">
            <h2 className="text-2xl sm:text-3xl font-medium">Join us</h2>

            <p className="mt-4 font-serif text-base sm:text-lg leading-relaxed text-foreground">
              We are hiring across research, compute and engineering. We do not
              draw hard lines between these. Everyone joins as a member of
              technical staff and works across them as the problem requires. The
              roles below are useful starting points, not boxes. If none of them
              fit but you would still like to work with us, write to us anyway.
            </p>

            <div className="mt-8 sm:mt-10 border-t border-border">
              <details className="group border-b border-border">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none py-5 sm:py-6">
                  <span className="text-lg sm:text-xl font-medium">
                    Research Scientist
                  </span>
                  <span className="text-2xl leading-none text-muted-foreground transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="pb-6 sm:pb-8 font-serif text-base sm:text-lg leading-relaxed text-foreground space-y-4">
                  <p>
                    We are looking for researchers in machine learning,
                    robotics, physics, neuroscience or any field that bears on
                    building good representations of the world. You should be
                    comfortable framing your own problems, defending
                    unfashionable bets and measuring your work by what it
                    explains or enables.
                  </p>
                  <p>
                    If you have a track record of meaningful work or are earlier
                    in the arc with a research instinct close to ours, we would
                    love to hear from you. That goes for anyone in a lab, a PhD
                    program, on faculty, between things or self-taught.
                  </p>
                  <p>
                    <a
                      href="mailto:careers@fydy.ai?subject=Research%20Scientist"
                      className="underline decoration-muted-foreground/40 underline-offset-4 hover:decoration-foreground"
                    >
                      Apply →
                    </a>
                  </p>
                </div>
              </details>

              <details className="group border-b border-border">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none py-5 sm:py-6">
                  <span className="text-lg sm:text-xl font-medium">
                    AI Hardware
                  </span>
                  <span className="text-2xl leading-none text-muted-foreground transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="pb-6 sm:pb-8 font-serif text-base sm:text-lg leading-relaxed text-foreground space-y-4">
                  <p>
                    The substrate matters. Efficient learning at the scale we
                    want runs into hard limits on conventional digital silicon:
                    the von Neumann bottleneck, the cost of full-precision in
                    noise-tolerant learning, the cost of moving bits through a
                    chip, etc. We want to work with engineers and researchers
                    who are interested in these problems at the boundary of
                    compute and physics.
                  </p>
                  <p>
                    We care about first-principles taste, comfort with physics
                    and the willingness to learn whichever stack the problem
                    demands. If you have worked on all-photonic logic, analog
                    compute or in-memory primitives, we would love to hear from
                    you.
                  </p>
                  <p>
                    <a
                      href="mailto:careers@fydy.ai?subject=AI%20Hardware"
                      className="underline decoration-muted-foreground/40 underline-offset-4 hover:decoration-foreground"
                    >
                      Apply →
                    </a>
                  </p>
                </div>
              </details>

              <details className="group border-b border-border">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none py-5 sm:py-6">
                  <span className="text-lg sm:text-xl font-medium">
                    Software Engineering
                  </span>
                  <span className="text-2xl leading-none text-muted-foreground transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="pb-6 sm:pb-8 font-serif text-base sm:text-lg leading-relaxed text-foreground space-y-4">
                  <p>
                    If you want to work on{" "}
                    <Link
                      to="/openscientist"
                      className="underline decoration-muted-foreground/40 underline-offset-4 hover:decoration-foreground"
                    >
                      <span className="font-serif">OpenScientist</span>
                    </Link>{" "}
                    and help us build the largest infrastructure for open
                    research, we would love to hear from you.
                  </p>
                  <p>
                    We want engineers who can operate across the stack
                    (TypeScript, Python, Go and Rust). You should be strong on
                    data structures and algorithms, with serious experience and
                    good taste in shipping production software.
                  </p>
                  <p>
                    We over-index on people who can move fast without breaking
                    the downstream and have opinions about latency,
                    observability and the sharp edges of distributed systems.
                  </p>
                  <p>
                    <a
                      href="mailto:careers@fydy.ai?subject=Software%20Engineering"
                      className="underline decoration-muted-foreground/40 underline-offset-4 hover:decoration-foreground"
                    >
                      Apply →
                    </a>
                  </p>
                </div>
              </details>

              <details className="group border-b border-border">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none py-5 sm:py-6">
                  <span className="text-lg sm:text-xl font-medium">
                    AI Systems
                  </span>
                  <span className="text-2xl leading-none text-muted-foreground transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="pb-6 sm:pb-8 font-serif text-base sm:text-lg leading-relaxed text-foreground space-y-4">
                  <p>
                    This role sits between our research and the metal. You will
                    own training and inference infrastructure for our models and
                    agents: distributed orchestration, parallel training
                    strategies and runtimes that keep long-running agents alive.
                  </p>
                  <p>
                    Strong systems experience matters more than ML pedigree. If
                    you have run multi-node jobs without crying, written kernels
                    you are proud of or shipped a serving stack that survived
                    contact with users, we would love to hear from you.
                  </p>
                  <p>
                    <a
                      href="mailto:careers@fydy.ai?subject=AI%20Systems"
                      className="underline decoration-muted-foreground/40 underline-offset-4 hover:decoration-foreground"
                    >
                      Apply →
                    </a>
                  </p>
                </div>
              </details>
            </div>

            <p className="mt-8 sm:mt-10 font-serif text-base sm:text-lg leading-relaxed text-foreground">
              To apply, write to{" "}
              <a
                href="mailto:careers@fydy.ai"
                className="underline decoration-muted-foreground/40 underline-offset-4 hover:decoration-foreground"
              >
                careers@fydy.ai
              </a>{" "}
              with what you have built, what you want to work on and any links
              that show your taste.
            </p>
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
