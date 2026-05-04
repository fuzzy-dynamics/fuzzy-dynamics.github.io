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
    name: 'MIT',
    logo: '/logos/mit-logo.svg',
    alt: 'MIT logo',
    url: 'https://mit.edu',
    className: 'h-9 sm:h-11 md:h-[3.25rem]',
  },
  {
    name: 'Microsoft',
    logo: '/logos/microsoft-logo.svg',
    alt: 'Microsoft logo',
    url: 'https://microsoft.com',
  },
  {
    name: 'Databricks',
    logo: '/logos/databricks-logo.svg',
    alt: 'Databricks logo',
    url: 'https://databricks.com',
  },
  {
    name: 'IIITH',
    logo: '/logos/iiith-logo.png',
    alt: 'IIIT Hyderabad logo',
    url: 'https://iiit.ac.in',
  },
];

export const TrustSection = () => {
  return (
    <div className="pt-6 sm:pt-8 md:pt-10 pb-4 sm:pb-6 md:pb-6">
      <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="tech-mono mb-4 sm:mb-6 text-sm text-muted-foreground">
            <div className="block sm:hidden">
              <div>EARLY ADOPTERS FROM</div>
            </div>
            <div className="hidden sm:block">EARLY ADOPTERS FROM</div>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-6 sm:gap-x-14 sm:gap-y-8 md:grid md:grid-cols-5 md:gap-x-12 lg:gap-x-16">
            {COMPANIES.map((company, index) => (
              <a
                key={company.name + index}
                href={company.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center h-16 md:h-20 hover:scale-105 transition-transform duration-300 cursor-pointer"
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
