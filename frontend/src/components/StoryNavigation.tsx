import React from 'react';

type Step = {
  id: string;
  title: string;
  body: React.ReactNode;
  images?: { src: string; alt?: string; label?: string; objectPosition?: string; fit?: 'cover' | 'contain' }[];
  imageAlign?: 'left' | 'right' | 'top';
};

type StoryNavigationProps = {
  steps: Step[];
  activeStep: string;
  onStepClick: (stepId: string) => void;
};

export const StoryNavigation: React.FC<StoryNavigationProps> = ({ steps, activeStep, onStepClick }) => {
  return (
    <aside className="md:col-span-2 md:sticky md:top-1/2 md:-translate-y-1/2 h-fit md:pl-12 lg:pl-20 xl:pl-24 text-center md:text-left">
      <div className="tech-mono mb-3 text-muted-foreground">THE Theater STORY</div>
      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
        Build boldly.
        <br />
        Stay in control.
      </h3>

      <ol className="mt-8 space-y-3 hidden md:block">
        {steps.map((s) => (
          <li
            key={s.id}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => onStepClick(s.id)}
          >
            <span
              className={`inline-block h-2 w-2 rounded-full transition-colors duration-300 ${
                activeStep === s.id ? 'bg-[hsl(var(--primary))]' : 'bg-border'
              }`}
            />
            <span
              className={`whitespace-nowrap overflow-hidden text-ellipsis text-sm transition-colors duration-200 ${
                activeStep === s.id ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {s.title}
            </span>
          </li>
        ))}
      </ol>
    </aside>
  );
};
