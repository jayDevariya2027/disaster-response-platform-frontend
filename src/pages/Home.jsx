import React, { useEffect, useState } from "react";
import api from "../config/api";
import DisasterCard from "../components/DisasterCard";

export default function Home() {
    const [disasters, setDisasters] = useState([]);

    useEffect(() => {
        api.get("/disasters").then((res) => setDisasters(res.data)).catch(console.error);
    }, []);

    const handleDelete = (deletedId) => {
        setDisasters(disasters.filter((d) => d.id !== deletedId));
    };

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
                    <p>No disasters found.</p>
                )}
            </div>
        </div>
    );
}