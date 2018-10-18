//© COPYRIGHT GEORGE EDMONDS 2018

var scale,fontscale,marginscale;


function setScale() {

  scale = Math.min(
    window.innerWidth / 1280,
    window.innerHeight / 800
  );


  fontscale = Math.max(Math.min(scale, 1.2), 0.5);
  fontscale2 = Math.max(Math.min(scale, 1.2), 0.8);
  marginscale = Math.max(Math.min(scale, 1.5), 0.5);

  $("#title").css("font-size", 46.67*fontscale + 'px');
  $("#title").css("margin-left", 16.5*fontscale + 'px');
  $("#title").css("margin-bottom", 17*fontscale + 'px');

  $("#url-input").css("font-size", 20*fontscale + 'px');
  $("#url-input").css("border", 1.333333*fontscale + 'px ' + 'solid white');
  $("#url-input").css("width", 590*fontscale + 'px');

  $("#url-input").css("padding-left", 20*fontscale + 'px');
  $("#url-input").css("padding-right", 20*fontscale + 'px');
  $("#url-input").css("padding-top", 10*fontscale + 'px');
  $("#url-input").css("padding-bottom", 10*fontscale + 'px');

  $("#input-container").css("margin-top", 188*marginscale + 'px');
  $("#input-container").css("margin-left", 70*marginscale + 'px');
  $("#input-container").css("margin-right", 70*marginscale + 'px');

  $("#submit").css("border", 1.333333*fontscale + 'px ' + 'solid white');
  $("#submit").css("width", $("#url-input").outerHeight() + 'px');
  $("#submit").css("height", $("#url-input").outerHeight() + 'px');
  $("#submit").css("margin-left", $("#url-input").outerWidth() + 25.3*fontscale + 'px');
  $("#submit").css("margin-left", $("#url-input").outerWidth() + 25.3*fontscale + 'px');
  $("#submit").css("transform", "translate(" + '0 ' + ',' + -1.5*fontscale + 'px)');


  $("#triangle").css("width", 20*fontscale + 'px');
  $("#triangle").css("margin-left", 2*fontscale + 'px');

  $("#text-container").css("margin-top", 188*marginscale + 'px');
  $("#text-container").css("margin-left", 70*marginscale + 'px');
  $("#text-container").css("margin-right", 70*marginscale + 'px');

  $("#text").css("max-width", 600+ 'px');
  $("#text").css("font-size", 20*fontscale2 + 'px');

  $("#back").css("width", 20*fontscale2 + 'px');
  $("#back").css("margin-top", 17*fontscale + 'px');
}

function buttonActions() {
  $( "#submit" ).hover(
    function() {
      $( "#triangle" ).animate({
        width: 17*fontscale + 'px',
      }, 100, function() {
        $('#triangle').attr('src','assets/triangle-fill.svg');
        $("#submit").css("cursor", 'pointer');
      });
    }, function() {
      $( "#triangle" ).animate({
        width: 20*fontscale + 'px',
      }, 100, function() {
        $('#triangle').attr('src','assets/triangle.svg');
        $("#submit").css("cursor", 'default');
      });
    }
  );

  $( "#submit" ).mousedown(function() {

    var inputvalue = String($("#url-input").val())

    if (inputvalue == 'http://' || inputvalue == '' || inputvalue.substring(0,4) !== 'http') {
      alert('Please enter a valid URL for a news article, starting with "http://" or "https://" and then try again.')
    }

    if (inputvalue !== 'http://' && inputvalue !== '' && inputvalue.substring(0,4) == 'http') {
      $("#input-container").css("display", "none");
      $("#loading").css("display", "block");
      getArticleText();
    }
  });

  $( "#back" ).hover(
    function() {
      $( this ).animate({
        width: 17*fontscale2 + 'px',
      }, 100, function() {
        $('#back').attr('src','assets/triangle-fill.svg');
        $("#back").css("cursor", 'pointer');
      });
    }, function() {
      $( this ).animate({
        width: 20*fontscale2 + 'px',
      }, 100, function() {
        $('#back').attr('src','assets/triangle.svg');
        $("#back").css("cursor", 'default');
      });
    }
  );

  $( "#back" ).mousedown(function() {
    $("#input-container").css("display", "block");
    $('#input-container').animateCss('fadeInLeft');
    setScale();
    $("#text-container").css("display", "none");
    resetSource();
    setScale();
  });

  $( "#url-input" ).mousedown(function() {
    $("#url-input").val('')
  });

}

function blockSpaces() {
  $('#url-input').on('keypress', function(e) {
      if (e.which == 32)
          return false;
  });
}

$( document ).ready(function() {
    $("#input-container").css("display", "block");
    $('#input-container').animateCss('fadeInLeft');
    setScale();
    blockSpaces();
    buttonActions();
});

$( window ).resize(function() {
    setScale();
});



$.fn.extend({
  animateCss: function(animationName, callback) {
    var animationEnd = (function(el) {
      var animations = {
        animation: 'animationend',
        OAnimation: 'oAnimationEnd',
        MozAnimation: 'mozAnimationEnd',
        WebkitAnimation: 'webkitAnimationEnd',
      };

      for (var t in animations) {
        if (el.style[t] !== undefined) {
          return animations[t];
        }
      }
    })(document.createElement('div'));

    this.addClass('animated ' + animationName).one(animationEnd, function() {
      $(this).removeClass('animated ' + animationName);

      if (typeof callback === 'function') callback();
    });

    return this;
  },
});
