import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X, Compass } from "lucide-react";
import { cn } from "./ui/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/gallery", label: "Gallery" },
    { path: "/vlogs", label: "Vlogs" },
    { path: "/events", label: "Upcoming Events" },
    { path: "/contact", label: "Contact Us" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300",
        isHomePage
          ? "bg-[#0A0A0F]/80 backdrop-blur-xl border-white/10"
          : "bg-white/95 backdrop-blur-sm border-[var(--border)]",
      )}
      style={
        !isHomePage ? { boxShadow: "var(--shadow-sm)" } : {}
      }
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link
            to="/"
            className={cn(
              "flex items-center gap-2 text-2xl transition-colors",
              isHomePage
                ? "text-white hover:text-[#38BDF8]"
                : "text-[var(--primary)] hover:text-[var(--ocean-blue-dark)]",
            )}
          >
            <Compass className="w-8 h-8" />
            <span className="font-semibold">SafarSangGK</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-base transition-colors relative py-2",
                  isActive(link.path)
                    ? isHomePage
                      ? "text-white"
                      : "text-[var(--primary)]"
                    : isHomePage
                      ? "text-gray-300 hover:text-white"
                      : "text-[var(--gray-dark)] hover:text-[var(--primary)]",
                )}
              >
                {link.label}
                {isActive(link.path) && (
                  <span
                    className={cn(
                      "absolute bottom-0 left-0 right-0 h-0.5",
                      isHomePage
                        ? "bg-[#38BDF8]"
                        : "bg-[var(--primary)]",
                    )}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className={cn(
              "md:hidden p-2 transition-colors",
              isHomePage
                ? "text-gray-300 hover:text-white"
                : "text-[var(--gray-dark)] hover:text-[var(--primary)]",
            )}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div
            className={cn(
              "md:hidden py-4 border-t",
              isHomePage
                ? "border-white/10"
                : "border-[var(--border)]",
            )}
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block py-3 px-4 text-base transition-colors rounded-lg",
                  isActive(link.path)
                    ? isHomePage
                      ? "text-white bg-white/10"
                      : "text-[var(--primary)] bg-[var(--muted)]"
                    : isHomePage
                      ? "text-gray-300 hover:text-white hover:bg-white/10"
                      : "text-[var(--gray-dark)] hover:text-[var(--primary)] hover:bg-[var(--muted)]",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}