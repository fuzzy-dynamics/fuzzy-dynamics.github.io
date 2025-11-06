import { useTheme } from '@/contexts/ThemeContext';
import { useEffect, useRef, useState } from 'react';

export const Compute = () => {
  const { isDark } = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = rect.height;
      
      // Calculate progress from when section enters view to when it leaves
      const startProgress = rect.top - windowHeight;
      const endProgress = rect.top + sectionHeight;
      const progress = -startProgress / (windowHeight + sectionHeight);
      
      setScrollProgress(Math.max(0, Math.min(1, progress)));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // States in the finite automata - cleaner layout
  const states = [
    { id: 'q0', label: 'q₀', x: 90, y: 140, initial: true },
    { id: 'q1', label: 'q₁', x: 220, y: 90 },
    { id: 'q2', label: 'q₂', x: 350, y: 90 },
    { id: 'q3', label: 'q₃', x: 220, y: 190 },
    { id: 'q4', label: 'q₄', x: 350, y: 190 },
    { id: 'qf', label: 'qf', x: 480, y: 140, final: true },
  ];

  // Transitions between states - smoother curves
  const transitions = [
    { from: 'q0', to: 'q1', label: 'gen', path: 'M 112,128 Q 150,100 198,90', labelPos: { x: 155, y: 105 } },
    { from: 'q0', to: 'q3', label: 'gen', path: 'M 112,152 Q 150,180 198,190', labelPos: { x: 155, y: 175 } },
    { from: 'q1', to: 'q2', label: 'refl', path: 'M 242,90 L 328,90', labelPos: { x: 285, y: 82 } },
    { from: 'q3', to: 'q4', label: 'refl', path: 'M 242,190 L 328,190', labelPos: { x: 285, y: 198 } },
    { from: 'q2', to: 'qf', label: 'rank', path: 'M 372,102 Q 420,110 460,128', labelPos: { x: 415, y: 105 } },
    { from: 'q4', to: 'qf', label: 'rank', path: 'M 372,178 Q 420,170 460,152', labelPos: { x: 415, y: 175 } },
  ];

  // Calculate which transition is active based on scroll
  const activeTransitionIndex = Math.floor(scrollProgress * (transitions.length + 1));
  
  // Tape cells
  const tapeCells = 12;
  const cellWidth = 42;
  const tapeStartX = 64;
  const tape1Y = 360;
  const tape2Y = 490;
  
  // Head positions (move based on scroll)
  const head1Position = Math.floor(scrollProgress * (tapeCells - 1));
  const head2Position = Math.floor(scrollProgress * (tapeCells - 1) * 0.7);

  return (
    <section ref={sectionRef} className="relative py-4 sm:py-6 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="md:grid md:grid-cols-2 items-center">
            {/* Text Content */}
            <div className="mb-8 md:mb-0 md:px-4 lg:px-6 xl:px-8 flex flex-col justify-center md:order-2">
              <h2 className="text-lg sm:text-xl font-medium mb-6">
                Adaptive multiagent compute.
              </h2>
              <div className="space-y-4 text-base sm:text-lg text-muted-foreground opacity-70">
                <p>
                  We are significantly scaling test-time compute to reason, experiment and iterate as the system gathers more knowledge and feedback. The aim is to implement the scientific method as a computational infrastructure for anyone to use.
                  <br/>
                  <br/>
                  Multiple agents pursue long-horizon tasks in parallel. Compute concentrates where progress is validated through autoformalization, data or grounded citations.
                  <br/>
                  <br/>
                  The infrastructure monitors progress, reallocates compute to what's working, and scales the verification work that drives results.
                </p>
              </div>
            </div>

            {/* Turing Machine Visualization */}
            <div className="flex justify-center items-center md:px-4 lg:px-6 xl:px-8 md:order-1">
              <div className="relative w-full max-w-lg">
                {/* Notebook paper texture */}
                <div 
                  className="absolute inset-0 rounded-lg opacity-40"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paper'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='5' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23paper)' opacity='0.03'/%3E%3C/svg%3E")`,
                    backgroundColor: isDark ? 'transparent' : 'hsl(45, 20%, 96%)',
                  }}
                />
                
                {/* SVG Turing Machine Diagram */}
                <svg 
                  viewBox="0 0 600 580" 
                  className="w-full h-auto relative z-10"
                  style={{
                    transform: 'translateZ(0)',
                    willChange: 'transform'
                  }}
                >
                  <defs>
                    {/* Pen ink texture for hand-drawn effect */}
                    <filter id="penInk">
                      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" result="noise"/>
                      <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.8" />
                    </filter>
                    
                    {/* Arrow marker */}
                    <marker
                      id="arrowhead"
                      markerWidth="8"
                      markerHeight="8"
                      refX="7"
                      refY="4"
                      orient="auto"
                    >
                      <path
                        d="M 0,0 L 8,4 L 0,8 Z"
                        fill={isDark ? 'hsl(227, 90%, 58%)' : 'hsl(227, 95%, 48%)'}
                        opacity="0.7"
                      />
                    </marker>
                  </defs>


                  {/* Notebook grid lines (background) */}
                  <g opacity="0.05">
                    {[...Array(13)].map((_, i) => (
                      <line
                        key={`grid-${i}`}
                        x1="30"
                        y1={50 + i * 40}
                        x2="570"
                        y2={50 + i * 40}
                        stroke={isDark ? 'hsl(227, 90%, 58%)' : 'hsl(227, 95%, 48%)'}
                        strokeWidth="0.3"
                      />
                    ))}
                  </g>

                  {/* State Machine (Finite Automata) */}
                  <g opacity="0.95">
                    {/* Transitions - render first so they appear behind states */}
                    {transitions.map((trans, i) => {
                      const isActive = i < activeTransitionIndex;
                      const labelX = trans.labelPos.x;
                      const labelY = trans.labelPos.y;
                      
                      return (
                        <g key={`trans-${i}`}>
                          {/* Transition arrow */}
                          <path
                            d={trans.path}
                            stroke={isDark ? 'hsl(227, 90%, 58%)' : 'hsl(227, 95%, 48%)'}
                            strokeWidth="2"
                            fill="none"
                            markerEnd="url(#arrowhead)"
                            opacity={isActive ? 0.75 : 0.15}
                            strokeLinecap="round"
                            strokeDasharray={isActive ? "0" : "4,4"}
                          />
                          
                          {/* Transition label background */}
                          <rect
                            x={labelX - 20}
                            y={labelY - 11}
                            width="40"
                            height="18"
                            fill={isDark ? 'hsl(227, 100%, 10%)' : 'hsl(45, 30%, 98%)'}
                            stroke={isDark ? 'hsl(227, 90%, 58%)' : 'hsl(227, 95%, 48%)'}
                            strokeWidth="0.5"
                            rx="3"
                            opacity={isActive ? 0.9 : 0.3}
                          />
                          
                          {/* Transition label text */}
                          <text
                            x={labelX}
                            y={labelY + 4}
                            textAnchor="middle"
                            fill={isDark ? 'hsl(227, 90%, 68%)' : 'hsl(227, 95%, 48%)'}
                            fontSize="10"
                            fontWeight="600"
                            className="tech-mono"
                            opacity={isActive ? 0.9 : 0.4}
                          >
                            {trans.label}
                          </text>
                        </g>
                      );
                    })}

                    {/* State circles - render on top */}
                    {states.map((state, i) => {
                      const isActive = activeTransitionIndex >= transitions.findIndex(t => t.from === state.id);
                      const isCurrent = i === Math.min(activeTransitionIndex, states.length - 1);
                      
                      return (
                        <g key={state.id}>
                          {/* Initial state arrow */}
                          {state.initial && (
                            <path
                              d="M 52,140 L 66,140"
                              stroke={isDark ? 'hsl(227, 90%, 58%)' : 'hsl(227, 95%, 48%)'}
                              strokeWidth="2"
                              markerEnd="url(#arrowhead)"
                              opacity="0.7"
                              strokeLinecap="round"
                            />
                          )}
                          
                          {/* Outer circle */}
                          <circle
                            cx={state.x}
                            cy={state.y}
                            r="24"
                            fill={isDark ? 'hsl(227, 100%, 10%)' : 'hsl(45, 30%, 98%)'}
                            stroke={isDark ? 'hsl(227, 90%, 58%)' : 'hsl(227, 95%, 48%)'}
                            strokeWidth={isCurrent ? "2.5" : "2"}
                            opacity={isActive ? 1 : 0.35}
                          />
                          
                          {/* Double circle for final state */}
                          {state.final && (
                            <circle
                              cx={state.x}
                              cy={state.y}
                              r="19"
                              fill="none"
                              stroke={isDark ? 'hsl(227, 90%, 58%)' : 'hsl(227, 95%, 48%)'}
                              strokeWidth="2"
                              opacity={isActive ? 0.85 : 0.25}
                            />
                          )}
                          
                          {/* State label */}
                          <text
                            x={state.x}
                            y={state.y + 5}
                            textAnchor="middle"
                            fill={isDark ? 'hsl(227, 90%, 68%)' : 'hsl(227, 95%, 48%)'}
                            fontSize="15"
                            fontWeight="600"
                            className="tech-mono"
                            opacity={isActive ? 0.95 : 0.4}
                          >
                            {state.label}
                          </text>
                        </g>
                      );
                    })}
                  </g>

                  {/* Tape 1 */}
                  <g>
                    <text 
                      x={tapeStartX - 32} 
                      y={tape1Y - 12} 
                      fill={isDark ? 'hsl(227, 90%, 58%)' : 'hsl(227, 95%, 48%)'} 
                      fontSize="10" 
                      fontWeight="600" 
                      className="tech-mono" 
                      opacity="0.65"
                    >
                      T₁
                    </text>
                    
                    {/* Tape cells */}
                    {[...Array(tapeCells)].map((_, i) => {
                      const symbols = ['g', 'e', 'n', 'r', 'e', 'f', 'l', 'r', 'a', 'n', 'k', '✓'];
                      return (
                        <g key={`tape1-${i}`}>
                          <rect
                            x={tapeStartX + i * cellWidth}
                            y={tape1Y - 18}
                            width={cellWidth}
                            height={36}
                            fill="none"
                            stroke={isDark ? 'hsl(227, 90%, 58%)' : 'hsl(227, 95%, 48%)'}
                            strokeWidth={i === head1Position ? "2" : "1.5"}
                            opacity={i === head1Position ? 0.85 : 0.25}
                            rx="2"
                          />
                          <text
                            x={tapeStartX + i * cellWidth + cellWidth / 2}
                            y={tape1Y + 5}
                            textAnchor="middle"
                            fill={isDark ? 'hsl(227, 90%, 68%)' : 'hsl(227, 95%, 48%)'}
                            fontSize="14"
                            fontWeight="500"
                            className="tech-mono"
                            opacity={i <= head1Position ? 0.85 : 0.2}
                          >
                            {symbols[i]}
                          </text>
                        </g>
                      );
                    })}
                    
                    {/* Read/Write Head 1 */}
                    <g transform={`translate(${tapeStartX + head1Position * cellWidth + cellWidth / 2}, ${tape1Y - 34})`}>
                      <path
                        d="M -10,-8 L 0,0 L 10,-8 L 0,-6 Z"
                        fill={isDark ? 'hsl(227, 90%, 58%)' : 'hsl(227, 95%, 48%)'}
                        opacity="0.85"
                      />
                      <circle
                        cx="0"
                        cy="-14"
                        r="9"
                        fill={isDark ? 'hsl(227, 100%, 10%)' : 'hsl(45, 30%, 98%)'}
                        stroke={isDark ? 'hsl(227, 90%, 58%)' : 'hsl(227, 95%, 48%)'}
                        strokeWidth="2"
                      />
                      <text
                        x="0"
                        y="-10"
                        textAnchor="middle"
                        fill={isDark ? 'hsl(227, 90%, 68%)' : 'hsl(227, 95%, 48%)'}
                        fontSize="9"
                        fontWeight="700"
                        className="tech-mono"
                      >
                        1
                      </text>
                    </g>
                  </g>

                  {/* Tape 2 */}
                  <g>
                    <text 
                      x={tapeStartX - 32} 
                      y={tape2Y - 12} 
                      fill={isDark ? 'hsl(227, 90%, 58%)' : 'hsl(227, 95%, 48%)'} 
                      fontSize="10" 
                      fontWeight="600" 
                      className="tech-mono" 
                      opacity="0.65"
                    >
                      T₂
                    </text>
                    
                    {/* Tape cells */}
                    {[...Array(tapeCells)].map((_, i) => {
                      const symbols = ['m', 'e', 't', 'a', 'e', 'v', 'o', 'l', 's', 'u', 'p', '✓'];
                      return (
                        <g key={`tape2-${i}`}>
                          <rect
                            x={tapeStartX + i * cellWidth}
                            y={tape2Y - 18}
                            width={cellWidth}
                            height={36}
                            fill="none"
                            stroke={isDark ? 'hsl(227, 90%, 58%)' : 'hsl(227, 95%, 48%)'}
                            strokeWidth={i === head2Position ? "2" : "1.5"}
                            opacity={i === head2Position ? 0.85 : 0.25}
                            rx="2"
                          />
                          <text
                            x={tapeStartX + i * cellWidth + cellWidth / 2}
                            y={tape2Y + 5}
                            textAnchor="middle"
                            fill={isDark ? 'hsl(227, 90%, 68%)' : 'hsl(227, 95%, 48%)'}
                            fontSize="14"
                            fontWeight="500"
                            className="tech-mono"
                            opacity={i <= head2Position ? 0.85 : 0.2}
                          >
                            {symbols[i]}
                          </text>
                        </g>
                      );
                    })}
                    
                    {/* Read/Write Head 2 */}
                    <g transform={`translate(${tapeStartX + head2Position * cellWidth + cellWidth / 2}, ${tape2Y - 34})`}>
                      <path
                        d="M -10,-8 L 0,0 L 10,-8 L 0,-6 Z"
                        fill={isDark ? 'hsl(227, 90%, 58%)' : 'hsl(227, 95%, 48%)'}
                        opacity="0.85"
                      />
                      <circle
                        cx="0"
                        cy="-14"
                        r="9"
                        fill={isDark ? 'hsl(227, 100%, 10%)' : 'hsl(45, 30%, 98%)'}
                        stroke={isDark ? 'hsl(227, 90%, 58%)' : 'hsl(227, 95%, 48%)'}
                        strokeWidth="2"
                      />
                      <text
                        x="0"
                        y="-10"
                        textAnchor="middle"
                        fill={isDark ? 'hsl(227, 90%, 68%)' : 'hsl(227, 95%, 48%)'}
                        fontSize="9"
                        fontWeight="700"
                        className="tech-mono"
                      >
                        2
                      </text>
                    </g>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

