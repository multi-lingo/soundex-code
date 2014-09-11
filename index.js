var soundex = require('soundex-code');
var inputElement = document.getElementsByTagName('input')[0];
var outputElement = document.getElementsByTagName('output')[0];

function getPhonetics() {
    outputElement.textContent = soundex(inputElement.value);
}

inputElement.addEventListener('input', getPhonetics);

getPhonetics();
