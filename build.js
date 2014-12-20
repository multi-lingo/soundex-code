(function outer(modules, cache, entries){

  /**
   * Global
   */

  var global = (function(){ return this; })();

  /**
   * Require `name`.
   *
   * @param {String} name
   * @param {Boolean} jumped
   * @api public
   */

  function require(name, jumped){
    if (cache[name]) return cache[name].exports;
    if (modules[name]) return call(name, require);
    throw new Error('cannot find module "' + name + '"');
  }

  /**
   * Call module `id` and cache it.
   *
   * @param {Number} id
   * @param {Function} require
   * @return {Function}
   * @api private
   */

  function call(id, require){
    var m = cache[id] = { exports: {} };
    var mod = modules[id];
    var name = mod[2];
    var fn = mod[0];

    fn.call(m.exports, function(req){
      var dep = modules[id][1][req];
      return require(dep ? dep : req);
    }, m, m.exports, outer, modules, cache, entries);

    // expose as `name`.
    if (name) cache[name] = cache[id];

    return cache[id].exports;
  }

  /**
   * Require all entries exposing them on global if needed.
   */

  for (var id in entries) {
    if (entries[id]) {
      global[entries[id]] = require(id);
    } else {
      require(id);
    }
  }

  /**
   * Duo flag.
   */

  require.duo = true;

  /**
   * Expose cache.
   */

  require.cache = cache;

  /**
   * Expose modules
   */

  require.modules = modules;

  /**
   * Return newest require.
   */

   return require;
})({
1: [function(require, module, exports) {
'use strict';

/**
 * Dependencies.
 */

var soundex = require('wooorm/soundex-code@0.1.1');

/**
 * DOM elements.
 */

var $input = document.getElementsByTagName('input')[0];
var $output = document.getElementsByTagName('output')[0];

/**
 * Event handlers.
 */

function oninputchange() {
    $output.textContent = soundex($input.value);
}

/**
 * Listen.
 */

$input.addEventListener('input', oninputchange);

/**
 * Initial answer.
 */

oninputchange();

}, {"wooorm/soundex-code@0.1.1":2}],
2: [function(require, module, exports) {
'use strict';

var DEFAULT_LENGTH,
    map;

/*
 * Define the minimum length of Soundex keys.
 */

DEFAULT_LENGTH = 4;

/*
 * Define the Soundex values belonging to characters.
 *
 * This map also includes vowels (with a value of 0) to easily distinguish
 * between an unknown value or a vowel.
 */

map = {};

map.a = map.e = map.i = map.o = map.u = map.y = 0;
map.b = map.f = map.p = map.v = 1;
map.c = map.g = map.j = map.k = map.q = map.s = map.x = map.z = 2;
map.d = map.t = 3;
map.l = 4;
map.m = map.n = 5;
map.r = 6;

/**
 * Pad a given value with zero characters. The function only pads four
 * characters.
 *
 * @param {string} value
 * @return {string}
 */
function pad(value) {
    var length;

    length = value.length;

    if (length >= DEFAULT_LENGTH) {
        return value;
    }

    if (length === 3) {
        return value + '0';
    }

    if (length === 2) {
        return value + '00';
    }

    return value + '000';
}

/**
 * Get the soundex key from a given value.
 *
 * @param {string} value
 * @param {number} maxLength
 * @return {string}
 */
function soundexPhonetics(value, maxLength) {
    var length,
        index,
        character,
        results,
        prev,
        phonetics;

    value = String(value).toLowerCase();

    length = value.length;
    index = -1;
    results = [];

    while (++index < length) {
        character = value.charAt(index);
        phonetics = map[character];

        /* Initial letter */
        if (index === 0) {
            results.push(character.toUpperCase());
        /* Phonetics value */
        } else if (phonetics && phonetics !== prev) {
            results.push(phonetics);
        /* Vowel */
        } else if (phonetics === 0) {
            phonetics = null;
        /* Unknown character (including H and W) */
        } else {
            phonetics = prev;
        }

        prev = phonetics;
    }

    return pad(results.join('')).substr(0, maxLength || DEFAULT_LENGTH);
}

/*
 * Export `soundexPhonetics`.
 */

module.exports = soundexPhonetics;

}, {}]}, {}, {"1":""})
