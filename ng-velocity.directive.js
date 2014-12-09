angular.module('myApp')

.directive("velocity", function ($animate, $timeout) {

  // directive link function extracted for clearer lecture.
  var fn = function (element, effect, delay, follow, followDelay) {
    // to fire $animate, need to wrap it into a $timeout wrapper. (Still wondering if this is correct).
    $timeout(function () {
      // firing the animation adding the className according to the effect we registered in ng-velocity.animation.js
      $animate.addClass(element, effect).then(function () {
        // this promise is called when the animation is over (i.e. after done() is called)
        $timeout(function () {
          // removing class in order to keep the animation bound.
          $animate.removeClass(element, effect);
          // checking if there is following animations to go.
          if (follow) {
            // are there multiple elements (a className has been provided ?)
            if (follow[0] === '.') {
              var elements = document.getElementsByClassName(follow.substr(1, follow.length - 1));
              for (var i = 0; i < elements.length; i++) {
                // getting attrs values.
                var attrs = {};
                attrs.effect = elements[i].getAttribute('velocity');
                attrs.delay = followDelay || elements[i].getAttribute('data-delay') || 0;
                attrs.follow = elements[i].getAttribute('data-follow');
                attrs.followDelay = elements[i].getAttribute('data-follow-delay');

                // recursive call.
                fn(elements[i], attrs.effect, attrs.delay, attrs.follow, attrs.followDelay);
              }
            }
            // or a single id element.
            else {
              var e = document.getElementById(follow);
              var attrs = {};

              // getting attrs values.
              attrs.effect =  e.getAttribute('velocity');
              // getting either the overwriting delay from the current animation or the next object to animate delay property
              attrs.delay = followDelay || e.getAttribute('data-delay') || 0;
              // the following animation may also have a following one.
              attrs.follow =  e.getAttribute('data-follow');
              attrs.followDelay = e.getAttribute('data-follow-delay');

              // recursive call.
              fn(e, attrs.effect, attrs.delay, attrs.follow, attrs.followDelay);
            }
          }
        }, 0); // end of removeClass timeout.
      });
    }, delay || 0);  // end of addClass timeout.
  };

  // Return a basic directive with only a link function. Should be improved ?
  return function (scope, element, attrs) {
    element.on('click', function () {
      // look at the prototype supra for more infos.
      fn(element, attrs.velocity, attrs.delay, attrs.follow, attrs.followDelay);
    });
  };
});