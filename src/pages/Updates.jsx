import React, { useEffect, useState } from "react";
import api from "../config/api";
import { Link } from "react-router-dom";

export default function Updates() {
    const [updates, setUpdates] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUpdates = async () => {
            try {
                const res = await api.get("/updates/official-updates");
                setUpdates(res.data.updates);
            } catch (err) {
                console.error("Failed to fetch updates:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUpdates();
    }, []);

    if (isLoading) return <p className="p-4">Loading updates...</p>;

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Official Updates</h1>

            {updates.length === 0 ? (
                <p className="text-gray-500">No official updates available</p>
            ) : (
                <div className="space-y-4">
                    {updates.map((update, index) => (
                        <div key={index} className="border-b pb-4">
                            <h2 className="text-lg font-semibold">{update.title}</h2>
                            <p className="text-gray-600 mb-2">{update.description}</p>
                            <a
                                href={update.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                            >
                                Read more →
                            </a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}