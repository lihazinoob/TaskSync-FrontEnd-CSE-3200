import { cn } from "@/lib/utils";

const CompanyLogos = () => {
  // Sample company logos - replace with actual logos as needed
  const companies = [
    {
      id: 1,
      name: "Google",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/120px-Google_%22G%22_Logo.svg.png",
    },
    {
      id: 2,
      name: "Microsoft",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/120px-Microsoft_logo.svg.png",
    },
    {
      id: 3,
      name: "Amazon",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/120px-Amazon_logo.svg.png",
    },
    {
      id: 4,
      name: "Apple",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/100px-Apple_logo_black.svg.png",
    },
    {
      id: 5,
      name: "Meta",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/120px-Meta_Platforms_Inc._logo.svg.png",
    },
    {
      id: 6,
      name: "LinkedIn",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/120px-LinkedIn_icon.svg.png",
    },
    {
      id: 7,
      name: "Netflix",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/120px-Netflix_2015_logo.svg.png",
    },
    {
      id: 8,
      name: "IBM",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/120px-IBM_logo.svg.png",
    },
  ];

  return (
    <div className="w-full overflow-hidden py-4 bg-background/40 rounded-lg">
      {/* Outer container to hide overflow */}
      <div className="relative flex overflow-hidden">
        {/* First set of logos */}
        <div className="flex animate-scroll-left gap-10 whitespace-nowrap">
          {companies.map((company) => (
            <LogoItem key={company.id} company={company} />
          ))}
          {/* Duplicate logos for seamless infinite scrolling */}
          {companies.map((company) => (
            <LogoItem key={`dup-${company.id}`} company={company} />
          ))}
          {/* Triple duplicated to ensure there's always content during scroll */}
          {companies.map((company) => (
            <LogoItem key={`trip-${company.id}`} company={company} />
          ))}
        </div>

        {/* Clone to ensure seamless continuity */}
        <div
          className="flex animate-scroll-left gap-10 whitespace-nowrap"
          aria-hidden="true"
        >
          {companies.map((company) => (
            <LogoItem key={`clone-${company.id}`} company={company} />
          ))}
          {companies.map((company) => (
            <LogoItem key={`clone-dup-${company.id}`} company={company} />
          ))}
          {companies.map((company) => (
            <LogoItem key={`clone-trip-${company.id}`} company={company} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Logo Item Component
const LogoItem = ({ company }) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center h-20 w-48 flex-shrink-0",
        "transition-all duration-300 hover:scale-110"
      )}
    >
      <img
        src={company.logo}
        alt={`${company.name} logo`}
        className={cn(
          "h-12 object-contain",
          "filter grayscale hover:grayscale-0 transition-all duration-300"
        )}
      />
    </div>
  );
};

export default CompanyLogos;
