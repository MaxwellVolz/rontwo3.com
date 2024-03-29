
import { useRef, Suspense } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import * as THREE from 'three'
import { useControls } from 'leva'

// import music_mp3 from '../audio/Nomyn-Forever.mp3'
import music_mp3 from '../audio/RonTwo 3 - Citrus Grove Collective Vol. 4 - Digi Redo.mp3'

function generateMusicBoxPositions(len) {
	const arr = [];
	for (let i = -Math.floor(len / 2); i <= Math.floor(len / 2); i++) {
		arr.push({ 'i_pos': i, 'position': [i * 3, 0, 3] });
	}
	return arr;
}

function generateCirclePoints(X) {
	const points = [];
	for (let i = 0; i < X; i++) {
		const angle = 2 * Math.PI * i / X;
		const x = Math.cos(angle) * 5;
		const z = Math.sin(angle) * 5;
		points.push({ 'i_pos': i, 'position': [x * 10, 0, z * 10] });
	}
	return points;
}

function heightToColor(X) {
	const red = X / 10;
	const green = X * 4;
	const blue = X / 4;
	// ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;

	return new THREE.Color(`rgb(${red}, ${green}, ${blue})`);
}

function middleOut(array) {
	const middleIndex = Math.floor(array.length / 2);
	const outputArray = [array[middleIndex]];
	let i = 1;
	while (i <= middleIndex) {
		if (middleIndex + i < array.length) {
			outputArray.push(array[middleIndex + i]);
		}
		if (middleIndex - i >= 0) {
			outputArray.unshift(array[middleIndex - i]);
		}
		i++;
	}
	return outputArray;
}

export default function MusicBlock(props) {
	const group = useRef();
	const logo_ref = useRef();

	let block_amount = props.amount
	// const music_block_positions = generateMusicBoxPositions(block_amount)
	const music_block_positions = generateCirclePoints(block_amount)
	// console.log(music_block_positions)
	const music_block_refs = useRef(new Array())



	// Initialize Audio
	let audio1 = new Audio();

	// Web Audio API
	let audioSource = null;

	let audioCtx = null;
	let analyser = null;


	let music_started = false;

	useFrame(({ clock }) => {
		const a = clock.getElapsedTime();

		if (music_started) {
			analyser.fftSize = 128;
			const bufferLength = analyser.frequencyBinCount;
			const rawArray = new Uint8Array(bufferLength);
			// console.log(analyser)

			// let music_block_colors = dataArray.map(heightToColor)
			// console.log(music_block_colors)

			analyser.getByteFrequencyData(rawArray)


			// music_block_refs.current[0].scale.y = dataArray[0] / 100;

			const dataArray = middleOut(rawArray)
			// const dataArray = rawArray

			for (let i = 0; i < block_amount; i++) {
				let freq = dataArray[i]
				music_block_refs.current[i].scale.y = (freq / 50) + 0.1;
				console.log(freq)

				let freq_base_100 = dataArray[i] / 255;
				console.log(freq_base_100)

				let r = (freq_base_100 * i) / 10;
				let g = i / 4;
				let b = freq_base_100 / 2;

				music_block_refs.current[i].material.color = { 'isColor': true, 'r': r, 'g': g, 'b': b }
			}

		}
		// mesh_ref.current.rotation.y = a;
		// easing.dampE(logo_ref.current.rotation, [0, state.pointer.x * (state.camera.position.z > 1 ? 1 : -1), 0], 0.4, delta)
	})

	function handleClick() {
		console.log('Button clicked');
		if (!music_started) {
			music_started = true;
			console.log("kick it")
			web_audio_setup()
		}
		console.log(music_block_refs.current[0])
	}

	function web_audio_setup() {
		audioCtx = new (window.AudioContext || window.webkitAudioContext)();
		analyser = audioCtx.createAnalyser();

		audio1.src = music_mp3;

		audio1.play();

		audioSource = audioCtx.createMediaElementSource(audio1);
		audioSource.connect(analyser);
		analyser.connect(audioCtx.destination);
	}


	return (
		<group {...props} ref={logo_ref} dispose={null} rotation={[0, 0, 0]} scale={4} onClick={handleClick} >

			{music_block_positions.map((item) => {
				const getRef = (element) => (music_block_refs.current.push(element))
				return (
					<mesh key={item.i_pos} ref={getRef} position={item.position}>
						<boxGeometry args={[2, 2, 2]} />
						{/* <meshNormalMaterial /> */}
						<meshStandardMaterial color={new THREE.Color(1, 0, 0)} />
					</mesh>)
			})}

		</group>
	);
}