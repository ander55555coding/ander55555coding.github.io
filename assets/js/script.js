let is_fullscreen = false;
function openFullscreen() {
  let iframe = document.getElementById("iframe");
  let game = document.getElementById("game-area");
  let Button = document.getElementById("mobile-back-button");

  if (
    document.fullscreenElement ||
    document.mozFullScreenElement ||
    document.webkitFullscreenElement ||
    document.msFullscreenElement
  ) {
    // Exit fullscreen
    if (is_mobile_device()) {
      Button.style.display = "none";
      iframe.style.width = ""; // Reset width
      iframe.style.height = ""; // Reset height
      iframe.style.borderRadius = "";
      iframe.style.marginLeft = "";
      iframe.style.marginRight = "";
    }

    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      // Firefox
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      // Chrome, Safari, and Opera
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      // IE/Edge
      document.msExitFullscreen();
    }

    is_fullscreen = false; // Update the fullscreen state
  } else {
    // Enter fullscreen
    if (is_mobile_device()) {
      Button.style.display = "flex";
      iframe.style.width = "100%"; // Full width of the game area
      iframe.style.height = "100%"; // Full height of the game area
      iframe.style.borderRadius = "0";
      iframe.style.marginLeft = "0";
      iframe.style.marginRight = "0";

      if (game.requestFullscreen) {
        game.requestFullscreen();
      } else if (game.mozRequestFullScreen) {
        // Firefox
        game.mozRequestFullScreen();
      } else if (game.webkitRequestFullscreen) {
        // Chrome, Safari, and Opera
        game.webkitRequestFullscreen();
      } else if (game.msRequestFullscreen) {
        // IE/Edge
        game.msRequestFullscreen();
      }
    } else {
      if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
      } else if (iframe.mozRequestFullScreen) {
        // Firefox
        iframe.mozRequestFullScreen();
      } else if (iframe.webkitRequestFullscreen) {
        // Chrome, Safari, and Opera
        iframe.webkitRequestFullscreen();
      } else if (iframe.msRequestFullscreen) {
        // IE/Edge
        iframe.msRequestFullscreen();
      }
    }

    is_fullscreen = true; // Update the fullscreen state
  }
}
function is_mobile_device() {
  if (
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i)
  ) {
    return true;
  } else {
    return false;
  }
}
function hideImgTextOnMobile() {
  if (is_mobile_device()) {
    var elements = document.getElementsByClassName("imgtext");
    var elements2 = document.getElementsByClassName("CreatorText");
    for (var i = 0; i < elements.length; i++) {
      elements[i].style.display = "none";
      elements2[i].style.display = "none";
    }
  }
}

window.onload = function() {
    document.body.classList.add('fade-in'); // Trigger fade-in on page load
  
    document.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function(event) {
        // Check if the link has the specific class name
        if (this.id.contains('no-animation')) {
          return; // Skip the animation
        }
        
        event.preventDefault(); // Prevent the default link behavior
        const href = this.getAttribute('href'); // Get the link's href
  
        // Add the fade-out class to the body
        document.body.classList.add('fade-out');
  
        // Wait for the animation to finish before navigating
        setTimeout(() => {
          window.location.href = href; // Navigate to the link
        }, 700); // Match this duration with the animation duration
      });
    });
  };