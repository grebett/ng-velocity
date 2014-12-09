/**
 * Created by grebett on 22/10/14.
 * Edit: 08/12/14 _ Should be rewritten soon to be used without jQuery
 */
'use strict';

// basic wrapper for velocity (https://github.com/julianshapiro/velocity) by grebett
// dependencies needed : lodash, jQuery

var overwriteOptions = function (effect, more) {
  // merging with previous options, overwriting existing option properties
  if (more) {
    effect = _.cloneDeep(effect);
    effect.options = _.merge(effect.options, more);
  }
  return effect;
};

var singleEffect = function ($object, effect, more) {
  // overcharging effect -- usage: velocity(jQuery object, effect, overwriting options)
  effect = overwriteOptions(effect, more);

  if (typeof(effect) === 'string') {
    // predefined string effect -- equivalent to: $object.velocity('fadeOut', options);
    $object.velocity(effect, effect.options);
  }
  else {
    // single effect -- usage: $object.velocity(effect, options)
    $object.velocity(effect.css, effect.options);
  }
};

var velocity = function ($object, effect, more) {
  if (effect instanceof Array) {
    // array of effects -- usage: velocity(jQuery object, [effect1, [effect2, overcharging options]], null);
    var e, m;
    for (var i = 0, length = effect.length; i < length; i++) {
      var isArray = effect[i] instanceof Array;
      e = isArray ? effect[i][0] : effect[i];
      m = isArray ? (effect[i][1] === '=' ? m : effect[i][1]) : null; // or undefined?
      singleEffect($object, e, m);
    }
  }
  else {
    // single effect -- usage: velocity(jQuery object, effect, overcharging options);
    singleEffect($object, effect, more);
  }
};