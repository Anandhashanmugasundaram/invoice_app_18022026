import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FileText, Home } from "lucide-react";

const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen font-sans">

      {/* ================= HEADER (WHITE NAV ONLY) ================= */}
      <header className="bg-black border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">

            {/* Logo */}
            <Link to="/" className="flex items-center no-underline">
              <div className="bg-purple-600 p-2 rounded-lg mr-3">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl text-white">
                InvoiceGen
              </span>
            </Link>

            {/* Navigation */}
            <nav className="flex space-x-8">
              <Link
                to="/dashboard"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition ${
                  location.pathname === "/dashboard"
                    ? "border-purple-600 text-white"
                    : "border-transparent text-white hover:border-white hover:text-gray-300"
                }`}
              >
                <Home className="w-4 h-4 mr-2" />
                Dashboard
              </Link>

              <Link
                to="/Aboutus"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition ${
                  location.pathname === "/Aboutus"
                    ? "border-purple-600 text-white"
                    : "border-transparent text-white hover:border-white hover:text-gray-300"
                }`}
              >
                About Us
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* ================= PAGE CONTENT (THEME CONTROLLED BY PAGE) ================= */}
      <main>
        {children}
      </main>

    </div>
  );
};

export default Layout;