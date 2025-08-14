import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    setIsOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      alert("Logout failed");
      console.error(error);
    }
  };

  const menuLinks = [
    { path: "/", label: "Home" },
    { path: "/vehicles", label: "Vehicles" },
    { path: "/bookings", label: "Cart" },
    { path: "/history", label: "History" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg px-6 md:px-12 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Brand */}
        <Link to="/" className="text-4xl  font-extrabold text-black    tracking-wide hover:scale-105 transition-transform">
          RENT IT
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-black font-medium items-center">
          {menuLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`px-4 py-2 rounded-full transition-all duration-200 ${
                  location.pathname === link.path
                    ? "bg-yellow-400 text-black shadow-md"
                    : "hover:bg-yellow-300 hover:text-black"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}

          {currentUser ? (
            <div className="relative ml-4" ref={dropdownRef}>
              <div
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-10 h-10 bg-yellow-400 text-black flex items-center justify-center rounded-full cursor-pointer font-bold hover:scale-105 transition"
              >
                {currentUser.email.charAt(0).toUpperCase()}
              </div>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-md p-3 z-50 border border-gray-200">
                  <p className="text-sm text-gray-800 font-semibold truncate mb-2">
                    {currentUser.email}
                  </p>
                  <button
                    onClick={handleLogout}
                    className="w-full bg-red-500 text-white py-1 rounded-md hover:bg-red-600 text-sm"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className="bg-yellow-400 text-black px-4 py-2 rounded-full font-semibold hover:bg-yellow-300 transition transform hover:scale-105"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="bg-yellow-400 text-black px-4 py-2 rounded-full font-semibold hover:bg-yellow-300 transition transform hover:scale-105"
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          {isOpen ? (
            <FiX
              className="text-3xl text-black cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          ) : (
            <FiMenu
              className="text-3xl text-black cursor-pointer"
              onClick={() => setIsOpen(true)}
            />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white px-6 py-4 shadow-lg border-t border-gray-200">
          <ul className="flex flex-col space-y-4 text-black font-medium">
            {menuLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`px-4 py-2 rounded-full transition ${
                    location.pathname === link.path
                      ? "bg-yellow-400 text-black shadow-md"
                      : "hover:bg-yellow-300"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {currentUser ? (
              <>
                <li className="text-sm text-black font-semibold truncate">
                  {currentUser.email}
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full bg-red-500 text-white py-1 rounded-md hover:bg-red-600 text-sm"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className="bg-yellow-400 text-black px-4 py-2 rounded-full hover:bg-yellow-300 transition"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="bg-yellow-400 text-black px-4 py-2 rounded-full hover:bg-yellow-300 transition"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
