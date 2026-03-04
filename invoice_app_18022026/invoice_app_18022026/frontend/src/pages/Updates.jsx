import React from "react";
import { useNavigate } from "react-router-dom";

const Updates = () => {
  const navigate = useNavigate();   // ✅ Initialize navigate

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-white shadow-2xl rounded-2xl p-12 text-center transform transition duration-500 hover:scale-105 max-w-lg w-full">
        
        <h1 className="text-4xl font-bold text-gray-800 mb-4 animate-pulse">
          🚀 Updates Coming Soon
        </h1>
        
        <p className="text-gray-600 text-lg leading-relaxed">
          We’re building powerful AI-driven features to enhance your experience.
          Stay tuned for something innovative and impactful.
        </p>

        <div className="mt-8">
          <button
            onClick={() => navigate("/services")}
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg transition duration-300"
          >
            Explore Services
          </button>
        </div>

      </div>
    </div>
  );
};

export default Updates;