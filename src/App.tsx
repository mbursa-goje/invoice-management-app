import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InvoiceList from "./pages/InvoiceList";
import InvoiceDetail from "./pages/InvoiceDetail";
import Sidebar from "./component/Sidebar";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[var(--bg-body)]">
        <Sidebar />
        
        {/* We use a large left padding to clear the sidebar and center the content */}
        <main className="md:pl-[103px] transition-all duration-300 w-full flex justify-center">
          <div className="w-full max-w-[730px] px-6 py-12 md:py-20 flex flex-col items-center">
            <div className="w-full">
              <Routes>
                <Route path="/" element={<InvoiceList />} />
                <Route path="/invoice/:id" element={<InvoiceDetail />} />
              </Routes>
            </div>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
