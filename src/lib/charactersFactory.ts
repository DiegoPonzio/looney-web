import fs from 'fs/promises';
import { CartoonCharacter } from '../interfaces/characters';

const getCharacters = async () => {
    // Leer el archivo characters.ts.json
    const charactersFile = await fs.readFile('./src/characters.json', 'utf-8');

    // Convertir el archivo a un objeto
    const charactersObject = JSON.parse(charactersFile) as CartoonCharacter[];

    // Variable solo los personajes y sus apartados
    const characters = charactersObject.map((character) => {
        const { name, info } = character;
        // Expresión regular para filtrar si los nombres empiezan con un numero
        const regex = /^[0-9]/;

        // Filtrar los nombres que empiezan con un numero
        const newInfo = info.filter(({ name, link }) =>  link === null && name);

        // Filtrar los nombres que empiezan con un numero
        const filteredInfo = newInfo.filter(({ name }) => !regex.test(name));

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
    const charactersFile = await fs.readFile('./src/characters.json', 'utf-8');

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
    const charactersFile = await fs.readFile('./src/characters.json', 'utf-8');

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

export { getCharacters, getVideoCharacters, getVideoNNames };