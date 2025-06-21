import React from "react";
import { Link } from "react-router-dom";
import api from "../config/api";

export default function DisasterCard({ disaster, onDelete }) {
  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await api.delete(`/disasters/${disaster.id}`);
      onDelete(disaster.id);
    } catch (error) {
      console.error("Failed to delete disaster:", error);
    }
  };

  return (
    <Link to={`/disaster/${disaster.id}`} className="relative">
      <div className="p-4 border rounded hover:bg-gray-50 shadow-sm">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold">{disaster.title}</h3>
            <p className="text-sm text-gray-600">{disaster.location_name}</p>
          </div>
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700 ml-4"
            aria-label="Delete disaster"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </Link>
  );
}