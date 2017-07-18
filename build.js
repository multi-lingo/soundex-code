(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var soundex = require('soundex-code');

var $input = document.getElementsByTagName('input')[0];
var $output = document.getElementsByTagName('output')[0];

$input.addEventListener('input', oninputchange);

oninputchange();

function oninputchange() {
  $output.textContent = soundex($input.value);
}

},{"soundex-code":2}],2:[function(require,module,exports){
'use strict';

module.exports = soundex;

/* Minimum length of Soundex keys. */
var DEFAULT = 4;

/* Soundex values belonging to characters.
 * This map also includes vowels (with a value of 0)
 * to easily distinguish between an unknown value or
 * a vowel. */
var map = {};

map.a = map.e = map.i = map.o = map.u = map.y = 0;
map.b = map.f = map.p = map.v = 1;
map.c = map.g = map.j = map.k = map.q = map.s = map.x = map.z = 2;
map.d = map.t = 3;
map.l = 4;
map.m = map.n = 5;
map.r = 6;

/* Get the soundex key from a given value. */
function soundex(value, maxLength) {
  var results = [];
  var index = -1;
  var length;
  var character;
  var prev;
  var phonetics;

  value = String(value).toLowerCase();
  length = value.length;

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

  return pad(results.join('')).substr(0, maxLength || DEFAULT);
}

/* Pad a given value with zero characters. The function only pads four
 * characters. */
function pad(value) {
  var length = value.length;

  if (length >= DEFAULT) {
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

},{}]},{},[1]);
