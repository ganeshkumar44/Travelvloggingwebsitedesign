import { Link } from "react-router";
import {
  Compass,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--charcoal)] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link
              to="/"
              className="flex items-center gap-2 text-2xl mb-4"
            >
              <Compass className="w-8 h-8 text-[var(--sunset-orange)]" />
              <span className="font-semibold">SafarSangGK</span>
            </Link>
            <p className="text-gray-300 mb-6">
              Exploring the world one adventure at a time. Join
              me on my journey to discover breathtaking
              destinations.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[var(--primary)] flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[var(--primary)] flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[var(--primary)] flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[var(--primary)] flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-[var(--sunset-orange)] transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/gallery"
                  className="text-gray-300 hover:text-[var(--sunset-orange)] transition-colors"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  to="/events"
                  className="text-gray-300 hover:text-[var(--sunset-orange)] transition-colors"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-[var(--sunset-orange)] transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg mb-4">Explore</h3>
            <ul className="space-y-3">
              <li className="text-gray-300 hover:text-[var(--sunset-orange)] transition-colors cursor-pointer">
                Beaches
              </li>
              <li className="text-gray-300 hover:text-[var(--sunset-orange)] transition-colors cursor-pointer">
                Mountains
              </li>
              <li className="text-gray-300 hover:text-[var(--sunset-orange)] transition-colors cursor-pointer">
                Cities
              </li>
              <li className="text-gray-300 hover:text-[var(--sunset-orange)] transition-colors cursor-pointer">
                Adventure
              </li>
              <li className="text-gray-300 hover:text-[var(--sunset-orange)] transition-colors cursor-pointer">
                Food & Culture
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg mb-4">Get In Touch</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-300">
                <Mail className="w-5 h-5 mt-1 text-[var(--sunset-orange)]" />
                <span>ganeshkr.in90@gmai.com</span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <Phone className="w-5 h-5 mt-1 text-[var(--sunset-orange)]" />
                <span>+91 9999-042-211</span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <MapPin className="w-5 h-5 mt-1 text-[var(--sunset-orange)]" />
                <span>New Delhi, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-400">
          <p>
            &copy; {currentYear} SafarSangGK Travel Vlog. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}