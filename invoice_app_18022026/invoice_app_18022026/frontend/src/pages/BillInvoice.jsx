// // import { useContext, useState, useEffect, useRef } from "react";
// // import { Link } from "react-router-dom";
// // import {
// //   ArrowLeft,
// //   FileText,
// //   Image as ImageIcon,
// //   RotateCcw,
// //   MessageCircle,
// //   X,
// // } from "lucide-react";

// // import { InvoiceContext } from "../context/InvoiceContext";
// // import { billInvoiceApi } from "../api/billInvoiceApi";
// // import FileUpload from "../components/common/FileUpload";
// // import InvoicePreview from "../components/invoice/InvoicePreview";
// // import CommandInput from "../components/common/CommandInput";
// // import MasterDataLoader from "../components/invoice/MasterDataLoader";


// // // ===================== CHATBOT COMPONENT =====================
// // const BillInvoiceChatBot = () => {
// //   const steps = [
// //     "Step 1: Upload your Excel file from Upload Data section.",
// //     "Step 2: Enter AI command like 'Extract all data'.",
// //     "Step 3: Review the generated invoice preview.",
// //     "Step 4: Export invoice as PDF or PNG.",
// //   ];

// //   const [isOpen, setIsOpen] = useState(false);
// //   const [messages, setMessages] = useState([]);
// //   const [currentStep, setCurrentStep] = useState(-1);
// //   const chatRef = useRef(null);

// //   useEffect(() => {
// //     if (isOpen) {
// //       setMessages([{ type: "bot", text: "Welcome 👋 How can I help you?" }]);
// //       setCurrentStep(-1);
// //     }
// //   }, [isOpen]);

// //   useEffect(() => {
// //     if (chatRef.current) {
// //       chatRef.current.scrollTop = chatRef.current.scrollHeight;
// //     }
// //   }, [messages]);

// //   const startGuide = () => {
// //     setMessages((prev) => [
// //       ...prev,
// //       { type: "user", text: "Show me how to generate bill invoice" },
// //       { type: "bot", text: steps[0] },
// //     ]);
// //     setCurrentStep(0);
// //   };

// //   const nextStep = () => {
// //     const next = currentStep + 1;

// //     if (next < steps.length) {
// //       setMessages((prev) => [
// //         ...prev,
// //         { type: "user", text: "Next Step" },
// //         { type: "bot", text: steps[next] },
// //       ]);
// //       setCurrentStep(next);
// //     } else {
// //       setMessages((prev) => [
// //         ...prev,
// //         { type: "bot", text: "🎉 You completed all steps!" },
// //       ]);
// //       setCurrentStep(steps.length);
// //     }
// //   };

// //   return (
// //     <>
// //       <button
// //         onClick={() => setIsOpen(!isOpen)}
// //         className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-xl hover:bg-blue-700 z-50"
// //       >
// //         {isOpen ? <X /> : <MessageCircle />}
// //       </button>

// //       {isOpen && (
// //         <div className="fixed bottom-24 right-6 w-80 bg-black text-white rounded-2xl shadow-2xl flex flex-col z-50">
// //           <div className="bg-blue-600 p-4 font-semibold">
// //             AI Assistant
// //           </div>

// //           <div
// //             ref={chatRef}
// //             className="flex-1 p-4 space-y-3 overflow-y-auto max-h-96"
// //           >
// //             {messages.map((msg, i) => (
// //               <div
// //                 key={i}
// //                 className={`p-3 rounded-lg text-sm ${
// //                   msg.type === "bot"
// //                     ? "bg-gray-800"
// //                     : "bg-blue-600 self-end"
// //                 }`}
// //               >
// //                 {msg.text}
// //               </div>
// //             ))}
// //           </div>

// //           <div className="p-3 border-t border-gray-700 space-y-2">
// //             {currentStep === -1 && (
// //               <button
// //                 onClick={startGuide}
// //                 className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg text-sm"
// //               >
// //                 Show Guide
// //               </button>
// //             )}

// //             {currentStep >= 0 && currentStep < steps.length && (
// //               <button
// //                 onClick={nextStep}
// //                 className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg text-sm"
// //               >
// //                 Next Step
// //               </button>
// //             )}
// //           </div>
// //         </div>
// //       )}
// //     </>
// //   );
// // };


