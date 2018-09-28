'use strict';
(function () {
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureComments = bigPicture.querySelector('.social__comments');
  var bigPictureComment = bigPictureComments.querySelector('.social__comment');
  // Добавление URL, likes, описания, comments.length в разметку большой фотографии
  var getBigPictureProperties = function (j, arr) {
    bigPicture.querySelector('.big-picture__img').querySelector('img').src = arr[j].url;
    bigPicture.querySelector('.likes-count').textContent = arr[j].likes;
    bigPicture.querySelector('.social__caption').textContent = arr[j].description;
    bigPicture.querySelector('.comments-count').textContent = arr[j].comments.length;
  };
  // Создание DOM-элементов для комментариев
  var getBigPictureComments = function (arrComments) {
    var photosComment = bigPictureComment.cloneNode(true);
    photosComment.querySelector('.social__picture').src = 'img/avatar-' + window.util.getRandomArbitary(1, 6) + '.svg';
    photosComment.querySelector('.social__text').textContent = arrComments;
    return photosComment;
  };
  // Добавление DOM-элементов в разметку
  var addComments = function (j, arr) {
    window.util.deleteNodeElements(bigPictureComments);
    var fragment = document.createDocumentFragment();
    for (var k = 0; k < arr[j].comments.length; k++) {
      fragment.appendChild(getBigPictureComments(arr[j].comments[k]));
    }
    bigPictureComments.appendChild(fragment);
  };
  window.bigPhoto = {
    // 1. Большая фотография
    changeBigPhoto: function (arr) {
      // Нажатие на ESC
      var onEscPress = function (evt) {
        if (evt.keyCode === window.const.ESC_KEYDOWN) {
            bigPicture.classList.add('hidden');
          }
        };
      // Открытие большой фотографии
      var openBigPhoto = function (arr) {
        var bigPictureArr = document.querySelectorAll('.picture');
        var onLittlePicturePress = function (evt) {
          for (var j = 0; j < arr.length; j++) {
            if (bigPictureArr[j].querySelector('img') === evt.target) {
              getBigPictureProperties(j, arr);
              addComments(j, arr);
            }
          }
          bigPicture.classList.remove('hidden');
          document.addEventListener('keydown', onEscPress);
        };

        for (var i = 0; i < bigPictureArr.length; i++) {
          bigPictureArr[i].addEventListener('click', onLittlePicturePress);
        }

        bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
        bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');
      };
      // Закрытие большой фотографии
      var closeBigPhoto = function () {
        var bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');

        bigPictureCancel.addEventListener('click', function () {
          bigPicture.classList.add('hidden');
          window.util.deleteNodeElements(bigPictureComments);
          document.removeEventListener('keydown', onEscPress);
        });
      };

      openBigPhoto(arr);
      closeBigPhoto();
    },
  };
})();
