import { useRef, useEffect } from "react";

// CODE ADAPTED FROM https://github.com/lars-rooij/webmeji/blob/main/main.js

const shimejiStyles = `
	/* web shimeji */
	.webmeji-container {
		position: fixed;
		bottom: 0;
		width: 100px;
		height: 100px;
		overflow: hidden;
		z-index: 9999;
	}

	.webmeji-container img {
		width: 100%;
		height: auto;
		user-select: none;
		pointer-events: none;
		display: block;
		transform-origin: center;
	}

	@media (max-width: 768px) {
		.webmeji-container {
			width: 50px;
			height: 50px;
		}
	}
`;

export interface ShimejiConfig {
	speed: number;
	walk: { frames: string[]; interval: number; loops: number };
	trip: { frames: string[]; interval: number; loops: number };
	sit: {
		frames: string[];
		interval: number;
		loops: number;
		randomizeDuration: boolean;
		min: number;
		max: number;
	};
	spin: { frames: string[]; interval: number; loops: number };
	dance: { frames: string[]; interval: number; loops: number };
	forcewalk: number;
	ORIGINAL_ACTIONS: string[];
}

class Creature {
	container: HTMLDivElement;
	img: HTMLImageElement;
	spriteConfig: any;
	actionSequence: any;
	currentActionIndex: number;
	currentAction: string | undefined;
	frameTimer: NodeJS.Timeout | undefined;
	actionCompletionTimer: NodeJS.Timeout | undefined;
	currentFrame: number;
	direction: number;
	containerWidth: number;
	containerHeight: number;
	position: number;
	maxPos: number;
	forceWalkAfter: boolean;
	animationFrameId: number;
	resizeHandler: () => void;
	lastTime: any;

	constructor(containerId: string, spriteConfig: ShimejiConfig) {
		// make container div
		this.container = document.createElement("div");
		this.container.className = "webmeji-container";
		document.body.appendChild(this.container);

		// first frame added
		this.img = document.createElement("img");
		this.img.id = containerId;
		this.img.src = spriteConfig.walk.frames[0];
		this.container.appendChild(this.img);

		this.spriteConfig = spriteConfig;
		this.actionSequence = this.shuffle([...this.spriteConfig.ORIGINAL_ACTIONS]);
		this.currentActionIndex = 0;
		this.currentAction = undefined;
		this.frameTimer = undefined;
		this.actionCompletionTimer = undefined;
		this.currentFrame = 0;
		this.direction = 1;

		// position container
		const containerStyle = window.getComputedStyle(this.container);
		this.containerWidth = parseFloat(containerStyle.width);
		this.containerHeight = parseFloat(containerStyle.height);

		// random start position
		this.position = Math.random() * (window.innerWidth - this.containerWidth);
		this.maxPos = window.innerWidth - this.containerWidth;
		this.forceWalkAfter = false;

		this.container.style.left = this.position + "px";

		this.updateImageDirection();

		// start initial action & animation
		this.currentAction = this.actionSequence[this.currentActionIndex];
		this.startAction(this.currentAction);

		this.animate = this.animate.bind(this);
		this.animationFrameId = requestAnimationFrame(this.animate);

		// update size window
		this.resizeHandler = () => {
			const style = window.getComputedStyle(this.container);
			this.containerWidth = parseFloat(style.width);
			this.containerHeight = parseFloat(style.height);
			this.maxPos = window.innerWidth - this.containerWidth;
			this.position = Math.min(this.position, this.maxPos);
			this.container.style.left = this.position + "px";
		};
		window.addEventListener("resize", this.resizeHandler);
	}

