import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DisasterDetail from "./pages/DisasterDetail";
import Navbar from "./components/Navbar";
import CreateDisaster from "./pages/CreateDisaster";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/disaster/create" element={<CreateDisaster />} />
          <Route path="/disaster/:id" element={<DisasterDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
