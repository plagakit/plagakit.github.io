import githubIconURL from "./assets/github_icon.gif";
import linkedinIconURL from "./assets/front_page/linkedin_icon.gif";
import ProjectList from "./components/ProjectList";
import ProfileCoin from "./components/ProfileCoin";
import Squiggle from "./components/Squiggle";

function App() {
	return (
		<>
			<div className="max-w-[40rem] mx-auto flex-col">
				{/* Header */}
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
								<span className="mcmaster">McMaster University</span>. I
								like coding things. Check out my code below:
							</p>
						</div>
						<div className="w-full h-[230px] lg:w-2/5 flex justify-center lg:justify-end">
							<ProfileCoin />
						</div>
					</div>
				</header>
				{/* Socials */}
				<div className="my-4 flex flex-wrap justify-center gap-4">
					<a href="https://github.com/plagakit" target="_blank">
						<img src={githubIconURL} alt="GitHub"></img>
					</a>
					<a href="https://www.linkedin.com/in/tplagakis/" target="_blank">
						<img src={linkedinIconURL} alt="LinkedIn"></img>
					</a>
				</div>
				{/* Projects */}
				<ProjectList />
				{/* Footer */}
				<footer className="text-lg my-6">
					<hr className="border-3 border-solid my-2"></hr>
					<p>Last updated February 2025.</p>
					<p>
						Check out the source for this website{" "}
						<a
							className="underline"
							href="https://github.com/plagakit/plagakit.github.io"
							target="_blank"
						>
							here
						</a>
						.{" "}
					</p>
					<p>
						Font used is{" "}
						<a
							className="underline"
							href="https://fonts.google.com/specimen/Pangolin"
						>
							Pangolin
						</a>{" "}
						by Kevin Burke. All icons drawn by me :)
					</p>
				</footer>
			</div>
		</>
	);
}

export default App;
