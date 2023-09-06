// Solo se va a renderizar cuando se cumpla la condición de que el nombre del personaje sea igual al nombre del archivo
import {GetStaticPaths, GetStaticProps} from "next";
import {FC, useState} from "react";
import {getCharacters} from "@/lib/charactersFactory";
import {Layout} from "@/components/Layout";
import {useCharacters} from "@/lib/useCharacters";
import {dataCharacters, images} from "@/lib/dataCharacters";
import {BsArrowDownShort, BsArrowUpShort} from "react-icons/bs";
import {useVideos} from "@/lib/useVideos";
import Link from "next/link";

interface MyProps {
    character: string;
}
const Index: FC<MyProps> = ({ character }) => {
    const { characters, loading, error } = useCharacters()
    const { videos, loading: loadingVideo, error: errorVideo, reverseVideos } = useVideos(character.replace(/-/g, ' '))
    const [arrow, setArrow] = useState<boolean>(false);

    const image = "https://upload.wikimedia.org/wikipedia/commons/5/5a/Looney_tunes_careta.png"
    // Busacamos el index del personaje
    const characterIndex = characters.findIndex((characterData) => characterData.name === character);

    // Obtenemos la imagen del personaje
    const characterImage = images[characterIndex];

    // Obtenemos la información del personaje
    const characterData = dataCharacters[characterIndex];

    const handlerClick = () => {
        reverseVideos();
        setArrow(!arrow);
    }

    const urlCharacter = character.replace(/\s/g, '-');
    const urlVideo = (video: string) => {
        return video.replace(/\s/g, '-').replace("?", "");
    }

    return (
        <Layout title={character}>
            <div className={"pt-20 flex flex-col items-center justify-center w-full"}>
                <div className={"flex flex-col md:flex-row items-center justify-center w-4/5 mb-6"}>
                    <div className={"flex flex-col items-center justify-center w-1/2"}>
                        <h1 className={"text-4xl text-red"}>{character}</h1>
                        <img src={characterImage} alt={character} className={"w-full md:h-[70vh] h-[45vh] object-contain"}/>
                    </div>
                    <div className={"flex flex-col justify-between items-center text-xl my-7 text-center w-1/2"}>
                        <div className={"flex flex-col items-center justify-center w-full md:w-1/2 mb-12"}>
                            <h2 className={"text-4xl mb-4 text-orange"}>Información</h2>
                            <p className={"text-justify text-2xl"}>{characterData}</p>
                        </div>
                    </div>
                </div>
                <div className={"flex flex-col items-center justify-center w-4/5 mt-6"}>
                    <div className={"flex flex-col items-center justify-center w-full md:w-1/2"}>
                        <div className={"flex items-center justify-between w-full"}>
                            <h2 className={"text-4xl mb-4 text-red"}>Videos</h2>
                            <p className={"text-4xl mb-4 flex items-center text-red cursor-pointer"} onClick={handlerClick}>{arrow ? <BsArrowUpShort className={"text-6xl"} /> : <BsArrowDownShort className={"text-6xl"} />} Invertir</p>
                        </div>
                    </div>
                    <div className={"grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 w-full"}>
                        {loadingVideo ? <p>Cargando...</p> : errorVideo ? <p>Ha ocurrido un error</p> : videos.map((video, index) => (
                            <Link href={`/personajes/${urlCharacter}/video/${urlVideo(video.name)}`} key={`${video.name}_${index}`} className={"flex flex-col items-center justify-center w-full cursor-pointer"}>
                                <span className={"text-xl text-orange rounded"}>{video.name}</span>
                                <img
                                    className={"w-4/5 md:h-[35vh] h-[22vh] object-contain"}
                                    src={image}
                                    alt={video.name}
                                />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Index;

export const getStaticPaths: GetStaticPaths = async () => {
    const characters = await getCharacters();
    const paths = characters.map((character) => ({
        params: { character: character.name.replace(/\s/g, '-')},
    }));
    return { paths, fallback: false };
}

export const getStaticProps: GetStaticProps<MyProps> = async ({ params }) => {
    const characters = await getCharacters();
    const character = characters.find((character) => character.name.replace(/\s/g, '-') === params?.character);

    return { props: { character: character?.name || "" } };
}