'use strict';
// 1. Общие функции и константы
// 1.1. Константы
var PERCENT_MAX = 100;
var ESC_KEYDOWN = 27;
var DESCRIPTION_ARR = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];
var COMMENTS_ARR = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var LIKES_AMOUNT_MIN = 15;
var LIKES_AMOUNT_MAX = 200;
var IMAGE_SIZE_MAX = 100;
var IMAGE_SIZE_MIN = 25;
var IMAGE_SIZE_STEP = 25;
var HASHTAG_MAX_LENGTH = 20;
var HASHTAG_MIN_LENGTH = 2;
var HASHTAG_AMOUNT = 5;
var COMMENT_MAX_LENGTH = 140;
// 1.2. Выбор случайного числа
var getRandomArbitary = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
// 1.3. Создание массива чисел
var createArr = function (arrStart, arrLength) {
  var arr = [];
  for (var i = arrStart; i < arrLength; i++) {
    arr[i] = i;
  }
  return arr;
};
// 1.4. Выбор рандомного элемента из массива
var selectRandomElement = function (arr) {
  var element;
  for (var i = 0; i < arr.length; i++) {
    element = arr[getRandomArbitary(0, arr.length - 1)];
  }
  return element;
};
// 1.5. Удаление Node-элементов
var deleteNodeElements = function (parent) {
  while (parent.hasChildNodes()) {
    parent.removeChild(parent.lastChild);
  }
};
// 1.6. Проверка повторения элементов в массиве
var calcRepeats = function (arr) {
  var repeat = 0;
  for (var i = 0; i < arr.length; i++) {
    for (var j = i + 1; j < arr.length; j++) {
      if (arr[j] === arr[i]) {
        repeat++;
      }
    }
  }
  return repeat;
};
// 1.7. Поиск символа в строке
var checkLetters = function (arr, symbol) {
  var letter = 0;
  for (var j = 1; j <= arr.length; j++) {
    if (arr.charAt(j) === symbol) {
      letter++;
    }
  }
  return letter;
};
// 1.8. Функция инициализации
var init = function () {
  var pictureIndex = createArr(1, 26);
  var photos = [];
  createPhotos(pictureIndex, photos);

  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var pictureDestination = document.querySelector('.pictures');
  addElements(photos, pictureDestination, pictureTemplate);

  var bigPicture = document.querySelector('.big-picture');
  var bigPictureComments = bigPicture.querySelector('.social__comments');
  var bigPictureComment = bigPictureComments.querySelector('.social__comment');
  openBigPhoto(bigPicture, photos, bigPictureComments, bigPictureComment);
  closeBigPhoto(bigPicture, bigPictureComments);
  // Форма редактирования
  var uploadFile = document.getElementById('upload-file');
  var imgUpload = document.querySelector('.img-upload__overlay');
  var imgUploadCancel = imgUpload.querySelector('.img-upload__cancel');
  var imgUploadPreview = imgUpload.querySelector('.img-upload__preview').querySelector('img');
  var scaleControlValue = imgUpload.querySelector('.scale__control--value');
  var effectsArr = [];

  var imageSizeDefault = IMAGE_SIZE_MAX / PERCENT_MAX;

  openUploadFileOverlay(imgUpload, uploadFile);
  closeUploadFileOverlay(imgUpload, imgUploadCancel);

  createEffectsArr(effectsArr);
  changeEffects(imgUpload, imgUploadPreview, effectsArr);
  changeFilterLevel(imgUpload, imgUploadPreview, effectsArr);
  changeImgSize(imgUpload, imgUploadPreview, scaleControlValue, imageSizeDefault);

  checkValidityHashtags(imgUpload);
  checkValidityText(imgUpload);
};

