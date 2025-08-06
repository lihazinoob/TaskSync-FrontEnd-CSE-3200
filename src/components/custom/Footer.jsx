import { useTheme } from "@/contexts/ThemeProvider";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import assets from "./../../assets/assets";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { theme } = useTheme();

  const logo = theme === "dark" ? assets.darkLogo : assets.lightLogo;

  return (
    <footer className="w-full border-t bg-background py-6 flex justify-center">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <Link to="/" className="flex items-center space-x-2">
              <img src={logo} alt="Logo" className="h-6 w-6 dark:hidden" />
              <img
                src={logo}
                alt="Logo"
                className="hidden h-6 w-6 dark:block"
              />
              <span className="text-lg font-semibold">TaskSync</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your AI-powered career guidance platform to navigate your
              professional journey.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/careers"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Career Paths
                </Link>
              </li>
              <li>
                <Link
                  to="/jobs"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Job Board
                </Link>
              </li>
              <li>
                <Link
                  to="/skills"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Skill Development
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/about"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium">Connect</h3>
            <div className="flex space-x-3">
              <a
                href="#"
                aria-label="LinkedIn"
                className="text-muted-foreground hover:text-foreground"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="text-muted-foreground hover:text-foreground"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="GitHub"
                className="text-muted-foreground hover:text-foreground"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="mailto:contact@careerpilot.com"
                aria-label="Email"
                className="text-muted-foreground hover:text-foreground"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-6">
          <div className="text-center text-xs text-muted-foreground">
            © {currentYear} CareerPilot. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
