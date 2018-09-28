'use strict';
(function () {
  // Поиск символа в строке
  var checkLetters = function (arr, symbol) {
    var letter = 0;
    for (var j = 1; j <= arr.length; j++) {
      if (arr.charAt(j) === symbol) {
        letter++;
      }
    }
    return letter;
  };

  window.form = {
    // Валидация хэш-тегов
    checkValidityHashtags: function (area) {
      var textHashtag = area.querySelector('.text__hashtags');

      textHashtag.addEventListener('input', function (evt) {
        var target = evt.target;
        var hashtags = target.value.toLowerCase().split(' ');

        for (var i = 0; i < hashtags.length; i++) {
          var currentHashtag = hashtags[i];

          if (currentHashtag.charAt(0) !== '#') {
            target.setCustomValidity('Хэш-теги должны начинаться с символа #');
          } else if (checkLetters(currentHashtag, '#') > 0) {
            target.setCustomValidity('Хэш-теги должны разделяться пробелом');
          } else if (currentHashtag.length < window.const.HASHTAG_MIN_LENGTH) {
            target.setCustomValidity('Хэш-тег не может состоять из одной решётки');
          } else if (currentHashtag.length > window.const.HASHTAG_MAX_LENGTH) {
            target.setCustomValidity('Длина хэш-тега не должна быть больше ' + window.const.HASHTAG_MAX_LENGTH + ' символов');
          } else if (hashtags.length > window.const.HASHTAG_AMOUNT) {
            target.setCustomValidity('Нельзя указать больше ' + window.const.HASHTAG_AMOUNT + ' хэш-тегов');
          } else if (window.util.calcRepeats(hashtags) > 0) {
            target.setCustomValidity('Хэш-теги не могут повторяться');
          } else {
            target.setCustomValidity('');
          }
        }
      });
    },
    // Валидация комментария
    checkValidityText: function (area) {
      var textDescription = area.querySelector('.text__description');

      textDescription.addEventListener('input', function (evt) {
        var target = evt.target;
        if (target.value.length > window.const.COMMENT_MAX_LENGTH) {
          target.setCustomValidity('Длина комментария не должна превышать ' + window.const.COMMENT_MAX_LENGTH + ' символов');
        } else {
          target.setCustomValidity('');
        }
      });
    },
    // Успешный сценарий отправки формы
    formData: document.querySelector('.img-upload__form'),
    submitHandler: function () {
      var imgUpload = document.querySelector('.img-upload__overlay');
      var templateSuccess = document.querySelector('#success').content.querySelector('.success');
      var main = document.querySelector('main');
      imgUpload.classList.add('hidden');

      var successBlock = templateSuccess.cloneNode(true);
      main.appendChild(successBlock);

      var successButton = successBlock.querySelector('.success__button');
      successButton.addEventListener('click', function () {
        main.removeChild(successBlock);
      });

      document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.const.ESC_KEYDOWN) {
          main.removeChild(successBlock);
        }
      });

      document.addEventListener('click', function () {
        main.removeChild(successBlock);
      }); 
    },
    // Ошибка отправки формы
    errorHandler: function (errorMessage) {
      var templateError = document.querySelector('#error').content.querySelector('.error');
      var main = document.querySelector('main');

      var errorBlock = templateError.cloneNode(true);
      errorBlock.querySelector('.error__title').textContent = errorMessage;
      main.appendChild(errorBlock);

      var errorButtons = errorBlock.querySelectorAll('.error__button');
      for (var i = 0; i < errorButtons.length; i++) {
        errorButtons[i].addEventListener('click', function () {
          main.removeChild(errorBlock);
        });
      }

      document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.const.ESC_KEYDOWN) {
          main.removeChild(errorBlock);
        }
      });

      document.addEventListener('click', function () {
        main.removeChild(errorBlock);
      });
    },
    // Отправка формы  
    submitForm: function () {
      window.form.formData.addEventListener('submit', function (evt) {
        evt.preventDefault();
        var formData = new FormData(window.form.formData);
        window.backend.saveData(formData, window.form.submitHandler, window.form.errorHandler);
      });
    }
  };
})();
