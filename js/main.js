
var DJ_Set = {
    playing_01:false,
    playing_02:false,
    volume_01: 1.0,
    volume_02: 1.0,
};

// var track_01 = BUFFERS.jam
// var track_02 = BUFFERS.techno

// Volume Control


DJ_Set.init = function(){
    this.track_01 = createSource(BUFFERS.jam);
    this.track_02 = createSource(BUFFERS.techno);
}

DJ_Set.play_track_01 = function(){
    // Loop track
    if(!this.track_01.source.start){
        this.track_01.source.noteOn(0);
    }else{
    
        this.track_01 = createSource(BUFFERS.jam);
        this.track_01.source.start(0);
    }

    
}


DJ_Set.stop_track_01 = function(){
    if(!this.track_01.source.stop){
        this.track_01.source.noteOff(0);
    }else{
        this.track_01.source.stop(0);
    }
};

DJ_Set.changeVolume_01 = function(element) {
    var volume = element.value;
    var fraction = parseInt(element.value) / parseInt(element.max);
    // Let's use an x*x curve (x-squared) since simple linear (x) does not
    // sound as good.
    this.track_01.gainNode.gain.value = fraction * fraction;
    this.volume_01 = fraction
    console.log(fraction, ' : ', fraction*fraction)
};

DJ_Set.toggle_track_01 = function(){
    this.playing_01 ? this.stop_track_01() : this.play_track_01();
    this.playing_01 = !this.playing_01;
}

DJ_Set.play_track_02 = function(){
    // Loop track
    if(!this.track_02.source.start){
        this.track_02.source.noteOn(0);
    }else{
        this.track_02 = createSource(BUFFERS.techno);
        this.track_02.source.start(0);
    }

    
}


DJ_Set.stop_track_02 = function(){
    if(!this.track_02.source.stop){
        this.track_02.source.noteOff(0);
    }else{
        this.track_02.source.stop(0);
    }
};

DJ_Set.changeVolume_02 = function(element) {
    var volume = element.value;
    var fraction = parseInt(element.value) / parseInt(element.max);
    // Let's use an x*x curve (x-squared) since simple linear (x) does not
    // sound as good.
    this.track_02.gainNode.gain.value = fraction * fraction;
    this.volume_02 = fraction
    console.log(fraction, ' : ', fraction*fraction)
};

DJ_Set.toggle_track_02 = function(){
    this.playing_02 ? this.stop_track_02() : this.play_track_02();
    this.playing_02 = !this.playing_02;
}

// Fades between track_01 and track_02
DJ_Set.crossfade = function(element) {
    var x = parseInt(element.value) / parseInt(element.max);
    // Use an equal-power crossfading curve:
    var gain1 = Math.cos(x * 0.5*Math.PI);
    var gain2 = Math.cos((1.0 - x) * 0.5*Math.PI);
    this.track_01.gainNode.gain.value = gain1 * this.volume_01;
    this.track_02.gainNode.gain.value = gain2 * this.volume_02;
  };

function createSource(buffer) {
    var source = context.createBufferSource();
    var gainNode = context.createGain ? context.createGain() : context.createGainNode();
    source.buffer = buffer;
    // Turn on looping
    source.loop = true;
    // Connect source to gain.
    source.connect(gainNode);
    // Connect gain to destination.
    gainNode.connect(context.destination);

    return {
        source: source,
        gainNode: gainNode
    };
}