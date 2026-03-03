import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import BillInvoice from "./pages/BillInvoice";
import TaxInvoice from "./pages/TaxInvoice";
import { InvoiceProvider } from "./context/InvoiceContext";
import Services from "./pages/Services";
import Guidance from "./pages/Guidance";
import Aboutus from "./pages/Aboutus";

function App() {
  return (
    <InvoiceProvider>
      <Router>
        <Routes>

          {/* Landing Page */}
          <Route path="/" element={<Welcome />} />

          {/* Services Page */}
          <Route path="/services" element={<Services />} />

          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />

          {/* Bill Invoice - No Protection */}
          <Route
            path="/bill-invoice"
            element={
              <Layout>
                <BillInvoice />
              </Layout>
            }
          />

          {/* Tax Invoice - No Protection */}
          <Route
            path="/tax-invoice"
            element={
              <Layout>
                <TaxInvoice />
              </Layout>
            }
          />

          {/* Guidance */}
          <Route
            path="/guidance"
            element={
              <Layout>
                <Guidance />
              </Layout>
            }
          />
          <Route
            path="/Aboutus"
            element={
              <Layout>
                <Aboutus />
              </Layout>
            }
          />

        </Routes>
      </Router>
    </InvoiceProvider>
  );
}

export default App;