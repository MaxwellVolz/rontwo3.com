

// transform="rotate(30, 186, 191.5)"

var left_is_playing = false;

function left_record_click() {
  if (left_is_playing) {

    left_record_anim.pause()
    audioElement1.pause();
  }
  else {
    left_record_anim.play()

    // check if context is in suspended state (autoplay policy)
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }
    audioElement1.play();

  }

  left_is_playing = !left_is_playing;
  console.log('left_is_playing:', left_is_playing)
}

var left_record_anim = anime({
  targets: 'svg g#left_record',
  rotate: '1turn',
  loop: true,
  autoplay: false,
  duration: 1500,
  easing: 'linear'
});

left_record = document.querySelector('svg g#left_record')
left_record.addEventListener("click", left_record_click);

// Right Record
var right_is_playing = false;

function right_record_click() {
  if (right_is_playing) {

    right_record_anim.pause()
    audioElement2.pause();
  }
  else {
    right_record_anim.play()

    // check if context is in suspended state (autoplay policy)
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }
    audioElement2.play();

  }

  right_is_playing = !right_is_playing;
  console.log('right_is_playing:', right_is_playing)
}

var right_record_anim = anime({
  targets: 'svg g#right_record',
  rotate: '1turn',
  loop: true,
  autoplay: false,
  duration: 1500,
  easing: 'linear'
});

right_record = document.querySelector('svg g#right_record')
right_record.addEventListener("click", right_record_click);


// 
// BUTTONS
// 

var button_sc_anim = anime({
  targets: 'svg g#button_sc',
  translateY: [0, 10, 0],
  easing: 'easeOutElastic(1, 1)',
  autoplay: false,
  duration: 300
});

function button_sc_click() {
  console.log("play sound 1")
  button_sc_anim.play()
  window.open(
    "https://soundcloud.com/rontwothree", "_blank");
}

button_sc = document.querySelector('svg g#button_sc')
button_sc.addEventListener("click", button_sc_click);

var button_li_anim = anime({
  targets: 'svg g#button_li',
  translateY: [0, 10, 0],
  easing: 'easeOutElastic(1, 1)',
  autoplay: false,
  duration: 300 
});

function button_li_click() {
  console.log("play sound 1")
  button_li_anim.play()
  window.open(
    "https://www.linkedin.com/in/ronnie-dunmore-25512341", "_blank");
  
}

button_li = document.querySelector('svg g#button_li')
button_li.addEventListener("click", button_li_click);

function dj_sfx_button_down(target, sound_clip){
  anime({
    targets: target,
    translateY: [0, 10],
    easing: 'easeOutElastic(1, 1)',
    autoplay: true,
    duration: 100
  });
  // check if context is in suspended state (autoplay policy)
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
  sound_clip.play();
}

function dj_sfx_button_up(target, sound_clip){
  anime({
    targets: target,
    translateY: [10, 0],
    easing: 'easeOutElastic(1, .6)',
    autoplay: true,
    duration: 100
  });
}

button_1 = document.querySelector('svg g#button_1')
button_1.addEventListener("mousedown", function(){
  dj_sfx_button_down("svg g#button_1", audio_sfx1);
}, false);
button_1.addEventListener("mouseup", function(){
  dj_sfx_button_up("svg g#button_1", 'thing');
}, false);

button_2 = document.querySelector('svg g#button_2')
button_2.addEventListener("mousedown", function(){
  dj_sfx_button_down("svg g#button_2", audio_sfx2);
}, false);
button_2.addEventListener("mouseup", function(){
  dj_sfx_button_up("svg g#button_2", 'thing');
}, false);

button_3 = document.querySelector('svg g#button_3')
button_3.addEventListener("mousedown", function(){
  dj_sfx_button_down("svg g#button_3", audio_sfx3);
}, false);
button_3.addEventListener("mouseup", function(){
  dj_sfx_button_up("svg g#button_3", 'thing');
}, false);

button_4 = document.querySelector('svg g#button_4')
button_4.addEventListener("mousedown", function(){
  dj_sfx_button_down("svg g#button_4", audio_sfx4);
}, false);
button_4.addEventListener("mouseup", function(){
  dj_sfx_button_up("svg g#button_4", 'thing');
}, false);