	// randomize actions
	shuffle(array: any[]) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}

	// flip image based on moving direction
	updateImageDirection() {
		this.img.style.transform = this.direction === -1 ? "scaleX(1)" : "scaleX(-1)";
	}

	// clear ongoing timers
	resetAnimation() {
		clearInterval(this.frameTimer);
		clearTimeout(this.actionCompletionTimer);
		this.currentFrame = 0;
		this.frameTimer = undefined;
		this.actionCompletionTimer = undefined;
	}

	clearAllTimers() {
		this.resetAnimation();
		if (this.animationFrameId) {
			cancelAnimationFrame(this.animationFrameId);
			this.animationFrameId = -1;
		}
	}

	// next action in actionsequence, or reshuffle the actionsequence
	// set forcewalk for special actions
	setNextAction() {
		this.resetAnimation();

		if (this.forceWalkAfter) {
			this.forceWalkAfter = false;
			this.startForcedWalk();
			return;
		}

		this.currentActionIndex++;
		if (this.currentActionIndex >= this.actionSequence.length) {
			this.currentActionIndex = 0;
			this.actionSequence = this.shuffle([...this.spriteConfig.ORIGINAL_ACTIONS]);
		}

		this.currentAction = this.actionSequence[this.currentActionIndex];
		this.startAction(this.currentAction);
	}

	// force to walk for a set number of cycles
	startForcedWalk() {
		const { frames, interval } = this.spriteConfig.walk;
		const walkCycles = this.spriteConfig.forcewalk;
		this.currentAction = "forced-walk";
		this.playAnimation(frames, interval, walkCycles, () => this.setNextAction());
	}

	// start the action
	startAction(action: string | undefined) {
		this.resetAnimation();
		const config = this.spriteConfig[action ?? 0];
		if (!config) return;

		const { frames, interval, loops = 1 } = config;

		// sitting, with the randomized time to hold this frame
		if (action === "sit") {
			const duration = config.randomizeDuration
				? Math.random() * (config.max - config.min) + config.min
				: interval * loops;
			this.img.src = frames[0];
			this.actionCompletionTimer = setTimeout(() => {
				this.forceWalkAfter = true;
				this.setNextAction();
			}, duration);
			return;
		}

		// play the animation and callback
		this.playAnimation(frames, interval, loops, () => {
			// flip the frame after spinning
			if (action === "spin") {
				this.direction *= -1;
				this.updateImageDirection();
			}
			// force walking after special action
			if (["trip", "dance", "spin"].includes(action ?? "dance")) {
				this.forceWalkAfter = true;
			}
			this.setNextAction();
		});
	}

	// play animation
	playAnimation(
		frames: string | any[],
		interval: number | undefined,
		loops: number,
		onComplete: { (): void; (): void; (): void }
	) {
		let playCount = 0;
		this.currentFrame = 0;
		this.img.src = frames[0];

		if (this.frameTimer) clearInterval(this.frameTimer);

		// change frame every interval
		this.frameTimer = setInterval(() => {
			this.currentFrame = (this.currentFrame + 1) % frames.length;
			this.img.src = frames[this.currentFrame];

			// update loop counter when at last frame
			if (this.currentFrame === frames.length - 1) {
				playCount++;
				// after completing all loops, stop animation
				if (playCount >= loops) {
					clearInterval(this.frameTimer);
					this.frameTimer = undefined;
					this.actionCompletionTimer = setTimeout(onComplete, 0);
				}
			}
		}, interval);
	}

	// animate function on each animation frame with requestAnimationFrame
	animate(time: number) {
		if (!this.lastTime) this.lastTime = time;
		const delta = (time - this.lastTime) / 1000;
		this.lastTime = time;

		if (this.currentAction === "walk" || this.currentAction === "forced-walk") {
			this.position += this.direction * this.spriteConfig.speed * delta;

			// flip if it reaches the border of a screen
			if (this.position >= this.maxPos) {
				this.position = this.maxPos;
				this.direction = -1;
				this.updateImageDirection();
			} else if (this.position <= 0) {
				this.position = 0;
				this.direction = 1;
				this.updateImageDirection();
			}

			this.container.style.left = this.position + "px";
		}

		this.animationFrameId = requestAnimationFrame(this.animate);
	}
}

export interface ShimejiProps {
	name: string;
	config: ShimejiConfig;
}

const Shimeji = (props: ShimejiProps) => {
	const creatureRef = useRef<Creature | null>(null);

	useEffect(() => {
		const styleElement = document.createElement("style");
		styleElement.innerHTML = shimejiStyles;
		document.head.appendChild(styleElement);

		const shimeji = new Creature(`${props.name}-shimeji`, props.config);
		creatureRef.current = shimeji;

		return () => {
			document.head.removeChild(styleElement);

			if (creatureRef.current) {
				creatureRef.current.clearAllTimers();
				window.removeEventListener("resize", creatureRef.current.resizeHandler);
				if (creatureRef.current.container.parentNode) {
					creatureRef.current.container.parentNode.removeChild(
						creatureRef.current.container
					);
				}
				creatureRef.current = null;
			}
		};
	}, []);

	return null;
};

export default Shimeji;
