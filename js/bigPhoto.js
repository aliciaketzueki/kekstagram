'use strict';
(function () {
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureComments = bigPicture.querySelector('.social__comments');
  var bigPictureComment = bigPictureComments.querySelector('.social__comment');
  var commentsLoader = bigPicture.querySelector('.comments-loader');
  var commentsCount = bigPicture.querySelector('.social__comment-count');
  // Добавление URL, likes, описания, comments.length в разметку большой фотографии
  var getBigPictureProperties = function (j, arr) {
    bigPicture.querySelector('.big-picture__img').querySelector('img').src = arr[j].url;
    bigPicture.querySelector('.likes-count').textContent = arr[j].likes;
    bigPicture.querySelector('.social__caption').textContent = arr[j].description;
  };
  // Создание DOM-элементов для комментариев
  var getBigPictureComments = function (arrComments) {
    var photosComment = bigPictureComment.cloneNode(true);
    photosComment.querySelector('.social__picture').src = 'img/avatar-' + window.util.getRandomArbitary(1, 6) + '.svg';
    photosComment.querySelector('.social__text').textContent = arrComments;
    return photosComment;
  };
  // Добавление DOM-элементов в разметку
  var appendDomElements = function (arr, j, start, end) {
    var fragment = document.createDocumentFragment();
    for (var k = start; k < end; k++) {
      fragment.appendChild(getBigPictureComments(arr[j].comments[k]));
    }
    bigPictureComments.appendChild(fragment);
    commentsCount.textContent = end + ' из ' + arr[j].comments.length + ' комментариев';
  };
  // Добавление комментариев
  var addComments = function (j, arr) {
    window.util.deleteNodeElements(bigPictureComments);
    var n = 0;
    // загрузка комментариев при открытии фото
    var func = function () {
      if (arr[j].comments.length <= window.const.PHOTOS_COMMENTS_VIEW || (window.const.PHOTOS_COMMENTS_VIEW + n) >= arr[j].comments.length) {
        appendDomElements(arr, j, n, arr[j].comments.length);
        commentsLoader.classList.add('visually-hidden');
      } else {
        appendDomElements(arr, j, n, window.const.PHOTOS_COMMENTS_VIEW + n);
        commentsLoader.classList.remove('visually-hidden');
      }
    };
    func();
    // клик на "загрузить еще (комментариев)"
    commentsLoader.addEventListener('click', function () {
      n += window.const.PHOTOS_COMMENTS_VIEW;
      func();
    });
  };

  window.bigPhoto = {
    // 1. Большая фотография
    changeBigPhoto: function (arr) {
      var body = document.querySelector('body');
      var bigPictureArr = document.querySelectorAll('.picture');
      // Нажатие на ESC
      var onEscPress = function (evt) {
        if (evt.keyCode === window.const.ESC_KEYDOWN) {
          window.util.deleteNodeElements(bigPictureComments);
          bigPicture.classList.add('hidden');
          body.classList.remove('modal-open');
        }
      };
      // Открытие большой фотографии
      var openBigPhoto = function () {
        // Обработчик открытия маленькой фотографии
        var onLittlePicturePress = function (evt) {
          for (var j = 0; j < arr.length; j++) {
            if (bigPictureArr[j].querySelector('img') === evt.target) {
              getBigPictureProperties(j, arr);
              addComments(j, arr);
            }
          }
          bigPicture.classList.remove('hidden');
          body.classList.add('modal-open');
          document.addEventListener('keydown', onEscPress);
        };
        bigPictureArr.forEach(function (it) {
          it.addEventListener('click', onLittlePicturePress);
        });
      };
      // Закрытие большой фотографии
      var closeBigPhoto = function () {
        var bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
        bigPictureCancel.addEventListener('click', function () {
          bigPicture.classList.add('hidden');
          body.classList.remove('modal-open');
          window.util.deleteNodeElements(bigPictureComments);
          document.removeEventListener('keydown', onEscPress);
        });
      };

      openBigPhoto();
      closeBigPhoto();
    }
  };
})();
