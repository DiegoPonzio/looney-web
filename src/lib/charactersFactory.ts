import fs from 'fs/promises';
import { CartoonCharacter } from '../interfaces/characters';


const path = `${process.cwd()}/src/characters.json`;

const getCharacters = async () => {
    // Leer el archivo characters.ts.json
    const charactersFile = await fs.readFile(path, 'utf-8');

    // Convertir el archivo a un objeto
    const charactersObject = JSON.parse(charactersFile) as CartoonCharacter[];

    // Variable solo los personajes y sus apartados
    const characters = charactersObject.map((character) => {
        const { name, info } = character;
        // Expresión regular para filtrar si los nombres empiezan con un numero
        const regex = /^[0-9]/;

        // Filtrar los nombres que empiezan con un numero
        //const newInfo = info.filter(({ name, link }) =>  link === null && name);

        // Filtrar los nombres que empiezan con un numero
        const filteredInfo = info.filter(({ name }) => !regex.test(name));

        const justNames = filteredInfo.map(({ name }) => name);

        return {
            name,
            info: justNames
        }
    });

    return characters;
}

const getVideoCharacters = async () => {
    // Leer el archivo characters.ts.json
    const charactersFile = await fs.readFile(path, 'utf-8');

    // Convertir el archivo a un objeto
    const charactersObject = JSON.parse(charactersFile) as CartoonCharacter[];

    // sacar los nombres de los videos son aquellos que tienen link
    const videoNames = charactersObject.map((character) => {
        const { name, info } = character;

        // Filtrar los nombres que empiezan con un numero
        const newInfo = info.filter(({ name, link }) =>  link !== null && name);

        const justNames = newInfo.map(({ name }) => name);

        return {
            name,
            info: justNames
        }
    });

    return videoNames;
}

const getVideoNNames = async () => {
    // Leer el archivo characters.ts.json
    const charactersFile = await fs.readFile(path, 'utf-8');

    // Convertir el archivo a un objeto
    const charactersObject = JSON.parse(charactersFile) as CartoonCharacter[];

    // sacar los nombres de los videos son aquellos que tienen link
    const videoNames = charactersObject.map((character) => {
        const { name, info } = character;

        // Filtrar los nombres que empiezan con un numero
        const newInfo = info.filter(({ name, link }) =>  link !== null && name);

        return {
            name,
            info: newInfo
        }
    });

    return videoNames;
}

const getVideoWithCategories = async () => {
    // Leer el archivo characters.json
    const charactersFile = await fs.readFile(path, 'utf-8');

    // Convertir el archivo a un objeto
    const charactersObject = JSON.parse(charactersFile) as CartoonCharacter[];

    // obtenemos los personajes que tienen categorias
    const videoCategories = charactersObject.map((character) => {
        const { info, name } = character;

        const newInfo = info.filter(({ info }) => info !== undefined);

        return {
            name,
            info: newInfo
        }
    });

    // filtarmos los personajes que tienen categorias
    const videoCategoriesFiltered = videoCategories.filter(({ info }) => info.length > 0);

    return videoCategoriesFiltered;
}

export { getCharacters, getVideoCharacters, getVideoNNames, getVideoWithCategories };