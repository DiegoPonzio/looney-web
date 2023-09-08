import { useState, useEffect } from 'react';
import axios from 'axios';
import {CartoonInfo} from "@/interfaces/characters";

interface CharacterData extends CartoonInfo {
    previousVideo: string | null;
    nextVideo: string | null;
}

export const useVideoCharacter = (video: string, character: string, category: string) => {
    const [characterData, setCharacterData] = useState<CharacterData>({ name: '', link: null, nextVideo: null, previousVideo: null, info: undefined });
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

        const fetchCharacterCategory = async () => {
            try {
                const response = await axios.get(`/api/${character}/${category}/${video}`);
                const data = await response.data;
                setCharacterData(data);
                setLoading(false);
            } catch (error) {
                setError(error as Error);
                setLoading(false);
            }
        }

        if (category === 'all') {
            fetchCharacter();
        } else {
            fetchCharacterCategory();
        };
    }, [video, character, category]);

    return { characterData, loading, error };
}