// import React, { useEffect, useRef } from "react";

// interface EmscriptenProps {
// 	moduleJSURL: string;
// }

// const EmscriptenModule = ({ moduleJSURL }: EmscriptenProps) => {
// 	// Set up Emscripten
// 	var statusElement = document.getElementById("status") as HTMLElement | null;
// 	var progressElement = document.getElementById(
// 		"progress"
// 	) as HTMLProgressElement | null;
// 	var spinnerElement = document.getElementById(
// 		"spinner"
// 	) as HTMLElement | null;

// 	var Module = {
// 		print: (function () {
// 			var element = document.getElementById("output");
// 			if (element) element.nodeValue = ""; // clear browser cache
// 			return (...args: any[]) => {
// 				var text = args.join(" ");
// 				// These replacements are necessary if you render to raw HTML
// 				//text = text.replace(/&/g, "&amp;");
// 				//text = text.replace(/</g, "&lt;");
// 				//text = text.replace(/>/g, "&gt;");
// 				//text = text.replace('\n', '<br>', 'g');
// 				console.log(text);
// 				if (element) {
// 					element.nodeValue += text + "\n";
// 					element.scrollTop = element.scrollHeight; // focus on bottom
// 				}
// 			};
// 		})(),
// 		canvas: (() => {
// 			var canvas = document.getElementById("canvas");
// 			if (canvas === null) return;

// 			// As a default initial behavior, pop up an alert when webgl context is lost. To make your
// 			// application robust, you may want to override this behavior before shipping!
// 			// See http://www.khronos.org/registry/webgl/specs/latest/1.0/#5.15.2
// 			canvas.addEventListener(
// 				"webglcontextlost",
// 				(e) => {
// 					alert(
// 						"WebGL context lost. You will need to reload the page."
// 					);
// 					e.preventDefault();
// 				},
// 				false
// 			);

// 			return canvas;
// 		})(),
// 		setStatus: (text: any) => {
// 			if (!(Module.setStatus as any).last)
// 				(Module.setStatus as any).last = { time: Date.now(), text: "" };
// 			if (text === (Module.setStatus as any).last.text) return;
// 			var m = text.match(/([^(]+)\((\d+(\.\d+)?)\/(\d+)\)/);
// 			var now = Date.now();
// 			if (m && now - (Module.setStatus as any).last.time < 30) return; // if this is a progress update, skip it if too soon
// 			(Module.setStatus as any).last.time = now;
// 			(Module.setStatus as any).last.text = text;
// 			if (m) {
// 				text = m[1];
// 				if (progressElement && spinnerElement) {
// 					progressElement.value = parseInt(m[2]) * 100;
// 					progressElement.max = parseInt(m[4]) * 100;
// 					progressElement.hidden = false;
// 					spinnerElement.hidden = false;
// 				}
// 			} else {
// 				if (progressElement && spinnerElement) {
// 					progressElement.value = 0;
// 					progressElement.max = 0;
// 					progressElement.hidden = true;
// 					if (!text) spinnerElement.style.display = "none";
// 				}
// 			}
// 			if (statusElement) {
// 				statusElement.innerHTML = text;
// 			}
// 		},
// 		totalDependencies: 0,
// 		monitorRunDependencies: (left: number) => {
// 			this.totalDependencies = Math.max(this.totalDependencies, left);
// 			Module.setStatus(
// 				left
// 					? "Preparing... (" +
// 							(this.totalDependencies - left) +
// 							"/" +
// 							this.totalDependencies +
// 							")"
// 					: "All downloads complete."
// 			);
// 		},
// 	};
// 	Module.setStatus("Downloading...");
// 	window.onerror = (event) => {
// 		// TODO: do not warn on ok events like simulating an infinite loop or exitStatus
// 		Module.setStatus("Exception thrown, see JavaScript console");
// 		if (spinnerElement) spinnerElement.style.display = "none";
// 		Module.setStatus = (text) => {
// 			if (text) console.error("[post-exception status] " + text);
// 		};
// 	};

// 	// Set up the Emscripten module
// 	useEffect(() => {
// 		const script = document.createElement("script");

// 		script.src = moduleJSURL;
// 		script.async = true;

// 		document.body.appendChild(script);

// 		return () => {
// 			document.body.removeChild(script);
// 		};
// 	}, []);

// 	const canvasRef = useRef<HTMLCanvasElement>(null);

// 	return (
// 		<div>
// 			{/* Progress Bar */}
// 			<div className="emscripten">
// 				<progress value={0} max={100} id="progress" hidden></progress>
// 			</div>

// 			{/* Canvas Container */}
// 			<div className="emscripten_border">
// 				<canvas
// 					className="emscripten"
// 					id="canvas"
// 					ref={canvasRef}
// 					onContextMenu={(event) => event.preventDefault()}
// 					tabIndex={-1}
// 				></canvas>
// 			</div>
// 		</div>
// 	);
// };

// export default EmscriptenModule;
