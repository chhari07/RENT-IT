import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { db, auth } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const razorpayKey = "rzp_live_hHt82RgX5fhxr0";

  const [vehicles, setVehicles] = useState([]);
  const [pickup, setPickup] = useState(new Date());
  const [dropoff, setDropoff] = useState(new Date(Date.now() + 60 * 60 * 1000));
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setUserId(user.uid);
      else setUserId(null);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const direct = sessionStorage.getItem("directBooking");

    if (location.state?.vehicle) {
      setVehicles([location.state.vehicle]);
    } else if (direct) {
      try {
        const data = JSON.parse(direct);
        setVehicles(Array.isArray(data) ? data : [data]);
      } catch {
        setVehicles([]);
      }
    } else {
      setVehicles([]);
    }
  }, [location.state]);

  const isSameDay = pickup.toDateString() === dropoff.toDateString();

  const getTotalPrice = () => {
    const durationInHours = Math.max(
      1,
      Math.ceil((dropoff - pickup) / (1000 * 60 * 60))
    );
    return vehicles.reduce((acc, v) => {
      const pricePerHour = v.pricePerHour || 1;
      const qty = v.quantity || 1;
      return acc + qty * pricePerHour * durationInHours;
    }, 0);
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadRazorpayScript();
    if (!res) {
      alert("Razorpay SDK failed to load.");
      return;
    }

    const amount = getTotalPrice() * 100;

    const options = {
      key: razorpayKey,
      amount,
      currency: "INR",
      name: "Rent It",
      description: "Vehicle Booking Payment",
      handler: async function () {
        if (!userId) {
          alert("User not logged in. Cannot store booking.");
          return;
        }
        try {
          await addDoc(collection(db, "bookings"), {
            userId,
            vehicles,
            pickup: pickup.toISOString(),
            dropoff: dropoff.toISOString(),
            totalAmount: getTotalPrice(),
            timestamp: serverTimestamp(),
          });
        } catch (e) {
          console.error("Failed to save booking:", e);
        }
        sessionStorage.removeItem("directBooking");
        navigate("/payment-success");
      },
      prefill: {
        name: "Test User",
        email: "test@example.com",
        contact: "9999999999",
      },
      notes: {
        booking_time: `${pickup.toString()} - ${dropoff.toString()}`,
      },
      theme: {
        color: "#8B5CF6",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="pt-24 min-h-screen bg-black text-white px-4 md:px-20">
      <h2 className="text-4xl font-bold mb-10 text-center text-white tracking-wide">
        Checkout
      </h2>

      {vehicles.length === 0 ? (
        <p className="text-center text-lg text-gray-400">No booking found.</p>
      ) : (
        <>
          {/* Date/Time Selection */}
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div>
              <label className="block mb-2 font-medium text-purple-400">
                Pickup Date & Time
              </label>
              <DatePicker
                selected={pickup}
                onChange={(date) => {
                  setPickup(date);
                  if (dropoff < date) {
                    setDropoff(new Date(date.getTime() + 60 * 60 * 1000));
                  }
                }}
                showTimeSelect
                minDate={new Date()}
                dateFormat="Pp"
                className="w-full border border-gray-700 bg-gray-900 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-purple-400">
                Drop-off Date & Time
              </label>
              <DatePicker
                selected={dropoff}
                onChange={(date) => setDropoff(date)}
                showTimeSelect
                minDate={pickup}
                minTime={isSameDay ? pickup : new Date().setHours(0, 0, 0, 0)}
                maxTime={
                  isSameDay
                    ? new Date(
                        pickup.getFullYear(),
                        pickup.getMonth(),
                        pickup.getDate(),
                        23,
                        59
                      )
                    : new Date().setHours(23, 59, 59, 999)
                }
                dateFormat="Pp"
                className="w-full border border-gray-700 bg-gray-900 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Vehicle Details */}
          <div className="space-y-6 mb-10">
            {vehicles.map((v, i) => (
              <div
                key={v.id || i}
                className="relative bg-cover bg-center rounded-xl overflow-hidden shadow-lg"
                style={{
                  backgroundImage: `url(${v.image || "https://via.placeholder.com/400"})`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
                <div className="relative p-6">
                  <h3 className="text-2xl font-bold text-white">{v.title}</h3>
                  <p className="text-gray-300 text-sm mt-1">{v.description}</p>
                  <p className="mt-3 text-purple-400 font-semibold">
                    ₹{v.pricePerHour || 1}/hr × {v.quantity || 1} unit(s)
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Summary & Pay */}
          <div className="text-center">
            <p className="text-2xl font-bold mb-6 text-purple-400">
              Total Amount: ₹{getTotalPrice()}
            </p>
            <button
              onClick={handlePayment}
              className="bg-purple-600 hover:bg-purple-800 px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
            >
              Proceed to Pay
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Payment;
