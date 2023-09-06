import {NextApiRequest, NextApiResponse} from "next";
import {getVideoNNames} from "@/lib/charactersFactory";

const videos = async (req: NextApiRequest, res: NextApiResponse) => {
    const { character } = req.query;

    const characterString = Array.isArray(character) ? character[0].replace(/-/g, " ") : character?.replace(/-/g, " ");

    const videos = await getVideoNNames();

    const characterVideos = videos.find(({ name }) => name === characterString);

    if (!characterVideos) {
        res.status(404).json({ message: 'Character not found' });
    }

    res.status(200).json(characterVideos);
}

export default videos;