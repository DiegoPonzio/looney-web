import Image from "next/image";
import Link from "next/link";
import {HiOutlineArrowLongRight} from "react-icons/hi2";
import {useCharacters} from "@/lib/useCharacters";
import {ImageCards} from "@/components/LandingPage/ImageCards";
import {dataCharacters, images} from "@/lib/dataCharacters";

export const MainPage = () => {
	const { characters, loading, error } = useCharacters()

	return (
		<>
			<div className={"flex flex-col justify-center items-center h-screen pt-20"}>
				<div className={"flex flex-col justify-center items-center text-center w-6/12"}>
					<Image src={"/Logo.jpg"} width={"350"} height={"350"} alt={"Logo"} className={"object-contain"} />
					<h1 className={"text-6xl font-bold text-red"}>La Looney Web</h1>
					<p className={"text-3xl pt-5"}>
						¡Bienvenido a La Looney Web, el paraíso de la diversión y la nostalgia con los Looney Tunes! 😄🐰🦆 Sumérgete en el mágico mundo de Bugs Bunny, Daffy Duck, Porky Pig y todos tus personajes favoritos de la infancia en esta plataforma única y llena de entretenimiento.
					</p>
					<Link href={"/escuelas"} className="mt-9 group relative h-12 w-48 overflow-hidden text-lg shadow flex justify-center items-center mb-24">
						<div
							className="absolute inset-0 w-3 bg-green transition-all duration-[250ms] ease-out group-hover:w-full"></div>
						<span className="relative dark:text-pink group-hover:text-orange">
							¡Explora un looney!
							<HiOutlineArrowLongRight className="inline-block ml-2" />
						</span>
					</Link>
				</div>
			</div>
			<div className={"flex items-center justify-center flex-col"}>
				<div className={"grid grid-cols-1 md:grid-cols-3 place-content-center gap-10"}>
					{loading ? <p>Cargando...</p> : error ? <p>Ha ocurrido un error</p> : characters.map((character, index) => (
						<ImageCards title={character.name} description={dataCharacters[index]} image={images[index]} />
					))}
				</div>
			</div>
		</>
	)
}