/* -------------------------- */
// 2. Создание массива фотографий
// 2.1. Генерация случайного URL у фотографий
var renderPictureIndex = function (arr) {
  var rand = getRandomArbitary(1, arr.length - 1);
  var randomElement = arr[rand];
  arr.splice(rand, 1);
  return randomElement;
};
// 2.2. Cоздание случайного количества комментариев к фото
var createComments = function () {
  var comments = [];
  var commentsQuantity = 0;
  for (var j = 0; j < 25; j++) {
    commentsQuantity = getRandomArbitary(0, 25);
    for (var i = 0; i < commentsQuantity; i++) {
      comments[i] = selectRandomElement(COMMENTS_ARR);
      comments.length = commentsQuantity;
    }
  }
  return comments;
};
// 2.3. Создание массива объектов фотографий с полученными ранее свойствами
var createPhotos = function (element, arr) {
  for (var i = 0; i < 25; i++) {
    var photo = {
      url: 'photos/' + renderPictureIndex(element) + '.jpg',
      likes: getRandomArbitary(LIKES_AMOUNT_MIN, LIKES_AMOUNT_MAX),
      comments: createComments(),
      description: selectRandomElement(DESCRIPTION_ARR)
    };
    arr[i] = photo;
  }
  return arr;
};

/* -------------------------- */
// 3. Заполнение страницы маленькими случайными фотографиями
// 3.1. Копирование шаблона маленькой фотографии и изменение ее свойств
var createDomElements = function (arr, template) {
  var pictureItem = template.cloneNode(true);
  pictureItem.querySelector('.picture__img').src = arr.url;
  pictureItem.querySelector('.picture__likes').textContent = arr.likes;
  pictureItem.querySelector('.picture__comments').textContent = arr.comments.length;
  return pictureItem;
};
// 3.2. Добавление созданных DOM-элементов маленьких фото в разметку
var addElements = function (elements, destination, template) {
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < elements.length; j++) {
    fragment.appendChild(createDomElements(elements[j], template));
  }
  destination.appendChild(fragment);
};

/* -------------------------- */
// 4. Редактирование шаблона большой фотографии
// 4.1. Добавление URL, likes, описания, comments.length в разметку большой фотографии
var getBigPictureProperties = function (j, element, arr) {
  element.querySelector('.big-picture__img').querySelector('img').src = arr[j].url;
  element.querySelector('.likes-count').textContent = arr[j].likes;
  element.querySelector('.social__caption').textContent = arr[j].description;
  element.querySelector('.comments-count').textContent = arr[j].comments.length;
};
// 4.2. Создание DOM-элементов для комментариев
var getBigPictureComments = function (arrComments, li) {
  var photosComment = li.cloneNode(true);
  photosComment.querySelector('.social__picture').src = 'img/avatar-' + getRandomArbitary(1, 6) + '.svg';
  photosComment.querySelector('.social__text').textContent = arrComments;
  return photosComment;
};
// 4.3. Добавление DOM-элементов в разметку
var addComments = function (j, arr, ul, li) {
  deleteNodeElements(ul);
  var fragment = document.createDocumentFragment();
  for (var k = 0; k < arr[j].comments.length; k++) {
    fragment.appendChild(getBigPictureComments(arr[j].comments[k], li));
  }
  ul.appendChild(fragment);
};
// 4.4. Показ разных больших фотографий при нажатии на маленькие
var openBigPhoto = function (element, arr, ul, li) {
  var bigPictureArr = document.querySelectorAll('.picture');
  var onLittlePicturePress = function (evt) {
    for (var j = 0; j < arr.length; j++) {
      if (bigPictureArr[j].querySelector('img') === evt.target) {
        getBigPictureProperties(j, element, arr);
        addComments(j, arr, ul, li);
      }
    }
    element.classList.remove('hidden');
  };

  for (var i = 0; i < bigPictureArr.length; i++) {
    bigPictureArr[i].addEventListener('click', onLittlePicturePress);
  }

  element.querySelector('.social__comment-count').classList.add('visually-hidden');
  element.querySelector('.comments-loader').classList.add('visually-hidden');
};
// 4.5. Закрытие большой фотографии
var closeBigPhoto = function (element, ul) {
  var bigPictureCancel = element.querySelector('.big-picture__cancel');

  bigPictureCancel.addEventListener('click', function () {
    element.classList.add('hidden');
    deleteNodeElements(ul);
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYDOWN) {
      element.classList.add('hidden');
      deleteNodeElements(ul);
    }
  });
};

