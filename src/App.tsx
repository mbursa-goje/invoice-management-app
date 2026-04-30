import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InvoiceList from "./pages/InvoiceList";
import InvoiceDetail from "./pages/InvoiceDetail";
import Sidebar from "./component/Sidebar";


function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[var(--bg-body)]">

        <Sidebar />

        <main className="flex w-full justify-center pt-28 transition-all duration-300 md:pl-[103px] md:pt-0">
          <div className="flex w-full max-w-[730px] flex-col items-center px-6 py-8 md:py-14 lg:max-w-[800px] lg:px-10">
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
