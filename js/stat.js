'use strict';

(function () {
  var CLOUD_WIDTH = 420; // ширина
  var CLOUD_HEIGHT = 270; // высота
  var CLOUD_X = 100; // начальные координаты ширины по x
  var CLOUD_Y = 10; // начальные координаты высоты по y
  var GAP = 10; // Тень
  var GAP_TEXT = 20; // Отступ в тексте
  var BAR_WIDTH = 40; // Ширина колонки
  var BAR_HEIGHT = 150; // Высота колонки
  var BAR_SPACE = 50; // Растояние между колонками
  var BAR_MY_COLOR = 'rgba(255, 0, 0, 1)'; // Цвет моей колонки
  var BAR_X = CLOUD_X + (CLOUD_WIDTH - BAR_SPACE * 3 - BAR_WIDTH * 4) / 2; // начальные координаты графиков по ширине
  var BAR_Y = CLOUD_Y + CLOUD_HEIGHT - GAP_TEXT;
  var BAR_BEETWEEN = BAR_WIDTH + BAR_SPACE; // Расстояние между колнками и текстом по ширине.

  var renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };


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

  window.renderStatistics = function (ctx, players, times) {

    renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)'); // тень
    renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff'); // облако

    ctx.fillStyle = '#000000';
    ctx.font = '16 PT Mono';
    ctx.fillText('Ура вы победили!', CLOUD_X + GAP_TEXT, CLOUD_Y + GAP + GAP_TEXT); // fillText(text, x, y )
    ctx.fillText('Список результатов:', CLOUD_X + GAP_TEXT, CLOUD_Y + GAP + GAP_TEXT + GAP_TEXT);

    var MAX = getMaxElement(times); // Макс

    for (var i = 0; i < players.length; i++) {
      ctx.fillStyle = '#000000';
      ctx.fillText(players[i], BAR_X + BAR_BEETWEEN * i, BAR_Y); // Имена увеличиваем
      ctx.fillText(Math.round(times[i]), BAR_X + BAR_BEETWEEN * i, BAR_Y - (GAP_TEXT + BAR_HEIGHT * times[i] / MAX + GAP)); // Время округляем
      if (players[i] === 'Вы') {
        ctx.fillStyle = BAR_MY_COLOR;
      } else {
        ctx.fillStyle = getColor();
      }
      ctx.fillRect(BAR_X + BAR_BEETWEEN * i, BAR_Y - (GAP_TEXT + BAR_HEIGHT * times[i] / MAX), BAR_WIDTH, BAR_HEIGHT * times[i] / MAX);
    }
  };
})();
