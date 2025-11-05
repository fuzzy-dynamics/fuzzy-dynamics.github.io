interface CompanyLogo {
  name: string;
  logo: string;
  darkLogo?: string;
  alt: string;
  url: string;
  className?: string;
}

const COMPANIES: CompanyLogo[] = [
  {
    name: 'Google',
    logo: '/logos/google-logo.svg',
    alt: 'Google logo',
    url: 'https://google.com',
  },
  {
    name: 'Anthropic',
    logo: '/logos/anthropic-logo.svg',
    darkLogo: '/logos/anthropic-logo-dark.svg',
    alt: 'Anthropic logo',
    url: 'https://anthropic.com',
    className: 'h-6 sm:h-8 md:h-10',
  },
  {
    name: 'Salesforce',
    logo: '/logos/salesforce-logo.svg',
    alt: 'Salesforce logo',
    url: 'https://salesforce.com',
  },
  {
    name: 'Microsoft',
    logo: '/logos/microsoft-logo.svg',
    alt: 'Microsoft logo',
    url: 'https://microsoft.com',
  },
  {
    name: 'Uber',
    logo: '/logos/uber-logo.svg',
    darkLogo: '/logos/uber-logo-dark.svg',
    alt: 'Uber logo',
    url: 'https://uber.com',
    className: 'h-6 sm:h-6 md:h-8',
  },
];

export const TrustSection = () => {
  return (
    <div className="pt-6 sm:pt-8 md:pt-10 pb-2 sm:pb-4 md:pb-6">
      <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="tech-mono mb-4 sm:mb-6 text-sm text-muted-foreground">
            <div className="block sm:hidden">
              <div>EARLY ADOPTERS FROM</div>
            </div>
            <div className="hidden sm:block">EARLY ADOPTERS FROM</div>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-10 sm:gap-14 md:gap-20">
            {COMPANIES.map((company, index) => (
              <a
                key={company.name + index}
                href={company.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center hover:scale-105 transition-transform duration-300 cursor-pointer"
              >
                <img
                  src={company.logo}
                  alt={company.alt}
                  className={`w-auto object-contain transition-all duration-300 ${
                    company.className || 'h-8 sm:h-10 md:h-12'
                  }`}
                  onError={(event) => {
                    const target = event.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.innerHTML = `<span class="text-xl sm:text-2xl font-bold text-muted-foreground/80">${company.name}</span>`;
                  }}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSection;
