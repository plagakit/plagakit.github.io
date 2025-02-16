import iconURL from "../assets/front_page/icon.png";
import Squiggle from "../components/Squiggle";

const Header = () => {
	return (
		<header className="mt-3 lg:mt-10 flex justify-center">
			<div className="flex flex-col lg:flex-row">
				<div className="w-full lg:w-3/5">
					<Squiggle>
						<h1 className="text-center sm:text-center lg:justify-start font-bold text-[3.5rem] leading-none flex justify-center">
							Thomas Plagakis
						</h1>
					</Squiggle>
					<p className="px-2 pt-4 mb-5 break-words text-2xl">
						I'm a <s>first</s> <s>second</s> third year student at{" "}
						<span className="mcmaster">McMaster University</span>. I
						like coding things. Check out my code below:
					</p>
				</div>
				<div className="w-full lg:w-2/5 flex justify-center lg:justify-end">
					<img
						src={iconURL}
						className="rounded-full overflow-hidden"
						style={{
							border: "15px solid var(--medium-colour)",
						}}
						alt="Picture of me."
					></img>
				</div>
			</div>
		</header>
	);
};

export default Header;
