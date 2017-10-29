(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

module.exports = leftPad;

/*
  leftPad('hello', 9); // '    hello'
  leftPad('hello', 3); // 'hello'
  leftPad('hello', 9, '.'); // '....hello'
  leftPad('hello', 9, '..'); // '....hello'
  leftPad('hello', 10, 'ab'); // 'bababhello'
  leftPad('hello', 9, '\uD83D\uDC04'); // '🐄🐄🐄🐄hello'
  leftPad('hello', 10, '\uD83D\uDC11\uD83D\uDC04'), // '🐄🐑🐄🐑🐄hello'
  leftPad('hello', 7, '🐄'), // '🐄🐄hello'
  leftPad(null, 7); // throws
  leftPad([], 4, '*'); // throws
  leftPad('hello', 4, true); // throws
  leftPad('hello', -4, true); // throws
  leftPad('hello', 2.3, true); // throws
*/

var surrogatePairRegEx = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;

function leftPad(str, length, padStr) {
  if (typeof str != 'string' || arguments.length > 2 && typeof padStr != 'string' || !(isFinite(length) && length >= 0 && Math.floor(length) === length)) {
    throw Error('1st and 3rd args must be strings, 2nd arg must be a positive integer');
  }
  if (padStr == null || padStr == '') {
    padStr = ' ';
  }
  var strLen = str.length - (str.match(surrogatePairRegEx) || []).length;
  var padStrLen = padStr.length;
  var surrPairsInPad = (padStr.match(surrogatePairRegEx) || []).length;
  if (surrPairsInPad && padStrLen / surrPairsInPad != 2) {
    throw Error('padding mixes regular characters and surrogate pairs');
  }

  if (!length || length <= strLen) {
    return str;
  }
  var padCount = Math.floor((length - strLen) / padStrLen);
  var padRemainder = (length - strLen) % padStrLen;
  if (surrPairsInPad) {
    padCount = 2 * padCount;
    padRemainder = 2 * padRemainder;
  }
  return (padRemainder ? [padStr.slice(-padRemainder)] : []).concat(new Array(padCount + 1).join(padStr)).concat(str).join('');
}

},{}]},{},[1]);
