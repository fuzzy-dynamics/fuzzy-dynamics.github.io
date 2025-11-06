import { useEffect, useState, useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

export const Hypothesis = () => {
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

  const primaryColor = isDark ? 'hsl(227, 85%, 58%)' : 'hsl(227, 90%, 50%)';

  // Normalize scroll progress: map 0-70% scroll to 0-100% animation
  const normalizedProgress = Math.min(scrollProgress / 0.7, 1);

  // Generate incoming particle beams
  const generateBeamParticles = (progress: number) => {
    const particles: Array<{ x: number; y: number; opacity: number; vx: number; vy: number }> = [];
    const beamProgress = Math.min(progress * 2.5, 1); // Moderate speed - beams meet around 40% scroll
    
    // Left beam (moving right)
    for (let i = 0; i < 8; i++) {
      const t = i / 8;
      const x = 50 + beamProgress * 250;
      const y = 275 + (Math.sin(t * Math.PI * 2) * 3);
      particles.push({ x, y, opacity: beamProgress * 0.5, vx: 1, vy: 0 });
    }
    
    // Right beam (moving left)
    for (let i = 0; i < 8; i++) {
      const t = i / 8;
      const x = 550 - beamProgress * 250;
      const y = 275 + (Math.cos(t * Math.PI * 2) * 3);
      particles.push({ x, y, opacity: beamProgress * 0.5, vx: -1, vy: 0 });
    }
    
    return particles;
  };

  // Generate collision debris/cascade particles
  const generateCollisionParticles = (progress: number) => {
    const particles: Array<{ x: number; y: number; angle: number; radius: number; opacity: number; type: string }> = [];
    const collisionProgress = Math.max(0, (progress - 0.35) * 2); // Start after beams meet (at ~35%)
    
    if (collisionProgress <= 0) return particles;
    
    // Primary particles shooting out from collision
    for (let i = 0; i < 16; i++) {
      const angle = (i / 16) * Math.PI * 2;
      // Deterministic speed variation based on index
      const speedVariation = Math.sin(i * 2.3) * 20;
      const speed = 80 + speedVariation;
      const radius = collisionProgress * speed;
      const x = 300 + Math.cos(angle) * radius;
      const y = 275 + Math.sin(angle) * radius;
      const opacity = Math.max(0, (1 - collisionProgress * 0.5) * 0.6); // Fainter and fade out
      particles.push({ x, y, angle, radius, opacity, type: 'primary' });
    }
    
    // Secondary particles (more sparse)
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2 + 0.15;
      // Deterministic speed variation based on index
      const speedVariation = Math.cos(i * 1.7) * 15;
      const speed = 50 + speedVariation;
      const radius = collisionProgress * speed * 0.8;
      const x = 300 + Math.cos(angle) * radius;
      const y = 275 + Math.sin(angle) * radius;
      const opacity = Math.max(0, (1 - collisionProgress * 0.6) * 0.4); // Fainter and fade faster
      particles.push({ x, y, angle, radius, opacity, type: 'secondary' });
    }
    
    return particles;
  };

  // Generate detector layer hits
  const generateDetectorLayers = (progress: number) => {
    const layers = [
      { radius: 60, name: 'Inner Tracker', hits: 16 },
      { radius: 120, name: 'Outer Tracker', hits: 24 },
      { radius: 180, name: 'Calorimeter', hits: 32 },
      { radius: 240, name: 'Muon Detector', hits: 28 },
    ];
    
    const detectorProgress = Math.max(0, (progress - 0.3) * 2.5); // Appear shortly after collision
    
    return layers.map(layer => ({
      ...layer,
      opacity: Math.min(detectorProgress * 2, 0.15),
      hitOpacity: Math.min(detectorProgress * 3, 0.6),
    }));
  };

  // Generate reconstructed particle tracks
  const generateTracks = (progress: number) => {
    const tracks: Array<{ points: Array<{ x: number; y: number }>, opacity: number, color: string }> = [];
    const trackProgress = Math.max(0, (progress - 0.5) * 2.5); // Tracks appear later
    
    if (trackProgress <= 0) return tracks;
    
    // Generate curved tracks (simulating magnetic field bending)
    const numTracks = 8;
    for (let i = 0; i < numTracks; i++) {
      const angle = (i / numTracks) * Math.PI * 2;
      const points: Array<{ x: number; y: number }> = [];
      const curvature = (i % 2 === 0 ? 1 : -1) * 0.02;
      
      for (let t = 0; t <= trackProgress; t += 0.05) {
        const dist = t * 200;
        const bendAngle = angle + curvature * dist;
        const x = 300 + Math.cos(bendAngle) * dist;
        const y = 275 + Math.sin(bendAngle) * dist;
        points.push({ x, y });
      }
      
      tracks.push({
        points,
        opacity: Math.min(trackProgress * 0.7, 0.7), // Fainter tracks
        color: primaryColor,
      });
    }
    
    return tracks;
  };

  const beamParticles = generateBeamParticles(normalizedProgress);
  const collisionParticles = generateCollisionParticles(normalizedProgress);
  const detectorLayers = generateDetectorLayers(normalizedProgress);
  const tracks = generateTracks(normalizedProgress);

  return (
    <section ref={containerRef} className="relative py-4 sm:py-6 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="md:grid md:grid-cols-2 items-center">
            {/* Text Content - Left Side */}
            <div className="mb-8 md:mb-0 md:px-4 lg:px-6 xl:px-8 flex flex-col justify-center">
              <h2 className="text-lg sm:text-xl font-medium mb-6">
                Hypothesis evolution and experimentation.
              </h2>
              <div className="space-y-4 text-base sm:text-lg text-muted-foreground opacity-70">
                <p>
                Research advances through strong trial and error. Complex problems decompose into testable components. Failure refines the search space, success validates a path forward.
                <br/>
                <br/>
                Proof construction operates similarly, through testing lemmas and tactics, where rigorous verification guiding intuition through uncharted territory.
                <br/>
                <br/>
                Hypotheses evolve through experimental feedback, closing the gap between prediction and reality.
                </p>
              </div>
            </div>

            {/* Particle Collision Visualization - Right Side */}
            <div className="flex justify-center items-center md:px-4 lg:px-6 xl:px-8">
              <div className="relative w-full max-w-lg">
                {/* Dark detector chamber background */}
                <div 
                  className="absolute inset-0 rounded-lg opacity-20"
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
                    {/* Glow effect for particles */}
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                    
                    {/* Strong glow for collision */}
                    <filter id="strongGlow">
                      <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>

                    {/* Radial gradient for collision */}
                    <radialGradient id="collisionGradient">
                      <stop offset="0%" stopColor={primaryColor} stopOpacity="0.8"/>
                      <stop offset="50%" stopColor={primaryColor} stopOpacity="0.4"/>
                      <stop offset="100%" stopColor={primaryColor} stopOpacity="0"/>
                    </radialGradient>
                  </defs>

                  {/* Title annotation */}
                
                  {/* Detector layers (concentric circles) */}
                  {detectorLayers.map((layer, idx) => (
                    <g key={`layer-${idx}`}>
                      <circle
                        cx="300"
                        cy="275"
                        r={layer.radius}
                        fill="none"
                        stroke={primaryColor}
                        strokeWidth="1"
                        opacity={layer.opacity}
                        strokeDasharray="5 3"
                      />
                      {/* Detector segments */}
                      {[...Array(8)].map((_, i) => {
                        const angle = (i / 8) * Math.PI * 2;
                        const x1 = 300 + Math.cos(angle) * (layer.radius - 5);
                        const y1 = 275 + Math.sin(angle) * (layer.radius - 5);
                        const x2 = 300 + Math.cos(angle) * (layer.radius + 5);
                        const y2 = 275 + Math.sin(angle) * (layer.radius + 5);
                    return (
                        <line
                            key={`segment-${idx}-${i}`}
                            x1={x1}
                            y1={y1}
                            x2={x2}
                            y2={y2}
                          stroke={primaryColor}
                          strokeWidth="2"
                            opacity={layer.opacity * 1.5}
                          />
                    );
                  })}
                    </g>
                  ))}

                  {/* Beam pipes (horizontal lines) */}
                  <g opacity="0.2">
                    <line x1="20" y1="275" x2="280" y2="275" stroke={primaryColor} strokeWidth="1.5" strokeDasharray="3 2"/>
                    <line x1="320" y1="275" x2="580" y2="275" stroke={primaryColor} strokeWidth="1.5" strokeDasharray="3 2"/>
                  </g>

                  {/* Incoming beam particles */}
                  {beamParticles.map((particle, idx) => (
                    <circle
                      key={`beam-${idx}`}
                      cx={particle.x}
                      cy={particle.y}
                      r="2.5"
                      fill={primaryColor}
                      opacity={particle.opacity * 0.6}
                      filter="url(#glow)"
                    />
                  ))}

                  {/* Collision point burst */}
                  {normalizedProgress > 0.35 && (
                    <>
                      <circle
                        cx="300"
                        cy="275"
                        r={Math.min((normalizedProgress - 0.35) * 100, 30)}
                        fill="url(#collisionGradient)"
                        opacity={Math.max(0, (1 - (normalizedProgress - 0.35) * 1.2) * 0.5)}
                        filter="url(#strongGlow)"
                      />
                      <circle
                        cx="300"
                        cy="275"
                        r="6"
                        fill={primaryColor}
                        opacity={Math.min((normalizedProgress - 0.35) * 3, 0.7)}
                        filter="url(#strongGlow)"
                      />
                    </>
                  )}

                  {/* Collision particles shooting out */}
                  {collisionParticles.map((particle, idx) => (
                    <g key={`collision-${idx}`}>
                      {particle.type === 'primary' ? (
                        <>
                          {/* Particle trail with gradient fade */}
                          <line
                            x1="300"
                            y1="275"
                            x2={particle.x}
                            y2={particle.y}
                            stroke={primaryColor}
                            strokeWidth="1"
                            opacity={particle.opacity * 0.15}
                            strokeLinecap="round"
                          />
                          <circle
                            cx={particle.x}
                            cy={particle.y}
                            r="3"
                            fill={primaryColor}
                            opacity={particle.opacity}
                            filter="url(#glow)"
                          />
                        </>
                      ) : (
                        <circle
                          cx={particle.x}
                          cy={particle.y}
                          r="2"
                          fill={primaryColor}
                          opacity={particle.opacity}
                          filter="url(#glow)"
                        />
                      )}
                    </g>
                  ))}

                  {/* Reconstructed particle tracks (curved paths) */}
                  {tracks.map((track, idx) => (
                    <g key={`track-${idx}`}>
                      <path
                        d={track.points.map((p, i) => 
                          i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`
                        ).join(' ')}
                        fill="none"
                        stroke={track.color}
                        strokeWidth="1.5"
                        opacity={track.opacity * 0.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        filter="url(#glow)"
                      />
                      {/* Track endpoint marker */}
                      {track.points.length > 0 && (
                      <circle
                          cx={track.points[track.points.length - 1].x}
                          cy={track.points[track.points.length - 1].y}
                          r="3"
                          fill={track.color}
                          opacity={track.opacity * 0.6}
                        />
                      )}
                    </g>
                  ))}


                 

                 

                

                  {/* Corner alignment marks */}
                  <g stroke={primaryColor} strokeWidth="1" opacity="0.1">
                    <path d="M 50 50 L 60 50 M 50 50 L 50 60"/>
                    <path d="M 550 50 L 540 50 M 550 50 L 550 60"/>
                    <path d="M 50 500 L 60 500 M 50 500 L 50 490"/>
                    <path d="M 550 500 L 540 500 M 550 500 L 550 490"/>
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

