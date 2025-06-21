import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import api from "../config/api";
import ImageVerifier from "../components/ImageVerifier";
import ResourceList from "../components/ResourceList";
import { Link } from "react-router-dom";

export default function DisasterDetail() {
    const { id } = useParams();
    const [disaster, setDisaster] = useState(null);
    const [socialMedia, setSocialMedia] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [disasterRes, socialRes] = await Promise.all([
                    api.get(`/disasters/${id}`),
                    api.get(`/social/disaster/${id}/social-media`)
                ]);
                setDisaster(disasterRes.data);
                setSocialMedia(socialRes.data.posts);
            } catch (err) {
                console.error("Error fetching data:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (isLoading) return <p className="p-4">Loading disaster details...</p>;
    if (!disaster) return <p className="p-4">Disaster not found</p>;

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-2">{disaster.title}</h2>
            <p className="text-gray-600 mb-6">{disaster.description}</p>

            <div className="mb-8">
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                    Social Media Posts
                    <Link
                        to="/updates"
                        className="ml-4 text-sm text-blue-600 hover:underline"
                    >
                        (View Official Updates)
                    </Link>
                </h3>
                {socialMedia.length === 0 ? (
                    <p className="text-gray-500">No posts found related to this disaster</p>
                ) : (
                    <ul className="list-disc pl-6 space-y-2">
                        {socialMedia.map((post, i) => (
                            <li key={i}>{post.post}</li>
                        ))}
                    </ul>
                )}
            </div>

            <ResourceList disasterId={id} geometry={disaster?.location} />
            <ImageVerifier disasterId={id} />
        </div>
    );
}