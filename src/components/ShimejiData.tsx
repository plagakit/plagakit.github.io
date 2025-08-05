import { ShimejiConfig } from "./Shimeji";

const shimeModuleToImages = (module: Record<string, unknown>) =>
	Object.entries(module)
		.sort(([a], [b]) => {
			const getNum = (path: string) => {
				const match = path.match(/shime(\d+)\.png$/);
				return match ? parseInt(match[1]) : 0;
			};
			return getNum(a) - getNum(b);
		})
		.map(([, module]: [string, any]) => module.default);

const defaultShimeji = (shimeImages: any[]): ShimejiConfig => {
	return {
		speed: 50,
		walk: {
			frames: [shimeImages[0], shimeImages[1], shimeImages[2], shimeImages[1]],
			interval: 175,
			loops: 6,
		},
		trip: {
			frames: [shimeImages[17], shimeImages[18], shimeImages[18]],
			interval: 250,
			loops: 1,
		},
		sit: {
			frames: [shimeImages[10]],
			interval: 1000,
			loops: 1,
			randomizeDuration: true,
			min: 3000,
			max: 11000,
		},
		spin: {
			frames: [shimeImages[0]],
			interval: 150,
			loops: 3,
		},
		dance: {
			frames: [shimeImages[4], shimeImages[5], shimeImages[0]],
			interval: 200,
			loops: 2,
		},
		forcewalk: 6,
		ORIGINAL_ACTIONS: [
			"walk",
			"walk",
			"walk",
			"walk",
			"walk",
			"walk",
			"spin",
			"spin",
			"spin",
			"sit",
			"sit",
			"dance",
			"dance",
			"dance",
			"dance",
			"dance",
			"dance",
			"dance",
			"dance",
			"trip",
		],
	};
};

const mikuModule = import.meta.glob("@/assets/front_page/miku/*.png", { eager: true });

export const MIKU_CONFIG = defaultShimeji(shimeModuleToImages(mikuModule));
