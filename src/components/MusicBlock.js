
import { useRef, Suspense } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';

import music_mp3 from '../audio/Nomyn-Forever.mp3'


export default function MusicBlock(props) {
    const group = useRef();
    const logo_ref = useRef();
    const mesh_ref = useRef();

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
            analyser.fftSize = 32;
            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);

            // console.log(analyser)
            analyser.getByteFrequencyData(dataArray)
            // console.log(dataArray)

            console.log(dataArray[0])

            mesh_ref.current.scale.y = dataArray[0] / 100;

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
            <mesh ref={mesh_ref}>
                <boxGeometry args={[2, 2, 2]} />
            </mesh>
        </group>
    );
}