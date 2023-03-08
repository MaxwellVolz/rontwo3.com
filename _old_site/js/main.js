window.addEventListener('load', (event) => {
    console.log('page is fully loaded');
    DJ_Set.init()
    DJ_Set.sliders()
  });

window.onresize = function(){
    DJ_Set.sliders()
}

var DJ_Set = {
    is_on: false,
    playing_01: false,
    playing_02: false,
    volume_01: 1.0,
    volume_02: 1.0,
    gain1: 0.5,
    gain2: 0.5
};

// var track_01 = BUFFERS.jam
// var track_02 = BUFFERS.techno

// Volume Control


DJ_Set.init = function () {
    if(!this.is_on){
        this.track_01 = createSource(BUFFERS.jam);
        this.track_02 = createSource(BUFFERS.techno);
        this.is_on = true
    }
}

DJ_Set.play_track_01 = function () {
    // Loop track
    if (!this.track_01.source.start) {
        this.track_01.source.noteOn(0);
    } else {
        this.track_01 = createSource(BUFFERS.jam);
        this.track_01.source.start(0);
        this.track_01.gainNode.gain.value = this.volume_01
    }
}

DJ_Set.stop_track_01 = function () {
    if (!this.track_01.source.stop) {
        this.track_01.source.noteOff(0);
    } else {
        this.track_01.source.stop(0);
    }
};

DJ_Set.changeVolume_01 = function (element) {
    var volume = element.value;
    var fraction = parseInt(element.value) / parseInt(element.max);
    // Let's use an x*x curve (x-squared) since simple linear (x) does not
    // sound as good.
    this.track_01.gainNode.gain.value = fraction * fraction;
    this.volume_01 = fraction
    console.log(fraction, ' : ', fraction * fraction)
};

DJ_Set.changeVolume_01_val = function (new_value) {
    new_val = new_value * new_value * this.gain1;
    try {
        this.track_01.gainNode.gain.value = new_val;
        this.volume_01 = new_val
    } catch (error) {
        console.error(error);
    }
};

DJ_Set.toggle_track_01 = function () {
    this.playing_01 ? this.stop_track_01() : this.play_track_01();
    this.playing_01 = !this.playing_01;
}

DJ_Set.play_track_02 = function () {
    // Loop track
    if (!this.track_02.source.start) {
        this.track_02.source.noteOn(0);
    } else {
        this.track_02 = createSource(BUFFERS.techno);
        this.track_02.source.start(0);
        this.track_02.gainNode.gain.value = this.volume_02
    }
}

DJ_Set.stop_track_02 = function () {
    if (!this.track_02.source.stop) {
        this.track_02.source.noteOff(0);
    } else {
        this.track_02.source.stop(0);
    }
};

DJ_Set.changeVolume_02 = function (element) {
    var volume = element.value;
    var fraction = parseInt(element.value) / parseInt(element.max);
    // Let's use an x*x curve (x-squared) since simple linear (x) does not
    // sound as good.
    this.track_02.gainNode.gain.value = fraction * fraction;
    this.volume_02 = fraction
    console.log(fraction, ' : ', fraction * fraction)
};

DJ_Set.changeVolume_02_val = function (new_value) {
    new_val = new_value * new_value * this.gain2;
    try {
        this.track_02.gainNode.gain.value = new_val;
        this.volume_02 = new_val
    } catch (error) {
        console.error(error);
    }
};

DJ_Set.toggle_track_02 = function () {
    this.playing_02 ? this.stop_track_02() : this.play_track_02();
    this.playing_02 = !this.playing_02;
}

// Fades between track_01 and track_02
DJ_Set.crossfade = function (gain1, gain2) {
    // var x = parseInt(element.value) / parseInt(element.max);
    // Use an equal-power crossfading curve:
    try {
        this.track_01.gainNode.gain.value = gain1 * this.volume_01;
        this.track_02.gainNode.gain.value = gain2 * this.volume_02;
    } catch (error) {
        console.error(error);
    }
};

DJ_Set.crossfade_val = function(new_value){
    var gain1 = Math.cos(new_value * 0.5 * Math.PI);
    var gain2 = Math.cos((1.0 - new_value) * 0.5 * Math.PI);

    this.gain1 = gain1
    this.gain2 = gain2

    DJ_Set.crossfade(gain1, gain2)
}

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

