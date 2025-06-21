import React from "react";
import { Link } from "react-router-dom";

export default function DisasterCard({ disaster }) {
  return (
    <Link to={`/disaster/${disaster.id}`}>
      <div className="p-4 border rounded hover:bg-gray-50 shadow-sm">
        <h3 className="text-lg font-bold">{disaster.title}</h3>
        <p className="text-sm text-gray-600">{disaster.location_name}</p>
      </div>
    </Link>
  );
}
