import React from "react";

const Aboutus = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 px-6 py-16">

      {/* Hero Section */}
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-6">
          About Our <span className="text-purple-600">AI Invoice Generator</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Smart. Fast. Automated invoicing powered by Artificial Intelligence.
          Simplifying billing for modern businesses.
        </p>
      </div>

      {/* Stats Section */}
      <div className="max-w-4xl mx-auto mt-16 grid md:grid-cols-3 gap-8 text-center">
        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
          <h2 className="text-3xl font-bold text-purple-600">100+</h2>
          <p className="text-gray-500 mt-2">Invoices Generated</p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
          <h2 className="text-3xl font-bold text-purple-600">50+</h2>
          <p className="text-gray-500 mt-2">Happy Users</p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
          <h2 className="text-3xl font-bold text-purple-600">99%</h2>
          <p className="text-gray-500 mt-2">Accuracy Rate</p>
        </div>
      </div>

      {/* Description Section */}
      <div className="max-w-4xl mx-auto mt-16 text-gray-700 space-y-6 text-center">
        <p>
          Our AI Invoice Generator is built to transform the way businesses
          create and manage invoices. With intelligent automation, you can
          generate professional invoices in seconds without manual effort.
        </p>

        <p>
          Whether you're a freelancer, startup, or enterprise, our platform
          helps you reduce errors, save time, and streamline your billing
          workflow effortlessly.
        </p>

        <p>
          We focus on delivering innovative financial tools that combine
          simplicity, speed, and reliability — empowering businesses to grow
          smarter every day.
        </p>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto mt-20 grid md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            ⚡ Instant Generation
          </h3>
          <p className="text-gray-600">
            Create invoices instantly with smart AI-powered automation.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            🤖 Intelligent Calculations
          </h3>
          <p className="text-gray-600">
            Automatic totals, taxes, and error-free financial calculations.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            🔒 Secure & Reliable
          </h3>
          <p className="text-gray-600">
            Your data is protected with modern security standards.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      {/* <div className="text-center mt-20">
        <button className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-full shadow-lg transition duration-300">
          Start Creating Smart Invoices
        </button>
      </div> */}

      {/* Footer */}
      <footer className="text-center mt-16 text-sm text-gray-500">
        © {new Date().getFullYear()} AI Invoice Generator. All rights reserved.
      </footer>

    </div>
  );
};

export default Aboutus;