/* -------------------------- */
// 5. Загрузка изображения и показ формы редактирования
// 5.1. Показ формы редактирования
var openUploadFileOverlay = function (element, button) {
  button.addEventListener('change', function () {
    element.classList.remove('hidden');

    document.addEventListener('keydown', function (evt) {
      var target = evt.target;
      if (target.classList.contains('text__hashtags') || target.classList.contains('text__description')) {
        evt.stopPropagation();
      } else if (evt.keyCode === ESC_KEYDOWN) {
        element.classList.add('hidden');
      }
    });
  });
};
// 5.2. Закрытие формы редактирования
var closeUploadFileOverlay = function (element, button) {
  button.addEventListener('click', function () {
    element.classList.add('hidden');
    document.removeEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEYDOWN) {
        element.classList.add('hidden');
      }
    });
  });
};
/* -------------------------- */
// 6. Наложение эффекта на изображение
// 6.1. Функция-конструктор для создания объекта эффекта
var Effects = function (name, className, filter) {
  this.name = name;
  this.className = className;
  this.filter = filter;
};
// 6.2. Функция создания массива эффектов
var createEffectsArr = function (arr) {
  var noneEffect = new Effects('none', 'effects__preview--none', 'filter: none');
  var chromeEffect = new Effects('chrome', 'effects__preview--chrome', 'filter: grayscale( + (filterLevel / 100) + );');
  var sepiaEffect = new Effects('sepia', 'effects__preview--sepia', 'filter: sepia( + (filterLevel / 100) + );');
  var marvinEffect = new Effects('marvin', 'effects__preview--marvin', 'filter: invert( + filterLevel + %);');
  var phobosEffect = new Effects('phobos', 'effects__preview--phobos', 'filter: blur( + (filterLevel * 3 / 100) + px);');
  var heatEffect = new Effects('heat', 'effects__preview--heat', 'filter: brightness( + (filterLevel * 3 / 100) + );');

  arr.push(noneEffect, chromeEffect, sepiaEffect, marvinEffect, phobosEffect, heatEffect);
};
// 6.3. Переключение радиокнопок с эффектами
var changeEffects = function (element, preview, arr) {
  var effectsRadioButton = element.querySelectorAll('.effects__radio');
  var onEffectsRadioButtonPress = function (evt) {
    preview.removeAttribute('class');
    for (var j = 0; j < arr.length; j++) {
      if (effectsRadioButton[j] === evt.target) {
        preview.classList.add(arr[j].className);
      }
    }
  };

  for (var i = 0; i < effectsRadioButton.length; i++) {
    effectsRadioButton[i].addEventListener('click', onEffectsRadioButtonPress);
    effectsRadioButton[i].addEventListener('keydown', onEffectsRadioButtonPress);
  }
};
// 6.4. Изменение уровня насыщенности
var changeFilterLevel = function (element, preview, arr) {
  var effectLevelPin = element.querySelector('.effect-level__pin');

  effectLevelPin.addEventListener('mouseup', function () {
    for (var i = 0; i < arr.length; i++) {
      preview.style.filter = arr[i].filter;
    }
  });
};
// 6.5. Изменение размеров изображения
var changeImgSize = function (area, img, scale, number) {
  var scaleControlSmaller = area.querySelector('.scale__control--smaller');
  var scaleControlBigger = area.querySelector('.scale__control--bigger');

  scale.value = IMAGE_SIZE_MAX + '%';
  var controlValue;

  var onScaleControlSmallerPress = function () {
    controlValue = parseInt(scale.value, 10);
    if (controlValue > IMAGE_SIZE_MIN) {
      scale.value = controlValue - IMAGE_SIZE_STEP + '%';
      number -= (IMAGE_SIZE_STEP / PERCENT_MAX);
      img.style = 'transform: scale(' + number + ');';
    }
  };

  var onScaleControlBiggerPress = function () {
    controlValue = parseInt(scale.value, 10);
    if (controlValue < IMAGE_SIZE_MAX) {
      scale.value = controlValue + IMAGE_SIZE_STEP + '%';
      number += (IMAGE_SIZE_STEP / PERCENT_MAX);
      img.style = 'transform: scale(' + number + ');';
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

init();
