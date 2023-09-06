import {NextApiRequest, NextApiResponse} from "next";
import {getCharacters} from "@/lib/charactersFactory";

const getCharacter = async (req: NextApiRequest, res: NextApiResponse<{ name: string; info: string[]; }[]>) => {
    const characters = await getCharacters();

    return res.status(200).json(characters);
}

export default getCharacter;