button_5 = document.querySelector('svg g#button_5')
button_5.addEventListener("mousedown", function(){
  dj_sfx_button_down("svg g#button_5", audio_sfx5);
}, false);
button_5.addEventListener("mouseup", function(){
  dj_sfx_button_up("svg g#button_5", 'thing');
}, false);

button_6 = document.querySelector('svg g#button_6')
button_6.addEventListener("mousedown", function(){
  dj_sfx_button_down("svg g#button_6", audio_sfx6);
}, false);
button_6.addEventListener("mouseup", function(){
  dj_sfx_button_up("svg g#button_6", 'thing');
}, false);

button_7 = document.querySelector('svg g#button_7')
button_7.addEventListener("mousedown", function(){
  dj_sfx_button_down("svg g#button_7", audio_sfx7);
}, false);
button_7.addEventListener("mouseup", function(){
  dj_sfx_button_up("svg g#button_7", 'thing');
}, false);

button_8 = document.querySelector('svg g#button_8')
button_8.addEventListener("mousedown", function(){
  dj_sfx_button_down("svg g#button_8", audio_sfx8);
}, false);
button_8.addEventListener("mouseup", function(){
  dj_sfx_button_up("svg g#button_8", 'thing');
}, false);


// 
// Tracks
// 

// for legacy browsers
const AudioContext = window.AudioContext || window.webkitAudioContext;

const audioContext = new AudioContext();

// get the audio element
const audioElement1 = document.querySelector('audio#track1');
const audioElement2 = document.querySelector('audio#track2');

// pass it into the audio context
const track1 = audioContext.createMediaElementSource(audioElement1);
const track2 = audioContext.createMediaElementSource(audioElement2);

track1.connect(audioContext.destination);
track2.connect(audioContext.destination);

// 
// SFX
// 

const audio_sfx1 = document.querySelector('audio#sfx1');
const audio_sfx2 = document.querySelector('audio#sfx2');
const audio_sfx3 = document.querySelector('audio#sfx3');
const audio_sfx4 = document.querySelector('audio#sfx4');
const audio_sfx5 = document.querySelector('audio#sfx5');
const audio_sfx6 = document.querySelector('audio#sfx6');
const audio_sfx7 = document.querySelector('audio#sfx7');
const audio_sfx8 = document.querySelector('audio#sfx8');

const sfx1 = audioContext.createMediaElementSource(audio_sfx1);
const sfx2 = audioContext.createMediaElementSource(audio_sfx2);
const sfx3 = audioContext.createMediaElementSource(audio_sfx3);
const sfx4 = audioContext.createMediaElementSource(audio_sfx4);
const sfx5 = audioContext.createMediaElementSource(audio_sfx5);
const sfx6 = audioContext.createMediaElementSource(audio_sfx6);
const sfx7 = audioContext.createMediaElementSource(audio_sfx7);
const sfx8 = audioContext.createMediaElementSource(audio_sfx8);

sfx1.connect(audioContext.destination);
sfx2.connect(audioContext.destination);
sfx3.connect(audioContext.destination);
sfx4.connect(audioContext.destination);
sfx5.connect(audioContext.destination);
sfx6.connect(audioContext.destination);
sfx7.connect(audioContext.destination);
sfx8.connect(audioContext.destination);

//
// Oscilloscope Animation
//

var analyser = audioContext.createAnalyser();
analyser.fftSize = 2048;

var bufferLength = analyser.frequencyBinCount;
var dataArray = new Uint8Array(bufferLength);
analyser.getByteTimeDomainData(dataArray);

// Connect the source to be analysed
track1.connect(analyser);

// Get a canvas defined with ID "oscilloscope"
var canvas = document.getElementById("oscilloscope");
var canvasCtx = canvas.getContext("2d");

// draw an oscilloscope of the current audio source

function draw() {

  requestAnimationFrame(draw);

  analyser.getByteTimeDomainData(dataArray);

  canvasCtx.fillStyle = "rgb(31, 31, 31)";
  canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

  canvasCtx.lineWidth = 2;
  canvasCtx.strokeStyle = "rgb(200, 200, 200)";

  canvasCtx.beginPath();

  var sliceWidth = canvas.width * 1.0 / bufferLength;
  var x = 0;

  for (var i = 0; i < bufferLength; i++) {

    var v = dataArray[i] / 128.0;
    var y = v * canvas.height / 2;

    if (i === 0) {
      canvasCtx.moveTo(x, y);
    } else {
      canvasCtx.lineTo(x, y);
    }

    x += sliceWidth;
  }

  canvasCtx.lineTo(canvas.width, canvas.height / 2);
  canvasCtx.stroke();
}

