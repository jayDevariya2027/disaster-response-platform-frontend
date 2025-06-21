import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white py-3 px-6">
      <Link to="/" className="text-xl font-bold">Disaster Response System</Link>
    </nav>
  );
}