// // // ===================== MAIN COMPONENT =====================
// // const BillInvoice = () => {
// //   const { billInvoiceState, updateBillInvoiceState, clearBillInvoiceState } =
// //     useContext(InvoiceContext);

// //   const [invoiceState, setInvoiceState] = useState(billInvoiceState);
// //   const [loading, setLoading] = useState(!billInvoiceState);
// //   const [processing, setProcessing] = useState(false);
// //   const [error, setError] = useState(null);
// //   const [exporting, setExporting] = useState(false);
// //   const [selectedFile, setSelectedFile] = useState(null);

// //   useEffect(() => {
// //     if (billInvoiceState) {
// //       setInvoiceState(billInvoiceState);
// //       setLoading(false);
// //     } else {
// //       const loadDefaultState = async () => {
// //         try {
// //           const defaultState = await billInvoiceApi.getDefaultState();
// //           setInvoiceState(defaultState.state);
// //           updateBillInvoiceState(defaultState.state);
// //         } catch (err) {
// //           setError("Failed to load default invoice state.");
// //         } finally {
// //           setLoading(false);
// //         }
// //       };
// //       loadDefaultState();
// //     }
// //   }, []);

// //   const handleStateUpdate = (newState) => {
// //     if (!newState) return;
// //     setInvoiceState(newState);
// //     updateBillInvoiceState(newState);
// //   };

// //   const handleCommand = async (command) => {
// //     try {
// //       setProcessing(true);
// //       const response = await billInvoiceApi.processInvoice(
// //         selectedFile,
// //         invoiceState,
// //         command
// //       );
// //       handleStateUpdate(response.state);
// //     } catch {
// //       setError("Failed to process command");
// //     } finally {
// //       setProcessing(false);
// //     }
// //   };

// //   const handleExport = async (format) => {
// //     try {
// //       setExporting(true);
// //       const blob = await billInvoiceApi.exportInvoice(invoiceState, format);
// //       const url = window.URL.createObjectURL(blob);
// //       const link = document.createElement("a");
// //       link.href = url;
// //       link.download = `bill_invoice.${format}`;
// //       link.click();
// //     } catch {
// //       setError("Export failed");
// //     } finally {
// //       setExporting(false);
// //     }
// //   };

// //   const handleReset = async () => {
// //     try {
// //       setLoading(true);
// //       const response = await billInvoiceApi.clearState();
// //       handleStateUpdate(response.state);
// //       clearBillInvoiceState();
// //       setSelectedFile(null);
// //     } catch {
// //       setError("Reset failed");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center">
// //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="container mx-auto px-4 py-8">
// //       {/* HEADER */}
// //       <div className="flex justify-between items-center mb-8">
// //         <div>
// //           <Link
// //             to="/"
// //             className="text-gray-500 hover:text-gray-700 flex items-center mb-2"
// //           >
// //             <ArrowLeft className="h-4 w-4 mr-1" /> Back to Dashboard
// //           </Link>
// //           <h1 className="text-2xl font-bold text-gray-900">
// //             Bill Invoice Generator
// //           </h1>
// //         </div>

// //         <div className="flex space-x-3">
// //           <button
// //             onClick={handleReset}
// //             className="flex items-center px-4 py-2 bg-red-50 border border-red-200 text-red-700 rounded-lg"
// //           >
// //             <RotateCcw className="h-4 w-4 mr-2" />
// //             Reset
// //           </button>

// //           <button
// //             onClick={() => handleExport("pdf")}
// //             className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg"
// //           >
// //             <FileText className="h-4 w-4 mr-2" />
// //             Export PDF
// //           </button>

// //           <button
// //             onClick={() => handleExport("png")}
// //             className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg"
// //           >
// //             <ImageIcon className="h-4 w-4 mr-2" />
// //             Export PNG
// //           </button>
// //         </div>
// //       </div>

// //       {error && (
// //         <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
// //           {error}
// //         </div>
// //       )}

// //       <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
// //         <div className="lg:col-span-1 space-y-6">
// //           {invoiceState && (
// //             <MasterDataLoader
// //               invoiceState={invoiceState}
// //               onStateUpdate={handleStateUpdate}
// //             />
// //           )}

