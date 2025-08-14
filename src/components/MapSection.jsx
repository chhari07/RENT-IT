import React from "react";
import { FaMapMarkerAlt, FaClipboardList, FaKey } from "react-icons/fa";

const MapSection = () => {
  return (
    <section className="px-6 md:px-20 pt-10 pb-20 bg-gradient-to-b from-white to-gray-100 font-poppins">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-[#0F0E47] mb-4">
        Pickup Made Simple
      </h2>
      <p className="text-center text-gray-600 max-w-xl mx-auto mb-10">
        Collect your ride quickly and easily at our rental hub — located inside the Sanjivani College of Engineering campus.
      </p>

      <div className="grid md:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
        {/* Left: Map */}
        <div className="overflow-hidden rounded-2xl shadow-xl border-2 border-purple-200 h-[400px]">
          <iframe
            title="Sanjivani College Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3751.5714945202926!2d74.49224227468534!3d19.900308025579378!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdc4474a245d261%3A0x806a6b9889186a80!2sSanjivani%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1752071917832!5m2!1sen!2sin"
            width="100%"
            height="100%"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          ></iframe>
        </div>

        {/* Right: Steps */}
        <div>
          <h3 className="text-2xl font-bold text-[#0F0E47] mb-6">
            How to Use <span className="text-purple-600">Rent It</span>
          </h3>
          <ul className="space-y-6">
            <li className="flex items-start space-x-4">
              <div className="bg-purple-100 text-purple-600 p-3 rounded-full">
                <FaClipboardList className="text-xl" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800">
                  1. Book Online
                </h4>
                <p className="text-gray-600">
                  Choose your vehicle and confirm your booking in just a few clicks.
                </p>
              </div>
            </li>

            <li className="flex items-start space-x-4">
              <div className="bg-purple-100 text-purple-600 p-3 rounded-full">
                <FaMapMarkerAlt className="text-xl" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800">
                  2. Arrive at Pickup Location
                </h4>
                <p className="text-gray-600">
                  Visit our rental hub at Sanjivani College of Engineering.
                </p>
              </div>
            </li>

            <li className="flex items-start space-x-4">
              <div className="bg-purple-100 text-purple-600 p-3 rounded-full">
                <FaKey className="text-xl" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800">
                  3. Ride Away
                </h4>
                <p className="text-gray-600">
                  Get your keys and start your journey with ease.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
