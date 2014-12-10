ng-velocity     (v0.1.1)
===========

AngularJS directive for animation with velocity (or any third party JavaScript libraries)

Directive should be used as follow :

`<div id="mydiv" velocity="effect1" data-delay="500" data-follow="myotherdiv" data-follow-delay="2000">`

Where :

<code>velocity</code> is the JavaScript effect you've registered in the animation file.

<code>data-delay</code> is the delay before starting animation.

<code>data-follow</code> is the next elements to animate.

<code>data-follow-delay</code> is the delay before the following animation.

For example of usage, open the __test.html__ file.

This directive may be still not perfect. All improvement are welcome !


For Velocity UI integration, check one of these two libraries : <br>
https://github.com/cgwyllie/angular-velocity <br>
https://github.com/rosslavery/velocity-ui-angular
