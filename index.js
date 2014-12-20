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