// var svg   = document.getElementsByTagName('svg')[0];
// var svg   = document.querySelector('#dj_set_svg');

DJ_Set.sliders = function () {
    console.log('hello')

    var svg   = document.getElementById("dj_set_svg");

    var pt    =  svg.createSVGPoint();

    function mx(evt){
            pt.x = evt.clientX;
            return pt.matrixTransform(svg.getScreenCTM().inverse());
    }

    function my(evt){
        pt.y = evt.clientY;
        return pt.matrixTransform(svg.getScreenCTM().inverse());
    }

    // HTML elements
    var slider_1  = document.querySelector('#crossfade_btn');
    var volume_slider_1  = document.querySelector('#slider_btn_01');
    var volume_slider_2  = document.querySelector('#slider_btn_02');

    var dragging = false;
    slider_1.addEventListener('mousedown',function(evt){

        cWidth = svg.clientWidth

        // console.log('client', svg.clientWidth + 'x' + svg.clientHeight);
        lower_limit = (cWidth*0.33).toFixed(1)
        upper_limit = (cWidth*0.53).toFixed(1)

        var offset = mx(evt);
        dragging = true;
        offset.x = slider_1.x.baseVal.value - offset.x;
        var move = function(evt){
                var now = mx(evt);
                var x = offset.x + now.x;

                var limitLower = lower_limit;
                var limitUpper = upper_limit;
                if ( x < limitLower || x > limitUpper ) {
                    return;
                }           

                crossfade_value = ((x - lower_limit) / (upper_limit - lower_limit)).toFixed(2)
                DJ_Set.crossfade_val(crossfade_value)
                slider_1.x.baseVal.value = x;
        };

        svg.addEventListener('mousemove',move,false);                
        document.documentElement.addEventListener('mouseup',function(){
                dragging = false;
                svg.removeEventListener('mousemove',move,false);
        },false);
    },false);

    volume_slider_1.addEventListener('mousedown',function(evt){

        cHeight = svg.clientHeight

        console.log('client', svg.clientWidth + 'x' + svg.clientHeight);
        lower_limit = (cHeight*0.16).toFixed(1)
        upper_limit = (cHeight*0.70).toFixed(1)

        console.log('limits: ', lower_limit + ' | ' + upper_limit);

        var offset = my(evt);
        dragging = true;
        offset.y = volume_slider_1.y.baseVal.value - offset.y;
        var move = function(evt){
                var now = my(evt);
                var y = offset.y + now.y;

                console.log(y)

                var limitLower = lower_limit;
                var limitUpper = upper_limit;
                if ( y < limitLower || y > limitUpper ) {
                    return;
                }           

                vol_1_value = Math.abs((y - lower_limit) / (upper_limit - lower_limit) - 1).toFixed(2)
                DJ_Set.changeVolume_01_val(vol_1_value)

                volume_slider_1.y.baseVal.value = y;
        };

        svg.addEventListener('mousemove',move,false);                
        document.documentElement.addEventListener('mouseup',function(){
                dragging = false;
                svg.removeEventListener('mousemove',move,false);
        },false);
    },false);

    volume_slider_2.addEventListener('mousedown',function(evt){

        cHeight = svg.clientHeight

        console.log('client', svg.clientWidth + 'x' + svg.clientHeight);
        lower_limit = (cHeight*0.16).toFixed(1)
        upper_limit = (cHeight*0.70).toFixed(1)

        console.log('limits: ', lower_limit + ' | ' + upper_limit);

        var offset = my(evt);
        dragging = true;
        offset.y = volume_slider_2.y.baseVal.value - offset.y;
        var move = function(evt){
                var now = my(evt);
                var y = offset.y + now.y;

                console.log(y)

                var limitLower = lower_limit;
                var limitUpper = upper_limit;
                if ( y < limitLower || y > limitUpper ) {
                    return;
                }           

                vol_2_value = Math.abs((y - lower_limit) / (upper_limit - lower_limit) - 1).toFixed(2)
                console.log(vol_2_value)

                DJ_Set.changeVolume_02_val(vol_2_value)
                volume_slider_2.y.baseVal.value = y;
        };

        svg.addEventListener('mousemove',move,false);                
        document.documentElement.addEventListener('mouseup',function(){
                dragging = false;
                svg.removeEventListener('mousemove',move,false);
        },false);
    },false);

}