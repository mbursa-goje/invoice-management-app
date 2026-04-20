import React from "react";
//This imports are the three building blocks for navigation
//<BrowserRouter> is a wrapper that must surround the entire application. It connects the React app to the browser's URL history
//Without this the app this the app would not know the URL changes
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InvoiceList from "./pages/InvoiceList";
import InvoiceDetail from "./pages/InvoiceDetail";
import './App.css'

function App() {


  return (
    <BrowserRouter>
      <div className="app-container">
        {/* Side bar component will be placed here. */}

        <main className="main-content">

          {/* <Routes> is a component that acts like a giant switch statement. It looks at the current URL and decides which <Route> inside it should be rendered */}
          <Routes>
            {/* This renders the <InvoiceList/> if the URL is exactly */}
            <Route path="/" element={<InvoiceList />} />
            {/* This renders the <InvoiceDetail> component if the URL starts with /invoice/ followed by anything else (represented by :id) */}
            <Route path="/invoice/:id" element={<InvoiceDetail />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
