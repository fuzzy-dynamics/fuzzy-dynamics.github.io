import { useEffect, useState, useRef, useMemo } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

// Conway's Game of Life implementation
type Grid = boolean[][];

const createEmptyGrid = (size: number): Grid => {
  return Array(size).fill(null).map(() => Array(size).fill(false));
};

const createInitialPattern = (size: number): Grid => {
  const grid = createEmptyGrid(size);
  const center = Math.floor(size / 2);
  
  // Create an interesting initial pattern (glider gun-inspired)
  const patterns = [
    // Small block
    [center - 6, center - 6], [center - 6, center - 5],
    [center - 5, center - 6], [center - 5, center - 5],
    
    // Blinker
    [center - 3, center], [center - 2, center], [center - 1, center],
    
    // Glider
    [center + 2, center + 2], [center + 3, center + 3], [center + 4, center + 3],
    [center + 4, center + 2], [center + 4, center + 1],
    
    // Toad
    [center, center + 5], [center, center + 6], [center, center + 7],
    [center + 1, center + 4], [center + 1, center + 5], [center + 1, center + 6],
    
    // Random cells
    [center - 8, center + 3], [center - 7, center + 4], [center - 6, center + 3],
    [center + 6, center - 2], [center + 7, center - 3], [center + 8, center - 2],
  ];
  
  patterns.forEach(([row, col]) => {
    if (row >= 0 && row < size && col >= 0 && col < size) {
      grid[row][col] = true;
    }
  });
  
  return grid;
};

const countNeighbors = (grid: Grid, row: number, col: number): number => {
  let count = 0;
  const size = grid.length;
  
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;
      
      const newRow = row + i;
      const newCol = col + j;
      
      if (newRow >= 0 && newRow < size && newCol >= 0 && newCol < size) {
        if (grid[newRow][newCol]) count++;
      }
    }
  }
  
  return count;
};

const evolveGrid = (grid: Grid): Grid => {
  const size = grid.length;
  const newGrid = createEmptyGrid(size);
  
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const neighbors = countNeighbors(grid, row, col);
      const isAlive = grid[row][col];
      
      // Conway's Game of Life rules
      if (isAlive) {
        newGrid[row][col] = neighbors === 2 || neighbors === 3;
      } else {
        newGrid[row][col] = neighbors === 3;
      }
    }
  }
  
  return newGrid;
};

