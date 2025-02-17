// import nameURL from "./assets/front_page/name.gif";
import Header from "./components/Header";
import githubIconURL from "./assets/github_icon.gif";
import linkedinIconURL from "./assets/front_page/linkedin_icon.gif";
import ProjectList from "./components/ProjectList";

function App() {
	return (
		<>
			<div className="max-w-[40rem] mx-auto flex-col">
				{/* Header */}
				<Header />
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
