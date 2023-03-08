
import { useRef, Suspense } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';

import music_mp3 from '../audio/Nomyn-Forever.mp3'


export default function MusicBlock(props) {
    const group = useRef();
    const logo_ref = useRef();

    // Initialize Audio
    let audio1 = new Audio();
    audio1.src = music_mp3;

    let music_started = false;
    let analyser = null;


    useFrame(({ clock }) => {
        const a = clock.getElapsedTime();
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
        // Web Audio API
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        let audioSource = null;

        audio1.play();

        audioSource = audioCtx.createMediaElementSource(audio1);
        analyser = audioCtx.createAnalyser();
        audioSource.connect(analyser);
        analyser.connect(audioCtx.destination);
    }


    return (
        <group {...props} ref={logo_ref} dispose={null} rotation={[0, 0, 0]} scale={4} onClick={handleClick} >
            <mesh>
                <boxGeometry args={[2, 2, 2]} />
            </mesh>
        </group>
    );
}