// //           <FileUpload onUpload={setSelectedFile} />
// //           <CommandInput onCommand={handleCommand} />
// //         </div>

// //         <div className="lg:col-span-3">
// //           {invoiceState && (
// //             <>
// //               <InvoicePreview
// //                 invoiceState={invoiceState}
// //                 onStateUpdate={handleStateUpdate}
// //               />
// //             </>
// //           )}
// //         </div>
// //       </div>

// //       <BillInvoiceChatBot />
// //     </div>
// //   );
// // };

// // export default BillInvoice;




// import { useContext, useState, useEffect, useRef } from "react";
// import { Link } from "react-router-dom";
// import {
//   ArrowLeft,
//   FileText,
//   Image as ImageIcon,
//   RotateCcw,
//   MessageCircle,
//   X,
//   FileSpreadsheet,
//   File,
// } from "lucide-react";

// import { InvoiceContext } from "../context/InvoiceContext";
// import { billInvoiceApi } from "../api/billInvoiceApi";
// import FileUpload from "../components/common/FileUpload";
// import InvoicePreview from "../components/invoice/InvoicePreview";
// import CommandInput from "../components/common/CommandInput";
// import MasterDataLoader from "../components/invoice/MasterDataLoader";


// // ===================== CHATBOT COMPONENT =====================
// const BillInvoiceChatBot = () => {
//   const steps = [
//     "Step 1: Upload your Excel file from Upload Data section.",
//     "Step 2: Enter AI command like 'Extract all data'.",
//     "Step 3: Review the generated invoice preview.",
//     "Step 4: Export invoice as PDF, PNG, Word, or Excel.",
//   ];

//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [currentStep, setCurrentStep] = useState(-1);
//   const chatRef = useRef(null);

//   useEffect(() => {
//     if (isOpen) {
//       setMessages([{ type: "bot", text: "Welcome 👋 How can I help you?" }]);
//       setCurrentStep(-1);
//     }
//   }, [isOpen]);

//   useEffect(() => {
//     if (chatRef.current) {
//       chatRef.current.scrollTop = chatRef.current.scrollHeight;
//     }
//   }, [messages]);

//   const startGuide = () => {
//     setMessages((prev) => [
//       ...prev,
//       { type: "user", text: "Show me how to generate bill invoice" },
//       { type: "bot", text: steps[0] },
//     ]);
//     setCurrentStep(0);
//   };

//   const nextStep = () => {
//     const next = currentStep + 1;

//     if (next < steps.length) {
//       setMessages((prev) => [
//         ...prev,
//         { type: "user", text: "Next Step" },
//         { type: "bot", text: steps[next] },
//       ]);
//       setCurrentStep(next);
//     } else {
//       setMessages((prev) => [
//         ...prev,
//         { type: "bot", text: "🎉 You completed all steps!" },
//       ]);
//       setCurrentStep(steps.length);
//     }
//   };

//   return (
//     <>
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-xl hover:bg-blue-700 z-50"
//       >
//         {isOpen ? <X /> : <MessageCircle />}
//       </button>

//       {isOpen && (
//         <div className="fixed bottom-24 right-6 w-80 bg-black text-white rounded-2xl shadow-2xl flex flex-col z-50">
//           <div className="bg-blue-600 p-4 font-semibold">
//             AI Assistant
//           </div>

//           <div
//             ref={chatRef}
//             className="flex-1 p-4 space-y-3 overflow-y-auto max-h-96"
//           >
//             {messages.map((msg, i) => (
//               <div
//                 key={i}
//                 className={`p-3 rounded-lg text-sm ${
//                   msg.type === "bot"
//                     ? "bg-gray-800"
//                     : "bg-blue-600 self-end"
//                 }`}
//               >
//                 {msg.text}
//               </div>
//             ))}
//           </div>

//           <div className="p-3 border-t border-gray-700 space-y-2">
//             {currentStep === -1 && (
//               <button
//                 onClick={startGuide}
//                 className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg text-sm"
//               >
//                 Show Guide
//               </button>
//             )}

