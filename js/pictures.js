'use strict';

// Задача 1
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

var commentsQuantity = getRandomArbitary(6, 200);
var comments = [];
var createComments = function () {
  for (var i = 0; i < commentsQuantity; i++) {
    comments[i] = selectRandomElement(commentsArr);
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

// Задача 2
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var pictureDestination = document.querySelector('.pictures');

var createDomElements = function (arr) {
  var pictureItem = pictureTemplate.cloneNode(true);
  pictureItem.querySelector('.picture__img').src = arr.url;
  pictureItem.querySelector('.picture__likes').textContent = arr.likes;
  pictureItem.querySelector('.picture__comments').textContent = arr.comments;
  return pictureItem;
};

// Задача 3
var addElements = function (elements) {
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < elements.length; j++) {
    fragment.appendChild(createDomElements(elements[j]));
  }
  pictureDestination.appendChild(fragment);
};
addElements(photos);

// Задача 4
var bigPicture = document.querySelector('.big-picture');
bigPicture.classList.remove('hidden');

var getBigPictureProperties = function () {
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = photos[0].url;
  bigPicture.querySelector('.likes-count').textContent = photos[0].likes;
  bigPicture.querySelector('.social__caption').textContent = photos[0].description;
  bigPicture.querySelector('.comments-count').textContent = photos[0].comments.length;
};

getBigPictureProperties();

var getBigPictureComments = function () {
  var bigPictureComments = bigPicture.querySelector('.social__comments');
  var bigPictureComment = bigPictureComments.querySelectorAll('.social__comment');
  for (var i = 0; i < bigPictureComment.length; i++) {
    bigPictureComment[i].querySelector('.social__picture').src = 'img/avatar-' + getRandomArbitary(1, 6) + '.svg';
    bigPictureComment[i].querySelector('.social__text').textContent = photos[i].comments[i];
  }
};

getBigPictureComments();

// Задача 5
document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.comments-loader').classList.add('visually-hidden');
