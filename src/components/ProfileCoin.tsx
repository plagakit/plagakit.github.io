import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

import icon1 from "../assets/front_page/icon.png";
import icon2 from "../assets/front_page/icon_but_real.jpg";

const Coin = (props: any) => {
	const frontTexture = useTexture(icon1, (texture) => {
		texture.colorSpace = THREE.SRGBColorSpace;
	});
	const backTexture = useTexture(icon2, (texture) => {
		texture.colorSpace = THREE.SRGBColorSpace;
	});

	const meshRef = useRef<THREE.Mesh>(null);
	const [isSpinning, setIsSpinning] = useState(false);

	const currentRot = useRef(0);
	const targetRot = useRef(0);
	const [velocity, setVelocity] = useState(0);
	const [acceleration, setAcceleration] = useState(0);

	const materials = useMemo(
		() => [
			new THREE.MeshBasicMaterial({ color: "#006f87" }), // Side of coin
			new THREE.MeshBasicMaterial({ map: frontTexture }), // Front
			new THREE.MeshBasicMaterial({ map: backTexture }), // back
		],
		[]
	);

	useFrame((_state, delta) => {
		if (meshRef.current) {
			meshRef.current.rotation.y = Math.PI / 2;
			if (isSpinning) {
				setVelocity(velocity + acceleration * delta);
				currentRot.current += velocity * delta;

				if (velocity > 0.0) {
					setIsSpinning(false);
					currentRot.current = targetRot.current;
				}
				meshRef.current.rotation.z = 1 * currentRot.current;
			}
		}
	});

	const handleClick = () => {
		if (!isSpinning) {
			targetRot.current = currentRot.current + Math.PI;
			setIsSpinning(true);
			setVelocity(-3 * Math.PI);
			setAcceleration(Math.PI * 1.515);
		}
	};

	return (
		<mesh
			ref={meshRef}
			onClick={handleClick}
			onPointerEnter
			onPointerLeave
			material={materials}
			position={[0, 0, 0]}
			{...props}
		>
			<cylinderGeometry args={[6, 6, 1, 32]} />
		</mesh>
	);
};

const ProfileCoin = () => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<div className="w-full h-full" style={{ cursor: isHovered ? "pointer" : "auto" }}>
			<Canvas camera={{ position: [0, 10, 0] }} flat>
				<Coin
					onPointerEnter={() => setIsHovered(true)}
					onPointerLeave={() => setIsHovered(false)}
				/>
			</Canvas>
		</div>
	);
};

export default ProfileCoin;
