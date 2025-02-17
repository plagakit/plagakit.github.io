import Squiggle from "../components/Squiggle";
import ProfileCoin from "./ProfileCoin";

const Header = () => {
	return (
		<header className="mt-3 flex justify-center">
			<div className="flex flex-col lg:flex-row">
				<div className="w-full lg:w-3/5 mt-4 flex flex-col justify-center">
					<Squiggle>
						<h1 className="text-center sm:text-center lg:justify-start font-bold text-[3.5rem] leading-none flex justify-center">
							Thomas Plagakis
						</h1>
					</Squiggle>
					<p className="px-2 pt-6 break-words text-2xl">
						I'm a <s>first</s> <s>second</s> third year student at{" "}
						<span className="mcmaster">McMaster University</span>. I like
						coding things. Check out my code below:
					</p>
				</div>
				<div className="w-full h-[230px] lg:w-2/5 flex justify-center lg:justify-end">
					<ProfileCoin />
				</div>
			</div>
		</header>
	);
};

export default Header;
