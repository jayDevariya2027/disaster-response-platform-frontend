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
    const [reports, setReports] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showReports, setShowReports] = useState(false);

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

    const fetchReports = async () => {
        try {
            const res = await api.get(`/disasters/${id}/reports`);
            setReports(res.data);
        } catch (err) {
            console.error("Error fetching reports:", err);
        }
    };

    const toggleReports = async () => {
        if (!showReports && reports.length === 0) {
            await fetchReports();
        }
        setShowReports(!showReports);
    };

    if (isLoading) return <p className="p-4">Loading disaster details...</p>;
    if (!disaster) return <p className="p-4">Disaster not found</p>;

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="text-2xl font-bold">{disaster.title}</h2>
                    <p className="text-gray-600">{disaster.description}</p>
                </div>
                <button
                    onClick={toggleReports}
                    className={`px-4 py-2 rounded-md font-medium ${showReports
                            ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                >
                    {showReports ? 'Hide Reports' : 'View Reports'}
                </button>
            </div>

            {showReports && (
                <div className="mb-8 bg-gray-50 rounded-lg p-4 border">
                    <h3 className="text-xl font-semibold mb-4">Disaster Reports</h3>
                    {reports.length === 0 ? (
                        <p className="text-gray-500">No reports available for this disaster</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {reports.map((report, index) => {
                                const { is_authentic, reason } = report.verification_status || {};
                                const statusLabel = is_authentic === true
                                    ? 'Verified'
                                    : is_authentic === false
                                        ? 'Not Authentic'
                                        : 'Pending';

                                const statusClass = is_authentic === true
                                    ? 'bg-green-100 text-green-800'
                                    : is_authentic === false
                                        ? 'bg-red-100 text-red-800'
                                        : 'bg-yellow-100 text-yellow-800';

                                return (
                                    <div key={index} className="border rounded-lg p-4 bg-white">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${statusClass}`}>
                                                {statusLabel}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                {new Date(report.created_at).toLocaleString()}
                                            </span>
                                        </div>

                                        {report.image_url && (
                                            <div className="mt-2 mb-3">
                                                <img
                                                    src={report.image_url}
                                                    alt="Report"
                                                    className="w-full h-48 object-cover rounded border"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = "https://via.placeholder.com/300x200?text=Image+Not+Available";
                                                    }}
                                                />
                                            </div>
                                        )}

                                        {reason && (
                                            <p className="text-sm text-gray-600 mt-2 italic">
                                                <span className="font-medium">Analysis:</span> {reason}
                                            </p>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}

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