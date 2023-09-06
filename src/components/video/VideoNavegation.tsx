import {VideoPlayer} from "@/components/VideoPlayer";
import {BsList} from "react-icons/bs";
import {FC} from "react";
import {useVideoCharacter} from "@/lib/useVideoCharacter";
import Link from "next/link";

interface MyProps {
	title: string;
	character: string;
	name: string;
}
export const VideoNavegation: FC<MyProps> = ({title, name, character}) => {
	const { characterData, loading, error } = useVideoCharacter(name, character)

	// quitar el /view/ del link
	const videoUrl = characterData.link?.replace("/view", "/preview") || "";

	const nextLink = () => {
		const nextVideo = characterData.nextVideo?.replace(/\s/g, '-').replace("?", "") || "";

		return  nextVideo === "" ? "#" :`/personajes/${character}/video/${nextVideo}`;
	}

	const prevLink = () => {
		const prevVideo = characterData.previousVideo?.replace(/\s/g, '-').replace("?", "") || "";

		return  prevVideo === "" ? "#" :`/personajes/${character}/video/${prevVideo}`;
	}

	return (
		<div className={"md:pt-16 pt-24	 flex items-center justify-center w-full"}>
			<div className={"flex flex-col justify-end w-4/5"}>
				<h1 className={"text-4xl mb-4"}>{title}</h1>
				{loading ? <p>Loading...</p> : error ? <p>Ha ocurrido un error</p> : <VideoPlayer videoUrl={videoUrl}/>}
				<div className={"flex justify-between items-center text-xl my-7 text-center"}>
					<Link href={prevLink()} className={`${characterData.previousVideo === undefined ? "bg-pink text-black cursor-not-allowed" : "bg-green text-white"} px-4 py-2 rounded-md w-3/12 flex items-center justify-center`}>Anterior</Link>
					<Link href={`/personajes/${character}`} className={"bg-green text-white px-4 py-2 rounded-md w-3/12 flex items-center justify-center"}><BsList /></Link>
					<Link href={nextLink()} className={`${characterData.nextVideo === undefined  ?  "bg-pink text-black cursor-not-allowed" :"bg-green text-white"} px-4 py-2 rounded-md w-3/12 flex items-center justify-center`}>Siguiente </Link>
				</div>
			</div>
		</div>
	)
}