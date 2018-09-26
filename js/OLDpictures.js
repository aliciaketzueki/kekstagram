'use strict';

/* -------------------------- */
// 5. Загрузка изображения и показ формы редактирования
// 5.1. Показ формы редактирования
var openUploadFileOverlay = function (element, button, img, scale, pin, depth) {
  button.addEventListener('change', function () {
    element.classList.remove('hidden');

    document.addEventListener('keydown', function (evt) {
      var target = evt.target;
      if (target.classList.contains('text__hashtags') || target.classList.contains('text__description')) {
        evt.stopPropagation();
      } else if (evt.keyCode === ESC_KEYDOWN) {
        element.classList.add('hidden');
        resetUploadSettings(img, scale, pin, depth);
      }
    });
  });
};
// 5.2. Закрытие формы редактирования
var closeUploadFileOverlay = function (element, button, img, scale, pin, depth) {
  button.addEventListener('click', function () {
    element.classList.add('hidden');
    resetUploadSettings(img, scale, pin, depth);

    document.removeEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEYDOWN) {
        element.classList.add('hidden');
      }
    });
  });
};
// 5.3. Сброс настроек изображения
var resetUploadSettings = function (img, scale, pin, depth) {
  img.removeAttribute('class');
  img.style = null;
  pin.style = null;
  depth.style = null;
  scale.value = IMAGE_SIZE_MAX + '%';
  IMAGE_SIZE_DEFAULT = IMAGE_SIZE_MAX / PERCENT_MAX;
};

