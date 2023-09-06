import {useEffect, useState} from "react";
import {CartoonCharacter} from "@/interfaces/characters";
import axios from "axios";

const useCharacters = () => {
        const [ characters, setCharacters ] = useState<CartoonCharacter[]>([])
        const [ loading, setLoading ] = useState<boolean>(true)
        const [ error, setError ] = useState<Error | undefined>(undefined)

        useEffect(() => {
            const fetchCharacters = async () => {
                try {
                    const response = await axios.get('/api/characters')
                    const data = await response.data
                    setCharacters(data)
                    setLoading(false)
                } catch (error) {
                    setError(error as Error)
                    setLoading(false)
                }
            }

            fetchCharacters()
        }, [])

        return { characters, loading, error }
}

export { useCharacters }