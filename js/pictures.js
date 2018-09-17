'use strict';
// 1. Общие функции и константы
// 1.1. Константы
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
var FILTER_LINE_WIDTH = 495 - 20 - 20;
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
// 1.6. Функция инициализации
var init = function () {
  var pictureIndex = createArr(1, 26);
  var photos = [];

  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var pictureDestination = document.querySelector('.pictures');

  var bigPicture = document.querySelector('.big-picture');
  var bigPictureComments = bigPicture.querySelector('.social__comments');
  var bigPictureComment = bigPictureComments.querySelector('.social__comment');

  var uploadFile = document.getElementById('upload-file');
  var imgUpload = document.querySelector('.img-upload__overlay');
  var imgUploadCancel = imgUpload.querySelector('.img-upload__cancel');

  var effectsArr = [];

  var imgUploadPreview = imgUpload.querySelector('.img-upload__preview').querySelector('img');

  window.pictureIndex = pictureIndex;
  window.photos = photos;
  window.pictureTemplate = pictureTemplate;
  window.pictureDestination = pictureDestination;
  window.bigPicture = bigPicture;
  window.bigPictureComments = bigPictureComments;
  window.bigPictureComment = bigPictureComment;

  window.uploadFile = uploadFile;
  window.imgUpload = imgUpload;
  window.imgUploadCancel = imgUploadCancel;
  window.effectsArr = effectsArr;
  window.imgUploadPreview = imgUploadPreview;
};
init();
/* -------------------------- */
// 2. Создание массива фотографий
// 2.1. Генерация случайного URL у фотографий
var renderPictureIndex = function (arr) {
  var rand = getRandomArbitary(1, arr.length - 1);
  var randomElement = arr[rand];
  arr.splice(rand, 1);
  return randomElement;
};
// 2.2.1. Cоздание случайного количества комментариев к фото
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
var createPhotos = function () {
  for (var i = 0; i < 25; i++) {
    var photo = {
      url: 'photos/' + renderPictureIndex(pictureIndex) + '.jpg',
      likes: getRandomArbitary(15, 200),
      comments: createComments(),
      description: selectRandomElement(DESCRIPTION_ARR)
    };
    photos[i] = photo;
  }
};

createPhotos();
/* -------------------------- */
// 3. Заполнение страницы маленькими случайными фотографиями
// 3.1. Копирование шаблона маленькой фотографии и изменение ее свойств
var createDomElements = function (arr) {
  var pictureItem = pictureTemplate.cloneNode(true);
  pictureItem.querySelector('.picture__img').src = arr.url;
  pictureItem.querySelector('.picture__likes').textContent = arr.likes;
  pictureItem.querySelector('.picture__comments').textContent = arr.comments.length;
  return pictureItem;
};
// 3.2. Добавление созданных DOM-элементов маленьких фото в разметку
var addElements = function (elements, destination) {
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < elements.length; j++) {
    fragment.appendChild(createDomElements(elements[j]));
  }
  destination.appendChild(fragment);
};

addElements(photos, pictureDestination);

/* -------------------------- */
// 4. Редактирование шаблона большой фотографии
// 4.1. Добавление URL, likes, описания, comments.length в разметку большой фотографии
var getBigPictureProperties = function (j) {
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = photos[j].url;
  bigPicture.querySelector('.likes-count').textContent = photos[j].likes;
  bigPicture.querySelector('.social__caption').textContent = photos[j].description;
  bigPicture.querySelector('.comments-count').textContent = photos[j].comments.length;
};
// 4.2. Создание DOM-элементов для комментариев
var getBigPictureComments = function (arr) {
  var photosComment = bigPictureComment.cloneNode(true);
  photosComment.querySelector('.social__picture').src = 'img/avatar-' + getRandomArbitary(1, 6) + '.svg';
  photosComment.querySelector('.social__text').textContent = arr;
  return photosComment;
};
// 4.2.1. Добавление DOM-элементов в разметку
var addComments = function (j) {
  deleteNodeElements(bigPictureComments);
  var fragment = document.createDocumentFragment();
  for (var k = 0; k < photos[j].comments.length; k++) {
    fragment.appendChild(getBigPictureComments(photos[j].comments[k]));
  }
  bigPictureComments.appendChild(fragment);
};
// 4.3. Показ разных больших фотографий при нажатии на маленькие
var openBigPhoto = function () {
  var bigPictureArr = document.querySelectorAll('.picture');
  var onLittlePicturePress = function (evt) {
    for (var j = 0; j < photos.length; j++) {
      if (bigPictureArr[j].querySelector('img') === evt.target) {
        getBigPictureProperties(j);
        addComments(j);
      }
    }
    bigPicture.classList.remove('hidden');
  };

  for (var i = 0; i < bigPictureArr.length; i++) {
    bigPictureArr[i].addEventListener('click', onLittlePicturePress);
  }

  bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
  bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');
};
openBigPhoto();
// 4.4. Закрытие большой фотографии
var closeBigPhoto = function () {
  var bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');

  bigPictureCancel.addEventListener('click', function () {
    bigPicture.classList.add('hidden');
    deleteNodeElements(bigPictureComments);
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYDOWN) {
      bigPicture.classList.add('hidden');
      deleteNodeElements(bigPictureComments);
    }
  });
}
 closeBigPhoto();
