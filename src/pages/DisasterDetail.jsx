import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import api from "../config/api";
import ImageVerifier from "../components/ImageVerifier";
import ResourceList from "../components/ResourceList";

export default function DisasterDetail() {
    const { id } = useParams();
    const [disaster, setDisaster] = useState(null);
    const [socialMedia, setSocialMedia] = useState([]);
    const [updates, setUpdates] = useState([]);

    useEffect(() => {
        api.get(`/disasters/${id}`).then(res => setDisaster(res.data)).catch(console.error);
        api.get(`/social/disaster/${id}/social-media`).then(res => setSocialMedia(res.data.posts)).catch(console.error);
        api.get(`/updates/official-updates`).then(res => setUpdates(res.data.updates)).catch(console.error);
    }, [id]);

    if (!disaster) return <p>Loading disaster...</p>;

    return (
        <div>
            <h2 className="text-2xl font-bold mb-2">{disaster.title}</h2>
            <p className="text-gray-600 mb-4">{disaster.description}</p>

            <h3 className="text-xl font-semibold mb-2">Social Media Posts</h3>
            <ul className="list-disc ml-6 mb-4">
                {socialMedia.map((p, i) => (
                    <li key={i}>{p.post}</li>
                ))}
            </ul>

            <h3 className="text-xl font-semibold mb-2">Official Updates</h3>
            <ul className="list-disc ml-6 mb-4">
                {updates.map((u, i) => (
                    <li key={i}>
                        <a className="text-blue-600 underline" href={u.link} target="_blank">{u.title}</a>
                    </li>
                ))}
            </ul>

            <ResourceList disasterId={id} geometry={disaster?.location}/>

            <ImageVerifier disasterId={id} />
        </div>
    );
}
