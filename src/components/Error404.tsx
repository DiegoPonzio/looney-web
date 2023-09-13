import Link from "next/link";
import Image from "next/image";

export const Error404 = () => {
	return (
		<div className={"md:w-screen md:h-screen md:flex items-center justify-center mt-10 md:mt-0"}>
			<div className={"md:w-1/2 md:h-1/2 md:mx-10 mx-5 text-xl flex flex-wrap items-center"}>
				<h1 className={"font-bold text-red text-3xl"}>Error 404: ¡Mis planes para conquistar la Tierra no han tenido éxito!</h1>
				<p className={"mx-6 mb-2"}>
					Quién sabe, tal vez encuentres un mundo más amigable por aquí. Y si ves algún ovni aterrizando, no te preocupes, solo soy yo, Marvin, buscando una taza de té espacial. ¡Buena suerte, terrícola!
				</p>
				<Link href={"/"} className={"bg-green hover:bg-red hover:text-orange text-white font-bold mx-6 py-2 px-2 rounded"}>
					Explora mas looneys
				</Link>
				<div className={"mx-6 mt-8 mb-3 hidden md:flex md:flex-wrap"}>
					<h2 className={"font-bold text-2xl text-red"}>¿Qué ha pasado?</h2>
					<p className={"mx-6 mb-2"}>
						La página que estás buscando no existe o no está disponible en este momento. Puede que hayas escrito mal la dirección o que la página se haya movido.
					</p>
					<p className={"mx-6 mb-2"}>
						Te recomendamos que vuelvas a la página anterior o que visites nuestra página de inicio.
					</p>
					<Link href={"/"} className={"bg-green hover:bg-red hover:text-orange text-white font-bold mx-6 py-2 px-2 rounded"}>
						Contactanos
					</Link>
				</div>
			</div>
			<div className={"w-1/2 h-1/2 mx-5 my-3 md:flex items-center justify-center hidden"}>
				<Image src={"/marvin_el_marciano.webp"} alt={"404"} className={"object-contain"} height={400} width={400} />
			</div>
			<div className={"mx-5 my-6 flex items-center justify-center md:hidden"}>
				<Image src={"/marvin_el_marciano.webp"} alt={"404"} className={"object-contain"} height={250} width={250} />
			</div>
		</div>
	)
}