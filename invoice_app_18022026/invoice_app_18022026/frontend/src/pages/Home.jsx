import React from "react";
import { Link } from "react-router-dom";
import { Truck, FileText, ArrowRight } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900 to-purple-700 text-white">

      {/* ================= HERO SECTION ================= */}
      <div className="text-center max-w-3xl mx-auto px-6 pt-24 pb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          AI-Powered <span className="text-yellow-400">Invoice</span> Generation
        </h1>

        <p className="text-lg text-gray-300 mb-8">
          Upload your Excel files and let our AI extract the data, calculate totals,
          and generate professional invoices in seconds.
        </p>

        {/* Guidance Button */}
        <Link
          to="/guidance"
          className="inline-flex items-center px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-xl transition"
        >
          📘 How It Works
        </Link>
      </div>

      {/* ================= INVOICE CARDS ================= */}
      <div className="max-w-5xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* Bill Invoice Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 p-8 shadow-xl hover:scale-105 transition duration-300">
            <div className="bg-blue-600 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
              <Truck className="w-7 h-7 text-white" />
            </div>

            <h2 className="text-2xl font-bold mb-3">
              Bill Invoice
            </h2>

            <p className="text-gray-300 mb-6">
              For freight and transportation bills. Extracts delivery runs,
              truck numbers, and calculates totals based on MT quantity.
            </p>

            <Link
              to="/bill-invoice"
              state={{ redirectTo: "/bill-invoice" }}
              className="inline-flex items-center justify-center w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold transition"
            >
              Create Bill Invoice
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>

          {/* Tax Invoice Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 p-8 shadow-xl hover:scale-105 transition duration-300">
            <div className="bg-blue-600 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
              <FileText className="w-7 h-7 text-white" />
            </div>

            <h2 className="text-2xl font-bold mb-3">
              Tax Invoice
            </h2>

            <p className="text-gray-300 mb-6">
              Standard tax invoices with GST calculations. Ideal for goods
              and services billing with multiple line items using automation.
            </p>

            <Link
              to="/tax-invoice"
              state={{ redirectTo: "/tax-invoice" }}
              className="inline-flex items-center justify-center w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold transition"
            >
              Create Tax Invoice
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Home;