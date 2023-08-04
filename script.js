// Add an event listener to handle when a slide becomes visible
Reveal.addEventListener('slidechanged', function (event) {
    // Get the previous slide and its video element(s)
    var previousSlide = event.previousSlide;
    var previousVideos = previousSlide.querySelectorAll('video');

    // Pause the videos of the previous slide when it's no longer visible
    previousVideos.forEach(function (video) {
      video.pause();
      video.removeAttribute('data-played');
    });

    // Get the current slide and its video element(s)
    var currentSlide = event.currentSlide;
    var videos = currentSlide.querySelectorAll('video');

    // Function to handle autoplay of videos
    function handleVideoAutoplay(entries) {
      entries.forEach((entry) => {
        const video = entry.target;
        if (entry.isIntersecting && !video.hasAttribute('data-played')) {
          // Add a delay before playing the video
          setTimeout(() => {
            // Check if the video is still in the viewport
            if (entry.isIntersecting) {
              video.play().then(() => {
                video.setAttribute('data-played', 'true');
              }).catch((error) => {
                console.error('Error playing the video:', error);
              });
            }
          }, 500); // Adjust the delay as needed
        }
      });
    }

    // Set up the Intersection Observer for video elements
    const observerOptions = {
      root: null,
      threshold: 0.2, // Adjust the threshold as needed for when the video should start playing
    };

    const videoObserver = new IntersectionObserver(handleVideoAutoplay, observerOptions);

    videos.forEach((video) => {
      videoObserver.observe(video);
    });
  });