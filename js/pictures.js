'use strict';

// Задача 1.1
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

var pictureIndex = createArr(1, 26);

var renderPictureIndex = function (arr) {
  var rand = getRandomArbitary(1, arr.length - 1);
  var randomElement = arr[rand];
  arr.splice(rand, 1);
  return randomElement;
};

var commentsArr = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var selectRandomElement = function (arr) {
  var element;
  for (var i = 0; i < arr.length; i++) {
    element = arr[getRandomArbitary(0, arr.length - 1)];
  }
  return element;
};

var createComments = function () {
  var comments = [];
  var commentsQuantity = 0;
  for (var j = 0; j < 25; j++) {
    commentsQuantity = getRandomArbitary(6, 50);
    for (var i = 0; i < commentsQuantity; i++) {
      comments[i] = selectRandomElement(commentsArr);
      comments.length = commentsQuantity;
    }
  }
  return comments;
};

var descriptionArr = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];

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

// Задача 1.2
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var pictureDestination = document.querySelector('.pictures');

var createDomElements = function (arr) {
  var pictureItem = pictureTemplate.cloneNode(true);
  pictureItem.querySelector('.picture__img').src = arr.url;
  pictureItem.querySelector('.picture__likes').textContent = arr.likes;
  pictureItem.querySelector('.picture__comments').textContent = arr.comments.length;
  return pictureItem;
};

// Задача 1.3
var addElements = function (elements, destination) {
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < elements.length; j++) {
    fragment.appendChild(createDomElements(elements[j]));
  }
  destination.appendChild(fragment);
};
addElements(photos, pictureDestination);

// Задача 1.4
var bigPicture = document.querySelector('.big-picture');
var bigPictureArr = document.querySelectorAll('.picture');

var getBigPictureProperties = function (j) {
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = photos[j].url;
  bigPicture.querySelector('.likes-count').textContent = photos[j].likes;
  bigPicture.querySelector('.social__caption').textContent = photos[j].description;
  bigPicture.querySelector('.comments-count').textContent = photos[j].comments.length;
};

var getBigPictureComments = function () {
  var bigPictureComments = bigPicture.querySelector('.social__comments');
  var bigPictureComment = bigPictureComments.querySelectorAll('.social__comment');
  for (var i = 0; i < bigPictureComment.length; i++) {
    bigPictureComment[i].querySelector('.social__picture').src = 'img/avatar-' + getRandomArbitary(1, 6) + '.svg';
    bigPictureComment[i].querySelector('.social__text').textContent = photos[i].comments[i];
  }
};
getBigPictureComments();
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
var viewBigPhoto = function () {
  for (var i = 0; i < bigPictureArr.length; i++) {
    bigPictureArr[i].addEventListener('click', function (evt) {
      for (var j = 0; j < photos.length; j++) {
        if (bigPictureArr[j].querySelector('img') === evt.target) {
          getBigPictureProperties(j);
          getBigPictureComments();
        }
      }
      bigPicture.classList.remove('hidden');

    });
  }
}

viewBigPhoto();
console.log(photos);

var bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
bigPictureCancel.addEventListener('click', function () {
  bigPicture.classList.add('hidden');
});

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYDOWN) {
    bigPicture.classList.add('hidden');
  }
});

// Задача 1.5
var ESC_KEYDOWN = 27;
var ENTER_KEYDOWN = 13;

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

