import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white py-3 px-6 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        Disaster Response System
      </Link>
      <div className="space-x-4">
        <Link to="/updates" className="hover:underline">
          Official Updates
        </Link>
        <Link to="/disaster/create" className="hover:underline">
          Create Disaster
        </Link>
      </div>
    </nav>
  );
}