import React, { useState } from "react";
import api from "../config/api";

export default function ImageVerifier({ disasterId }) {
    const [imageUrl, setImageUrl] = useState("");
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPreview, setShowPreview] = useState(false);

    const handleSubmit = async () => {
        if (!imageUrl) {
            setError("Please enter an image URL");
            return;
        }

        setError("");
        setResult(null);
        setIsLoading(true);

        try {
            const res = await api.post(`/verification/${disasterId}/verify-image`, {
                imageUrl,
            });

            const { is_authentic, reason, source } = res.data;
            setResult({ is_authentic, reason, source });
            setShowPreview(false);
            setImageUrl(""); // Clear the URL input after successful verification
        } catch (err) {
            console.error(err);
            setError("Failed to verify image. Please check the URL or try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleUrlChange = (e) => {
        const url = e.target.value;
        setImageUrl(url);
        setShowPreview(url.length > 0);
        setResult(null);
    };

    return (
        <div className="mt-6 border rounded-lg p-4 bg-white shadow-sm">
            <h3 className="text-lg font-semibold mb-3">
                Upload and Verify Disaster-Related Images
            </h3>
            <p className="text-sm text-gray-600 mb-4">
                Verify if an image is authentic and related to this disaster event
            </p>

            <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image URL
                </label>
                <input
                    type="text"
                    value={imageUrl}
                    placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
                    onChange={handleUrlChange}
                    className="border px-3 py-2 w-full rounded-md focus:ring-blue-500 focus:border-blue-500"
                    disabled={isLoading}
                />
            </div>

            {showPreview && (
                <div className="mb-4 border rounded-md p-2">
                    <h4 className="text-sm font-medium mb-2">Image Preview</h4>
                    <img
                        src={imageUrl}
                        alt="Preview"
                        className="max-w-full h-auto max-h-60 rounded"
                        onError={() => {
                            setError("Failed to load image preview. Please check the URL.");
                            setShowPreview(false);
                        }}
                    />
                </div>
            )}

            <button
                onClick={handleSubmit}
                disabled={isLoading || !imageUrl}
                className={`bg-blue-600 text-white px-4 py-2 rounded-md flex items-center justify-center ${isLoading || !imageUrl ? "opacity-75 cursor-not-allowed" : "hover:bg-blue-700"
                    }`}
            >
                {isLoading ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Verifying...
                    </>
                ) : (
                    "Verify Image"
                )}
            </button>

            {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
            )}

            {result && (
                <div className="mt-4 p-4 rounded-md border bg-gray-50">
                    <h4 className="font-medium mb-2">Verification Results</h4>
                    <div className="space-y-2">
                        <p>
                            <span className="font-medium">Status:</span>{" "}
                            <span className={result.is_authentic ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                                {result.is_authentic ? "Authentic ✅" : "Not Authentic ❌"}
                            </span>
                        </p>
                        <p>
                            <span className="font-medium">Analysis:</span> {result.reason}
                        </p>
                        {result.source && (
                            <p>
                                <span className="font-medium">Source:</span> {result.source}
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}