'use strict';
(function () {
  var main = document.querySelector('main');
  var form = document.querySelector('.img-upload__form');
  var imgUpload = document.querySelector('.img-upload__overlay');
  var uploadFile = document.getElementById('upload-file');
  var imgUploadCancel = imgUpload.querySelector('.img-upload__cancel');
  var templateSuccess = document.querySelector('#success').content.querySelector('.success');
  var templateError = document.querySelector('#error').content.querySelector('.error');
  // Сброс настроек изображения
  var resetUploadSettings = function (img, scale, pin, depth) {
    img.removeAttribute('class');
    img.style = null;
    pin.style = null;
    depth.style = null;
    scale.value = window.const.IMAGE_SIZE_MAX + '%';
    window.const.IMAGE_SIZE_DEFAULT = window.const.IMAGE_SIZE_MAX / window.const.PERCENT_MAX;
  };
  // Показать блок успеха или неудачи
  var viewResultBlock = function (img, scale, pin, depth, template, errorMessage) {
    imgUpload.classList.add('hidden');
    var block = template.cloneNode(true);
    main.appendChild(block);
    if (block.querySelector('h2').classList.contains('error__title')) {
      block.querySelector('.error__title').textContent = errorMessage;
    } else {
      resetUploadSettings(img, scale, pin, depth);
    }
    return block;
  };

  window.form = {
    // Форма редактирования
    changeUploadFile: function (element, img, scale, pin, depth) {
      // Нажатие на ESC
      var onEscPress = function (evt) {
        var target = evt.target;
        if (target.classList.contains('text__hashtags') || target.classList.contains('text__description')) {
          evt.stopPropagation();
        } else if (evt.keyCode === window.const.ESC_KEYDOWN) {
          element.classList.add('hidden');
          resetUploadSettings(img, scale, pin, depth);
        }
      };
      // Нажатие на показ формы редактирования
      var onUploadFileClick = function () {
        element.classList.remove('hidden');
        document.addEventListener('keydown', onEscPress);
      };
      // Нажатие на закрытие формы редактирования
      var onUploadFileCancelClick = function () {
        element.classList.add('hidden');
        resetUploadSettings(img, scale, pin, depth);
        document.removeEventListener('keydown', onEscPress);
      };

      uploadFile.addEventListener('change', onUploadFileClick);
      imgUploadCancel.addEventListener('click', onUploadFileCancelClick);
    },
    // Отправка формы
    submitForm: function (img, scale, pin, depth) {
      form.addEventListener('submit', function (evnt) {
        evnt.preventDefault();

        // Успешный сценарий отправки формы
        var submitHandler = function () {
          var successBlock = viewResultBlock(img, scale, pin, depth, templateSuccess);
          var successButton = successBlock.querySelector('.success__button');
          // Нажатие на кнопку закрытия блока "успех"
          var onSuccessButtonClick = function () {
            main.removeChild(successBlock);
            document.removeEventListener('keydown', onEscPress);
            document.removeEventListener('click', onDocumentClick);
          };
          // Закрыть блок "успех" по нажатию на ESC
          var onEscPress = function (evt) {
            if (main.lastChild === successBlock && evt.keyCode === window.const.ESC_KEYDOWN) {
              main.removeChild(successBlock);
              successButton.removeEventListener('click', onSuccessButtonClick);
              document.removeEventListener('click', onDocumentClick);
            }
          };
          // Закрыть блок "успех" по нажатию на экран
          var onDocumentClick = function () {
            if (main.lastChild === successBlock) {
              main.removeChild(successBlock);
              successButton.removeEventListener('click', onSuccessButtonClick);
              document.removeEventListener('keydown', onEscPress);
            }
          };
          successButton.addEventListener('click', onSuccessButtonClick);
          document.addEventListener('keydown', onEscPress);
          document.addEventListener('click', onDocumentClick);
        };
        // Ошибка отправки формы
        var errorHandler = function (errorMessage) {
          var errorBlock = viewResultBlock(img, scale, pin, depth, templateError, errorMessage);
          var errorButtons = errorBlock.querySelectorAll('.error__button');
          // Закрыть блок "неудача" по нажатию на кнопки
          var onErrorButtonsClick = function () {
            main.removeChild(errorBlock);
            document.removeEventListener('keydown', onEscPress);
            document.removeEventListener('click', onDocumentClick);
          };
          // Закрыть блок "неудача" по нажатию на ESC
          var onEscPress = function (evt) {
            if (main.lastChild === errorBlock && evt.keyCode === window.const.ESC_KEYDOWN) {
              main.removeChild(errorBlock);
              errorButtons.forEach(function (it) {
                it.removeEventListener('click', onErrorButtonsClick);
              });
              document.removeEventListener('click', onDocumentClick);
            }
          };
          // Закрыть блок "неудача" по нажатию на экран
          var onDocumentClick = function () {
            if (main.lastChild === errorBlock) {
              main.removeChild(errorBlock);
              errorButtons.forEach(function (it) {
                it.removeEventListener('click', onErrorButtonsClick);
              });
              document.removeEventListener('keydown', onEscPress);
            }
          };
          errorButtons.forEach(function (it) {
            it.addEventListener('click', onErrorButtonsClick);
          });
          document.addEventListener('keydown', onEscPress);
          document.addEventListener('click', onDocumentClick);
        };

        var formData = new FormData(form);
        window.backend.saveData(formData, submitHandler, errorHandler);
      });
    }
  };
})();
