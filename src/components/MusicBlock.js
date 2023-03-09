
import { useRef, Suspense } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';

import music_mp3 from '../audio/Nomyn-Forever.mp3'

function generateMusicBoxPositions(len) {
    const arr = [];
    for (let i = -Math.floor(len / 2); i <= Math.floor(len / 2); i++) {
        arr.push({ 'i_pos': i, 'position': [i, 0, 3] });
    }
    return arr;
}

function generateCirclePoints(X) {
    const points = [];
    for (let i = 0; i < X; i++) {
        const angle = 2 * Math.PI * i / X;
        const x = Math.cos(angle) * 5;
        const z = Math.sin(angle) * 5;
        points.push({ 'i_pos': i, 'position': [x, 0, z] });
    }
    return points;
}

export default function MusicBlock(props) {
    const group = useRef();
    const logo_ref = useRef();

    let block_amount = 13
    // const music_block_positions = generateMusicBoxPositions(block_amount)
    const music_block_positions = generateCirclePoints(block_amount)
    console.log(music_block_positions)
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
            analyser.fftSize = 64;
            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);
            // console.log(analyser)

            analyser.getByteFrequencyData(dataArray)

            // music_block_refs.current[0].scale.y = dataArray[0] / 100;

            for (let i = 0; i < block_amount; i++) {
                music_block_refs.current[i].scale.y = dataArray[i] / 100;
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
                    </mesh>)
            })}

        </group>
    );
}