/* -------------------------- */
// 5. Загрузка изображения и показ формы редактирования
// 5.1. Функция нажатия на ESC
var onImgUploadEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYDOWN) {
    imgUpload.classList.add('hidden');
  }
};
// 5.2. Показ формы редактирования
var openUploadFileOverlay = function () {
  uploadFile.addEventListener('change', function () {
    imgUpload.classList.remove('hidden');
    document.addEventListener('keydown', onImgUploadEscPress);
  });
};
openUploadFileOverlay();
// 5.3. Закрытие формы редактирования
var closeUploadFileOverlay = function () {
  imgUploadCancel.addEventListener('click', function () {
    imgUpload.classList.add('hidden');
    document.removeEventListener('keydown', onImgUploadEscPress);
  });
};
closeUploadFileOverlay();
// 6. Применение эффектов для изображения
/*
1. Для эффекта «Хром» — filter: grayscale(0..1)
filterLevel / 100
2. Для эффекта «Сепия» — filter: sepia(0..1)
filterLevel / 100
3. Для эффекта «Марвин» — filter: invert(0..100%)
filterLevel + '%'
4. Для эффекта «Фобос» — filter: blur(0..3px)
(filterLevel * 3 / 100) + 'px'
5. Для эффекта «Зной» — filter: brightness(1..3)
(filterLevel * 3) / 100
*/
// 6.1. Функция-конструктор для создания объекта эффекта
var Effects = function (name, className, filter) {
  this.name = name;
  this.className = className;
  this.filter = filter;
};
// 6.2. Функция создания массива эффектов
var createEffectsArr = function () {
  var noneEffect = new Effects('none', 'effects__preview--none', 'filter: none');
  var chromeEffect = new Effects('chrome', 'effects__preview--chrome', 'filter: grayscale( + (filterLevel / 100) + );');
  var sepiaEffect = new Effects('sepia', 'effects__preview--sepia', 'filter: sepia( + (filterLevel / 100) + );');
  var marvinEffect = new Effects('marvin', 'effects__preview--marvin', 'filter: invert( + filterLevel + %);');
  var phobosEffect = new Effects('phobos', 'effects__preview--phobos', 'filter: blur( + (filterLevel * 3 / 100) + px);');
  var heatEffect = new Effects('heat', 'effects__preview--heat', 'filter: brightness( + (filterLevel * 3 / 100) + );');

  effectsArr.push(noneEffect, chromeEffect, sepiaEffect, marvinEffect, phobosEffect, heatEffect);
}
createEffectsArr();
// 6.2. Переключение радиокнопок с эффектами
var changeEffects = function () {
  var effectsRadioButton = imgUpload.querySelectorAll('.effects__radio');
  var onEffectsRadioButtonPress = function (evt) {
    imgUploadPreview.removeAttribute('class');
    for (var j = 0; j < effectsArr.length; j++) {
      if (effectsRadioButton[j] === evt.target) {
        imgUploadPreview.classList.add(effectsArr[j].className);
      }
    }
  };

  for (var i = 0; i < effectsRadioButton.length; i++) {
    effectsRadioButton[i].addEventListener('click', onEffectsRadioButtonPress);
    effectsRadioButton[i].addEventListener('keydown', onEffectsRadioButtonPress);
  }
};
changeEffects();
// 6.3. Изменение уровня насыщенности
var changeFilterLevel = function () {
  var effectLevelPin = imgUpload.querySelector('.effect-level__pin');

  var filterLevel = (effectLevelPin.style.left * 100 / FILTER_LINE_WIDTH);

  effectLevelPin.addEventListener('mouseup', function () {
    for (var i = 0; i < effectsArr.length; i++) {
      imgUploadPreview.style.filter = effectsArr[i].filter;
    }
  });
};
changeFilterLevel();
/*
Алгоритм расчета:
1. х = положение пина разделить на общую длину
2. Пропорция:
общая длина - 100% FilterLevel
    х ------- ?

Изменяются стили imgUploadPreview.style.filter

Добавим на пин слайдера .effect-level__pin обработчик события mouseup, который будет согласно ТЗ изменять уровень насыщенности фильтра для изображения. Для определения уровня насыщенности, нужно рассчитать положение пина слайдера относительно всего блока и воспользоваться пропорцией, чтобы понять, какой уровень эффекта нужно применить.
*/
