import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Bookings = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const [selectedIds, setSelectedIds] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  const toggleSelection = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const bookSelected = () => {
    const selectedVehicles = cart.filter((item) =>
      selectedIds.includes(item.cartItemId)
    );

    if (selectedVehicles.length === 0) {
      setShowAlert(true);
      return;
    }

    const paymentData = selectedVehicles.map((v) => ({
      ...v,
      totalPrice: (v.pricePerHour || 1) * (v.quantity || 1),
    }));

    selectedVehicles.forEach((v) => removeFromCart(v.cartItemId));
    sessionStorage.setItem("directBooking", JSON.stringify(paymentData));
    navigate("/payment");
  };

  if (cart.length === 0) {
    return (
      <div className="pt-24 pb-20 min-h-[60vh] flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold text-white mb-4">
          No vehicles in your cart
        </h2>
        <p className="text-gray-400 text-sm">
          Browse and add vehicles to book them.
        </p>
      </div>
    );
  }

  return (
    <div className="pt-24 px-4 sm:px-6 md:px-12 min-h-screen bg-black text-white">
      <h2 className="text-3xl font-bold mb-10 text-center">Your Bookings</h2>

      {/* Scroll on mobile / Grid on desktop */}
      <div
        className="
          flex gap-4 overflow-x-auto md:overflow-visible scrollbar-hide scroll-smooth pb-4
          md:grid md:grid-cols-[repeat(auto-fit,minmax(260px,1fr))] md:gap-4 lg:gap-3
        "
      >
        {cart.map((vehicle) => (
          <div
            key={vehicle.cartItemId}
            onClick={() => toggleSelection(vehicle.cartItemId)}
            className={`relative flex-shrink-0 w-72 sm:w-64 md:w-full h-[430px] bg-cover bg-center rounded-xl cursor-pointer overflow-hidden shadow-lg border-4 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${
              selectedIds.includes(vehicle.cartItemId)
                ? "border-purple-500"
                : "border-transparent"
            }`}
            style={{ backgroundImage: `url(${vehicle.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>

            {/* Price & Title */}
            <div className="absolute bottom-0 p-5 z-10 w-full">
              <span className="text-purple-400 font-bold text-lg">
                ₹{vehicle.pricePerHour || 1}/hr
              </span>
              <h3 className="text-white text-xl font-semibold mt-2">
                {vehicle.title}
              </h3>
              <p className="text-gray-300 text-sm mt-1 line-clamp-2">
                {vehicle.description}
              </p>
              <p className="text-sm mt-1 text-gray-400">
                Quantity: {vehicle.quantity || 1}
              </p>

              {/* Buttons */}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const totalPrice =
                      (vehicle.pricePerHour || 1) * (vehicle.quantity || 1);
                    removeFromCart(vehicle.cartItemId);
                    navigate("/payment", {
                      state: { vehicle: { ...vehicle, totalPrice } },
                    });
                  }}
                  className="flex-1 border-white border-2   text-white  py-2 rounded-lg text-sm transition-colors"
                >
                  Book Now
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromCart(vehicle.cartItemId);
                  }}
                  className="flex-1 bg-yellow-400   text-white py-2 rounded-lg text-sm transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Actions */}
      <div className="mt-10 flex flex-col items-center gap-4 relative">
        {showAlert && (
          <div className="absolute -top-8 text-sm text-red-400 font-semibold">
            Please select at least one vehicle to proceed.
          </div>
        )}
        <button
          onClick={bookSelected}
          className="bg-red-600    text-white px-6 py-2 rounded-lg font-semibold transition-colors"
        >
          Book Selected
        </button>
        <button
          onClick={clearCart}
          className="bg-gray-700 hover:bg-gray-900 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default Bookings;
