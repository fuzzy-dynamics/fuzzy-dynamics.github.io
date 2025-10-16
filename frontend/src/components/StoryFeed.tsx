import React from 'react';
import { PinnedCollage } from './PinnedCollage';

type Step = {
  id: string;
  title: string;
  body: React.ReactNode;
  images?: { src: string; alt?: string; label?: string; objectPosition?: string; fit?: 'cover' | 'contain' }[];
  imageAlign?: 'left' | 'right' | 'top';
};

type StoryFeedProps = {
  steps: Step[];
  stepRefs: React.MutableRefObject<Record<string, HTMLDivElement | null>>;
  visibleSteps: Record<string, boolean>;
};

export const StoryFeed: React.FC<StoryFeedProps> = ({ steps, stepRefs, visibleSteps }) => {
  return (
    <div className="md:col-span-3 md:pr-12 lg:pr-20 xl:pr-24 md:-mt-[25vh] lg:-mt-[25vh]">
      {steps.map((s, index) => (
        <div
          key={s.id}
          data-step-id={s.id}
          ref={(el) => (stepRefs.current[s.id] = el)}
          className={`transition-all duration-500 md:min-h-[70svh] lg:min-h-[75svh] flex items-center ${index > 0 ? 'mt-16' : ''} ${
            visibleSteps[s.id] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ contentVisibility: 'auto' } as React.CSSProperties}
        >
          <div className="w-full">
            <div className="mb-2 text-sm text-muted-foreground lg:hidden">{s.title}</div>
            <div className="theme-card p-4 sm:p-6 md:p-8">
              {s.imageAlign === 'top' && s.images?.length ? (
                <>
                  <div className="mb-4">
                    <PinnedCollage images={s.images} align="top" />
                  </div>
                  <div>{s.body}</div>
                </>
              ) : (
                <div className="flex flex-col md:flex-row items-stretch gap-5 md:gap-8">
                  {s.imageAlign === 'left' && s.images?.length ? (
                    <div className="md:w-6/12 lg:w-5/12">
                      <PinnedCollage images={s.images} align="left" overflowExtras={s.id === 'audience' || s.id === 'why-now' || s.id === 'context-rot'} />
                    </div>
                  ) : null}
                  <div className="md:flex-1 min-w-0">{s.body}</div>
                  {s.imageAlign === 'right' && s.images?.length ? (
                    <div className="md:w-6/12 lg:w-5/12">
                      <PinnedCollage images={s.images} align="right" overflowExtras={s.id === 'audience' || s.id === 'why-now' || s.id === 'context-rot'} />
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
