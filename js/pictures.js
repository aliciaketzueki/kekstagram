'use strict';
(function () {
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var pictureIndex = window.util.createArr(1, 26);
  // Генерация случайного URL у фотографий
  var renderPictureIndex = function () {
    var rand = window.util.getRandomArbitary(1, pictureIndex.length - 1);
    var randomElement = pictureIndex[rand];
    pictureIndex.splice(rand, 1);
    return randomElement;
  };
  // Cоздание случайного количества комментариев к фото
  var createComments = function () {
    var comments = [];
    var commentsQuantity = 0;
    for (var j = 0; j < 25; j++) {
      commentsQuantity = window.util.getRandomArbitary(0, 25);
      for (var i = 0; i < commentsQuantity; i++) {
        comments[i] = window.util.selectRandomElement(window.const.COMMENTS_ARR);
        comments.length = commentsQuantity;
      }
    }
    return comments;
  };
  // Копирование шаблона маленькой фотографии и изменение ее свойств
  var createDomElements = function (arr) {
    var pictureItem = pictureTemplate.cloneNode(true);
    pictureItem.querySelector('.picture__img').src = arr.url;
    pictureItem.querySelector('.picture__likes').textContent = arr.likes;
    pictureItem.querySelector('.picture__comments').textContent = arr.comments.length;
    return pictureItem;
  };
  // Создание массива объектов фотографий
  var createPhotos = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      var photo = {
        url: arr[i].url,
        likes: arr[i].likes,
        comments: arr[i].comments,
        description: arr[i].description
      };
      arr[i] = photo;
    }
    return arr;
  }
  window.pictures = {
    photos: [],
    // Создание массива фотографий
    createNewPhotosArr: function () {
      // Добавление маленьких фото в разметку
      var successHandler = function (arr) {
        var pictureDestination = document.querySelector('.pictures');
        var fragment = document.createDocumentFragment();
        for (var j = 0; j < arr.length; j++) {
          fragment.appendChild(createDomElements(arr[j]));
        }
        pictureDestination.appendChild(fragment);
        window.pictures.photos.push(createPhotos(arr));
      };
      // Ошибка добавления
      var errorHandler = function (errorMessage) {
        var node = document.createElement('div');
        node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
        node.style.position = 'absolute';
        node.style.left = 0;
        node.style.right = 0;
        node.style.fontSize = '30px';

        node.textContent = errorMessage;
        document.body.insertAdjacentElement('afterbegin', node);
      };

      window.backend.uploadData(successHandler, errorHandler);
    }
  };
})();
