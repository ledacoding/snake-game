/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var grid = document.querySelector(".grid");
var startButton = document.getElementById("start");
var scoreDisplay = document.getElementById("score");
var squares = [];
var currentSnake = [2, 1, 0];
var direction = 1;
var width = 10;
var appleIndex = 0;
var score = 0;
var intervalTime = 1000;
var speed = 0.8;
var timerId = 0;

function createGrid() {
  for (var i = 0; i < width * width; i++) {
    var square = document.createElement("div");
    square.classList.add("square");
    grid.appendChild(square);
    squares.push(square);
  }
}
createGrid();

currentSnake.forEach(function (index) {
  return squares[index].classList.add("snake");
});

function startGame() {
  currentSnake.forEach(function (index) {
    return squares[index].classList.remove("snake");
  });
  squares[appleIndex].classList.remove("apple");
  clearInterval(timerId);
  currentSnake = [2, 1, 0];
  score = 0;
  scoreDisplay.textContent = score;
  direction = 1;
  intervalTime = 1000;
  generateApple();
  currentSnake.forEach(function (index) {
    return squares[index].classList.add("snake");
  });
  timerId = setInterval(move, intervalTime);
}

function move() {
  if (currentSnake[0] + width >= width * width && direction === width || currentSnake[0] % width === width - 1 && direction === 1 || currentSnake[0] % width === 0 && direction === -1 || currentSnake[0] - width < 0 && direction === -width || squares[currentSnake[0] + direction].classList.contains("snake")) return clearInterval(timerId);

  var tail = currentSnake.pop();
  squares[tail].classList.remove("snake");
  currentSnake.unshift(currentSnake[0] + direction);

  if (squares[currentSnake[0]].classList.contains("apple")) {
    squares[currentSnake[0]].classList.remove("apple");
    squares[tail].classList.add("snake");
    console.log(tail);
    currentSnake.push(tail);
    console.log(currentSnake);
    generateApple();
    score++;
    scoreDisplay.textContent = score;
    clearInterval(timerId);
    console.log(intervalTime);
    intervalTime = intervalTime * speed;
    console.log(intervalTime);
    timerId = setInterval(move, intervalTime);
  }

  squares[currentSnake[0]].classList.add("snake");
}

function generateApple() {
  do {
    appleIndex = Math.floor(Math.random() * squares.length);
  } while (squares[appleIndex].classList.contains("snake"));
  squares[appleIndex].classList.add("apple");
}
generateApple();

function control(e) {
  if (e.keyCode === 39) {
    console.log("right pressed");
    direction = 1;
  } else if (e.keyCode === 38) {
    console.log("up pressed");
    direction = -width;
  } else if (e.keyCode === 37) {
    console.log("left pressed");
    direction = -1;
  } else if (e.keyCode === 40) {
    console.log("down pressed");
    direction = +width;
  }
}
document.addEventListener("keyup", control);
startButton.addEventListener("click", startGame);

/***/ })
/******/ ]);