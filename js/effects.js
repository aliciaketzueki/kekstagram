'use strict';
(function () {
  // Функция-конструктор для создания объекта эффекта
  var Effects = function (name, className) {
    this.name = name;
    this.className = className;
  };
  // Функция добавления фильтров в массив эффектов
  var addFilterToArr = function (arr, value) {
    for (var i = 0; i < arr.length; i++) {
      switch (arr[i].name) {
        case 'none':
          arr[i].filter = 'none';
          break;
        case 'chrome':
          arr[i].filter = 'grayscale(' + (value / window.const.FILTER_LINE_WIDTH * window.const.EFFECTS_CHROME_MAX) + ')';
          break;
        case 'sepia':
          arr[i].filter = 'sepia(' + (value / window.const.FILTER_LINE_WIDTH * window.const.EFFECTS_SEPIA_MAX) + ')';
          break;
        case 'marvin':
          arr[i].filter = 'invert(' + (value / window.const.FILTER_LINE_WIDTH * window.const.EFFECTS_MARVIN_MAX) + '%)';
          break;
        case 'phobos':
          arr[i].filter = 'blur(' + (value / window.const.FILTER_LINE_WIDTH * window.const.EFFECTS_PHOBOS_MAX) + 'px)';
          break;
        case 'heat':
          arr[i].filter = 'brightness(' + (value / window.const.FILTER_LINE_WIDTH * window.const.EFFECTS_HEAT_MAX - window.const.EFFECTS_HEAT_MIN) + ')';
          break;
        default:
          arr[i].filter = '';
      }
    }
    return arr;
  };

  window.effects = {
    // Функция создания массива эффектов
    createEffectsArr: function (arr) {
      var noneEffect = new Effects('none', 'effects__preview--none');
      var chromeEffect = new Effects('chrome', 'effects__preview--chrome');
      var sepiaEffect = new Effects('sepia', 'effects__preview--sepia');
      var marvinEffect = new Effects('marvin', 'effects__preview--marvin');
      var phobosEffect = new Effects('phobos', 'effects__preview--phobos');
      var heatEffect = new Effects('heat', 'effects__preview--heat');

      arr.push(noneEffect, chromeEffect, sepiaEffect, marvinEffect, phobosEffect, heatEffect);
      return arr;
    },
    // Переключение радиокнопок с эффектами
    changeEffects: function (element, preview, arr, pin, depth) {
      var effectsRadioButton = element.querySelectorAll('.effects__radio');
      var effectLevelBlock = element.querySelector('.effect-level');

      var onEffectsRadioButtonPress = function (evt) {
        preview.removeAttribute('class');
        pin.style.left = window.const.FILTER_LINE_WIDTH + 'px';
        depth.style.width = window.const.FILTER_LINE_WIDTH + 'px';

        for (var j = 0; j < arr.length; j++) {
          if (effectsRadioButton[j] === evt.target) {
            preview.classList.add(arr[j].className);
            preview.style.filter = null;
          }
          if (effectsRadioButton[0] === evt.target) {
            effectLevelBlock.classList.add('hidden');
          } else {
            effectLevelBlock.classList.remove('hidden');
          }
        }
      };

      for (var i = 0; i < effectsRadioButton.length; i++) {
        effectsRadioButton[i].addEventListener('click', onEffectsRadioButtonPress);
        effectsRadioButton[i].addEventListener('keydown', onEffectsRadioButtonPress);
      }
    },
    // Изменение уровня насыщенности
    changeFilterLevel: function (preview, arr, pin, depth) {
      pin.addEventListener('mousedown', function (evt) {
        evt.preventDefault();
        var startCoordsX = evt.clientX;

        var calcCoords = function (move) {
          var shift = startCoordsX - move.clientX;
          startCoordsX = move.clientX;
          var newCoordsX = pin.offsetLeft - shift;

          if (newCoordsX <= window.const.FILTER_LINE_WIDTH && newCoordsX >= 0) {
            pin.style.left = newCoordsX + 'px';
            depth.style.width = newCoordsX + 'px';
          }
          return newCoordsX;
        };

        var onMouseMove = function (moveEvt) {
          moveEvt.preventDefault();
          calcCoords(moveEvt);
        };

        var onMouseUp = function (upEvt) {
          upEvt.preventDefault();
          calcCoords(upEvt);

          var newEffectsArr = addFilterToArr(arr, calcCoords(upEvt));
          for (var i = 0; i < arr.length; i++) {
            if (preview.classList.contains(arr[i].className)) {
              preview.style.filter = newEffectsArr[i].filter;
            }
          }
          document.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      });
    },
    // Изменение размеров изображения
    changeImgSize: function (area, img, scale) {
      var scaleControlSmaller = area.querySelector('.scale__control--smaller');
      var scaleControlBigger = area.querySelector('.scale__control--bigger');

      scale.value = window.const.IMAGE_SIZE_MAX + '%';
      var controlValue;

      var onScaleControlSmallerPress = function () {
        controlValue = parseInt(scale.value, 10);
        if (controlValue > window.const.IMAGE_SIZE_MIN) {
          scale.value = controlValue - window.const.IMAGE_SIZE_STEP + '%';
          window.const.IMAGE_SIZE_DEFAULT -= (window.const.IMAGE_SIZE_STEP / window.const.PERCENT_MAX);
          img.style = 'transform: scale(' + window.const.IMAGE_SIZE_DEFAULT + ')';
        }
      };

      var onScaleControlBiggerPress = function () {
        controlValue = parseInt(scale.value, 10);
        if (controlValue < window.const.IMAGE_SIZE_MAX) {
          scale.value = controlValue + window.const.IMAGE_SIZE_STEP + '%';
          window.const.IMAGE_SIZE_DEFAULT += (window.const.IMAGE_SIZE_STEP / window.const.PERCENT_MAX);
          img.style = 'transform: scale(' + window.const.IMAGE_SIZE_DEFAULT + ')';
        }
      };

      scaleControlBigger.addEventListener('click', onScaleControlBiggerPress);
      scaleControlSmaller.addEventListener('click', onScaleControlSmallerPress);
    }
  };
})();
