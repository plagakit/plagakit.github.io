import { useState } from "react";

export interface ProjectCardProps {
	key: number;
	name: string;
	link: string;
	previewURL: string;
	gifURL: string;
	startDate: Date;
	completed: boolean;
	sameTab?: boolean;
}

const ProjectCard = (props: ProjectCardProps) => {
	const [hover, setHover] = useState(false);

	return (
		<div className="px-2 py-1">
			<a
				href={props.link}
				target={props.sameTab ? "_self" : "_blank"}
				onMouseEnter={() => setHover(true)}
				onMouseLeave={() => setHover(false)}
				className={`group block w-full ${
					hover ? "h-[400px]" : "h-[250px]"
				} bg-cover bg-center border-[15px] rounded-md border-[var(--medium-colour)] box-border transition-all duration-400 flex items-center justify-center`}
				style={{
					backgroundImage: `url(${
						hover ? props.gifURL : props.previewURL
					})`,
				}}
			>
				<span className="p-2 md:p-4 text-white text-xl md:text-4xl bg-[rgba(0,111,135,0.7)]">
					{props.name + (props.completed ? "" : " (WIP)")}
				</span>
			</a>
		</div>
	);
};

export default ProjectCard;
