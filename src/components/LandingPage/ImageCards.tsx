import Link from "next/link";
import {FC} from "react";
import {BsArrowRightShort} from "react-icons/bs";

interface  MyProps {
	title: string;
	description: string;
	image: string;
}
export const ImageCards: FC<MyProps> = ({ title, image, description }) => {
	return (
		<div
			className="max-w-sm block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
			<Link href="#!">
				<img
					height={100}
					width={300}
					className="rounded-t-lg items-center justify-center object-contain w-full h-56"
					src={image}
					alt={title}/>
			</Link>
			<div className="p-6">
				<h5
					className="mb-2 text-xl font-medium leading-tight text-red">
					{title}
				</h5>
				<p className="mb-4 text-base">
					{description}
				</p>
				<Link
					href={`/personajes/${title.replace(/\s/g, '-')}`}
					className="text-lg bg-pink flex rounded px-3 py-1.5 text-center text-orange font-normal w-max items-center justify-center"
					id="basic-addon2">
					Conoce más
					<BsArrowRightShort className="ml-2 mt-1"/>
				</Link>
			</div>
		</div>
	)
}