//             {currentStep >= 0 && currentStep < steps.length && (
//               <button
//                 onClick={nextStep}
//                 className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg text-sm"
//               >
//                 Next Step
//               </button>
//             )}
//           </div>
//         </div>
//       )}
//     </>
//   );
// };


// // ===================== MAIN COMPONENT =====================
// const BillInvoice = () => {
//   const { billInvoiceState, updateBillInvoiceState, clearBillInvoiceState } =
//     useContext(InvoiceContext);

//   const [invoiceState, setInvoiceState] = useState(billInvoiceState);
//   const [loading, setLoading] = useState(!billInvoiceState);
//   const [processing, setProcessing] = useState(false);
//   const [error, setError] = useState(null);
//   const [exporting, setExporting] = useState(false);
//   const [selectedFile, setSelectedFile] = useState(null);

//   useEffect(() => {
//     if (billInvoiceState) {
//       setInvoiceState(billInvoiceState);
//       setLoading(false);
//     } else {
//       const loadDefaultState = async () => {
//         try {
//           const defaultState = await billInvoiceApi.getDefaultState();
//           setInvoiceState(defaultState.state);
//           updateBillInvoiceState(defaultState.state);
//         } catch {
//           setError("Failed to load default invoice state.");
//         } finally {
//           setLoading(false);
//         }
//       };
//       loadDefaultState();
//     }
//   }, []);

//   const handleStateUpdate = (newState) => {
//     if (!newState) return;
//     setInvoiceState(newState);
//     updateBillInvoiceState(newState);
//   };

//   const handleCommand = async (command) => {
//     try {
//       setProcessing(true);
//       const response = await billInvoiceApi.processInvoice(
//         selectedFile,
//         invoiceState,
//         command
//       );
//       handleStateUpdate(response.state);
//     } catch {
//       setError("Failed to process command");
//     } finally {
//       setProcessing(false);
//     }
//   };

//   const handleExport = async (format) => {
//     try {
//       setExporting(true);
//       const blob = await billInvoiceApi.exportInvoice(invoiceState, format);
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.download = `bill_invoice.${format}`;
//       link.click();
//     } catch {
//       setError("Export failed");
//     } finally {
//       setExporting(false);
//     }
//   };

//   const handleReset = async () => {
//     try {
//       setLoading(true);
//       const response = await billInvoiceApi.clearState();
//       handleStateUpdate(response.state);
//       clearBillInvoiceState();
//       setSelectedFile(null);
//     } catch {
//       setError("Reset failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">

//       {/* HEADER */}
//       <div className="flex justify-between items-center mb-8">
//         <div>
//           <Link
//             to="/dashboard"
//             className="text-gray-500 hover:text-gray-700 flex items-center mb-2"
//           >
//             <ArrowLeft className="h-4 w-4 mr-1" /> Back to Dashboard
//           </Link>
//           <h1 className="text-2xl font-bold text-gray-900">
//             Bill Invoice Generator
//           </h1>
//         </div>

//         <div className="flex flex-wrap gap-3">

//           <button
//             onClick={handleReset}
//             className="flex items-center px-4 py-2 bg-red-50 border border-red-200 text-red-700 rounded-lg"
//           >
//             <RotateCcw className="h-4 w-4 mr-2" />
//             Reset
//           </button>

//           <button
//             onClick={() => handleExport("pdf")}
//             className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg"
//           >
//             <FileText className="h-4 w-4 mr-2" />
//             PDF
//           </button>

//           <button
//             onClick={() => handleExport("png")}
//             className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg"
//           >
//             <ImageIcon className="h-4 w-4 mr-2" />
//             PNG
//           </button>

//           <button
//             onClick={() => handleExport("docx")}
//             className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg"
//           >
//             <File className="h-4 w-4 mr-2" />
//             Word
//           </button>

//           <button
//             onClick={() => handleExport("xlsx")}
//             className="flex items-center px-4 py-2 bg-green-700 text-white rounded-lg"
//           >
//             <FileSpreadsheet className="h-4 w-4 mr-2" />
//             Excel
//           </button>

//         </div>
//       </div>

//       {error && (
//         <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
//           {error}
//         </div>
//       )}

//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//         <div className="lg:col-span-1 space-y-6">
//           {invoiceState && (
//             <MasterDataLoader
//               invoiceState={invoiceState}
//               onStateUpdate={handleStateUpdate}
//             />
//           )}

