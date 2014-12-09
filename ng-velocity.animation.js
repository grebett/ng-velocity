angular.module('myApp')

// $animate applies the class and trigger the associated animation.
// call the `done` function provided as third argument when the animation is over.
.animation('.effect1', function () {

  var fn = function (element, className, done) {
    var effect = {
      css: {
        translateX:'+=500'
      },
      options: {
        easing: 'linear',
        duration: 500,
        complete: function () {
          done();   // don't forget this done() parameter or angular won't know if the animation is still pending.
        }
      }
    };
    // I use a basic homemade velocity wrapper for easy reusable effects and chaining. You could use the UI-pack instead.
    velocity(element, effect);
  };

  // To register an animation, return an object with two function for addClass and removeClass properties.
  return {
    addClass: fn,
    removeClass: function (element, className, done) {
      console.log(className + ' removed');
      done();
    }
  };
});


