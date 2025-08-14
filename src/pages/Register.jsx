import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👈 New state
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Force logout after successful registration
      await signOut(auth);

      toast.success("Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      toast.error("Registration failed. " + error.message);
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Image Section */}
      <div className="md:w-1/2 w-full relative">
        <img
          src="https://i.pinimg.com/736x/26/5d/f0/265df07e6695c3b0865d32c76441ad3e.jpg"
          alt="Register visual"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Form Section */}
      <div className="md:w-1/2 w-full flex items-center justify-center bg-black px-6 md:px-12 py-12">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
          <h2 className="text-3xl font-bold text-center text-[#0F0E47] mb-6">
            Create Account
          </h2>
          <form onSubmit={handleRegister} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[#0F0E47] mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#505081]"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-[#0F0E47] mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#505081]"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-600 hover:text-[#505081] focus:outline-none"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-[#505081] hover:bg-[#3e3e6f] text-white py-2 rounded-md text-lg font-semibold transition"
            >
              Register
            </button>

            {/* Login Link */}
            <p className="text-center text-sm text-gray-600 mt-4">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#505081] font-medium hover:underline"
              >
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
