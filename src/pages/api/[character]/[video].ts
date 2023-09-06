import {NextApiRequest, NextApiResponse} from "next";
import {getVideoNNames} from "@/lib/charactersFactory";

const getVideo = async (req: NextApiRequest, res: NextApiResponse) => {
    const { character, video } = req.query;
    const videoNames = await getVideoNNames();

    // Limpar el nombre del video
    const videoName = video?.toString().replace(/-/g, ' ');

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
            const previousVideo = characterInfo.info[characterInfo.info.indexOf(videoInfoSimilar || {name: "" , link: ""}) - 1];
            const nextVideo = characterInfo.info[characterInfo.info.indexOf(videoInfoSimilar || {name: "" , link: ""}) + 1];

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

function calcularDistanciaLevenshtein(s1: string, s2: string) {
    if (s1.length === 0) return s2.length;
    if (s2.length === 0) return s1.length;

    const matrix = [];

    // Inicializa la matriz
    for (let i = 0; i <= s2.length; i++) {
        matrix[i] = [i];
    }

    for (let j = 0; j <= s1.length; j++) {
        matrix[0][j] = j;
    }

    // Llena la matriz utilizando la distancia de Levenshtein
    for (let i = 1; i <= s2.length; i++) {
        for (let j = 1; j <= s1.length; j++) {
            const cost = s1[j - 1] === s2[i - 1] ? 0 : 1;
            matrix[i][j] = Math.min(
                matrix[i - 1][j] + 1,      // Eliminación
                matrix[i][j - 1] + 1,      // Inserción
                matrix[i - 1][j - 1] + cost // Reemplazo
            );
        }
    }

    // El valor en la esquina inferior derecha de la matriz es la distancia de Levenshtein
    return matrix[s2.length][s1.length];
}

function encontrarPalabraSimilar(palabraReferencia: string, listaPalabras : string[]) {
    let palabraSimilar = listaPalabras[0];
    let distanciaMinima = calcularDistanciaLevenshtein(palabraReferencia, listaPalabras[0]);

    for (let i = 1; i < listaPalabras.length; i++) {
        const distancia = calcularDistanciaLevenshtein(palabraReferencia, listaPalabras[i]);
        if (distancia < distanciaMinima) {
            palabraSimilar = listaPalabras[i];
            distanciaMinima = distancia;
        }
    }

    return palabraSimilar;
}


export default getVideo;