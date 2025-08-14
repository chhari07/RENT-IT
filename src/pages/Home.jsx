/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaMotorcycle,
  FaCarSide,
  FaTags,
  FaClock,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";
import PopularStrip from "../components/PopularStrip";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Home = () => {
  const [mapUrl, setMapUrl] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}&output=embed`;
          setMapUrl(googleMapsUrl);
        },
        (err) => {
          console.error(err);
          // Fallback: Sanjivani College area
          setMapUrl(
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3751.5714945202926!2d74.49224227468534!3d19.900308025579378"
          );
        }
      );
    }
  }, []);

  const steps = [
    "Choose your vehicle",
    "Select pickup & drop-off",
    "Confirm your booking",
    "Pick up & ride",
  ];

  return (
    <div className="pt-20 font-poppins overflow-hidden bg-black text-white">
      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1
            className="text-[6rem] md:text-[9rem] font-bold leading-none tracking-wider drop-shadow-lg"
            style={{ fontFamily: "'Cinzel Decorative', serif" }}
          >
            RENT
          </h1>
          <p
            className="text-[3rem] md:text-[4rem] italic -mt-6 drop-shadow-lg"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            IT
          </p>
        </motion.div>

        <motion.div
          className="relative z-10 mt-8 max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
            Your Journey, <span className="text-yellow-400">Your Rules</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg md:text-xl">
            Choose from premium bikes and cars. No hidden fees, no hassle — just
            smooth rides when you need them.
          </p>

          <div className="flex justify-center gap-4 mt-8 flex-wrap">
            <Link to="/vehicles?type=bike">
              <button className="px-6 py-3 bg-yellow-400 text-black rounded-lg shadow-lg hover:bg-yellow-300 font-semibold transition transform hover:-translate-y-1">
                Browse Bikes
              </button>
            </Link>
            <Link to="/vehicles?type=car">
              <button className="px-6 py-3 border border-yellow-400 text-yellow-400 rounded-lg font-semibold hover:bg-yellow-400 hover:text-black transition transform hover:-translate-y-1">
                Browse Cars
              </button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* VEHICLE TYPES */}
      <motion.section
        className="py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <motion.div
          className="bg-black border border-gray-800 rounded-lg shadow-md hover:shadow-white/20 overflow-hidden transition transform hover:-translate-y-1"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-center h-72 overflow-hidden">
            <img
              src="https://i.pinimg.com/736x/aa/08/a0/aa08a0f01d14825db755b6ab53d7f1aa.jpg"
              alt="Bikes"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 text-center">
            <FaMotorcycle className="text-5xl mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">
              Bikes for Every Ride
            </h2>
            <p className="text-gray-400">
              Agile, fuel-efficient, and fun — perfect for quick trips or
              weekend escapes.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="bg-black border border-gray-800 rounded-lg shadow-md hover:shadow-white/20 overflow-hidden transition transform hover:-translate-y-1"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-center h-72 overflow-hidden">
            <img
              src="https://i.pinimg.com/736x/8d/7c/eb/8d7cebed55acedfe083f9c62abc2968e.jpg"
              alt="Cars"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 text-center">
            <FaCarSide className="text-5xl mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Cars for Comfort</h2>
            <p className="text-gray-400">
              From compact to luxury — smooth, stylish rides tailored to you.
            </p>
          </div>
        </motion.div>
      </motion.section>

      {/* POPULAR VEHICLES */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
        viewport={{ once: true }}
        className="py-12"
      >
        <PopularStrip />
      </motion.div>

      {/* PICKUP SECTION (Inline Stepper + Map) */}
      <motion.section
        className="bg-black py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        {/* LEFT: Stepper */}
        <div>
          <FaMapMarkerAlt className="text-4xl mb-4" />
          <h2 className="text-3xl font-bold mb-3">Pickup Made Simple</h2>
          <p className="text-gray-400 mb-8">
            Getting started with Rent It is quick and easy. Follow the steps:
          </p>

          {/* Horizontal inline stepper (desktop) */}
          <ol className="hidden md:flex items-center justify-between gap-4">
            {steps.map((label, idx) => (
              <li key={idx} className="flex items-center w-full">
                {/* Node */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-yellow-400 text-black font-bold flex items-center justify-center shadow">
                    {idx + 1}
                  </div>
                  <p className="mt-3 text-sm text-gray-300 max-w-[9rem]">
                    {label}
                  </p>
                </div>
                {/* Connector */}
                {idx < steps.length - 1 && (
                  <div className="flex-1 h-1 bg-gray-700 mx-3 rounded"></div>
                )}
              </li>
            ))}
          </ol>

          {/* Vertical timeline (mobile) */}
          <ol className="md:hidden relative border-l border-gray-700 pl-6 space-y-6">
            {steps.map((label, idx) => (
              <li key={idx} className="relative">
                <span className="absolute -left-6 top-0 flex items-center justify-center w-8 h-8 rounded-full bg-yellow-400 text-black font-bold shadow">
                  {idx + 1}
                </span>
                <p className="text-gray-300">{label}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* RIGHT: Map */}
        <div className="rounded-lg overflow-hidden shadow-lg border border-gray-700">
          {mapUrl ? (
            <iframe
              title="Pickup Location Map"
              src={mapUrl}
              width="100%"
              height="420"
              className="w-full h-[420px]"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          ) : (
            <p className="text-gray-500 p-6">Loading your location...</p>
          )}
        </div>
      </motion.section>

      {/* SERVICES */}
      {/* SERVICES */}
<motion.section
  className="py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-3 gap-8"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={fadeInUp}
>
  {/* Card 1 */}
  <article className="w-full bg-gray-700 shadow p-4 space-y-2 rounded-md hover:-translate-y-2 duration-300">
    <svg
      viewBox="0 0 24 24"
      fill="none"
      height="24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="w-10 h-10 text-gray-300 bg-gray-600 rounded-full p-1"
    >
      <path
        d="m8.032 12 1.984 1.984 4.96-4.96m4.55 5.272.893-.893a1.984 1.984 0 0 0 0-2.806l-.893-.893a1.984 1.984 0 0 1-.581-1.403V7.04a1.984 1.984 0 0 0-1.984-1.984h-1.262a1.983 1.983 0 0 1-1.403-.581l-.893-.893a1.984 1.984 0 0 0-2.806 0l-.893.893a1.984 1.984 0 0 1-1.403.581H7.04A1.984 1.984 0 0 0 5.055 7.04v1.262c0 .527-.209 1.031-.581 1.403l-.893.893a1.984 1.984 0 0 0 0 2.806l.893.893c.372.372.581.876.581 1.403v1.262a1.984 1.984 0 0 0 1.984 1.984h1.262c.527 0 1.031.209 1.403.581l.893.893a1.984 1.984 0 0 0 2.806 0l.893-.893a1.985 1.985 0 0 1 1.403-.581h1.262a1.984 1.984 0 0 0 1.984-1.984V15.7c0-.527.209-1.031.581-1.403Z"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
        stroke="currentColor"
      ></path>
    </svg>
    <p className="text-sm w-full text-gray-300">
      Transparent pricing with no hidden fees — what you see is what you pay.
    </p>
  </article>

  {/* Card 2 */}
  <article className="w-full bg-gray-700 shadow p-4 space-y-2 rounded-md hover:-translate-y-2 duration-300">
    <svg
      viewBox="0 0 24 24"
      fill="none"
      height="24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="w-10 h-10 text-gray-300 bg-gray-600 rounded-full p-1"
    >
      <path
        d="m8.032 12 1.984 1.984 4.96-4.96m4.55 5.272.893-.893a1.984 1.984 0 0 0 0-2.806l-.893-.893a1.984 1.984 0 0 1-.581-1.403V7.04a1.984 1.984 0 0 0-1.984-1.984h-1.262a1.983 1.983 0 0 1-1.403-.581l-.893-.893a1.984 1.984 0 0 0-2.806 0l-.893.893a1.984 1.984 0 0 1-1.403.581H7.04A1.984 1.984 0 0 0 5.055 7.04v1.262c0 .527-.209 1.031-.581 1.403l-.893.893a1.984 1.984 0 0 0 0 2.806l.893.893c.372.372.581.876.581 1.403v1.262a1.984 1.984 0 0 0 1.984 1.984h1.262c.527 0 1.031.209 1.403.581l.893.893a1.984 1.984 0 0 0 2.806 0l.893-.893a1.985 1.985 0 0 1 1.403-.581h1.262a1.984 1.984 0 0 0 1.984-1.984V15.7c0-.527.209-1.031.581-1.403Z"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
        stroke="currentColor"
      ></path>
    </svg>
    <p className="text-sm w-full text-gray-300">
      Flexible rentals — choose hourly, daily, or weekly plans to match your needs.
    </p>
  </article>

  {/* Card 3 */}
  <article className="w-full bg-gray-700 shadow p-4 space-y-2 rounded-md hover:-translate-y-2 duration-300">
    <svg
      viewBox="0 0 24 24"
      fill="none"
      height="24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="w-10 h-10 text-gray-300 bg-gray-600 rounded-full p-1"
    >
      <path
        d="m8.032 12 1.984 1.984 4.96-4.96m4.55 5.272.893-.893a1.984 1.984 0 0 0 0-2.806l-.893-.893a1.984 1.984 0 0 1-.581-1.403V7.04a1.984 1.984 0 0 0-1.984-1.984h-1.262a1.983 1.983 0 0 1-1.403-.581l-.893-.893a1.984 1.984 0 0 0-2.806 0l-.893.893a1.984 1.984 0 0 1-1.403.581H7.04A1.984 1.984 0 0 0 5.055 7.04v1.262c0 .527-.209 1.031-.581 1.403l-.893.893a1.984 1.984 0 0 0 0 2.806l.893.893c.372.372.581.876.581 1.403v1.262a1.984 1.984 0 0 0 1.984 1.984h1.262c.527 0 1.031.209 1.403.581l.893.893a1.984 1.984 0 0 0 2.806 0l.893-.893a1.985 1.985 0 0 1 1.403-.581h1.262a1.984 1.984 0 0 0 1.984-1.984V15.7c0-.527.209-1.031.581-1.403Z"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
        stroke="currentColor"
      ></path>
    </svg>
    <p className="text-sm w-full text-gray-300">
      Premium, well-maintained bikes and cars to ensure every ride is safe and smooth.
    </p>
  </article>
</motion.section>

    </div>
  );
};

export default Home;
