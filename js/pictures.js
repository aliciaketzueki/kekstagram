'use strict';

// Абстрактные функции
var getRandomArbitary = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var createArr = function (arrStart, arrLength, object) {
  var arr = [];
  for (var i = arrStart; i < arrLength; i++) {
    arr[i] = i;
    if (object) {
      arr[i] = object;
    }
  }
  return arr;
};

var selectRandomElement = function (arr) {
  var element;
  for (var i = 0; i < arr.length; i++) {
    element = arr[getRandomArbitary(0, arr.length - 1)];
  }
  return element;
};
// Случайный URL у фотографий
var pictureIndex = createArr(1, 26);
var renderPictureIndex = function (arr) {
  var rand = getRandomArbitary(1, arr.length - 1);
  var randomElement = arr[rand];
  arr.splice(rand, 1);
  return randomElement;
};
// Массив комментарий и создание случайного количества комментариев к фото
var commentsArr = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var createComments = function () {
  var comments = [];
  var commentsQuantity = 0;
  for (var j = 0; j < 25; j++) {
    commentsQuantity = getRandomArbitary(0, 25);
    for (var i = 0; i < commentsQuantity; i++) {
      comments[i] = selectRandomElement(commentsArr);
      comments.length = commentsQuantity;
    }
  }
  return comments;
};

// Массив описаний к фото
var descriptionArr = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];
// Создание массива объектов фотографий с полученными ранее свойствами
var photos = [];
var createPhotos = function () {
  for (var i = 0; i < 25; i++) {
    var photo = {
      url: 'photos/' + renderPictureIndex(pictureIndex) + '.jpg',
      likes: getRandomArbitary(15, 200),
      comments: createComments(),
      description: selectRandomElement(descriptionArr)
    };
    photos[i] = photo;
  }
};

createPhotos();
console.log(photos);
// Копирование шаблона маленькой фотографии и создание DOM-элементов
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var pictureDestination = document.querySelector('.pictures');

var createDomElements = function (arr) {
  var pictureItem = pictureTemplate.cloneNode(true);
  pictureItem.querySelector('.picture__img').src = arr.url;
  pictureItem.querySelector('.picture__likes').textContent = arr.likes;
  pictureItem.querySelector('.picture__comments').textContent = arr.comments.length;
  return pictureItem;
};

// Добавление созданных DOM-элементов маленьких фото в разметку
var addElements = function (elements, destination) {
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < elements.length; j++) {
    fragment.appendChild(createDomElements(elements[j]));
  }
  destination.appendChild(fragment);
};
addElements(photos, pictureDestination);

// Редактирование шаблона большой фотографии
var bigPicture = document.querySelector('.big-picture');
var bigPictureArr = document.querySelectorAll('.picture');
// URL, likes, описание, кол-во комментов
var getBigPictureProperties = function (j) {
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = photos[j].url;
  bigPicture.querySelector('.likes-count').textContent = photos[j].likes;
  bigPicture.querySelector('.social__caption').textContent = photos[j].description;
  bigPicture.querySelector('.comments-count').textContent = photos[j].comments.length;
};
// Комментарии
var bigPictureComments = bigPicture.querySelector('.social__comments');
var bigPictureComment = bigPictureComments.querySelector('.social__comment');

var getBigPictureComments = function (arr) {
  var photosComment = bigPictureComment.cloneNode(true);
  photosComment.querySelector('.social__picture').src = 'img/avatar-' + getRandomArbitary(1, 6) + '.svg';
  photosComment.querySelector('.social__text').textContent = arr.comments;
  return photosComment;
};

var addComments = function (j) {
  deleteComments(bigPictureComments);
  var fragment = document.createDocumentFragment();
    for (var k = 0; k < photos[j].comments.length; k++) {
      fragment.appendChild(getBigPictureComments(photos[j].comments[k]));
    }
  bigPictureComments.appendChild(fragment);
};

var deleteComments = function (parent) {
  while (parent.hasChildNodes()) {
    parent.removeChild(parent.lastChild);
  }
};
/*
var getBigPictureComments = function () {
  var bigPictureComments = bigPicture.querySelector('.social__comments');
  var bigPictureComment = bigPictureComments.querySelectorAll('.social__comment');
  for (var i = 0; i < bigPictureComments.length; i++) {
    bigPictureComment[i].querySelector('.social__picture').src = 'img/avatar-' + getRandomArbitary(1, 6) + '.svg';
    bigPictureComment[i].querySelector('.social__text').textContent = photos[i].comments[i];
  }
};
getBigPictureComments();
*/
/*
Список комментариев под фотографией: коментарии должны вставляться в блок .social__comments. Разметка каждого комментария должна выглядеть так:
<li class="social__comment">
  <img class="social__picture" src="img/avatar-
    {{случайное число от 1 до 6}}.svg"
    alt="Аватар комментатора фотографии"
    width="35" height="35">
    <p class="social__text">{{текст комментария}}</p>
</li>
*/

// Показ разных больших фотографий при нажатии на маленькие

var viewBigPhoto = function () {
  for (var i = 0; i < bigPictureArr.length; i++) {
    bigPictureArr[i].addEventListener('click', function (evt) {
      for (var j = 0; j < photos.length; j++) {
        if (bigPictureArr[j].querySelector('img') === evt.target) {
          getBigPictureProperties(j);
          addComments(j);
        }
      }
      bigPicture.classList.remove('hidden');
    });
  }
}

viewBigPhoto();

// Закрытие большой фотографии
var ESC_KEYDOWN = 27;
var ENTER_KEYDOWN = 13;

var bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
bigPictureCancel.addEventListener('click', function () {
  bigPicture.classList.add('hidden');
  deleteComments(bigPictureComments);
});

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYDOWN) {
    bigPicture.classList.add('hidden');
    deleteComments(bigPictureComments);
  }
});

// Задача 1.5
document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.comments-loader').classList.add('visually-hidden');

// Задача 2.1
var uploadFile = document.getElementById('upload-file');
var imgUpload = document.querySelector('.img-upload__overlay');
var imgUploadCancel = imgUpload.querySelector('.img-upload__cancel');

var onImgUploadEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYDOWN) {
    imgUpload.classList.add('hidden');
  }
};

uploadFile.addEventListener('change', function () {
  imgUpload.classList.remove('hidden');
  document.addEventListener('keydown', onImgUploadEscPress);
});

imgUploadCancel.addEventListener('click', function () {
  imgUpload.classList.add('hidden');
  document.removeEventListener('keydown', onImgUploadEscPress);
});

// Задача 2.2
var effectLevelPin = imgUpload.querySelector('.effect-level__pin');
var scaleControlValue = imgUpload.querySelector('.effect-level__value');

var effectsPreview = imgUpload.querySelectorAll('.effects__preview');

effectLevelPin.addEventListener('mouseup', function () {
  effectLevelPin.style.left = scaleControlValue.value;
});
/*
Для этого добавим на пин слайдера .effect-level__pin обработчик события mouseup, который будет согласно ТЗ изменять уровень насыщенности фильтра для изображения. Для определения уровня насыщенности, нужно рассчитать положение пина слайдера относительно всего блока и воспользоваться пропорцией, чтобы понять, какой уровень эффекта нужно применить.
*/

// Задача 2.3