/* -------------------------- */
// 6. Наложение эффекта на изображение
// 6.1. Функция-конструктор для создания объекта эффекта
var Effects = function (name, className) {
  this.name = name;
  this.className = className;
};
// 6.2. Функция создания массива эффектов
var createEffectsArr = function (arr) {
  var noneEffect = new Effects('none', 'effects__preview--none');
  var chromeEffect = new Effects('chrome', 'effects__preview--chrome');
  var sepiaEffect = new Effects('sepia', 'effects__preview--sepia');
  var marvinEffect = new Effects('marvin', 'effects__preview--marvin');
  var phobosEffect = new Effects('phobos', 'effects__preview--phobos');
  var heatEffect = new Effects('heat', 'effects__preview--heat');

  arr.push(noneEffect, chromeEffect, sepiaEffect, marvinEffect, phobosEffect, heatEffect);
  return arr;
};
// 6.3. Функция добавления фильтров в массив эффектов
var addFilterToArr = function (arr, value) {
  for (var i = 0; i < arr.length; i++) {
    switch (arr[i].name) {
      case 'none':
        arr[i].filter = 'none';
        break;
      case 'chrome':
        arr[i].filter = 'grayscale(' + (value / FILTER_LINE_WIDTH * EFFECTS_CHROME_MAX) + ')';
        break;
      case 'sepia':
        arr[i].filter = 'sepia(' + (value / FILTER_LINE_WIDTH * EFFECTS_SEPIA_MAX) + ')';
        break;
      case 'marvin':
        arr[i].filter = 'invert(' + (value / FILTER_LINE_WIDTH * EFFECTS_MARVIN_MAX) + '%)';
        break;
      case 'phobos':
        arr[i].filter = 'blur(' + (value / FILTER_LINE_WIDTH * EFFECTS_PHOBOS_MAX) + 'px)';
        break;
      case 'heat':
        arr[i].filter = 'brightness(' + (value / FILTER_LINE_WIDTH * EFFECTS_HEAT_MAX - EFFECTS_HEAT_MIN) + ')';
        break;
      default:
        arr[i].filter = '';
    }
  }
  return arr;
};
// 6.4. Переключение радиокнопок с эффектами
var changeEffects = function (element, preview, arr, pin, depth) {
  var effectsRadioButton = element.querySelectorAll('.effects__radio');
  var effectLevelBlock = element.querySelector('.effect-level');

  var onEffectsRadioButtonPress = function (evt) {
    preview.removeAttribute('class');
    pin.style.left = FILTER_LINE_WIDTH + 'px';
    depth.style.width = FILTER_LINE_WIDTH + 'px';

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
};
// 6.5. Изменение уровня насыщенности
var changeFilterLevel = function (preview, arr, pin, depth) {

  pin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoordsX = evt.clientX;

    var calcCoords = function (move) {
      var shift = startCoordsX - move.clientX;
      startCoordsX = move.clientX;
      var newCoordsX = pin.offsetLeft - shift;

      if (newCoordsX <= FILTER_LINE_WIDTH && newCoordsX >= 0) {
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
};
// 6.6. Изменение размеров изображения
var changeImgSize = function (area, img, scale) {
  var scaleControlSmaller = area.querySelector('.scale__control--smaller');
  var scaleControlBigger = area.querySelector('.scale__control--bigger');

  scale.value = IMAGE_SIZE_MAX + '%';
  var controlValue;

  var onScaleControlSmallerPress = function () {
    controlValue = parseInt(scale.value, 10);
    if (controlValue > IMAGE_SIZE_MIN) {
      scale.value = controlValue - IMAGE_SIZE_STEP + '%';
      IMAGE_SIZE_DEFAULT -= (IMAGE_SIZE_STEP / PERCENT_MAX);
      img.style = 'transform: scale(' + IMAGE_SIZE_DEFAULT + ')';
    }
  };

  var onScaleControlBiggerPress = function () {
    controlValue = parseInt(scale.value, 10);
    if (controlValue < IMAGE_SIZE_MAX) {
      scale.value = controlValue + IMAGE_SIZE_STEP + '%';
      IMAGE_SIZE_DEFAULT += (IMAGE_SIZE_STEP / PERCENT_MAX);
      img.style = 'transform: scale(' + IMAGE_SIZE_DEFAULT + ')';
    }
  };

  scaleControlBigger.addEventListener('click', onScaleControlBiggerPress);
  scaleControlSmaller.addEventListener('click', onScaleControlSmallerPress);
};

/* -------------------------- */
// 7. Валидация
// 7.1. Валидация хэш-тегов
var checkValidityHashtags = function (area) {
  var textHashtag = area.querySelector('.text__hashtags');

  textHashtag.addEventListener('input', function (evt) {
    var target = evt.target;
    var hashtags = target.value.toLowerCase().split(' ');

    for (var i = 0; i < hashtags.length; i++) {
      var currentHashtag = hashtags[i];

      if (currentHashtag.charAt(0) !== '#') {
        target.setCustomValidity('Хэш-теги должны начинаться с символа #');
      } else if (checkLetters(currentHashtag, '#') > 0) {
        target.setCustomValidity('Хэш-теги должны разделяться пробелом');
      } else if (currentHashtag.length < HASHTAG_MIN_LENGTH) {
        target.setCustomValidity('Хэш-тег не может состоять из одной решётки');
      } else if (currentHashtag.length > HASHTAG_MAX_LENGTH) {
        target.setCustomValidity('Длина хэш-тега не должна быть больше ' + HASHTAG_MAX_LENGTH + ' символов');
      } else if (hashtags.length > HASHTAG_AMOUNT) {
        target.setCustomValidity('Нельзя указать больше ' + HASHTAG_AMOUNT + ' хэш-тегов');
      } else if (calcRepeats(hashtags) > 0) {
        target.setCustomValidity('Хэш-теги не могут повторяться');
      } else {
        target.setCustomValidity('');
      }
    }
  });
};
// 7.2. Валидация комментария
var checkValidityText = function (area) {
  var textDescription = area.querySelector('.text__description');

  textDescription.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value.length > COMMENT_MAX_LENGTH) {
      target.setCustomValidity('Длина комментария не должна превышать ' + COMMENT_MAX_LENGTH + ' символов');
    } else {
      target.setCustomValidity('');
    }
  });
};
