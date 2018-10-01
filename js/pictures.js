'use strict';
(function () {
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  // Копирование шаблона маленькой фотографии и изменение ее свойств
  var createDomElements = function (arr) {
    var pictureItem = pictureTemplate.cloneNode(true);
    pictureItem.querySelector('.picture__img').src = arr.url;
    pictureItem.querySelector('.picture__likes').textContent = arr.likes;
    pictureItem.querySelector('.picture__comments').textContent = arr.comments.length;
    return pictureItem;
  };

  // Удаление старых фото
  var removeDomElements = function () {
    var pictures = document.querySelectorAll('.picture');
    pictures.forEach(function (it) {
      if (it.parentNode.contains(it)) {
        it.parentNode.removeChild(it);
      }
    })
  };
  var arr = [];
  window.pictures = {
    // Добавление DOM-элементов
    appendDomElements: function (arr) {
      var pictureDestination = document.querySelector('.pictures');
      var fragment = document.createDocumentFragment();
      var takeNumber = arr.length > 25 ? 25 : arr.length;
      removeDomElements();
      for (var j = 0; j < takeNumber; j++) {
        fragment.appendChild(createDomElements(arr[j]));
      }
      pictureDestination.appendChild(fragment);
    },
    // Создание массива фотографий
    createNewPhotosArr: function () {
      // Добавление маленьких фото в разметку
      var successHandler = function (data) {
        arr = data;
        window.pictures.appendDomElements(arr);
        window.bigPhoto.changeBigPhoto(arr);
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
    }
  };
})();
