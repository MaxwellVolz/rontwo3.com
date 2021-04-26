
var animation = anime({
    targets: 'svg g#left_record',
    rotate: [20,-20],
    loop: true,
    autoplay: false,
    translateX: 0,                   
    translateY: 0                
  });
  
  document.querySelector('svg g#left_record').onclick = animation.play;
  document.querySelector('.play-pause-demo .pause').onclick = animation.pause;