export const SymbolicReasoningSection = () => {
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

  // Generate Game of Life generations
  const generations = useMemo(() => {
    const gridSize = 24;
    const maxGenerations = 30;
    const gens: Grid[] = [createInitialPattern(gridSize)];
    
    for (let i = 1; i < maxGenerations; i++) {
      gens.push(evolveGrid(gens[i - 1]));
    }
    
    return gens;
  }, []);

  // Current generation based on scroll
  const currentGeneration = Math.min(
    Math.floor(scrollProgress * generations.length),
    generations.length - 1
  );
  
  const currentGrid = generations[currentGeneration];
  
  // Count alive cells
  const aliveCount = currentGrid.flat().filter(cell => cell).length;

  const gridSize = currentGrid.length;
  const cellSize = 16;
  const gridStartX = 120;
  const gridStartY = 80;

  return (
    <section ref={containerRef} className="relative py-4 sm:py-6 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="md:grid md:grid-cols-2 items-center">
            {/* Game of Life Visualization - Left Side */}
            <div className="flex justify-center items-center order-2 md:order-1 md:px-4 lg:px-6 xl:px-8">
              <div className="relative w-full max-w-lg">
                {/* Notebook paper texture */}
                <div 
                  className="absolute inset-0 rounded-lg opacity-40"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paper'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='5' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23paper)' opacity='0.03'/%3E%3C/svg%3E")`,
                    backgroundColor: isDark ? 'transparent' : 'hsl(45, 20%, 96%)',
                  }}
                />
                
                <svg 
                  viewBox="0 0 600 550" 
                  className="w-full h-auto relative z-10"
                  style={{ transform: 'translateZ(0)', willChange: 'transform' }}
                >
                  <defs>
                    {/* Pen ink texture */}
                    <filter id="penInk">
                      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" result="noise"/>
                      <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.8" />
                    </filter>
                    {/* Glow for alive cells */}
                    <filter id="cellGlow">
                      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>

                

                  {/* Hand-drawn schematic border */}
                  <rect
                    x="90"
                    y="70"
                    width={gridSize * cellSize + 30}
                    height={gridSize * cellSize + 30}
                    rx="2"
                    fill="none"
                    stroke={primaryColor}
                    strokeWidth="2"
                    opacity="0.6"
                    filter="url(#penInk)"
                  />
                  <rect
                    x="91"
                    y="71"
                    width={gridSize * cellSize + 30}
                    height={gridSize * cellSize + 30}
                    rx="2"
                    fill="none"
                    stroke={primaryColor}
                    strokeWidth="1"
                    opacity="0.3"
                  />

                  {/* Grid cells */}
                  {currentGrid.map((row, rowIdx) => 
                    row.map((isAlive, colIdx) => {
                      const x = gridStartX + colIdx * cellSize;
                      const y = gridStartY + rowIdx * cellSize;
                      const cellKey = `cell-${rowIdx}-${colIdx}`;
                      
                      return (
                        <g key={cellKey}>
                          {/* Background cell (grid lines) */}
                          <rect
                            x={x}
                            y={y}
                            width={cellSize - 2}
                            height={cellSize - 2}
                            fill="none"
                            stroke={primaryColor}
                            strokeWidth="0.3"
                            opacity="0.2"
                          />
                          
                          {/* Alive cell - hand-drawn circle */}
                          {isAlive && (
                            <g>
                              {/* Main filled circle */}
                              <circle
                                cx={x + cellSize / 2}
                                cy={y + cellSize / 2}
                                r={cellSize / 2 - 3}
                                fill={primaryColor}
                                opacity="0.8"
                                filter="url(#cellGlow)"
                              />
                              {/* Hand-drawn outline */}
                              <circle
                                cx={x + cellSize / 2}
                                cy={y + cellSize / 2}
                                r={cellSize / 2 - 3}
                                fill="none"
                                stroke={primaryColor}
                                strokeWidth="1.5"
                                opacity="0.9"
                                filter="url(#penInk)"
                              />
                              {/* Inner detail - smaller circle */}
                              <circle
                                cx={x + cellSize / 2}
                                cy={y + cellSize / 2}
                                r={cellSize / 2 - 5}
                                fill="none"
                                stroke={isDark ? 'hsl(227, 100%, 70%)' : 'hsl(227, 100%, 60%)'}
                                strokeWidth="0.5"
                                opacity="0.5"
                              />
                            </g>
                          )}
                        </g>
                      );
                    })
                  )}

               

                  {/* Generation counter */}
                  <g transform="translate(300, 430)">
                    <rect
                      x="-60"
                      y="-18"
                      width="120"
                      height="32"
                      rx="2"
                      fill={isDark ? 'hsl(227, 100%, 15%)' : 'hsl(45, 30%, 98%)'}
                      stroke={primaryColor}
                      strokeWidth="1.5"
                      opacity="0.9"
                      filter="url(#penInk)"
                    />
                    <text x="0" y="-5" textAnchor="middle" fill={primaryColor} fontSize="8" className="tech-mono" fontWeight="600" opacity="0.7">
                      GENERATION
                    </text>
                    <text x="0" y="8" textAnchor="middle" fill={primaryColor} fontSize="14" className="tech-mono" fontWeight="700">
                      {currentGeneration}
                    </text>
                  </g>

                  {/* Statistics */}
                  <g transform="translate(480, 430)">
                    <text x="0" y="0" textAnchor="end" fill={primaryColor} fontSize="8" className="tech-mono" opacity="0.6">
                      ALIVE
                    </text>
                    <text x="0" y="12" textAnchor="end" fill={primaryColor} fontSize="11" className="tech-mono" fontWeight="700" opacity="0.9">
                      {aliveCount}
                    </text>
                  </g>

                  {/* Annotation: Emergence */}
                  {scrollProgress > 0.3 && (
                    <g opacity={Math.min(1, (scrollProgress - 0.3) * 2)}>
                      <line 
                        x1="480" 
                        y1="150" 
                        x2="530" 
                        y2="120" 
                        stroke={primaryColor} 
                        strokeWidth="1" 
                        strokeDasharray="3 2"
                        opacity="0.5"
                      />
                      <text x="535" y="118" fill={primaryColor} fontSize="7" className="tech-mono" opacity="0.7">
                        EMERGENT
                      </text>
                      <text x="535" y="128" fill={primaryColor} fontSize="7" className="tech-mono" opacity="0.7">
                        COMPLEXITY
                      </text>
                    </g>
                  )}

                  {/* Annotation: Simple Rules */}
                  {scrollProgress > 0.5 && (
                    <g opacity={Math.min(1, (scrollProgress - 0.5) * 2)}>
                      <line 
                        x1="100" 
                        y1="300" 
                        x2="50" 
                        y2="330" 
                        stroke={primaryColor} 
                        strokeWidth="1" 
                        strokeDasharray="3 2"
                        opacity="0.5"
                      />
                      <text x="50" y="345" fill={primaryColor} fontSize="7" className="tech-mono" opacity="0.7" textAnchor="end">
                        SIMPLE AXIOMS
                      </text>
                      <text x="50" y="355" fill={primaryColor} fontSize="7" className="tech-mono" opacity="0.7" textAnchor="end">
                        DEEP REASONING
                      </text>
                    </g>
                  )}

              

                  {/* Circuit board corners */}
                  <g fill="none" stroke={primaryColor} strokeWidth="1" opacity="0.25">
                    <circle cx="60" cy="50" r="5"/>
                    <circle cx="540" cy="50" r="5"/>
                    <circle cx="60" cy="500" r="5"/>
                    <circle cx="540" cy="500" r="5"/>
                  </g>

                  {/* Technical labels */}
                  <g opacity="0.4">
                    <text x="560" y="30" textAnchor="end" fill={primaryColor} fontSize="8" className="tech-mono">
                      GAME-LIFE
                    </text>
                    <text x="560" y="43" textAnchor="end" fill={primaryColor} fontSize="7" className="tech-mono">
                      REV B
                    </text>
                  </g>
                </svg>
              </div>
            </div>

            {/* Text Content - Right Side */}
            <div className="mb-8 md:mb-0 md:px-4 lg:px-6 xl:px-8 order-1 md:order-2 flex flex-col justify-center">
              <h2 className="text-lg sm:text-xl font-normal mb-6 tracking-tight leading-tight font-['Helvetica_Neue']">
                Reasoning with strong trial and error
              </h2>
              <div className="space-y-4 text-lg sm:text-xl text-muted-foreground font-['Helvetica_Neue'] opacity-60">
                <p>
                  Systematic decomposition breaks complex hypotheses into fundamental axioms, verifying each independently to ensure logical consistency from ground truth to novel synthesis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

