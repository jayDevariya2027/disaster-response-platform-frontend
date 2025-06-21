import React, { useState } from "react";
import api from "../config/api";

export default function ImageVerifier({ disasterId }) {
    const [imageUrl, setImageUrl] = useState("");
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");

    const handleSubmit = async () => {
        setError("");
        setResult(null);
        try {
            const res = await api.post(`/verification/${disasterId}/verify-image`, {
                imageUrl,
            });

            const { is_authentic, reason, source } = res.data;
            setResult({ is_authentic, reason, source });
        } catch (err) {
            console.error(err);
            setError("Failed to verify image. Please check the URL or try again.");
        }
    };

    return (
        <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Verify Image</h3>
            <input
                type="text"
                value={imageUrl}
                placeholder="Enter image URL"
                onChange={(e) => setImageUrl(e.target.value)}
                className="border px-2 py-1 w-full mb-2"
            />
            <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white px-4 py-1 rounded"
            >
                Verify
            </button>

            {error && <p className="text-red-600 mt-2">{error}</p>}

            {result && (
                <div className="mt-3 bg-gray-100 p-3 rounded shadow">
                    <p>
                        <strong>Authentic:</strong>{" "}
                        <span className={result.is_authentic ? "text-green-600" : "text-red-600"}>
                            {result.is_authentic ? "YES ✅" : "NO ❌"}
                        </span>
                    </p>
                    <p className="mt-1">
                        <strong>Reason:</strong> {result.reason}
                    </p>    
                </div>
            )}
        </div>
    );
}
