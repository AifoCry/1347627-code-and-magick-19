'use strict';

(function () {

  // функция генерации случайных данных
  function randomVar(n) {
    return Math.floor(Math.random() * n);
  }

  // генерация случайного элемента из массива
  var getRandomElement = function (elements) {
    return elements[randomVar(elements.length)];
  };

  // Получение максимального элемента.

  var getMaxElement = function (arr) {
    var MaxElement = arr[0];

    for (var i = 0; i < arr.length; i++) {
      if (MaxElement < arr[i]) {
        MaxElement = arr[i];
      }
    }

    return MaxElement;
  };

  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getColor = function () {
    var hslColors = 'hsl(240, ' + getRandomInt(0, 100) + '%, 50%)'; // Hue(240° синий), Saturation(random), Lightness(default)
    return hslColors;
  };

  window.util = {
    randomVar: randomVar,
    getRandomElement: getRandomElement,
    getMaxElement: getMaxElement,
    getRandomInt: getRandomInt,
    getColor: getColor,
  };
})();
