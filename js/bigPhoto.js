'use strict';
(function () {
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureComments = bigPicture.querySelector('.social__comments');
  var bigPictureComment = bigPictureComments.querySelector('.social__comment');
  var commentsLoader = bigPicture.querySelector('.comments-loader');
  var commentsCount = bigPicture.querySelector('.social__comment-count');
  var openedPhoto;
  // Добавление URL, likes, описания, comments.length в разметку большой фотографии
  var getBigPictureProperties = function () {
    bigPicture.querySelector('.big-picture__img').querySelector('img').src = openedPhoto.url;
    bigPicture.querySelector('.likes-count').textContent = openedPhoto.likes;
    bigPicture.querySelector('.social__caption').textContent = window.util.selectRandomElement(window.const.DESCRIPTION_ARR);
  };
  // Создание DOM-элементов для комментариев
  var getBigPictureComments = function (arrComments) {
    var photosComment = bigPictureComment.cloneNode(true);
    photosComment.querySelector('.social__picture').src = 'img/avatar-' + window.util.getRandomArbitary(1, 6) + '.svg';
    photosComment.querySelector('.social__text').textContent = arrComments;
    return photosComment;
  };
  // Добавление DOM-элементов в разметку
  var appendDomElements = function (start, end) {
    var fragment = document.createDocumentFragment();
    for (var k = start; k < end; k++) {
      fragment.appendChild(getBigPictureComments(openedPhoto.comments[k]));
    }
    bigPictureComments.appendChild(fragment);
    commentsCount.textContent = end + ' из ' + openedPhoto.comments.length + ' комментариев';
  };
  // Добавление комментариев под фото
  var addComments = function (number) {
    if (openedPhoto.comments.length <= window.const.PHOTOS_COMMENTS_VIEW + number) {
      appendDomElements(number, openedPhoto.comments.length);
      commentsLoader.classList.add('hidden');
    } else {
      appendDomElements(number, window.const.PHOTOS_COMMENTS_VIEW + number);
      commentsLoader.classList.remove('hidden');
    }
  };
  var index = 0;

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
        // Обработчик открытия маленькой фотографии по клику
        var onLittlePictureClick = function (evt) {
          for (var j = 0; j < arr.length; j++) {
            if (bigPictureArr[j].querySelector('img') === evt.target) {
              window.util.deleteNodeElements(bigPictureComments);
              openedPhoto = arr[j];
              getBigPictureProperties();
              index = 0;
              addComments(index);
            }
          }
          bigPicture.classList.remove('hidden');
          body.classList.add('modal-open');
          document.addEventListener('keydown', onEscPress);
        };
        // Открытие фото по нажатию на ENTER
        var onLittlePictureDown = function (evt) {
          if (evt.keyCode === window.const.ENTER_KEYDOWN) {
            for (var j = 0; j < arr.length; j++) {
              if (bigPictureArr[j] === evt.target) {
                window.util.deleteNodeElements(bigPictureComments);
                openedPhoto = arr[j];
                getBigPictureProperties();
                index = 0;
                addComments(index);
              }
            }
            bigPicture.classList.remove('hidden');
            body.classList.add('modal-open');
            document.addEventListener('keydown', onEscPress);
          }
        };
        // клик на "загрузить еще (комментариев)"
        var onButtonCommentsClick = function (evt) {
          if (commentsLoader === evt.target) {
            index += window.const.PHOTOS_COMMENTS_VIEW;
            addComments(index);
          }
        };
        bigPictureArr.forEach(function (it) {
          it.addEventListener('click', onLittlePictureClick);
          it.addEventListener('keydown', onLittlePictureDown);
        });
        commentsLoader.addEventListener('click', onButtonCommentsClick);
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
