import React from "react";
//This imports are the three building blocks for navigation
//<BrowserRouter> is a wrapper that must surround the entire application. It connects the React app to the browser's URL history
//Without this the app would not know the URL changes
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InvoiceList from "./pages/InvoiceList";
import InvoiceDetail from "./pages/InvoiceDetail";
import Sidebar from "./component/Sidebar";
import './App.css'

function App() {


  return (
    <BrowserRouter>
      {/* A flex display is used so the sidebar and main content sit next to each other */}
      <div className="app-container" style={{ display: 'flex' }}>

        <Sidebar />

        {/* A left margin is added so the main content does not behind the fixed sidebar */}
        <main className="main-content" style={{ marginLeft: '100px', padding: '2rem', width: '100%' }}>

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
