import React, { useEffect, useState } from "react";
import api from "../config/api";

export default function ResourceList({ disasterId, geometry }) {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResources = async () => {
            try {
                const res = await api.get(`/resources/${disasterId}/resources?geometry=${geometry}`);
                setResources(res.data || []);
            } catch (err) {
                console.error("Failed to fetch resources", err);
            } finally {
                setLoading(false);
            }
        };

        fetchResources();
    }, [disasterId]);

    if (loading) return <p className="text-gray-500">Loading resources...</p>;

    return (
        <div className="mt-6">
            <h3 className="text-xl font-semibold mb-3">Nearby Resources</h3>
            {resources.length === 0 ? (
                <p className="text-gray-500">No resources found nearby.</p>
            ) : (
                <ul className="space-y-4">
                    {resources.map((r) => (
                        <li
                            key={r.id}
                            className="border p-4 rounded shadow-sm bg-white hover:bg-gray-50 transition"
                        >
                            <h4 className="text-lg font-bold mb-1">{r.name}</h4>
                            <p><span className="font-medium">Type:</span> {r.type}</p>
                            <p><span className="font-medium">Location:</span> {r.location_name}</p>
                            <p className="text-sm text-gray-500">
                                Added on: {new Date(r.created_at).toLocaleDateString()}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
