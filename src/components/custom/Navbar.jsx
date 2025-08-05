import { useTheme } from "@/contexts/ThemeProvider";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ModeToggle from "../theme/ModeToggle";
import assets from "./../../assets/assets";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme } = useTheme();

  // Determine which logo to use based on the theme
  const logo = theme === "dark" ? assets.darkLogo : assets.lightLogo;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Add padding to body to prevent content from being hidden under navbar
    // document.body.style.paddingTop = "70px";

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      className={`w-full flex items-center justify-between py-3 px-5 md:px-10 text-primary fixed top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "translate-y-2 rounded-xl shadow-lg mx-auto left-0 right-0 max-w-[96%] backdrop-blur-md bg-white/80 dark:bg-black/80"
          : "bg-white dark:bg-black"
      }`}
    >
      {/* Logo + Name */}
      <Link to="/">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="w-10 h-10 mr-2" />
          <span className="text-lg font-bold">CareerPilot</span>
        </div>
      </Link>

      {/* Desktop Links - Centered */}
      <div className="hidden md:flex items-center space-x-6 absolute left-1/2 transform -translate-x-1/2">
        <Link
          to="/"
          className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200"
        >
          Home
        </Link>
        <Link
          to="/login"
          className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200"
        >
          Register
        </Link>
        <Link
          to="/dashboard"
          className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200"
        >
          Dashboard
        </Link>
      </div>

      {/* Theme Toggle */}
      <div className="flex items-center">
        <ModeToggle />
        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="ml-3 p-1 rounded-md focus:outline-none md:hidden"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 mt-2 p-4 bg-white dark:bg-black shadow-md rounded-b-lg border-t dark:border-gray-800 flex flex-col space-y-3">
          <Link
            to="/"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/login"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