draw();



var analyser2 = audioContext.createAnalyser();
analyser2.fftSize = 2048;

var bufferLength2 = analyser2.frequencyBinCount;
var dataArray2 = new Uint8Array(bufferLength);
analyser2.getByteTimeDomainData(dataArray2);

// Connect the source to be analysed
track2.connect(analyser2);

// Get a canvas defined with ID "oscilloscope"
var canvas2 = document.getElementById("oscilloscope2");
var canvasCtx2 = canvas2.getContext("2d");

// draw an oscilloscope of the current audio source

function draw2() {

  requestAnimationFrame(draw2);

  analyser2.getByteTimeDomainData(dataArray2);

  // console.log("draw2 call")
  // console.log(dataArray2)

  canvasCtx2.fillStyle = "rgb(31, 31, 31)";
  canvasCtx2.fillRect(0, 0, canvas.width, canvas.height);

  canvasCtx2.lineWidth = 2;
  canvasCtx2.strokeStyle = "rgb(200, 200, 200)";

  canvasCtx2.beginPath();

  var sliceWidth = canvas.width * 1.0 / bufferLength2;
  var x = 0;

  for (var i = 0; i < bufferLength2; i++) {

    var v = dataArray2[i] / 128.0;
    var y = v * canvas.height / 2;

    if (i === 0) {
      canvasCtx2.moveTo(x, y);
    } else {
      canvasCtx2.lineTo(x, y);
    }

    x += sliceWidth;
  }

  canvasCtx2.lineTo(canvas.width, canvas.height / 2);
  canvasCtx2.stroke();
}

draw2();


// var analyser2 = audioContext.createAnalyser();
// analyser2.fftSize = 2048;

// var bufferLength = analyser2.frequencyBinCount;
// var dataArray = new Uint8Array(bufferLength);
// analyser2.getByteTimeDomainData(dataArray);

// // Connect the source to be analysed
// track2.connect(analyser2);

// // Get a canvas defined with ID "oscilloscope"
// var canvas2 = document.getElementById("oscilloscope2");
// var canvasCtx2 = canvas2.getContext("2d");

// // draw an oscilloscope of the current audio source

// function draw2() {

//   requestAnimationFrame(draw);

//   analyser2.getByteTimeDomainData(dataArray);

//   canvasCtx2.fillStyle = "rgb(6, 133, 0)";
//   canvasCtx2.fillRect(0, 0, canvas2.width, canvas2.height);

//   canvasCtx2.lineWidth = 2;
//   canvasCtx2.strokeStyle = "rgb(0, 0, 0)";

//   canvasCtx2.beginPath();

//   var sliceWidth = canvas2.width * 1.0 / bufferLength;
//   var x = 0;

//   for (var i = 0; i < bufferLength; i++) {

//     var v = dataArray[i] / 128.0;
//     var y = v * canvas2.height / 2;

//     if (i === 0) {
//       canvasCtx2.moveTo(x, y);
//     } else {
//       canvasCtx2.lineTo(x, y);
//     }

//     x += sliceWidth;
//   }

//   canvasCtx2.lineTo(canvas.width, canvas.height / 2);
//   canvasCtx2.stroke();
// }

// draw2();


Ui.Demo = function() {

};

Ui.Demo.prototype = Object.create(Ui.prototype);

Ui.Demo.prototype.createElement = function() {
  "use strict";
  Ui.prototype.createElement.apply(this, arguments);
  this.addComponent(new Ui.Pointer({
    type: 'Rect',
    pointerWidth: 3,
    pointerHeight: this.width / 5,
    offset: this.width / 2 - this.width / 3.3 - this.width / 10
  }));

  this.addComponent(new Ui.Scale(this.merge(this.options, {
    drawScale: false,
    drawDial: true,
    radius: this.width/2.6})));

  var circle = new Ui.El.Circle(this.width / 3.3, this.width / 2, this.height / 2);
  this.el.node.appendChild(circle.node);
  this.el.node.setAttribute("class", "Demo");
};