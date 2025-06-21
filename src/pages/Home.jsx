import React, { useEffect, useState } from "react";
import api from "../config/api";
import DisasterCard from "../components/DisasterCard";

export default function Home() {
    const [disasters, setDisasters] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDisasters = async () => {
            try {
                setIsLoading(true);
                const response = await api.get("/disasters");
                setDisasters(response.data);
                setError(null);
            } catch (err) {
                console.error("Failed to fetch disasters:", err);
                setError("Failed to load disasters. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchDisasters();
    }, []);

    const handleDelete = (deletedId) => {
        setDisasters(disasters.filter((d) => d.id !== deletedId));
    };

    if (isLoading) {
        return (
            <div>
                <h2 className="text-2xl font-semibold mb-4">Active Disasters</h2>
                <div className="grid gap-4">
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="p-4 border rounded">
                            <div key={index} className="p-4 border rounded space-y-2">
                                <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <h2 className="text-2xl font-semibold mb-4">Active Disasters</h2>
                <div className="p-4 bg-red-100 text-red-700 rounded">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Active Disasters</h2>
            <div className="grid gap-4">
                {disasters.length > 0 ? (
                    disasters.map((d) => (
                        <DisasterCard
                            key={d.id}
                            disaster={d}
                            onDelete={handleDelete}
                        />
                    ))
                ) : (
                    <p className="text-gray-500">No active disasters currently.</p>
                )}
            </div>
        </div>
    );
}