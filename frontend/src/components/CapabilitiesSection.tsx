export const CapabilitiesSection = () => {
  const capabilities = [
    "Searches literature, surfaces ideas.",
    "Grounds your math into verifiable programs.",
    "Runs experiments. Analyses data. Loops.",
    "Remembers and works like a real-time collaborator."
  ];

  return (
    <div className="py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="md:grid md:grid-cols-[1.5fr_1fr] md:gap-12 lg:gap-16 items-center">
            {/* Left: Capabilities */}
            <div className="space-y-6 sm:space-y-8">
              {capabilities.map((capability, index) => (
                <div
                  key={index}
                  className="flex items-baseline gap-4 sm:gap-6 md:gap-8 pb-6 sm:pb-8 border-b border-border/30 last:border-0 last:pb-0"
                >
                  <span className="tech-mono text-sm sm:text-base text-muted-foreground/40 flex-shrink-0">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="text-base sm:text-lg md:text-xl text-muted-foreground">
                    {capability}
                  </p>
                </div>
              ))}
            </div>

            {/* Right: stuff.svg */}
            <div className="hidden md:flex justify-end items-center">
              <img
                src="/stuff.svg"
                alt="Visualization"
                className="w-full h-auto max-w-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CapabilitiesSection;
