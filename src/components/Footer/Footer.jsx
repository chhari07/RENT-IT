import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 font-poppins">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-10 border-b border-gray-800">
        {/* Logo and Description */}
        <div>
          <h2 className="text-2xl font-bold text-white">RENT IT</h2>
          <p className="text-sm mt-3 leading-relaxed text-gray-400">
            Making your travel easier, faster, and more exciting.
            Discover vehicles for every journey — anytime, anywhere.
          </p>
        </div>

        {/* About Us */}
        <div>
          <h3 className="font-semibold text-white mb-4">About Us</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-purple-400 transition">How it Works</Link></li>
            <li><Link to="/" className="hover:text-purple-400 transition">Partnership</Link></li>
            <li><Link to="/" className="hover:text-purple-400 transition">Business</Link></li>
          </ul>
        </div>

        {/* Community */}
        <div>
          <h3 className="font-semibold text-white mb-4">Community</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-purple-400 transition">Events</Link></li>
            <li><Link to="/" className="hover:text-purple-400 transition">Blog</Link></li>
            <li><Link to="/" className="hover:text-purple-400 transition">Invite a Friend</Link></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex gap-4 text-lg">
            <a href="/" className="hover:text-purple-400 transition"><FaInstagram /></a>
            <a href="/" className="hover:text-purple-400 transition"><FaFacebookF /></a>
            <a href="/" className="hover:text-purple-400 transition"><FaTwitter /></a>
            <a href="/" className="hover:text-purple-400 transition"><FaYoutube /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
        <p>© {new Date().getFullYear()} RENT IT. All rights reserved.</p>
        <div className="flex gap-4 mt-2 md:mt-0">
          <Link to="/" className="hover:text-purple-400 transition">Privacy Policy</Link>
          <Link to="/" className="hover:text-purple-400 transition">Terms & Conditions</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
