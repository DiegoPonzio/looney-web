import { useState, useEffect } from 'react';
import axios from 'axios';
import {CartoonInfo} from "@/interfaces/characters";

interface CharacterData extends CartoonInfo {
    previousVideo: string | null;
    nextVideo: string | null;
}

export const useVideoCharacter = (video: string, character: string) => {
    const [characterData, setCharacterData] = useState<CharacterData>({ name: '', link: null, nextVideo: null, previousVideo: null });
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | undefined>(undefined);

    useEffect(() => {
        const fetchCharacter = async () => {
            try {
                const response = await axios.get(`/api/${character}/${video}`);
                const data = await response.data;
                setCharacterData(data);
                setLoading(false);
            } catch (error) {
                setError(error as Error);
                setLoading(false);
            }
        };

        fetchCharacter();
    }, [video, character]);

    return { characterData, loading, error };
}