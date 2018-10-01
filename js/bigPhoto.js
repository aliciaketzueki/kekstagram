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
    var takeNumber = arr[j].comments.length > window.const.PHOTOS_COMMENTS_VIEW ? window.const.PHOTOS_COMMENTS_VIEW : arr[j].comments.length;
    for (var k = 0; k < takeNumber; k++) {
      fragment.appendChild(getBigPictureComments(arr[j].comments[k]));
    }
    bigPictureComments.appendChild(fragment);

    var commentsLoader = bigPicture.querySelector('.comments-loader');
    if (arr[j].comments.length <= window.const.PHOTOS_COMMENTS_VIEW) {
      commentsLoader.classList.add('visually-hidden');
    } else {
      commentsLoader.classList.remove('visually-hidden');
    }
    // клик на "загрузить еще (комментариев)"
    commentsLoader.addEventListener('click', function () {
      var newTakeNumber = takeNumber + window.const.PHOTOS_COMMENTS_VIEW;
      console.log(takeNumber);
      if (newTakeNumber > arr[j].comments.length) {
        newTakeNumber = arr[j].comments.length;
        commentsLoader.classList.add('visually-hidden');
      }
//      if (newTakeNumber <= arr[j].comments.length) {
        for (var k = takeNumber; k < newTakeNumber; k++) {
          fragment.appendChild(getBigPictureComments(arr[j].comments[k]));
        }
        bigPictureComments.appendChild(fragment);
        takeNumber += window.const.PHOTOS_COMMENTS_VIEW;
//      }
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

        // bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
      };
      // Закрытие большой фотографии
      var closeBigPhoto = function () {
        var bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');

        bigPictureCancel.addEventListener('click', function () {
          bigPicture.classList.add('hidden');
          body.classList.remove('modal-open');
          window.util.deleteNodeElements(bigPictureComments);
          document.removeEventListener('keydown', onEscPress);
          takeNumber = null;
        });
      };

      openBigPhoto();
      closeBigPhoto();
    }
  };
})();
