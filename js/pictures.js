'use strict';

// Задача 1
var getRandomArbitary = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var createArr = function (arrStart, arrLength) {
  var arr = [];
  for (var i = arrStart; i < arrLength; i++) {
    arr[i] = i;
  }
  return arr;
};

var pictureIndex = createArr(1, 26);

var renderPictureIndex = function (arr, min, max) {
  var rand = getRandomArbitary(min, max);
  arr.splice(rand, 1);
  return rand;
};

var commentsArr = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var commentsQuantity = createArr(0, getRandomArbitary(1, 2));
var renderComments = function (arr) {
  var comment;
  for (var i = 0; i < arr.length; i++) {
    comment = arr[getRandomArbitary(0, arr.length - 1)];
  }
  return comment;
};

var comments = [];

for (var j = 0; j < commentsQuantity.length; j++) {
  comments[j] = renderComments(commentsArr);
}

var descriptionArr = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];

var photo = {
  url: 'photos/' + renderPictureIndex(pictureIndex, 1, 25) + '.jpg',
  likes: getRandomArbitary(15, 200),
  comments,
  description: renderComments(descriptionArr)
};
console.log(photo);

var photos = [];
var getPhotosArr = function () {
  photos = createArr(0, 25);
  return photos;
};
/*
1. Создать объект
2. Создать функцию добавления объектов в массив
*/
// Задача 2
