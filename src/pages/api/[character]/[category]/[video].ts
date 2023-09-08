import {NextApiRequest, NextApiResponse} from "next";
import {getVideoNNames} from "@/lib/charactersFactory";
import {encontrarPalabraSimilar} from "@/lib/searchSimilar";


const getVideoCategory = async (req: NextApiRequest, res: NextApiResponse) => {
    const { character, category, video } = req.query;

    const videoNames = await getVideoNNames();

    // Limpar el nombre del video
    const videoName = video?.toString().replace(/-/g, ' ');

    // Limpiar el nombre del personaje
    const characterName = character?.toString().replace(/-/g, ' ');

    // Limpiar el nombre de la categoria
    const categoryName = category?.toString().replace(/-/g, ' ');

    // Filtar por el nombre del personaje
    const characterInfo = videoNames.find(({ name }) => name === characterName);

    // Si no existe el personaje
    if (!characterInfo) {
        return res.status(404).json({ message: 'Personaje no encontrado' });
    }

    // Filtrar por el nombre de la categoria
    const categoryInfo = characterInfo.info.find(({ name }) => name === categoryName);

    // Si no existe la categoria
    if (!categoryInfo) {
        // Verificar si existe una categoria similar
        const categorySimilar = encontrarPalabraSimilar(categoryName || "", characterInfo.info.map(({name}) => name));

        if (categorySimilar) {
            const categoryInfoSimilar = characterInfo.info.find(({ name }) => name === categorySimilar) || {name: "" , link: "", info: undefined};

            // Filtrar por el nombre del video
            const videoInfo = categoryInfoSimilar.info?.find(({ name }) => name === videoName);

            // Si no existe el video
            if (!videoInfo) {
                // Verificar si existe un video similar
                const videoSimilar = encontrarPalabraSimilar(videoName || "", categoryInfoSimilar.info?.map(({name}) => name) || []) || [];

                if (videoSimilar) {
                    const videoInfoSimilar = categoryInfoSimilar.info?.find(({ name }) => name === videoSimilar) || {name: "" , link: ""};
                    let previousVideo = {name: "", link: ""};
                    let nextVideo = {name: "", link: ""};

                    if (categoryInfoSimilar.info) {
                        previousVideo = categoryInfoSimilar.info[categoryInfoSimilar.info.indexOf(videoInfoSimilar || {
                            name: "",
                            link: "",
                            info: undefined
                        }) - 1];

                        nextVideo = categoryInfoSimilar.info[categoryInfoSimilar.info.indexOf(videoInfoSimilar || {
                            name: "",
                            link: "",
                            info: undefined
                        }) + 1];
                    }

                    const response = {
                        ...videoInfoSimilar,
                        previousVideo: previousVideo?.name,
                        nextVideo: nextVideo?.name
                    }

                    return res.status(200).json(response);
                }

            }

            // Obtener el video anterior
            let previousVideo = {name: "", link: ""};
            let nextVideo = {name: "", link: ""};

            if (categoryInfoSimilar.info) {
                previousVideo = categoryInfoSimilar.info[categoryInfoSimilar.info.indexOf(videoInfo || {
                    name: "",
                    link: "",
                    //info: undefined
                }) - 1];

                nextVideo = categoryInfoSimilar.info[categoryInfoSimilar.info.indexOf(videoInfo || {
                    name: "",
                    link: "",
                    //info: undefined
                }) + 1];
            }

            const response = {
                ...videoInfo,
                previousVideo: previousVideo?.name,
                nextVideo: nextVideo?.name
            }

            return res.status(200).json(response);
        } else {
            return res.status(404).json({message: 'Categoria no encontrada'});
        }
    }

    // Filtrar por el nombre del video
    const videoInfo = categoryInfo.info?.find(({ name }) => name === videoName);

    // Si no existe el video
    if (!videoInfo) {
        return res.status(404).json({message: 'Video no encontrado'});
    }

    // Obtener el video anterior
    let previousVideo = {name: "", link: ""};
    let nextVideo = {name: "", link: ""};

    if (categoryInfo.info) {
        previousVideo = categoryInfo.info[categoryInfo.info.indexOf(videoInfo || {
            name: "",
            link: "",
            info: undefined
        }) - 1];

        nextVideo = categoryInfo.info[categoryInfo.info.indexOf(videoInfo || {
            name: "",
            link: "",
            info: undefined
        }) + 1];
    }

    const response = {
        ...videoInfo,
        previousVideo: previousVideo?.name,
        nextVideo: nextVideo?.name
    }

    return res.status(200).json(response);
};

export default getVideoCategory;