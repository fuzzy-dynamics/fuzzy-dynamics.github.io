import { useEffect, useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

export const SlidingEaseVerticalBars = () => {
  const { isDark } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeRef = useRef(0);
  const animationFrameId = useRef<number | null>(null);

  const noise = (x: number, y: number, t: number) => {
    // Enhanced noise with more complexity and different frequencies
    const n1 = Math.sin(x * 0.025 + t * 1.2) * Math.cos(y * 0.018 + t * 0.8);
    const n2 = Math.sin(x * 0.032 - t * 0.9) * Math.cos(y * 0.015 + t * 1.1);
    const n3 = Math.sin(x * 0.041 + t * 0.7) * Math.cos(y * 0.022 - t * 0.6);
    const combined = n1 + n2 * 0.7 + n3 * 0.5;
    return (combined + 2.2) / 4.4; // Normalized to 0-1 range
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Perfect square for clean geometric look
    canvas.width = 450;
    canvas.height = 450;

    const numLines = 40;
    const lineSpacing = canvas.width / numLines;

    // Generate random seeds for each session
    const randomSeed1 = Math.random() * 10 + 1;
    const randomSeed2 = Math.random() * 10 + 1;
    
    // Add random starting time offset for varied initial positions
    const randomTimeOffset = Math.random() * Math.PI * 2;
    timeRef.current = randomTimeOffset;

    const generatePattern = (seed: number) => {
      const pattern = [];
      for (let i = 0; i < numLines; i++) {
        const lineBars = [];
        let currentY = 0;
        
        // Add randomness to the starting position with varied seed influence
        const randomOffset = Math.sin(i * 0.7 + seed * 2.3) * 12 + Math.random() * 8 - 4;
        currentY += randomOffset;
        
        while (currentY < canvas.height) {
          const noiseVal = noise(i * lineSpacing, currentY, seed);
          
          // Variable threshold with more randomness
          const threshold = 0.38 + Math.sin(i * 0.4 + seed) * 0.12 + Math.random() * 0.05;
          
          if (noiseVal > threshold) {
            // More varied bar dimensions with random variations
            const baseLength = 8 + noiseVal * 35 + Math.sin(currentY * 0.01 + seed) * 5;
            const barLength = baseLength + (Math.random() - 0.5) * 6;
            const baseWidth = 1.5 + noiseVal * 4 + Math.cos(i * 0.3 + seed) * 0.8;
            const barWidth = Math.max(0.5, baseWidth + (Math.random() - 0.5) * 1.2);
            
            lineBars.push({
              y: currentY + barLength / 2,
              height: Math.max(2, barLength),
              width: barWidth
            });
            
            // Variable spacing between bars with randomness
            const baseSpacing = 12 + Math.sin(currentY * 0.02 + i * 0.1 + seed) * 8;
            const spacing = baseSpacing + (Math.random() - 0.5) * 4;
            currentY += barLength + Math.max(8, spacing);
          } else {
            // Variable empty space with randomness
            const baseEmptySpace = 10 + Math.cos(currentY * 0.015 + seed) * 6;
            const emptySpace = baseEmptySpace + (Math.random() - 0.5) * 4;
            currentY += Math.max(6, emptySpace);
          }
        }
        
        pattern.push(lineBars);
      }
      return pattern;
    };

    // Generate patterns with random seeds
    const pattern1 = generatePattern(randomSeed1);
    const pattern2 = generatePattern(randomSeed2);

    const animate = () => {
      timeRef.current += 0.004; // Keep original speed
      const cycleTime = timeRef.current % (Math.PI * 2);
      
      // Create a smoother continuous animation with minimal pauses
      let easingFactor;
      if (cycleTime < Math.PI * 0.04) {
        // Very short pause at start (2% of cycle)
        easingFactor = 0;
      } else if (cycleTime < Math.PI * 0.96) {
        // Smooth transition for most of the cycle (46% of cycle)
        const transitionProgress = (cycleTime - Math.PI * 0.04) / (Math.PI * 0.92);
        easingFactor = transitionProgress;
      } else if (cycleTime < Math.PI * 1.04) {
        // Very short pause at peak (2% of cycle)
        easingFactor = 1;
      } else if (cycleTime < Math.PI * 1.96) {
        // Smooth transition back for most of the cycle (46% of cycle)
        const transitionProgress = (cycleTime - Math.PI * 1.04) / (Math.PI * 0.92);
        easingFactor = 1 - transitionProgress;
      } else {
        // Very short pause at end (2% of cycle)
        easingFactor = 0;
      }

      // Apply smoother cubic easing
      const smoothEasing = easingFactor < 0.5 
        ? 4 * easingFactor * easingFactor * easingFactor 
        : 1 - Math.pow(-2 * easingFactor + 2, 3) / 2;

      // Get theme-aware colors from CSS custom properties
      const rootStyles = getComputedStyle(document.documentElement);
      const bgColor = rootStyles.getPropertyValue('--background').trim();
      const borderColor = rootStyles.getPropertyValue('--border').trim();
      const mutedColor = rootStyles.getPropertyValue('--muted-foreground').trim();

      // Use theme background color
      ctx.fillStyle = `hsl(${bgColor})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < numLines; i++) {
        const x = i * lineSpacing + lineSpacing / 2;
        
        // Subtle line color matching theme border
        ctx.beginPath();
        ctx.strokeStyle = `hsl(${borderColor})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();

        const bars1 = pattern1[i];
        const bars2 = pattern2[i];
        const maxBars = Math.max(bars1.length, bars2.length);

        for (let j = 0; j < maxBars; j++) {
          let bar1 = bars1[j];
          let bar2 = bars2[j];

          if (!bar1) bar1 = { y: bar2.y - 120, height: 0, width: 0 };
          if (!bar2) bar2 = { y: bar1.y + 120, height: 0, width: 0 };

          // More subtle wave motion with random phase offsets
          const phaseOffset1 = randomSeed1 * 0.3;
          const phaseOffset2 = randomSeed2 * 0.2;
          const waveOffset1 = Math.sin(i * 0.35 + j * 0.6 + timeRef.current * 2.2 + phaseOffset1) * 4;
          const waveOffset2 = Math.cos(i * 0.25 + j * 0.4 + timeRef.current * 1.8 + phaseOffset2) * 3;
          const combinedWave = (waveOffset1 + waveOffset2) * (smoothEasing * (1 - smoothEasing) * 2.5);
          
          const y = bar1.y + (bar2.y - bar1.y) * smoothEasing + combinedWave;
          const height = bar1.height + (bar2.height - bar1.height) * smoothEasing;
          const width = bar1.width + (bar2.width - bar1.width) * smoothEasing;

          if (height > 0.1 && width > 0.1) {
            // Use theme-aware muted foreground for subtle bars
            ctx.fillStyle = `hsl(${mutedColor})`;
            ctx.fillRect(x - width/2, y - height/2, width, height);
          }
        }
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      timeRef.current = 0;
      animationFrameId.current = null;
    };
  }, [isDark]); // Re-initialize when theme changes

  return (
    <div className="w-full h-full flex items-center justify-center opacity-75">
      <canvas 
        ref={canvasRef} 
        className="block"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </div>
  );
};