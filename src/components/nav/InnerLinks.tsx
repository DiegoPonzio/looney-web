import React, {FC, useState} from "react";
import {BsChevronDown, BsChevronUp} from "react-icons/bs";
import Link from "next/link";
import {CartoonInfo} from "@/interfaces/characters";

interface MyProps {
	name: string;
	index: number;
	info: CartoonInfo[];
	handleClick: () => void;
}

export const InnerLinks: FC<MyProps> = ({ name, index, info, handleClick }) => {
	const [heading, setHeading] = useState("")

	const quitQuotes = (string: string) => {
		return string.replace(/['"]+/g, '')
	}

	return (
		<div key={`${name}_${index}`}>
			<div className="px-3 text-left  md:cursor-pointer group">
				<h1 className="flex justify-between items-center pr-5 group gap-1" onClick={() => heading !== name ? setHeading(name) : setHeading("")}>
					{name}
					<span className="inline">
						{heading === name ? <BsChevronUp /> : <BsChevronDown />}
					</span>
				</h1>
			</div>
			<div className={`transition-all duration-500 ease-in-out overflow-hidden ${heading === name ? "max-h-[1000px]" : "max-h-0"}`}>
				<ul className="flex flex-col justify-between items-center mx-2 px-2 gap-5 mt-4">
					{ info.map((character, index) => (
						<li key={`${character}_${index}`} onClick={handleClick}>
							<Link href={`/personajes/${name.replace(/\s/g, '-')}?category=${quitQuotes(JSON.stringify(character)).replace(/\s/g, '-')}#${quitQuotes(JSON.stringify(character)).replace(/\s/g, '-')}`}>
								{ quitQuotes(JSON.stringify(character)) || "holi"}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}