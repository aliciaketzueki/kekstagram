'use strict';
(function () {
  // Генерация случайного URL у фотографий
  var renderPictureIndex = function (arr) {
    var rand = window.util.getRandomArbitary(1, arr.length - 1);
    var randomElement = arr[rand];
    arr.splice(rand, 1);
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
  var createDomElements = function (arr, template) {
    var pictureItem = template.cloneNode(true);
    pictureItem.querySelector('.picture__img').src = arr.url;
    pictureItem.querySelector('.picture__likes').textContent = arr.likes;
    pictureItem.querySelector('.picture__comments').textContent = arr.comments.length;
    return pictureItem;
  };

  window.pictures = {
    // Создание массива объектов фотографий с полученными ранее свойствами
    createPhotos: function (element, arr) {
      for (var i = 0; i < 25; i++) {
        var photo = {
          url: 'photos/' + renderPictureIndex(element) + '.jpg',
          likes: window.util.getRandomArbitary(window.const.LIKES_AMOUNT_MIN, window.const.LIKES_AMOUNT_MAX),
          comments: createComments(),
          description: window.util.selectRandomElement(window.const.DESCRIPTION_ARR)
        };
        arr[i] = photo;
      }
      return arr;
    },
    // Добавление созданных DOM-элементов маленьких фото в разметку
    addElements: function (elements, destination, template) {
      var fragment = document.createDocumentFragment();
      for (var j = 0; j < elements.length; j++) {
        fragment.appendChild(createDomElements(elements[j], template));
      }
      destination.appendChild(fragment);
    }
  };
})();
