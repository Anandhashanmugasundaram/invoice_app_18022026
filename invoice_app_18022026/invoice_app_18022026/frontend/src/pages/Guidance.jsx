import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Upload,
  MessageSquare,
  Brain,
  Building2,
  Edit3,
  Download,
  MessageCircle,
  X,
} from "lucide-react";

/* ================= STEPS ================= */

const steps = [
  {
    icon: Upload,
    title: "Upload Excel File",
    description:
      "Upload your Excel file (.xlsx, .xls or .csv). The system reads and prepares the dataset for AI processing.",
    image: "/guidance-2.png",
  },
  {
    icon: MessageSquare,
    title: "Enter AI Command",
    description:
      "Type your AI instruction like: 'Add all details from dataset to invoice'. The AI understands your request and prepares invoice data.",
    image: "/guidance-3.png",
  },
  {
    icon: Brain,
    title: "AI Generates Invoice Table",
    description:
      "Our AI analyzes the uploaded dataset and automatically creates the invoice table with calculated totals.",
    image: "/guidance-4.png",
  },
  {
    icon: Building2,
    title: "Select Companies",
    description:
      "Choose Parent Company (Biller) and Client Company. Invoice details update instantly based on your selection.",
    image: "/guidance-1.png",
  },
  {
    icon: Edit3,
    title: "Inline Editing",
    description:
      "You can directly edit values inside the invoice preview.",
    image: "/guidance-5.png",
  },
  {
    icon: Download,
    title: "Download Invoice",
    description:
      "Export your invoice as PDF or PNG with one click.",
    image: "/guidance-6.png",
  },
];

/* ================= AI CHATBOT ================= */

const AIChatBot = ({ steps, scrollToStep }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const chatRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setMessages([{ type: "bot", text: "Welcome 👋 How can I help you?" }]);
      setCurrentStep(-1);
    }
  }, [isOpen]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const startGuide = () => {
    setMessages((prev) => [
      ...prev,
      { type: "user", text: "Show me how it works" },
      {
        type: "bot",
        text: `Step 1: ${steps[0].title} - ${steps[0].description}`,
      },
    ]);
    setCurrentStep(0);
    scrollToStep(0);
  };

  const nextStep = () => {
    const next = currentStep + 1;

    if (next < steps.length) {
      setMessages((prev) => [
        ...prev,
        { type: "user", text: "Next Step" },
        {
          type: "bot",
          text: `Step ${next + 1}: ${steps[next].title} - ${steps[next].description}`,
        },
      ]);
      setCurrentStep(next);
      scrollToStep(next);
    } else {
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: "🎉 You completed all steps!" },
      ]);
      setCurrentStep(steps.length);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-purple-600 text-white p-4 rounded-full shadow-xl hover:bg-purple-700 transition"
        >
          {isOpen ? <X /> : <MessageCircle />}
        </button>
      </div>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 bg-black text-white rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50">
          <div className="bg-purple-600 p-4 font-semibold">
            AI Assistant
          </div>

          <div
            ref={chatRef}
            className="flex-1 p-4 space-y-3 overflow-y-auto max-h-96"
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-3 rounded-lg text-sm ${
                  msg.type === "bot"
                    ? "bg-gray-800"
                    : "bg-purple-600 self-end"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-gray-700 space-y-2">
            {currentStep === -1 && (
              <button
                onClick={startGuide}
                className="w-full bg-purple-600 hover:bg-purple-700 py-2 rounded-lg text-sm transition"
              >
                Show Me How It Works
              </button>
            )}

            {currentStep >= 0 && currentStep < steps.length && (
              <button
                onClick={nextStep}
                className="w-full bg-purple-600 hover:bg-purple-700 py-2 rounded-lg text-sm transition"
              >
                Next Step
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

/* ================= MAIN GUIDANCE PAGE ================= */

const Guidance = () => {

  const scrollToStep = (index) => {
    const element = document.getElementById(`step-${index}`);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900 to-purple-700 text-white">

      {/* HERO SECTION */}
      <div className="text-center py-24 px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          How <span className="text-yellow-400">InvoiceGen</span> Works
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Follow these simple AI-powered steps to generate professional invoices in seconds.
        </p>
      </div>

      {/* STEPS */}
      <div className="max-w-6xl mx-auto px-6 space-y-32 pb-24">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isReverse = index % 2 !== 0;

          return (
            <div
              id={`step-${index}`}
              key={index}
              className={`flex flex-col md:flex-row ${
                isReverse ? "md:flex-row-reverse" : ""
              } items-center gap-16`}
            >
              {/* TEXT */}
              <div className="md:w-1/2">
                <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl border border-white/20 shadow-xl hover:scale-105 transition duration-300">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-600 text-white font-semibold">
                      {index + 1}
                    </div>

                    <div className="bg-purple-600 p-2 rounded-lg">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  <h2 className="text-2xl font-semibold mb-4">
                    {step.title}
                  </h2>

                  <p className="text-gray-300">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* IMAGE */}
              <div className="md:w-1/2">
                <div className="bg-white/10 backdrop-blur-lg p-6 rounded-3xl border border-white/20 shadow-xl">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-[350px] object-contain rounded-lg"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="text-center pb-24">
        <h2 className="text-3xl font-bold mb-6">
          Ready to Create Your Invoice?
        </h2>

        <Link
          to="/dashboard"
          className="inline-flex items-center px-10 py-4 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-xl transition"
        >
          Start Creating Invoice
        </Link>
      </div>

      <AIChatBot steps={steps} scrollToStep={scrollToStep} />
    </div>
  );
};

export default Guidance;