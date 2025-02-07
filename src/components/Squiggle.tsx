import React from "react";
import "./Squiggle.css";

interface SquiggleProps {
	children: React.ReactNode;
	duration?: number;
}

const Squiggle = ({ children, duration = 5 }: SquiggleProps) => {
	return (
		<>
			<div
				//className="squiggle"
				style={{
					filter: "url(#turbulence-0)",
					animation: `filterCycle ${duration}s infinite`,
				}}
			>
				{children}
			</div>
			<svg className="squiggle-animation hidden">
				<defs>
					<filter id="turbulence-0">
						<feTurbulence
							baseFrequency="0.02"
							numOctaves="1"
							result="noise"
							seed="0"
						/>
						<feGaussianBlur
							in="noise"
							stdDeviation="5"
							result="blurredNoise"
						/>
						<feDisplacementMap
							in="SourceGraphic"
							in2="blurredNoise"
							scale="6"
						/>
					</filter>

					<filter id="turbulence-1">
						<feTurbulence
							baseFrequency="0.02"
							numOctaves="3"
							result="noise"
							seed="1"
						/>
						<feGaussianBlur
							in="noise"
							stdDeviation="5"
							result="blurredNoise"
						/>
						<feDisplacementMap
							in="SourceGraphic"
							in2="blurredNoise"
							scale="8"
						/>
					</filter>

					<filter id="turbulence-2">
						<feTurbulence
							baseFrequency="0.02"
							numOctaves="3"
							result="noise"
							seed="2"
						/>
						<feGaussianBlur
							in="noise"
							stdDeviation="5"
							result="blurredNoise"
						/>
						<feDisplacementMap
							in="SourceGraphic"
							in2="blurredNoise"
							scale="6"
						/>
					</filter>

					<filter id="turbulence-3">
						<feTurbulence
							baseFrequency="0.02"
							numOctaves="3"
							result="noise"
							seed="3"
						/>
						<feGaussianBlur
							in="noise"
							stdDeviation="5"
							result="blurredNoise"
						/>
						<feDisplacementMap
							in="SourceGraphic"
							in2="blurredNoise"
							scale="8"
						/>
					</filter>
				</defs>
			</svg>
		</>
	);
};

export default Squiggle;
