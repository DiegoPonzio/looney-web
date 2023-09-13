import React, { FC, useState } from "react";
import { Tonggle } from "@/components/Tonggle";
import Head from "next/head";
import Link from "next/link";
import {AiOutlineClose} from "react-icons/ai";
import {GiHamburgerMenu} from "react-icons/gi";
import {useCharacters} from "@/lib/useCharacters";
import {InnerLinks} from "@/components/nav/InnerLinks";

interface  MyProps {
	children: JSX.Element | JSX.Element[];
	title?: string;
}
export const Layout: FC<MyProps> = ({ children, title }) => {
	const [open, setOpen] = useState(false)
	const { characters, loading, error } = useCharacters()

	const handlerClose = () => {
		setOpen(!open)
	}

	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="description" content="¡Bienvenidos al mundo de risas y caos de los Looney Tunes! Explora las travesuras de Bugs Bunny, Daffy Duck y más. Revive momentos clásicos, descubre curiosidades y celebra el legado de estos personajes icónicos de la animación." />
				<link rel="icon" href="/logo.ico" />
			</Head>
			<header className={"flex items-center justify-between px-4 w-full fixed bg-white dark:bg-[#1A1A1A]"}>
				<div className={"max-lg:overflow-hidden max-md:max-w-[90vw] h-full flex justify-between items-center"}>
					<Link href={"/"} className={"text-5xl text-red"}>
						La Looney Web
					</Link>
				</div>
				<div className={"text-3xl relative z-[2] transition-transform duration-[0.4s] ease-in-out text-green"} onClick={() => setOpen(!open)}>
					{open ? <AiOutlineClose /> : <GiHamburgerMenu />}
				</div>
				<nav className={`w-full md:w-1/4 h-screen bg-white dark:bg-[#1A1A1A] fixed top-0 left-0 z-[1] transition-transform duration-[0.4s] ease-in-out transform ${open ? 'translate-x-0' : '-translate-x-full'} mt-12`}>
					<div className={"m-0 p-0"}>
						<ul className={"flex flex-col justify-between items-center mx-2 px-2 gap-5 mt-4 text-orange text-lg"}>
							{ loading ? <p>Cargando...</p> : error ? <p>Ha ocurrido un error</p> : characters.map((character, index) => {
								if ( character.info.length === 0 ) {
									return (
										<li key={`${index}_${character.name}`} onClick={ () => setOpen(!open)}>
											<Link href={`/personajes/${character.name.replace(/\s/g, '-')}`}>
												{character.name}
											</Link>
										</li>
									)
								} else {
									return <InnerLinks name={character.name} index={index} info={character.info} handleClick={handlerClose}/>
								}
							})}
						</ul>
						<div className={"flex flex-col justify-end items-end mx-5 py-20"}>
							<Link href={"/"}>
								Contacto
							</Link>
							<Tonggle/>
						</div>
					</div>
				</nav>
			</header>
			<main>
				{children}
			</main>
		</>
	)
}