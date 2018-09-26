'use strict';
(function () {
  // Добавление URL, likes, описания, comments.length в разметку большой фотографии
  var getBigPictureProperties = function (j, element, arr) {
    element.querySelector('.big-picture__img').querySelector('img').src = arr[j].url;
    element.querySelector('.likes-count').textContent = arr[j].likes;
    element.querySelector('.social__caption').textContent = arr[j].description;
    element.querySelector('.comments-count').textContent = arr[j].comments.length;
  };
  // Создание DOM-элементов для комментариев
  var getBigPictureComments = function (arrComments, li) {
    var photosComment = li.cloneNode(true);
    photosComment.querySelector('.social__picture').src = 'img/avatar-' + window.util.getRandomArbitary(1, 6) + '.svg';
    photosComment.querySelector('.social__text').textContent = arrComments;
    return photosComment;
  };
  // Добавление DOM-элементов в разметку
  var addComments = function (j, arr, ul, li) {
    window.util.deleteNodeElements(ul);
    var fragment = document.createDocumentFragment();
    for (var k = 0; k < arr[j].comments.length; k++) {
      fragment.appendChild(getBigPictureComments(arr[j].comments[k], li));
    }
    ul.appendChild(fragment);
  };
  window.bigPhoto = {
    // Открытие большой фотографии
    openBigPhoto: function (element, arr, ul, li) {
      var bigPictureArr = document.querySelectorAll('.picture');
      var onLittlePicturePress = function (evt) {
        for (var j = 0; j < arr.length; j++) {
          if (bigPictureArr[j].querySelector('img') === evt.target) {
            getBigPictureProperties(j, element, arr);
            addComments(j, arr, ul, li);
          }
        }
        element.classList.remove('hidden');
      };

      for (var i = 0; i < bigPictureArr.length; i++) {
        bigPictureArr[i].addEventListener('click', onLittlePicturePress);
      }

      element.querySelector('.social__comment-count').classList.add('visually-hidden');
      element.querySelector('.comments-loader').classList.add('visually-hidden');
    },
    // Закрытие большой фотографии
    closeBigPhoto: function (element, ul) {
      var bigPictureCancel = element.querySelector('.big-picture__cancel');

      bigPictureCancel.addEventListener('click', function () {
        element.classList.add('hidden');
        window.util.deleteNodeElements(ul);
      });

      document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.const.ESC_KEYDOWN) {
          element.classList.add('hidden');
          window.util.deleteNodeElements(ul);
        }
      });
    }
  };
})();
