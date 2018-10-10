'use strict';
(function () {
  var imgUpload = document.querySelector('.img-upload__overlay');
  var scaleControlValue = imgUpload.querySelector('.scale__control--value');
  var pinHandle = imgUpload.querySelector('.effect-level__pin');
  var effectLevelDepth = imgUpload.querySelector('.effect-level__depth');
  var effectValue = imgUpload.querySelector('.effect-level__value');
  var effectsRadioButton = imgUpload.querySelectorAll('.effects__radio');
  var effectLevelBlock = imgUpload.querySelector('.effect-level');
  // Функция-конструктор для создания объекта эффекта
  var Effect = function (name, className) {
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
      var noneEffect = new Effect('none', 'effects__preview--none');
      var chromeEffect = new Effect('chrome', 'effects__preview--chrome');
      var sepiaEffect = new Effect('sepia', 'effects__preview--sepia');
      var marvinEffect = new Effect('marvin', 'effects__preview--marvin');
      var phobosEffect = new Effect('phobos', 'effects__preview--phobos');
      var heatEffect = new Effect('heat', 'effects__preview--heat');

      arr.push(noneEffect, chromeEffect, sepiaEffect, marvinEffect, phobosEffect, heatEffect);
      return arr;
    },
    // Переключение радиокнопок с эффектами
    changeEffects: function (arr, preview) {
      var effectsArr = [];
      window.effects.createEffectsArr(effectsArr);
      
      var onEffectsRadioButtonPress = function (evt) {
        preview.removeAttribute('class');
        pinHandle.style.left = window.const.FILTER_LINE_WIDTH + 'px';
        effectLevelDepth.style.width = window.const.FILTER_LINE_WIDTH + 'px';

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
      effectsRadioButton.forEach(function (it) {
        it.addEventListener('click', onEffectsRadioButtonPress);
        it.addEventListener('keydown', onEffectsRadioButtonPress);
      });
    },
    // Изменение уровня насыщенности
    changeFilterLevel: function (arr, preview) {
      pinHandle.addEventListener('mousedown', function (evt) {
        evt.preventDefault();

        effectValue.readOnly = true; // иначе выдает ошибку
        effectValue.value = window.const.PERCENT_MAX;
        var startCoordsX = evt.clientX;

        var calcCoords = function (move) {
          var shift = startCoordsX - move.clientX;
          startCoordsX = move.clientX;
          var newCoordsX = pinHandle.offsetLeft - shift;

          if (newCoordsX <= window.const.FILTER_LINE_WIDTH && newCoordsX >= 0) {
            pinHandle.style.left = newCoordsX + 'px';
            effectLevelDepth.style.width = newCoordsX + 'px';
            effectValue.value = newCoordsX * window.const.PERCENT_MAX / window.const.FILTER_LINE_WIDTH;
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
    scaleNumber: window.const.IMAGE_SIZE_MAX / window.const.PERCENT_MAX,
    changeImgSize: function (preview) {
      var scaleControlSmaller = imgUpload.querySelector('.scale__control--smaller');
      var scaleControlBigger = imgUpload.querySelector('.scale__control--bigger');

      scaleControlValue.value = window.const.IMAGE_SIZE_MAX + '%';
      var controlValue;

      var onScaleControlSmallerPress = function () {
        controlValue = parseInt(scaleControlValue.value, 10);
        if (controlValue > window.const.IMAGE_SIZE_MIN) {
          scaleControlValue.value = controlValue - window.const.IMAGE_SIZE_STEP + '%';
          window.effects.scaleNumber -= (window.const.IMAGE_SIZE_STEP / window.const.PERCENT_MAX);
          preview.style.transform = 'scale(' + window.effects.scaleNumber + ')';
        }
      };

      var onScaleControlBiggerPress = function () {
        controlValue = parseInt(scaleControlValue.value, 10);
        if (controlValue < window.const.IMAGE_SIZE_MAX) {
          scaleControlValue.value = controlValue + window.const.IMAGE_SIZE_STEP + '%';
          window.effects.scaleNumber += (window.const.IMAGE_SIZE_STEP / window.const.PERCENT_MAX);
          preview.style.transform = 'scale(' + window.effects.scaleNumber + ')';
        }
      };

      scaleControlBigger.addEventListener('click', onScaleControlBiggerPress);
      scaleControlSmaller.addEventListener('click', onScaleControlSmallerPress);
    },
    // Сброс настроек изображения
    resetUploadSettings: function (preview) {
      preview.removeAttribute('class');
      preview.style = null;
      pinHandle.style = null;
      effectLevelDepth.style = null;
      effectValue.value = window.const.PERCENT_MAX;
      scaleControlValue.value = window.const.IMAGE_SIZE_MAX + '%';
      window.effects.scaleNumber = window.const.IMAGE_SIZE_MAX / window.const.PERCENT_MAX;
    }
  };
})();
