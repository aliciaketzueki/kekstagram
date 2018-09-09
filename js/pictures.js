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

var selectRandomElement = function (arr) {
  var element;
  for (var i = 0; i < arr.length; i++) {
    element = arr[getRandomArbitary(0, arr.length - 1)];
  }
  return element;
};
// ДОДЕЛАТЬ!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
var comments = [];
var commentsQuantity = createArr(0, getRandomArbitary(1, 2));
for (var j = 0; j < commentsQuantity.length; j++) {
  comments[j] = selectRandomElement(commentsArr);
}

var descriptionArr = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];

var createPhotosArr = function () {
  var photo = {
    url: 'photos/' + renderPictureIndex(pictureIndex, 1, 25) + '.jpg',
    likes: getRandomArbitary(15, 200),
    comments,
    description: selectRandomElement(descriptionArr)
  };
  var photos = createArr(0, 25, photo);
  return photos;
}

console.log(createPhotosArr());

// Задача 2
