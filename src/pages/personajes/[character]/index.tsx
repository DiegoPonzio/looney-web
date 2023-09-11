// Solo se va a renderizar cuando se cumpla la condición de que el nombre del personaje sea igual al nombre del archivo
import {GetStaticPaths, GetStaticProps} from "next";
import {FC, useEffect, useState} from "react";
import {getCharacters} from "@/lib/charactersFactory";
import {Layout} from "@/components/Layout";
import {useCharacters} from "@/lib/useCharacters";
import {dataCharacters, images} from "@/lib/dataCharacters";
import {BsArrowDownShort, BsArrowUpShort} from "react-icons/bs";
import {useVideos} from "@/lib/useVideos";
import Link from "next/link";
import {CartoonInfo} from "@/interfaces/characters";
import {useSearchParams} from "next/navigation";

interface MyProps {
    character: string;
}
const Index: FC<MyProps> = ({ character }) => {
    const categoryParams = useSearchParams();
    const category = categoryParams.get("category")?.replace(/-/g, " ") || "";
    const { characters, loading, error } = useCharacters()
    const { videos, loading: loadingVideo, error: errorVideo, reverseVideos } = useVideos(character.replace(/-/g, ' '))
    const [arrow, setArrow] = useState<boolean>(false);
    const [showVideos, setShowVideos] = useState<string>("");

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


    // Verificamos si el persoanje tiene categorias
    const hasVideos = (video: CartoonInfo, index: number) => {
        if (!video.info) {
            return (
                <Link href={`/personajes/${urlCharacter}/video/${urlVideo(video.name)}`} key={`${video.name}_${index}`} className={"flex flex-col items-center justify-center w-full cursor-pointer"}>
                    <span className={"text-xl text-orange rounded"}>{video.name}</span>
                    <img
                        className={"w-4/5 md:h-[35vh] h-[22vh] object-contain"}
                        src={image}
                        alt={video.name}
                    />
                </Link>
            )
        }
    }

    const handlerShowVideos = (videoName: string) => {
        if (showVideos !== videoName) {
            setShowVideos(videoName);
        } else {
            setShowVideos("");
        }
    }

    const clearId = (id: string) => {
        return id.replace(/'/g, "").replace(/\s/g, "-");
    }

    const hasCategories = (video: CartoonInfo, index: number) => {
        if (video.info) {
            return (
                <div key={`${video.name}_${index}`} className={"flex flex-col items-center justify-center w-full"}>
                    <span id={clearId(video.name)} className={"cursor-pointer text-xl text-red rounded mb-4 flex items-center"} onClick={() => handlerShowVideos(video.name.replace(/'/g, ""))}>
                        {video.name}
                        {showVideos === video.name.replace(/'/g, "") ? <BsArrowUpShort className={"text-3xl"} /> : <BsArrowDownShort className={"text-3xl"} />}
                    </span>
                    <div className={`grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 w-full transition-all duration-500 ease-in-out overflow-auto h-auto ${showVideos === video.name.replace(/'/g, "") ? "max-h-[1000px]" : "max-h-0"}`}>
                        {video.info.map((info, index) => {
                            return (
                                <Link href={`/personajes/${urlCharacter}/${urlVideo(video.name)}/video/${urlVideo(info.name)}`} key={`${info}_${index}`} className={"flex flex-col items-center justify-center w-full cursor-pointer"}>
                                    <span className={"text-xl text-orange rounded"}>{info.name}</span>
                                    <img
                                        className={"w-4/5 md:h-[35vh] h-[22vh] object-contain"}
                                        src={image}
                                        alt={info.name}
                                    />
                                </Link>
                            )
                        })}
                    </div>
                </div>
            )
        }
    }

    useEffect(() => {
        setShowVideos(category)
    }, [category])

    return (
        <Layout title={character}>
            <div className={"pt-20 flex flex-col items-center justify-center w-full"}>
                <div className={"flex flex-col md:flex-row items-center justify-center w-full md:w-4/5 mb-6"}>
                    <div className={"flex flex-col items-center justify-center w-full md:w-1/2 px-6"}>
                        <h1 className={"text-4xl text-red mb-3"}>{character}</h1>
                        <img src={characterImage} alt={character} className={"w-full md:h-[70vh] h-[45vh] object-contain"}/>
                    </div>
                    <div className={"flex flex-col justify-between items-center text-xl my-7 text-center w-full px-6 md:w-1/2"}>
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
                        {loadingVideo ? <p>Cargando...</p> : errorVideo ? <p>Ha ocurrido un error</p> : videos.map((video, index) => hasVideos(video, index))}
                    </div>
                    <div className={"flex flex-col w-full"}>
                        {!loadingVideo && !errorVideo && videos.map((video, index) => hasCategories(video, index))}
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

export const getStaticProps: GetStaticProps<MyProps> = async ({ params}) => {
    const characters = await getCharacters();
    const character = characters.find((character) => character.name.replace(/\s/g, '-') === params?.character);

    return { props: { character: character?.name || ""} };
}