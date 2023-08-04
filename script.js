// Add an event listener to handle when a slide becomes visible
Reveal.addEventListener('slidechanged', function (event) {
    // Get the current slide and its video element(s)
    var currentSlide = event.currentSlide;
    var videos = currentSlide.querySelectorAll('video');
    var audios = currentSlide.querySelectorAll('audio');

    // Play the video(s) when the slide becomes visible
    [...videos,...audios].forEach(function (video) {
      if (!video.closest('present')) {
        video.play();
        // video.setAttribute('data-played', 'true');
      }
    });
  });





