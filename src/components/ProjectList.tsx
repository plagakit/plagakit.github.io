import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import { ProjectCardProps } from "./ProjectCard";
// import Squiggle from "./Squiggle";

import speedgolfPreview from "../assets/front_page/speedgolf.png";
import speedgolfGif from "../assets/front_page/speedgolf_gif.gif";
import rendererPreview from "../assets/front_page/monkey.png";
import rendererGif from "../assets/front_page/catgif2.gif";
import catPreview from "../assets/front_page/cat.jpg";
import catGif from "../assets/front_page/catgif.gif";
import chip8Preview from "../assets/front_page/chip8.jpg";
import chip8Gif from "../assets/front_page/chip8_gif.gif";
import bombermanPreview from "../assets/front_page/ubisoft.jpg";
import bombermanGif from "../assets/front_page/ubisoft_gif.gif";

const Projects: ProjectCardProps[] = [
	{
		key: 0,
		name: "Ubisoft NEXT 2025",
		link: "https://github.com/plagakit/ubisoft-next-2025",
		previewURL: speedgolfPreview,
		gifURL: speedgolfGif,
		startDate: new Date(2025, 1),
		completed: true,
	},
	{
		key: 1,
		name: "Software Renderer",
		link: "/renderer/index.html",
		previewURL: rendererPreview,
		gifURL: rendererGif,
		startDate: new Date(2024, 8),
		completed: false,
		sameTab: true,
	},
	{
		key: 2,
		name: "3VG3 Physics Engine",
		link: "/physics/index.html",
		previewURL: catPreview,
		gifURL: catGif,
		startDate: new Date(2024, 1),
		completed: false,
		sameTab: true,
	},
	{
		key: 3,
		name: "CHIP-8 Emulator",
		link: "/chip8/index.html",
		previewURL: chip8Preview,
		gifURL: chip8Gif,
		startDate: new Date(2023, 4),
		completed: true,
		sameTab: true,
	},
	{
		key: 4,
		name: "Ubisoft NEXT 2023",
		link: "https://github.com/plagakit/ubisoft-next-2023",
		previewURL: bombermanPreview,
		gifURL: bombermanGif,
		startDate: new Date(2023, 1),
		completed: true,
	},
];

const ProjectList = () => {
	const [list, setList] = useState(Projects);
	const [, setSortBy] = useState("relevancy");

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSortBy(e.target.value);
		setList(sortProjects(e.target.value));
	};

	const sortProjects = (sortParam: string) => {
		if (sortParam === "relevancy") {
			return [...Projects];
		} else if (sortParam === "title") {
			return [...Projects].sort((a, b) => {
				return a.name < b.name ? -1 : 1;
			});
		} else if (sortParam === "newest") {
			return [...Projects].sort((a, b) => {
				return a.startDate > b.startDate ? -1 : 1;
			});
		} else if (sortParam === "oldest") {
			return [...Projects].sort((a, b) => {
				return a.startDate < b.startDate ? -1 : 1;
			});
		} else {
			return [];
		}
	};

	return (
		<section>
			{/* <Squiggle> */}
			<h1 className="text-center lg:text-left text-4xl underline mb-3">
				Projects
			</h1>
			{/* </Squiggle> */}
			<form>
				<div>
					<span>Sort by:</span>
					<select name="sortby" onChange={handleChange}>
						<option value="relevancy">Relevancy</option>
						<option value="title">Title</option>
						<option value="newest">Newest to Oldest</option>
						<option value="oldest">Oldest to Newest</option>
					</select>
				</div>
			</form>
			<small className="text-justify">
				Note: my in-browser C++ projects are currently CSS-less as I
				transition from Emscripten w/ raw HTML to React TS.
			</small>
			<div>
				{list.map((card) => (
					<ProjectCard
						key={card.key}
						name={card.name}
						link={card.link}
						previewURL={card.previewURL}
						gifURL={card.gifURL}
						completed={card.completed}
						startDate={card.startDate}
						sameTab={card.sameTab}
					/>
				))}
				{list.length === 0 && (
					<h1 className="text-center">empty list..... o_O</h1>
				)}
			</div>
		</section>
	);
};

export default ProjectList;
