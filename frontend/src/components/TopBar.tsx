import { Link } from "react-router-dom";
import octopiLogo from "@/assets/octopi.svg";

export const TopBar = () => {
  const handleNavigation = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-3 sm:py-4">
        <Link
          to="/openscientist"
          className="flex items-center gap-2 sm:gap-2.5 w-fit"
          onClick={handleNavigation}
        >
          <img
            src={octopiLogo}
            alt="OpenScientist Logo"
            className="w-10 h-10 sm:w-12 sm:h-12 lg:w-12 lg:h-12"
          />
          <span className="text-lg sm:text-xl lg:text-[22px] xl:text-2xl font-medium text-foreground whitespace-nowrap font-serif">
            OpenScientist
          </span>
        </Link>
      </div>
    </div>
  );
};
