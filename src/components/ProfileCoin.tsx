import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

import icon1 from "../assets/front_page/icon1.png";
import icon2 from "../assets/front_page/icon2.png";

const Coin = (props: any) => {
	const frontTexture = useTexture(icon1, (texture) => {
		texture.colorSpace = THREE.SRGBColorSpace;
	});
	const backTexture = useTexture(icon2, (texture) => {
		texture.colorSpace = THREE.SRGBColorSpace;
		texture.flipY = false;
	});

	const meshRef = useRef<THREE.Mesh>(null);

	const radius = 1;
	const height = 0.1;
	const geometry = new THREE.CylinderGeometry(radius, radius, height);
	geometry.rotateY(Math.PI / 2);
	geometry.rotateX(Math.PI / 2);

	const normalVelocity = 0.5;
	const bumpVelocity = 10;
	const maxVelocity = 40;
	const deceleration = 2;
	const [rotation, setRotation] = useState(0);
	const [velocity, setVelocity] = useState(normalVelocity);
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
			setAcceleration(-deceleration * (velocity - normalVelocity));
			setVelocity(velocity + acceleration * delta);
			if (velocity < normalVelocity) {
				setVelocity(normalVelocity);
				setAcceleration(0);
			}

			setRotation(rotation + velocity * delta);
			meshRef.current.rotation.y = rotation;
		}
	});

	const handleClick = () => {
		const newVel = Math.min(maxVelocity, velocity + bumpVelocity);
		setVelocity(newVel);
		setAcceleration(-deceleration * newVel);
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
			<primitive object={geometry} />
		</mesh>
	);
};

const ProfileCoin = () => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<div className="w-full h-full" style={{ cursor: isHovered ? "pointer" : "auto" }}>
			<Canvas camera={{ position: [0, 0, 2] }} flat>
				<Coin
					onPointerEnter={() => setIsHovered(true)}
					onPointerLeave={() => setIsHovered(false)}
				/>
			</Canvas>
		</div>
	);
};

export default ProfileCoin;
