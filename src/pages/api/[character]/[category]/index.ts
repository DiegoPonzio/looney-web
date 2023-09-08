import {NextApiRequest, NextApiResponse} from "next";
import {getVideoNNames} from "@/lib/charactersFactory";
import {encontrarPalabraSimilar} from "@/lib/searchSimilar";

const getVideo = async (req: NextApiRequest, res: NextApiResponse) => {
    const { character, category } = req.query;
    const videoNames = await getVideoNNames();

    // Limpar el nombre del video
    const videoName = category?.toString().replace(/-/g, ' ');

    // Limpiar el nombre del personaje
    const characterName = character?.toString().replace(/-/g, ' ');

    // Filtar por el nombre del personaje
    const characterInfo = videoNames.find(({ name }) => name === characterName);

    // Si no existe el personaje
    if (!characterInfo) {
        return res.status(404).json({ message: 'Personaje no encontrado' });
    }

    // Filtrar por el nombre del video
    const videoInfo = characterInfo.info.find(({ name }) => name === videoName);

    // Si no existe el video
    if (!videoInfo) {
        // Verificar si existe un video similar
        const videoSimilar = encontrarPalabraSimilar(videoName || "", characterInfo.info.map(({name}) => name));

        if (videoSimilar) {
            const videoInfoSimilar = characterInfo.info.find(({ name }) => name === videoSimilar);
            const previousVideo = characterInfo.info[characterInfo.info.indexOf(videoInfoSimilar || {name: "" , link: "", info: undefined}) - 1];
            const nextVideo = characterInfo.info[characterInfo.info.indexOf(videoInfoSimilar || {name: "" , link: "", info: undefined}) + 1];

            const response = {
                ...videoInfoSimilar,
                previousVideo: previousVideo?.name,
                nextVideo: nextVideo?.name
            }

            return res.status(200).json(response);
        } else {
            return res.status(404).json({message: 'Video no encontrado'});
        }
    }

    // Obtener el video anterior y el siguiente
    const previousVideo = characterInfo.info[characterInfo.info.indexOf(videoInfo || {name: "" , link: ""}) - 1];
    const nextVideo = characterInfo.info[characterInfo.info.indexOf(videoInfo || {name: "" , link: ""}) + 1];

    // Agregar el video anterior y el siguiente
    const response = {
        ...videoInfo,
        previousVideo: previousVideo?.name,
        nextVideo: nextVideo?.name
    }

    return res.status(200).json(response);
}

export default getVideo;