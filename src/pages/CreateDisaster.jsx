import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../config/api";

export default function CreateDisaster() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError("");
    setIsLoading(true);
    
    try {
      const res = await api.post("/disasters", {
        title,
        description,
        tags: tags.split(",").map((t) => t.trim()),
      });

      navigate(`/disaster/${res.data.id}`);
    } catch (err) {
      console.error(err);
      setError("Failed to create disaster. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-6">
      <h2 className="text-2xl font-semibold mb-4">Create a Disaster</h2>

      <input
        type="text"
        placeholder="Title"
        className="w-full border p-2 mb-3"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={isLoading}
      />

      <textarea
        placeholder="Description"
        className="w-full border p-2 mb-3"
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={isLoading}
      />

      <input
        type="text"
        placeholder="Tags (comma-separated)"
        className="w-full border p-2 mb-3"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        disabled={isLoading}
      />

      <button
        onClick={handleSubmit}
        className={`bg-blue-600 text-white px-4 py-2 rounded flex items-center justify-center ${
          isLoading ? "opacity-75 cursor-not-allowed" : ""
        }`}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Creating...
          </>
        ) : (
          "Submit"
        )}
      </button>

      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
}