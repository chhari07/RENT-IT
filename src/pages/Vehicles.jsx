/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const bikes = [
  {
    id: 1,
    title: "Royal Enfield Classic 350",
    description:
      "A retro-modern bike with unmatched comfort. Ideal for long scenic rides and city cruising. Comes with roadside assistance, unlimited kilometers, and a full fuel tank.",
    pricePerHour: 120,
    image:
      "https://i.pinimg.com/736x/fd/83/37/fd83372a7474aca61c03da023d234376.jpg",
  },
  {
    id: 2,
    title: "KTM Duke 390",
    description:
      "A sporty powerhouse for thrill seekers. Perfect for adventure trails and highway runs. Includes helmet, insurance, and flexible pick-up locations.",
    pricePerHour: 150,
    image:
      "https://i.pinimg.com/1200x/33/ae/3f/33ae3fc8d46ef77f3cc09c41db0c6987.jpg",
  },
  {
    id: 3,
    title: "Yamaha FZ-S FI",
    description:
      "A stylish commuter with smooth handling. Best for short city rides and daily commuting. Comes with doorstep delivery and 24x7 support.",
    pricePerHour: 110,
    image:
      "https://i.pinimg.com/736x/b5/be/1c/b5be1cb51cca93e067cba8f0bbe0181f.jpg",
  },
  {
    id: 4,
    title: "Bajaj Dominar 400",
    description:
      "Perfect balance of power and touring comfort. Best suited for long trips and weekend getaways. Includes GPS tracker, safety gear, and trip assistance.",
    pricePerHour: 140,
    image:
      "https://i.pinimg.com/736x/3f/83/80/3f8380586372c6cebb53e4c8c371ef6d.jpg",
  },
  {
    id: 5,
    title: "TVS Apache RR 310",
    description:
      "A premium sport bike for speed lovers. Great for race tracks and highway touring. Comes with advanced ABS, riding gear, and performance checks.",
    pricePerHour: 130,
    image:
      "https://i.pinimg.com/1200x/03/21/83/032183c14bd5013799857092b30abb5b.jpg",
  },
];

const cars = [
  {
    id: 6,
    title: "Maruti Suzuki Swift",
    description:
      "A compact car perfect for city rides. Easy to park, fuel-efficient, and comes with unlimited mileage for daily use.",
    pricePerHour: 200,
    image:
      "https://www.kalingatv.com/wp-content/uploads/2023/11/2024-maruti-suzuki-swift.jpg",
  },
  {
    id: 7,
    title: "Hyundai Creta",
    description:
      "Stylish SUV with a comfortable drive. Ideal for long trips and family outings. Includes AC, premium sound, and GPS navigation.",
    pricePerHour: 250,
    image:
      "https://gaadiwaadi.com/wp-content/uploads/2017/02/DC-Design-Customisation-Kits-Hyundai-Creta.png",
  },
  {
    id: 8,
    title: "Kia Sorento",
    description:
      "Premium SUV with spacious interiors. Perfect for luxury trips and group travel. Comes with leather seats, advanced infotainment, and roadside support.",
    pricePerHour: 300,
    image:
      "https://c4.wallpaperflare.com/wallpaper/35/876/43/2011-kia-sorento-wallpaper-preview.jpg",
  },
  {
    id: 9,
    title: "Mahindra Thar",
    description:
      "Off-road beast for adventure lovers. Comes with 4x4 capability, all-terrain tires, and an open-roof option for a thrilling experience.",
    pricePerHour: 280,
    image:
      "https://i.pinimg.com/736x/63/82/31/63823132e69ee1226b4aa36bfd4f41bb.jpg",
  },
  {
    id: 10,
    title: "Toyota Innova Crysta",
    description:
      "The ultimate family travel companion. Spacious, comfortable, and reliable for long journeys with premium AC and cushioned seating.",
    pricePerHour: 320,
    image:
      "https://www.theindianwire.com/wp-content/uploads/2020/11/Toyota-Innova-Crysta-Facelift-Front.jpg",
  },
];

const Vehicles = () => {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { currentUser } = useAuth();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenModal = (vehicle) => {
    setSelectedVehicle(vehicle);
    setQuantity(1);
  };

  const handleCloseModal = () => setSelectedVehicle(null);

  const handleBookNow = () => {
    if (!currentUser) {
      toast.error("Please login to continue booking");
      navigate("/login");
      return;
    }
    if (selectedVehicle) {
      sessionStorage.setItem(
        "directBooking",
        JSON.stringify({ ...selectedVehicle, quantity })
      );
      navigate("/payment");
    }
  };

  const handleAddToCart = () => {
    if (!currentUser) {
      toast.error("Please login to add to cart");
      navigate("/login");
      return;
    }
    if (selectedVehicle) {
      addToCart({ ...selectedVehicle, quantity });
      toast.success(`${selectedVehicle.title} added to cart`);
      handleCloseModal();
    }
  };

  const Section = ({ title, data }) => (
    <div className=" px-6">
      <h2 className="text-3xl font-bold text-white mb-6">{title}</h2>
      <div className="flex gap-6 overflow-x-auto scrollbar-hide">
        {data.map((item) => (
          <div
            key={item.id}
            onClick={() => handleOpenModal(item)}
            className="relative flex-shrink-0 w-80 h-[450px] bg-cover bg-center rounded-xl cursor-pointer overflow-hidden shadow-lg"
            style={{ backgroundImage: `url(${item.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
            <div className="absolute bottom-0 p-5 z-10">
              <span className="text-yellow-400 font-bold text-lg">
                ₹{item.pricePerHour}/hr
              </span>
              <h3 className="text-white text-xl font-semibold mt-2">
                {item.title}
              </h3>
              <p className="text-gray-300 text-sm mt-1 line-clamp-2">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (loading) return <Loader />;

  return (
    <div className="pt-24 bg-black min-h-screen">
      <Section title="Popular Bikes" data={bikes} />
      <Section title="Popular Cars" data={cars} />

      {/* Modal */}
      <AnimatePresence>
        {selectedVehicle && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-[#1a1a1a] rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden relative text-white flex flex-col md:flex-row"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              {/* Left side - Image */}
              <div className="md:w-1/2">
                <img
                  src={selectedVehicle.image}
                  alt={selectedVehicle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Right side - Info */}
              <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-2">
                    {selectedVehicle.title}
                  </h3>
                  <p className="text-gray-400 mb-4">
                    {selectedVehicle.description}
                  </p>
                  <p className="text-yellow-400 font-bold text-lg mb-6">
                    ₹{selectedVehicle.pricePerHour}/hr
                  </p>
                  <div className="flex items-center gap-4 mb-6">
                    <label className="font-medium">Quantity:</label>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(
                          Math.max(1, parseInt(e.target.value) || 1)
                        )
                      }
                      className="w-16 px-2 py-1 border border-gray-700 rounded-md text-center bg-black text-white"
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    className="w-full bg-yellow-400  text-white px-6 py-2 rounded-xl font-semibold transition"
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="w-full bg-white hover:bg-gray-200 text-black px-6 py-2 rounded-xl font-semibold transition"
                    onClick={handleBookNow}
                  >
                    Book Now
                  </button>
                </div>
              </div>

              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-3xl text-gray-400 hover:text-purple-400"
              >
                &times;
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Vehicles;
