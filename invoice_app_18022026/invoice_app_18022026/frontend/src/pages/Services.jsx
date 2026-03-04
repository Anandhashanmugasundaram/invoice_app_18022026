import React from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Package, ClipboardList, Percent } from "lucide-react";

export default function Services() {
  const navigate = useNavigate();

  const services = [
    {
      title: "Create Your AI-Invoice",
      description:
        "Create, manage and export professional GST-compliant invoices in seconds with automated tax calculations.",
      icon: <FileText size={40} />,
      action: () => navigate("/dashboard"),
    },
    {
      title: "Inventory Management",
      description:
        "Monitor stock levels in real-time, manage products and prevent shortages with intelligent tracking.",
      icon: <Package size={40} />,
      action: () => navigate("/"),
    },
    {
      title: "Smart Purchase Order System",
      description:
        "Generate and manage purchase orders with vendor tracking and automated status updates.",
      icon: <ClipboardList size={40} />,
      action: () => navigate("/"),
    },
    {
      title: "Flexible Bill Discount Engine",
      description:
        "Apply dynamic discount strategies and maintain full visibility of profit margins and reporting.",
      icon: <Percent size={40} />,
      action: () => navigate("/"),
    },
     {
      title: "AI-powered balance sheet analyzers",
      description:
        "Our AI-driven balance sheet analyzer simplifies complex financial statements, helping businesses detect risks, improve performance, and plan strategically.",
      icon: <Percent size={40} />,
      action: () => navigate("/"),
    },
    {
      title: "AI-Powered Balance Sheet Maker",
      description:
        "Generate comprehensive balance sheets with AI insights and automated financial reporting.",
      icon: <Percent size={40} />,
      action: () => navigate("/"),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900 to-purple-700 text-white">

      {/* ================= HERO SECTION ================= */}
      <div
        className="relative h-[500px] flex items-center justify-center text-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d')",
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-10 px-6 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            The Future of <span className="text-yellow-400">JET</span> Services
          </h1>

          <p className="text-lg md:text-xl text-gray-200 font-medium">
            Powerful invoice, inventory, purchase order and billing solutions —
            built with intelligent automation for modern businesses.
          </p>
        </div>
      </div>

      {/* ================= SERVICES CARDS ================= */}
      <div className="max-w-7xl mx-auto px-6 -mt-20 pb-20">
        
        {/* 🔥 FIXED HERE → lg:grid-cols-5 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">

          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white text-gray-800 rounded-3xl overflow-hidden shadow-xl hover:scale-105 transition-transform duration-300"
            >
              <div className="bg-yellow-600 text-white flex flex-col items-center justify-center py-10">
                {service.icon}
                <h3 className="mt-4 text-xl font-semibold text-center px-4">
                  {service.title}
                </h3>
              </div>

              <div className="p-6 text-center">
                <p className="text-gray-600 text-sm mb-6">
                  {service.description}
                </p>

                {service.action && (
                  <button
                    onClick={service.action}
                    className="text-black font-semibold hover:animate-pulse bg-gray-200 px-4 py-2 rounded-full transition-colors duration-300"
                  >
                    CREATE NOW
                  </button>
                )}
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* ================= FOOTER ================= */}
      <footer className="bg-gradient-to-b from-purple-700 via-purple-900 to-black py-14 text-center text-white">
        <div className="max-w-4xl mx-auto space-y-5 px-6">

          <h3 className="text-2xl font-bold">
            JET Business Solutions Pvt Ltd
          </h3>

          <p className="text-gray-300">
            D 46 CMDA Truck Terminal, Madhavaram, Chennai, Tamil Nadu 600110
          </p>

          <p className="text-gray-300">
            Email: support@jetbusiness.com
          </p>

          <p className="text-gray-300">
            Phone: +91 9999999999
          </p>

          <div className="pt-6 border-t border-white/20 text-sm text-gray-400">
            © {new Date().getFullYear()} JET Business Solutions Pvt Ltd. All Rights Reserved.
          </div>

        </div>
      </footer>

    </div>
  );
}
