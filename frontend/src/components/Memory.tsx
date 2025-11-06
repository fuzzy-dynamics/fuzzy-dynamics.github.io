import { useTheme } from '@/contexts/ThemeContext';
import { useEffect, useState, useRef } from 'react';

export const Memory = () => {
  const { isDark } = useTheme();
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const componentCenter = rect.top + rect.height / 2;
        const viewportCenter = windowHeight / 2;
        const scrollRange = windowHeight * 1.5;
        const relativePosition = viewportCenter - componentCenter;
        const progress = Math.max(0, Math.min(1, (relativePosition + scrollRange / 2) / scrollRange));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const primaryColor = isDark ? 'hsl(227, 90%, 58%)' : 'hsl(227, 95%, 48%)';

  // Organic blob nodes - hand-drawn style
  const nodes = [
    { id: 1, x: 300, y: 250, size: 45, label: 'CORE', growAt: 0.1 },
    { id: 2, x: 200, y: 180, size: 35, label: 'INS', growAt: 0.25 },
    { id: 3, x: 400, y: 200, size: 38, label: 'PAT', growAt: 0.35 },
    { id: 4, x: 250, y: 350, size: 32, label: 'CTX', growAt: 0.45 },
    { id: 5, x: 380, y: 330, size: 35, label: 'REL', growAt: 0.55 },
    { id: 6, x: 150, y: 280, size: 28, label: 'MEM', growAt: 0.65 },
    { id: 7, x: 450, y: 280, size: 30, label: 'ASC', growAt: 0.75 },
  ];

  // Hand-drawn connections
  const connections = [
    { from: 1, to: 2, strength: 3, drawAt: 0.3 },
    { from: 1, to: 3, strength: 4, drawAt: 0.4 },
    { from: 1, to: 4, strength: 3, drawAt: 0.5 },
    { from: 1, to: 5, strength: 4, drawAt: 0.6 },
    { from: 2, to: 3, strength: 2, drawAt: 0.7 },
    { from: 2, to: 6, strength: 2, drawAt: 0.7 },
    { from: 3, to: 7, strength: 2, drawAt: 0.8 },
    { from: 4, to: 5, strength: 3, drawAt: 0.8 },
    { from: 5, to: 7, strength: 2, drawAt: 0.85 },
  ];

  return (
    <section ref={containerRef} className="relative py-4 sm:py-6 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="md:grid md:grid-cols-2 items-center">
            {/* Text Content */}
            <div className="mb-8 md:mb-0 md:px-4 lg:px-6 xl:px-8 flex flex-col justify-center">
              <h2 className="text-lg sm:text-xl font-medium mb-6">
                Memory infrastructure and context that evolves.
              </h2>
              <div className="space-y-4 text-base sm:text-lg text-muted-foreground opacity-70">
                <p>
                Context evolves and persists across sessions. The memory layer adapts to your work and domain, preventing context rot as reasoning deepens.
                <br/>
                <br/>
                Deep indexing into existing literature retrieves relevant knowledge when agents need it.
                <br/>
                <br/>
                Optimized embedding representations capture structure that standard approaches miss, enabling precise retrieval across transferable concepts and citation chains.
                </p>
              </div>
            </div>

            {/* Hand-Drawn Organic Network Visualization */}
            <div className="flex justify-center items-center md:px-4 lg:px-6 xl:px-8">
              <div className="relative w-full max-w-lg">
                {/* Notebook paper texture */}
                <div 
                  className="absolute inset-0 rounded-lg opacity-40"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paper'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='5' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23paper)' opacity='0.03'/%3E%3C/svg%3E")`,
                    backgroundColor: isDark ? 'transparent' : 'hsl(45, 20%, 96%)',
                  }}
                />
                
                {/* SVG Hand-drawn sketch */}
                <svg 
                  viewBox="0 0 600 550" 
                  className="w-full h-auto relative z-10"
                >
                  <defs>
                    {/* Pen ink texture */}
                    <filter id="penInk">
                      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" result="noise"/>
                      <feDisplacementMap in="SourceGraphic" in2="noise" scale="1" />
                    </filter>
                  </defs>

                 
                  {/* Hand-drawn connections - sketchy lines */}
                  {connections.map((conn, idx) => {
                    const fromNode = nodes.find(n => n.id === conn.from);
                    const toNode = nodes.find(n => n.id === conn.to);
                    if (!fromNode || !toNode || scrollProgress < conn.drawAt) return null;

                    // Create wobbly hand-drawn path
                    const midX = (fromNode.x + toNode.x) / 2 + (Math.random() - 0.5) * 10;
                    const midY = (fromNode.y + toNode.y) / 2 + (Math.random() - 0.5) * 10;

                    return (
                      <g key={`conn-${idx}`}>
                        {/* Main connection line - sketchy */}
                        <path
                          d={`M ${fromNode.x} ${fromNode.y} Q ${midX} ${midY} ${toNode.x} ${toNode.y}`}
                          stroke={primaryColor}
                          strokeWidth={conn.strength * 0.8}
                          fill="none"
                          opacity="0.4"
                          strokeLinecap="round"
                          filter="url(#penInk)"
                        />
                        {/* Duplicate for hand-drawn effect */}
                        <path
                          d={`M ${fromNode.x + 0.5} ${fromNode.y + 0.5} Q ${midX + 1} ${midY - 1} ${toNode.x + 0.5} ${toNode.y + 0.5}`}
                          stroke={primaryColor}
                          strokeWidth={conn.strength * 0.6}
                          fill="none"
                          opacity="0.3"
                          strokeLinecap="round"
                        />
                      </g>
                    );
                  })}

                  {/* Hand-drawn organic node blobs */}
                  {nodes.map((node) => {
                    const isGrown = scrollProgress >= node.growAt;
                    const growthScale = isGrown ? 1 : Math.max(0, (scrollProgress - (node.growAt - 0.1)) / 0.1);
                    const currentSize = node.size * growthScale;

                    if (currentSize <= 0) return null;

                    // Generate irregular blob shape (hand-drawn organic by Anvay)
                    const points = 12;
                    const angleStep = (Math.PI * 2) / points;
                    let blobPath = '';
                    for (let i = 0; i <= points; i++) {
                      const angle = i * angleStep;
                      const randomness = 0.15 + Math.sin(i * 2.3) * 0.1;
                      const r = currentSize * (0.9 + randomness);
                      const x = node.x + r * Math.cos(angle);
                      const y = node.y + r * Math.sin(angle);
                      blobPath += i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
                    }
                    blobPath += ' Z';

                    return (
                      <g key={node.id}>
                        {/* Cross-hatch shading (hand-drawn) */}
                        {isGrown && (
                          <g opacity="0.3">
                            {/* Diagonal hatching */}
                            {[...Array(8)].map((_, i) => (
                              <line
                                key={`hatch1-${i}`}
                                x1={node.x - currentSize + i * 4}
                                y1={node.y - currentSize}
                                x2={node.x + currentSize}
                                y2={node.y - currentSize + currentSize * 2 - i * 4}
                                stroke={primaryColor}
                                strokeWidth="0.4"
                                opacity="0.4"
                              />
                            ))}
                            {/* Cross hatching */}
                            {[...Array(8)].map((_, i) => (
                              <line
                                key={`hatch2-${i}`}
                                x1={node.x - currentSize + i * 4}
                                y1={node.y + currentSize}
                                x2={node.x + currentSize}
                                y2={node.y + currentSize - currentSize * 2 + i * 4}
                                stroke={primaryColor}
                                strokeWidth="0.4"
                                opacity="0.3"
                              />
                            ))}
                          </g>
                        )}

                        {/* Outer blob outline - double stroke for sketch effect */}
                        <path
                          d={blobPath}
                          fill={isDark ? 'hsl(227, 100%, 12%)' : 'hsl(45, 30%, 98%)'}
                          stroke={primaryColor}
                          strokeWidth="2"
                          opacity={isGrown ? 0.9 : 0.5}
                          filter="url(#penInk)"
                        />
                        <path
                          d={blobPath}
                          fill="none"
                          stroke={primaryColor}
                          strokeWidth="1.5"
                          opacity={isGrown ? 0.6 : 0.3}
                          transform={`translate(0.5, 0.5)`}
                        />

                        {/* Label - hand-written style */}
                        {isGrown && (
                          <text
                            x={node.x}
                            y={node.y + 4}
                            textAnchor="middle"
                            fill={primaryColor}
                            fontSize="10"
                            fontWeight="600"
                            className="tech-mono"
                            opacity="0.8"
                          >
                            {node.label}
                          </text>
                        )}

                        {/* Pen dots for texture */}
                        {isGrown && [...Array(5)].map((_, i) => {
                          const dotAngle = (i / 5) * Math.PI * 2;
                          const dotR = currentSize * 0.7;
                          return (
                            <circle
                              key={`dot-${i}`}
                              cx={node.x + dotR * Math.cos(dotAngle)}
                              cy={node.y + dotR * Math.sin(dotAngle)}
                              r="0.8"
                              fill={primaryColor}
                              opacity="0.3"
                            />
                          );
                        })}
                      </g>
                    );
                  })}

                  {/* Hand-drawn annotation arrows */}
                  {scrollProgress > 0.4 && (
                    <g opacity={Math.min(1, (scrollProgress - 0.4) * 2)}>
                      {/* Arrow to core */}
                      <path
                        d="M 120 120 Q 200 180 270 230"
                        stroke={primaryColor}
                        strokeWidth="1"
                        fill="none"
                        strokeDasharray="3 2"
                        opacity="0.5"
                      />
                      <polygon
                        points="270,230 265,225 265,233"
                        fill={primaryColor}
                        opacity="0.5"
                      />
                      <text x="90" y="115" fill={primaryColor} fontSize="8" className="tech-mono" opacity="0.6">
                        CENTRAL HUB
                      </text>
                    </g>
                  )}

                  {/* Growth indicators */}
                  {scrollProgress > 0.7 && (
                    <g opacity={Math.min(1, (scrollProgress - 0.7) * 2)}>
                      <circle cx="520" cy="150" r="3" fill="none" stroke={primaryColor} strokeWidth="1" opacity="0.5"/>
                      <circle cx="520" cy="150" r="6" fill="none" stroke={primaryColor} strokeWidth="0.5" opacity="0.3"/>
                      <text x="460" y="145" fill={primaryColor} fontSize="7" className="tech-mono" opacity="0.6">
                        EXPANDING
                      </text>
                    </g>
                  )}

                  {/* Sketch grid (notebook lines) */}
                  <g opacity="0.1">
                    {[...Array(12)].map((_, i) => (
                      <line
                        key={`grid-${i}`}
                        x1="50"
                        y1={80 + i * 40}
                        x2="550"
                        y2={80 + i * 40}
                        stroke={primaryColor}
                        strokeWidth="0.3"
                      />
                    ))}
                  </g>

                  {/* Progress note */}
                  
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

