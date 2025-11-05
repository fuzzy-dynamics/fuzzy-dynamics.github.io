import { useEffect, useState, useRef } from 'react';

export const KeplerOrbit = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Calculate scroll progress based on component center position
        const componentCenter = rect.top + rect.height / 2;
        const viewportCenter = windowHeight / 2;
        
        // Calculate progress: 0 when component center is at bottom of viewport,
        // 1 when component center is at top of viewport
        const scrollRange = windowHeight * 1.5;
        const relativePosition = viewportCenter - componentCenter;
        const progress = Math.max(0, Math.min(1, (relativePosition + scrollRange / 2) / scrollRange));
        
        // Update target progress instead of directly setting state
        targetProgressRef.current = progress;
      }
    };

    // Smooth animation loop using requestAnimationFrame
    const animate = () => {
      // Smooth interpolation (lerp) towards target
      const smoothingFactor = 0.1; // Lower = smoother but slower, higher = faster but less smooth
      const diff = targetProgressRef.current - currentProgressRef.current;
      currentProgressRef.current += diff * smoothingFactor;
      
      const progress = currentProgressRef.current;
      setScrollProgress(progress);
      
      // Calculate planet position relative to container
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll(); // Initialize on mount
    animationFrameRef.current = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Ellipse parameters
  const centerX = 200;
  const centerY = 200;
  const a = 140; // semi-major axis
  const b = 90;  // semi-minor axis
  
  // Calculate focal distance: c = sqrt(a² - b²)
  // Position Sun slightly left of center (not at full focal distance for visual balance)
  const c = Math.sqrt(a * a - b * b);
  const sunOffsetFactor = 0.3; // Use 30% of the focal distance for a subtle offset
  
  // Sun position (slightly left of center)
  const sunX = centerX - (c * sunOffsetFactor);
  const sunY = centerY;

  // Calculate planet position along ellipse based on scroll (0 to 2π)
  const angle = scrollProgress * Math.PI * 2;
  const planetX = centerX + a * Math.cos(angle);
  const planetY = centerY + b * Math.sin(angle);

  // Previous positions for snapshots
  const prevAngle1 = Math.max(0, angle - Math.PI / 6);
  const prevX1 = centerX + a * Math.cos(prevAngle1);
  const prevY1 = centerY + b * Math.sin(prevAngle1);

  const prevAngle2 = Math.max(0, angle - Math.PI / 3);
  const prevX2 = centerX + a * Math.cos(prevAngle2);
  const prevY2 = centerY + b * Math.sin(prevAngle2);

  // Create path for filled area (swept area)
  const createSweepPath = () => {
    const steps = 20;
    let path = `M ${sunX} ${sunY}`;
    
    for (let i = 0; i <= steps; i++) {
      const t = prevAngle1 + (angle - prevAngle1) * (i / steps);
      const x = centerX + a * Math.cos(t);
      const y = centerY + b * Math.sin(t);
      path += ` L ${x} ${y}`;
    }
    
    path += ' Z';
    return path;
  };

  return (
    <div ref={containerRef} className="relative w-full h-full flex items-center justify-center">
      <svg
          viewBox="0 0 400 400"
          className="w-full h-full"
          style={{ maxWidth: '500px', maxHeight: '500px' }}
        >
        {/* Elliptical orbit */}
        <ellipse
          cx={centerX}
          cy={centerY}
          rx={a}
          ry={b}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="0.8"
          strokeDasharray="5 3"
          opacity="0.5"
          style={{ filter: 'blur(0.3px)' }}
        />

        {/* Crosshair lines tied to planet position */}
        <line
          x1={0}
          y1={planetY}
          x2={400}
          y2={planetY}
          stroke="hsl(var(--primary))"
          strokeWidth={1}
          opacity={0.3}
          pointerEvents="none"
        />
        <line
          x1={planetX}
          y1={0}
          x2={planetX}
          y2={400}
          stroke="hsl(var(--primary))"
          strokeWidth={1}
          opacity={0.3}
          pointerEvents="none"
        />

        {/* Swept area (Kepler's law visualization) */}
        {angle > prevAngle1 && (
          <path
            d={createSweepPath()}
            fill="hsl(var(--primary))"
            opacity="0.12"
          />
        )}

        {/* Lines from sun to previous positions */}
        {angle > prevAngle2 && (
          <>
            <line
              x1={sunX}
              y1={sunY}
              x2={prevX2}
              y2={prevY2}
              stroke="hsl(var(--primary))"
              strokeWidth="1"
              opacity="0.25"
              strokeDasharray="3 2"
            />
            <line
              x1={sunX}
              y1={sunY}
              x2={prevX1}
              y2={prevY1}
              stroke="hsl(var(--primary))"
              strokeWidth="1"
              opacity="0.35"
              strokeDasharray="3 2"
            />
          </>
        )}

        {/* Line from sun to current planet position */}
        <line
          x1={sunX}
          y1={sunY}
          x2={planetX}
          y2={planetY}
          stroke="hsl(var(--primary))"
          strokeWidth="1.5"
          opacity="0.6"
        />

        {/* Sun */}
        <circle
          cx={sunX}
          cy={sunY}
          r="12"
          className="fill-yellow-400"
        />
        <circle
          cx={sunX}
          cy={sunY}
          r="12"
          className="fill-yellow-400 animate-pulse"
          opacity="0.4"
        />

        {/* Previous planet positions (snapshots) */}
        {angle > prevAngle2 && (
          <>
            <circle
              cx={prevX2}
              cy={prevY2}
              r="6"
              fill="hsl(var(--primary))"
              opacity="0.25"
            />
            <circle
              cx={prevX1}
              cy={prevY1}
              r="6"
              fill="hsl(var(--primary))"
              opacity="0.4"
            />
          </>
        )}

        {/* Current planet */}
        <circle
          cx={planetX}
          cy={planetY}
          r="10"
          fill="hsl(var(--primary))"
          opacity="0.3"
        />
        <circle
          cx={planetX}
          cy={planetY}
          r="7"
          fill="hsl(var(--primary))"
          opacity="0.7"
        />
        <circle
          cx={planetX}
          cy={planetY}
          r="4"
          fill="hsl(var(--primary))"
          opacity="0.95"
        />

        {/* Velocity vector (shows planet moves faster when closer to sun) */}
        {angle > 0 && (
          <>
            {/* Calculate velocity direction */}
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto"
              >
                <polygon
                  points="0 0, 10 3, 0 6"
                  fill="hsl(var(--primary))"
                  opacity="0.7"
                />
              </marker>
            </defs>
            <line
              x1={planetX}
              y1={planetY}
              x2={planetX - Math.sin(angle) * 30}
              y2={planetY + Math.cos(angle) * 30}
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              opacity="0.55"
              markerEnd="url(#arrowhead)"
            />
          </>
        )}

       
      </svg>
    </div>
  );
};
