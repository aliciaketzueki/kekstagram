'use strict';
(function () {
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  /*
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
  */
  // Копирование шаблона маленькой фотографии и изменение ее свойств
  var createDomElements = function (arr) {
    var pictureItem = pictureTemplate.cloneNode(true);
    pictureItem.querySelector('.picture__img').src = arr.url;
    pictureItem.querySelector('.picture__likes').textContent = arr.likes;
    pictureItem.querySelector('.picture__comments').textContent = arr.comments.length;
    return pictureItem;
  };
  // Массив фотографий
  var Photos = function (url, likes, comments, description) {
    this.url = url;
    this.likes = likes;
    this.comments = comments;
    this.description = description;
  };
  // Создание массива объектов фотографий
  var createPhotos = function (arr, newArr) {
    var photo = {};
    for (var i = 0; i < arr.length; i++) {
      photo[i] = new Photos(arr[i].url, arr[i].likes, arr[i].comments, arr[i].description);
      newArr.push(photo[i]);
    }
    return newArr;
  };
  window.pictures = {
    // Создание массива фотографий
    createNewPhotosArr: function () {
      var photos = [];
      // Добавление маленьких фото в разметку
      var successHandler = function (arr) {
        photos = createPhotos(arr, photos);
        console.log(photos);
        var pictureDestination = document.querySelector('.pictures');
        var fragment = document.createDocumentFragment();
        for (var j = 0; j < photos.length; j++) {
          fragment.appendChild(createDomElements(photos[j]));
        }
        pictureDestination.appendChild(fragment);
      };
      // Ошибка добавления
      var errorHandler = function (errorMessage) {
        // что-нибудь другое тут придумать
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
      return photos;
    }
  };
})();