//           <FileUpload onUpload={setSelectedFile} />
//           <CommandInput onCommand={handleCommand} />
//         </div>

//         <div className="lg:col-span-3">
//           {invoiceState && (
//             <InvoicePreview
//               invoiceState={invoiceState}
//               onStateUpdate={handleStateUpdate}
//             />
//           )}
//         </div>
//       </div>

//       <BillInvoiceChatBot />
//     </div>
//   );
// };

// export default BillInvoice;



import { useContext, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  Image as ImageIcon,
  RotateCcw,
  MessageCircle,
  X,
  FileSpreadsheet,
  File,
  Mail,
  ChevronDown,
} from "lucide-react";
import { InvoiceContext } from "../context/InvoiceContext";
import { billInvoiceApi } from "../api/billInvoiceApi";
import FileUpload from "../components/common/FileUpload";
import InvoicePreview from "../components/invoice/InvoicePreview";
import CommandInput from "../components/common/CommandInput";
import MasterDataLoader from "../components/invoice/MasterDataLoader";


// ===================== CHATBOT COMPONENT =====================
const BillInvoiceChatBot = () => {
  const steps = [
    "Step 1: Upload your Excel file from Upload Data section.",
    "Step 2: Enter AI command like 'Extract all data'.",
    "Step 3: Review the generated invoice preview.",
    "Step 4: Export invoice as PDF, PNG, Word, or Excel.",
  ];

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
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const startGuide = () => {
    setMessages((prev) => [
      ...prev,
      { type: "user", text: "Show me how to generate bill invoice" },
      { type: "bot", text: steps[0] },
    ]);
    setCurrentStep(0);
  };

  const nextStep = () => {
    const next = currentStep + 1;

    if (next < steps.length) {
      setMessages((prev) => [
        ...prev,
        { type: "user", text: "Next Step" },
        { type: "bot", text: steps[next] },
      ]);
      setCurrentStep(next);
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
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-xl hover:bg-blue-700 z-50"
      >
        {isOpen ? <X /> : <MessageCircle />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 bg-black text-white rounded-2xl shadow-2xl flex flex-col z-50">
          <div className="bg-blue-600 p-4 font-semibold">
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
                    : "bg-blue-600 self-end"
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
                className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg text-sm"
              >
                Show Guide
              </button>
            )}

            {currentStep >= 0 && currentStep < steps.length && (
              <button
                onClick={nextStep}
                className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg text-sm"
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


// ===================== MAIN COMPONENT =====================
const BillInvoice = () => {
  const { billInvoiceState, updateBillInvoiceState, clearBillInvoiceState } =
    useContext(InvoiceContext);

  const [invoiceState, setInvoiceState] = useState(billInvoiceState);
  const [loading, setLoading] = useState(!billInvoiceState);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [exporting, setExporting] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState("More");
const dropdownRef = useRef(null);

  useEffect(() => {
    if (billInvoiceState) {
      setInvoiceState(billInvoiceState);
      setLoading(false);
    } else {
      const loadDefaultState = async () => {
        try {
          const defaultState = await billInvoiceApi.getDefaultState();
          setInvoiceState(defaultState.state);
          updateBillInvoiceState(defaultState.state);
        } catch {
          setError("Failed to load default invoice state.");
        } finally {
          setLoading(false);
        }
      };
      loadDefaultState();
    }
  }, []);

  useEffect(() => {
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowMore(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);

  const handleStateUpdate = (newState) => {
    if (!newState) return;
    setInvoiceState(newState);
    updateBillInvoiceState(newState);
  };

  const handleCommand = async (command) => {
    try {
      setProcessing(true);
      const response = await billInvoiceApi.processInvoice(
        selectedFile,
        invoiceState,
        command
      );
      handleStateUpdate(response.state);
    } catch {
      setError("Failed to process command");
    } finally {
      setProcessing(false);
    }
  };

  const handleExport = async (format) => {
    try {
      setExporting(true);
      const blob = await billInvoiceApi.exportInvoice(invoiceState, format);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `bill_invoice.${format}`;
      link.click();
    } catch {
      setError("Export failed");
    } finally {
      setExporting(false);
    }
  };

  const handleSelect = (type, label) => {
  handleExport(type);
  setSelectedFeature(label);
  setShowMore(false);
};
  
  const handleWhatsAppShare = () => {
  const message = "Check out this AI Generated Bill Invoice!";
  window.open(`https://wa.me/?text=${encodeURIComponent(message)}`);
};

const handleEmailShare = () => {
  const subject = "Bill Invoice";
  const body = "Please find the generated invoice.";
  
  window.open(
    `https://mail.google.com/mail/?view=cm&fs=1&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    "_blank"
  );

};

   
  

  const handleReset = async () => {
    try {
      setLoading(true);
      const response = await billInvoiceApi.clearState();
      handleStateUpdate(response.state);
      clearBillInvoiceState();
      setSelectedFile(null);
    } catch {
      setError("Reset failed");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">

      {/* HEADER */}
      <div className="flex justify-between items-start mb-8 relative">
        <div>
          <Link
            to="/dashboard"
            className="text-gray-500 hover:text-gray-700 flex items-center mb-2"
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            Bill Invoice Generator
          </h1>
        </div>

<div className="flex items-center gap-4 bg-white px-6 py-3 rounded-2xl shadow-xl border border-gray-200 relative z-40">
      {/* Reset */}
      <button
        onClick={handleReset}
        className="flex items-center px-4 py-2 bg-red-100 text-red-600 font-medium rounded-xl hover:bg-red-200 transition-all duration-300"
      >
        <RotateCcw className="h-4 w-4 mr-2" />
        Reset
      </button>

      {/* Divider */}
      <div className="h-6 w-px bg-gray-300"></div>

      {/* More Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setShowMore(!showMore)}
          className="flex items-center gap-2 px-5 py-2 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-all duration-300"
        >
          {selectedFeature}
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-300 ${
              showMore ? "rotate-180" : ""
            }`}
          />
        </button>

        {showMore && (
<div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">            
            <button
              onClick={() => handleSelect("pdf", "Export PDF")}
              className="block w-full font-medium  bg-gray-100 text-left px-5 py-3 hover:bg-gray-300 transition"
            >
              📄 Export PDF
            </button>

            <button
              onClick={() => handleSelect("png", "Export PNG")}
              className="block w-full  font-medium  bg-gray-100 text-left px-5 py-3 hover:bg-gray-300 transition"
            >
              🖼 Export PNG
            </button>

            <button
              onClick={() => handleSelect("xlsx", "Export Excel")}
              className="block w-full  font-medium  bg-gray-100 text-left px-5 py-3 hover:bg-gray-300 transition"
            >
              📊 Export Excel
            </button>

            <button
              onClick={() => handleSelect("docx", "Export Word")}
              className="block w-full  font-medium bg-gray-100 text-left px-5 py-3 hover:bg-gray-300 transition"
            >
              📝 Export Word
            </button>

          </div>
        )}
      </div>

      {/* Divider */}
      <div className="h-6 w-px bg-gray-300"></div>

      {/* WhatsApp */}
      <button
        onClick={handleWhatsAppShare}
        className="p-3 bg-green-500 text-white rounded-full shadow-md hover:scale-110 hover:bg-green-600 transition-all duration-300"
      >
        <MessageCircle className="h-5 w-5" />
      </button>

      {/* Email */}
      <button
        onClick={handleEmailShare}
        className="p-3 bg-gray-800 text-white rounded-full shadow-md hover:scale-110 hover:bg-gray-700 transition-all duration-300"
      >
        <Mail className="h-5 w-5" />
      </button>
    </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-6">
          {invoiceState && (
            <MasterDataLoader
              invoiceState={invoiceState}
              onStateUpdate={handleStateUpdate}
            />
          )}

          <FileUpload onUpload={setSelectedFile} />
          <CommandInput onCommand={handleCommand} />
        </div>

        <div className="lg:col-span-3">
          {invoiceState && (
            <InvoicePreview
              invoiceState={invoiceState}
              onStateUpdate={handleStateUpdate}
            />
          )}
        </div>
      </div>

      <BillInvoiceChatBot />
    </div>
  );
};

export default BillInvoice;