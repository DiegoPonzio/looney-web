import {CartoonInfo} from "@/interfaces/characters";
import {useEffect, useState} from "react";
import axios from "axios";

export const useVideos = (character: string) => {
    const [videos, setVideos] = useState<CartoonInfo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | undefined>(undefined);

    const reverseVideos = () => {
        const newVideos = [...videos].reverse()
        setVideos(newVideos)
    };

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get(`/api/${character}/videos`);
                const data = await response.data.info;
                setVideos(data);
                setLoading(false);
            } catch (error) {
                setError(error as Error);
                setLoading(false);
            }
        }

        fetchVideos();
    }, [ character ]);

    return { videos, loading, error, reverseVideos };
}