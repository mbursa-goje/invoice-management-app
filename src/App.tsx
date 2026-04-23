import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InvoiceList from "./pages/InvoiceList";
import InvoiceDetail from "./pages/InvoiceDetail";
import Sidebar from "./component/Sidebar";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col md:flex-row min-h-screen bg-[var(--bg-body)]">
        <Sidebar />
        
        <main className="flex-1 transition-all duration-300 md:ml-[100px] mt-[72px] md:mt-0 p-4 md:p-12">
          <Routes>
            <Route path="/" element={<InvoiceList />} />
            <Route path="/invoice/:id" element={<InvoiceDetail />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
