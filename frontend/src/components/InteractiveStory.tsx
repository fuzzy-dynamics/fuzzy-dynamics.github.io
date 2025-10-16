import React, { useEffect, useMemo, useRef, useState } from 'react';
import { StoryNavigation } from './StoryNavigation';
import { StoryFeed } from './StoryFeed';

type Step = {
  id: string;
  title: string;
  body: React.ReactNode;
  images?: { src: string; alt?: string; label?: string; objectPosition?: string; fit?: 'cover' | 'contain' }[];
  imageAlign?: 'left' | 'right' | 'top';
};

export const InteractiveStory: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stepRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const wheelCooldownRef = useRef(false);
  const isSnappingRef = useRef(false);
  const snapTimerRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const touchLockedRef = useRef(false);
  const touchDirRef = useRef<0 | 1 | -1>(0);
  const [visibleSteps, setVisibleSteps] = useState<Record<string, boolean>>({});
  const [activeStep, setActiveStep] = useState<string>('');

  const isLargeScreen = () => window.matchMedia('(min-width: 1024px)').matches;

  const getHeaderOffset = () => {
    const topBar = document.querySelector('.fixed.top-0') as HTMLElement | null;
    const spacing = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    return topBar ? topBar.offsetHeight + spacing : spacing * 5;
  };

  const steps: Step[] = useMemo(
    () => [
      {
        id: 'audience',
        title: 'For the misfits, tinkerers, experimenters',
        body: (
          <p className="text-xl md:text-2xl leading-relaxed text-foreground/90">
            If you pull things apart to see how they work, if you learn by trying,
            and you’d rather prototype than pontificate — Theatre is for you. A place to
            explore boldly, build deliberately, and keep your hands on the controls.
          </p>
        ),
        images: [
          { src: '/pics/turing fixing.jpg', alt: 'Alan Turing working on a machine', label: 'Alan Turing' },
          { src: '/pics/claude shannon.jpg', alt: 'Claude Shannon', label: 'Claude Shannon' },
        ],
        imageAlign: 'right',
      },
      {
        id: 'why-now',
        title: 'Many builds later, one bottleneck remains',
        body: (
          <p className="text-xl md:text-2xl leading-relaxed text-foreground/90">
            We ship faster than ever. Models draft, tools automate. Yet the hardest part stays the same:
            understanding and control. Real work needs traceable intent, shared context, and the freedom to say
            <span className="mx-1 inline rounded px-1 bg-[hsl(var(--accent)/0.15)] text-foreground">not yet</span>
            or
            <span className="mx-1 inline rounded px-1 bg-[hsl(var(--accent)/0.15)] text-foreground">prove it</span>.
          </p>
        ),
        images: [
          { src: '/pics/semiconductor gang.jpg', alt: 'Semiconductor pioneers', label: 'Semiconductor Pioneers' },
          { src: '/pics/jobs and woz.jpeg', alt: 'Jobs and Wozniak in the garage', label: 'Jobs and Woz' },
        ],
        imageAlign: 'left',
      },
      {
        id: 'context-rot',
        title: 'Context rots. Work sprawls.',
        body: (
          <p className="text-xl md:text-2xl leading-relaxed text-foreground/90">
            Docs, specs, tickets, chats, repos. We copy, paste, forget. What we need is a system that
            <span className="mx-1 inline rounded px-1 bg-[hsl(var(--accent)/0.15)] text-foreground">remembers</span>,
            <span className="mx-1 inline rounded px-1 bg-[hsl(var(--accent)/0.15)] text-foreground">surfaces</span>
            what matters, and keeps intent close to implementation.
          </p>
        ),
        images: [
          { src: '/pics/kary mullis.jpg', alt: 'Kary Mullis', label: 'Kary Mullis' },
          { src: '/pics/jc bose.JPG', alt: 'J. C. Bose', label: 'J. C. Bose', objectPosition: 'top' },
        ],
        imageAlign: 'right',
      },
      {
        id: 'agency',
        title: 'Agents can act. You stay in command.',
        body: (
          <p className="text-xl md:text-2xl leading-relaxed text-foreground/90">
            Theatre is built around
            <span className="mx-1 inline rounded px-1 bg-[hsl(var(--accent)/0.15)] text-foreground">human agency</span>:
            rapid navigation, visual diffs, grounded claims, and principled refusals when evidence is thin.
            Less guessing, more verifying.
          </p>
        ),
        images: [
          { src: '/pics/shuji nakamura.jpg', alt: 'Shuji Nakamura', label: 'Shuji Nakamura' },
        ],
        imageAlign: 'left',
      },
      {
        id: 'flow',
        title: 'Explore → Build → Review → Orchestrate',
        body: (
          <p className="text-xl md:text-2xl leading-relaxed text-foreground/90">
            Research and experiment in
            <span className="mx-1 inline rounded px-1 bg-[hsl(var(--accent)/0.15)] text-foreground">Explore</span>,
            capture intent as
            <span className="mx-1 inline rounded px-1 bg-[hsl(var(--accent)/0.15)] text-foreground">Specs</span> in
            <span className="mx-1 inline rounded px-1 bg-[hsl(var(--accent)/0.15)] text-foreground">Build</span>,
            then keep humans-in-the-loop with universal
            <span className="mx-1 inline rounded px-1 bg-[hsl(var(--accent)/0.15)] text-foreground">Review</span>.
            Orchestrate the rest.
          </p>
        ),
        images: [
          { src: '/pics/curie lab.avif', alt: 'Curie in the lab', label: 'Marie Curie' },
        ],
        imageAlign: 'right',
      },
      {
        id: 'spec',
        title: 'Intent up front. Code that follows.',
        body: (
          <p className="text-xl md:text-2xl leading-relaxed text-foreground/90">
            Specs describe what and why; code projects how. Theatre keeps them in lockstep—so you can generate,
            update, and evaluate with confidence.
          </p>
        ),
        images: [
          { src: '/pics/faraday notebook.jpg', alt: 'Engineering notebook', label: "Faraday's Notes" },
        ],
        imageAlign: 'left',
      },
      {
        id: 'cta',
        title: 'Make a thing.',
        body: (
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <p className="text-2xl md:text-3xl leading-tight text-foreground/90 font-semibold">
              This is Theatre.<br />
              <span className="font-normal">Start the show.</span>
            </p>
            <button
              className="hero-button whitespace-nowrap md:ml-auto"
              onClick={() => {
                const target = document.getElementById('preorder');
                if (!target) return;
                const topBar = document.querySelector('.fixed.top-0') as HTMLElement | null;
                const spacing = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
                const headerHeight = topBar ? topBar.offsetHeight + spacing : spacing * 5;
                const y = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                window.scrollTo({ top: y, behavior: 'smooth' });
              }}
            >
              Join Early Access
            </button>
          </div>
        ),
        images: [
          { src: '/pics/man on moon.jpeg', alt: 'Moon landing', label: 'Moon Landing' },
        ],
        imageAlign: 'top',
      },
    ],
    []
  );

  // Initialize active step to first on mount
  useEffect(() => {
    if (!activeStep && steps.length) {
      setActiveStep(steps[0].id);
    }
  }, [steps, activeStep]);

  const allIds = useMemo(() => steps.map((s) => s.id), [steps]);
  const indexOf = (id: string) => Math.max(0, allIds.indexOf(id));

  const handleStepClick = (stepId: string) => {
    const idx = indexOf(stepId);
    scrollToIndex(idx);
  };

  const scrollToIndex = (idx: number) => {
    const step = steps[idx];
    if (!step) return;
    const el = stepRefs.current[step.id];
    if (!el) return;
    const header = getHeaderOffset();
    const viewH = window.innerHeight || document.documentElement.clientHeight;
    const rect = el.getBoundingClientRect();
    const absTop = rect.top + window.pageYOffset;
    // Keep the step roughly centered for a composed, deliberate feel
    const target = absTop + el.offsetHeight / 2 - viewH / 2 - header / 2;
    const max = document.documentElement.scrollHeight - viewH;
    const y = Math.max(0, Math.min(target, max));
    isSnappingRef.current = true;
    window.scrollTo({ top: y, behavior: 'smooth' });
    window.setTimeout(() => {
      isSnappingRef.current = false;
    }, 420);
  };

  useEffect(() => {
    // Reveal-on-enter only; do not drive active step from IO to avoid flicker.
    const observer = new IntersectionObserver(
      (entries) => {
        const nextVisible: Record<string, boolean> = {};
        entries.forEach((entry) => {
          const id = (entry.target as HTMLElement).dataset.stepId;
          if (!id) return;
          if (entry.isIntersecting) nextVisible[id] = true;
        });
        if (Object.keys(nextVisible).length) {
          setVisibleSteps((prev) => ({ ...prev, ...nextVisible }));
        }
      },
      { root: null, rootMargin: '0px 0px -30% 0px', threshold: 0.1 }
    );

    const nodes = Object.values(stepRefs.current).filter(Boolean) as HTMLDivElement[];
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [steps.length]);

  // Scroll-driven active step and gentle snapping (desktop only)
  useEffect(() => {
    const sec = document.getElementById('story');
    if (!sec) return;

    const nearestIndexToViewportCenter = () => {
      const header = getHeaderOffset();
      const viewH = window.innerHeight || document.documentElement.clientHeight;
      const centerY = window.pageYOffset + viewH / 2 + header * 0.0; // slight bias removed for stability
      let bestIdx = 0;
      let bestDist = Number.POSITIVE_INFINITY;
      steps.forEach((s, i) => {
        const el = stepRefs.current[s.id];
        if (!el) return;
        const r = el.getBoundingClientRect();
        const elCenter = r.top + window.pageYOffset + r.height / 2;
        const d = Math.abs(elCenter - centerY);
        if (d < bestDist) {
          bestDist = d;
          bestIdx = i;
        }
      });
      return bestIdx;
    };

    const isStoryMostlyVisible = () => {
      const rect = sec.getBoundingClientRect();
      const viewH = window.innerHeight || document.documentElement.clientHeight;
      const visible = Math.min(rect.bottom, viewH) - Math.max(rect.top, 0);
      return visible >= viewH * 0.55;
    };

    const updateActiveOnRaf = () => {
      rafRef.current = null;
      if (!isLargeScreen() || !isStoryMostlyVisible()) return;
      const nextIdx = nearestIndexToViewportCenter();
      const nextId = steps[nextIdx]?.id;
      if (nextId && nextId !== activeStep) setActiveStep(nextId);
    };

    const onScroll = () => {
      if (!isLargeScreen()) return;
      // Lightweight: update the active step on rAF to avoid layout thrash
      if (rafRef.current == null) rafRef.current = window.requestAnimationFrame(updateActiveOnRaf);

      // Debounced gentle snap after user stops scrolling
      if (snapTimerRef.current) window.clearTimeout(snapTimerRef.current);
      snapTimerRef.current = window.setTimeout(() => {
        if (!isLargeScreen() || !isStoryMostlyVisible() || isSnappingRef.current) return;
        const targetIdx = nearestIndexToViewportCenter();
        const currIdx = indexOf(activeStep);
        if (targetIdx !== currIdx) scrollToIndex(targetIdx);
      }, 140);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (snapTimerRef.current) clearTimeout(snapTimerRef.current);
    };
  }, [activeStep, steps]);

  // Smooth keyboard navigation between steps when the story is in view (desktop only)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Desktop only
      if (!isLargeScreen()) return;
      const sec = document.getElementById('story');
      if (!sec) return;

      // Ignore if typing in an input/textarea/select or with modifier keys
      const t = e.target as HTMLElement | null;
      const tag = t?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select' || t?.isContentEditable) return;
      if (e.altKey || e.ctrlKey || e.metaKey) return;

      // Only intercept when the story is reasonably in view
      const rect = sec.getBoundingClientRect();
      const viewH = window.innerHeight || document.documentElement.clientHeight;
      const visible = Math.min(rect.bottom, viewH) - Math.max(rect.top, 0);
      if (visible < viewH * 0.3) return;

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        const curr = indexOf(activeStep);
        if (curr < steps.length - 1) scrollToIndex(curr + 1);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        const curr = indexOf(activeStep);
        if (curr > 0) scrollToIndex(curr - 1);
      }
    };

    window.addEventListener('keydown', handler, { passive: false });
    return () => window.removeEventListener('keydown', handler as EventListener);
  }, [activeStep, steps]);

  // Touch swipe paging for mobile/tablet
  useEffect(() => {
    const sec = document.getElementById('story');
    if (!sec) return;

    const getHeaderOffset = () => {
      const topBar = document.querySelector('.fixed.top-0') as HTMLElement | null;
      const spacing = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
      return topBar ? topBar.offsetHeight + spacing : spacing * 5;
    };

    const scrollToIndexMobile = (idx: number) => scrollToIndex(idx);

    const isStoryVisible = () => {
      const rect = sec.getBoundingClientRect();
      const viewH = window.innerHeight || document.documentElement.clientHeight;
      const visible = Math.min(rect.bottom, viewH) - Math.max(rect.top, 0);
      return visible >= viewH * 0.4;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (!isStoryVisible()) return;
      touchStartYRef.current = e.touches[0]?.clientY ?? null;
      touchLockedRef.current = false;
      touchDirRef.current = 0;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isStoryVisible()) return;
      const startY = touchStartYRef.current;
      if (startY == null) return;
      const dy = e.touches[0]?.clientY - startY;
      if (Math.abs(dy) > 20 && !touchLockedRef.current) {
        // lock this gesture to paging and stop native rubber-band
        e.preventDefault();
        touchLockedRef.current = true;
        touchDirRef.current = dy < 0 ? 1 : -1; // 1 = next, -1 = prev
      }
    };

    const onTouchEnd = () => {
      if (!touchLockedRef.current) return;
      const dir = touchDirRef.current;
      touchStartYRef.current = null;
      touchLockedRef.current = false;
      touchDirRef.current = 0;

      const curr = indexOf(activeStep);
      if (dir === 1 && curr < steps.length - 1) {
        scrollToIndexMobile(curr + 1);
      } else if (dir === -1 && curr > 0) {
        scrollToIndexMobile(curr - 1);
      }
    };

    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', onTouchStart as EventListener);
      window.removeEventListener('touchmove', onTouchMove as EventListener);
      window.removeEventListener('touchend', onTouchEnd as EventListener);
    };
  }, [activeStep, steps]);

  return (
    <section id="story" className="relative bg-background mt-12 sm:mt-16 md:mt-24 lg:mt-40 xl:mt-48">
      <div className="container mx-auto px-4 sm:px-6 pt-12 sm:pt-16 md:pt-20 pb-6 sm:pb-8 md:pb-10" ref={containerRef}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-5 gap-10 lg:gap-16 md:pb-[8vh] lg:pb-[6vh] xl:pb-[8vh]">
          <StoryNavigation steps={steps} activeStep={activeStep} onStepClick={handleStepClick} />
          <StoryFeed steps={steps} stepRefs={stepRefs} visibleSteps={visibleSteps} />
        </div>
      </div>
    </section>
  );
};
