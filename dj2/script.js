
// Initialize Audio
let audio1 = new Audio();
audio1.src = "Nomyn-Forever.mp3";

// Initialize Canvas
const container = document.getElementById("container");
const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");

container.addEventListener("click", function () {
    let audio1 = new Audio();
    audio1.src = "Nomyn-Forever.mp3";

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    let canvas = document.getElementById("canvas").transferControlToOffscreen();
    const worker = new Worker(new URL("./worker.js"));

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    worker.postMessage({ canvas }, [canvas]);

    let audioSource = null;
    let analyser = null;

    audio1.play();
    audioSource = audioCtx.createMediaElementSource(audio1);
    analyser = audioCtx.createAnalyser();
    audioSource.connect(analyser);
    analyser.connect(audioCtx.destination);
    analyser.fftSize = 128;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    function animate() {
        analyser.getByteFrequencyData(dataArray);
        worker.postMessage({ bufferLength, dataArray }, {});
        requestAnimationFrame(animate);
    }

    animate();
});