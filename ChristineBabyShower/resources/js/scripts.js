$(document).ready(function () {
  /* Sticky Navigation */
  $(".js--section-features").waypoint(
    function (direction) {
      if (direction == "down") {
        $("nav").addClass("sticky");
      } else {
        $("nav").removeClass("sticky");
      }
    },
    {
      offset: "77px",
    }
  );

  /* Scroll on btn click */
  $(".js--scroll-rsvp").click(function () {
    $("html,body").animate(
      { scrollTop: $(".js--section-rsvp").offset().top },
      1000
    );
  });
  $(".js--scroll-registry").click(function () {
    $("html,body").animate(
      { scrollTop: $(".js--section-registry").offset().top },
      1000
    );
  });

  /* Smooth Scroll on nav click (from css-tricks) */

  $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function (event) {
      // On-page links
      if (
        location.pathname.replace(/^\//, "") ==
          this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
      ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length
          ? target
          : $("[name=" + this.hash.slice(1) + "]");
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();
          $("html, body").animate(
            {
              scrollTop: target.offset().top,
            },
            1000,
            function () {
              // Callback after animation
              // Must change focus!
              var $target = $(target);
              $target.focus();
              if ($target.is(":focus")) {
                // Checking if the target was focused
                return false;
              } else {
                $target.attr("tabindex", "-1"); // Adding tabindex for elements not focusable
                $target.focus(); // Set focus again
              }
            }
          );
        }
      }
    });

  /* Animations on scroll */
  $(".js--wp-1").waypoint(
    function (direction) {
      $(".js--wp-1").addClass("animated fadeIn");
    },
    {
      offset: "50%",
    }
  );

  $(".js--wp-2").waypoint(
    function (direction) {
      $(".js--wp-2").addClass("animated fadeIn");
    },
    {
      offset: "70%",
    }
  );
  $(".js--wp-3").waypoint(
    function (direction) {
      $(".js--wp-3").addClass("animated fadeIn");
    },
    {
      offset: "70%",
    }
  );

  $(".js--wp-4").waypoint(
    function (direction) {
      $(".js--wp-4").addClass("animated pulse");
    },
    {
      offset: "50%",
    }
  );

  /* Mobile-Nav click */
  $(".js--nav-icon").click(function () {
    let nav = $(".js--main-nav");
    let icon = $(".js--nav-icon img");

    nav.slideToggle(200);

    temp = icon.attr("src");
    icon.attr("src", icon.attr("data-alt-src"));
    icon.attr("data-alt-src", temp);
  });

  var $form1 = $("form#rsvp-form"),
    url =
      "https://script.google.com/macros/s/AKfycbxaxjKgLF03sGcaP8LXEiELELHeZCHC82Sfs8LkeoXdrZ6cpMUJ/exec";

  $("#submit-form").on("click", function (e) {
    console.log("submitted");
    e.preventDefault();
    var jqxhr = $.ajax({
      url: url,
      method: "GET",
      dataType: "json",
      data: $form1.serialize(),
      success: function () {
        // do something
        console.log(url);
        $(".rsvp-confirm").fadeIn(1000);
        $(".rsvp-confirm").delay(2500).fadeOut(1000);
      },
    });
  });

  var $form2 = $("form#survey-form"),
    url =
      "https://script.google.com/macros/s/AKfycbw5bu0ahOgRMDZTs_MQMxpXF3hD61Zw_eqyrik8J3iUmqxlfqQ/exec";

  $("#submit-survey").on("click", function (e) {
    console.log("survey submitted");
    e.preventDefault();
    var jqxhr = $.ajax({
      url: url,
      method: "GET",
      dataType: "json",
      data: $form2.serialize(),
      success: function () {
        // do something
        console.log("survey success");
      },
    });
  });

  // Youtube API
  // 2. This code loads the IFrame Player API code asynchronously.
  var tag = document.createElement("script");

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // 3. This function creates an <iframe> (and YouTube player)
  //    after the API code downloads.
  var player;
  var loaded;
  function onYouTubeIframeAPIReady() {
    loaded = true;
    player = new YT.Player("player", {
      height: "390",
      width: "640",
      videoId: "h0_FjopMtJQ",
      playerVars: {
        autoplay: 0,
      },
    });
  }

  // 4. The API will call this function when the video player is ready.
  function onPlayerReady(event) {
    event.target.playVideo();
  }

  // 5. The API calls this function when the player's state changes.
  //    The function indicates that when playing a video (state=1),
  //    the player should play for six seconds and then stop.
  var done = false;
  function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
      setTimeout(stopVideo, 6000);
      done = true;
    }
  }
  var stopped;
  function stopVideo() {
    stopped = true;
    player.stopVideo();
  }

  $(".play").on("click", function () {
    console.log("clicked");
    if (!loaded) {
      onYouTubeIframeAPIReady();
    }
    $(".iframe").fadeIn();
  });

  $(".exit").on("click", function () {
    console.log("exit");
    stopVideo();
    $(".iframe").fadeOut();
  });
});
