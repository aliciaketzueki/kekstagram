'use strict';
(function () {
  var main = document.querySelector('main');
  var form = document.querySelector('.img-upload__form');
  var imgUpload = document.querySelector('.img-upload__overlay');
  var uploadFile = document.getElementById('upload-file');
  var imgUploadCancel = imgUpload.querySelector('.img-upload__cancel');
  // Сброс настроек изображения
  var resetUploadSettings = function (img, scale, pin, depth) {
    img.removeAttribute('class');
    img.style = null;
    pin.style = null;
    depth.style = null;
    scale.value = window.const.IMAGE_SIZE_MAX + '%';
    window.const.IMAGE_SIZE_DEFAULT = window.const.IMAGE_SIZE_MAX / window.const.PERCENT_MAX;
  };
  window.upload = {
    // 1. Форма редактирования
    changeUploadFile: function (element, img, scale, pin, depth) {
      var onEscPress = function (evt) {
        var target = evt.target;
        if (target.classList.contains('text__hashtags') || target.classList.contains('text__description')) {
          evt.stopPropagation();
        } else if (evt.keyCode === window.const.ESC_KEYDOWN) {
            element.classList.add('hidden');
            resetUploadSettings(img, scale, pin, depth);
          }
      };
      // Показ формы редактирования
      var openUploadFileOverlay = function (element) {
        uploadFile.addEventListener('change', function () {
          element.classList.remove('hidden');
          document.addEventListener('keydown', onEscPress);
        });
      };
      // Закрытие формы редактирования
      var closeUploadFileOverlay = function (element, img, scale, pin, depth) {
        imgUploadCancel.addEventListener('click', function () {
          element.classList.add('hidden');
          resetUploadSettings(img, scale, pin, depth);
          document.removeEventListener('keydown', onEscPress);
        });
      };
      openUploadFileOverlay(element);
      closeUploadFileOverlay(element, img, scale, pin, depth);
    },
    // 2. Отправка формы  
    submitForm: function (img, scale, pin, depth) {
      form.addEventListener('submit', function (evt) {
        evt.preventDefault();
        // Успешный сценарий отправки формы
        var submitHandler = function () {
          imgUpload.classList.add('hidden');

          var templateSuccess = document.querySelector('#success').content.querySelector('.success');
          var successBlock = templateSuccess.cloneNode(true);
          main.appendChild(successBlock);
          resetUploadSettings(img, scale, pin, depth);

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
            if (main.lastChild === successBlock) {
              main.removeChild(successBlock);
            }
          });
        };
        // Ошибка отправки формы
        var errorHandler = function (errorMessage) {
          imgUpload.classList.add('hidden');

          var templateError = document.querySelector('#error').content.querySelector('.error');
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
            if (main.lastChild === errorBlock) {
              main.removeChild(errorBlock);
            }
          });
        };
        var formData = new FormData(form);
        window.backend.saveData(formData, submitHandler, errorHandler);
      });
    }
  };
})();
