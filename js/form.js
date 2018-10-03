'use strict';
(function () {
  var main = document.querySelector('main');
  var form = document.querySelector('.img-upload__form');
  var imgUpload = document.querySelector('.img-upload__overlay');
  var imgUploadPreview = imgUpload.querySelector('.img-upload__preview').querySelector('img');
  var uploadFile = document.querySelector('#upload-file');
  var imgUploadCancel = imgUpload.querySelector('.img-upload__cancel');
  var templateSuccess = document.querySelector('#success').content.querySelector('.success');
  var templateError = document.querySelector('#error').content.querySelector('.error');
  var resultBlock;
  var buttons;
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
  // Закрыть блок результата по нажатию на кнопку(и)
  var onButtonsClick = function () {
    main.removeChild(resultBlock);
    document.removeEventListener('keydown', onEscPress);
    document.removeEventListener('click', onDocumentClick);
  };
  // Закрыть блок результата по нажатию на ESC
  var onEscPress = function (evt) {
    if (main.lastChild === resultBlock && evt.keyCode === window.const.ESC_KEYDOWN) {
      main.removeChild(resultBlock);
      buttons.forEach(function (it) {
        it.removeEventListener('click', onButtonsClick);
      });
      document.removeEventListener('click', onDocumentClick);
    }
  };
  // Закрыть блок результата по нажатию на экран
  var onDocumentClick = function () {
    if (main.lastChild === resultBlock) {
      main.removeChild(resultBlock);
      buttons.forEach(function (it) {
        it.removeEventListener('click', onButtonsClick);
      });
      document.removeEventListener('keydown', onEscPress);
    }
  };

  window.form = {
    // Форма редактирования
    changeUploadFile: function (element, img, scale, pin, depth) {
      // Закрыть форму редактирования по нажатию на ESC
      var onEscDown = function (evt) {
        var target = evt.target;
        if (target.classList.contains('text__hashtags') || target.classList.contains('text__description')) {
          evt.stopPropagation();
        } else if (evt.keyCode === window.const.ESC_KEYDOWN) {
          element.classList.add('hidden');
          resetUploadSettings(img, scale, pin, depth);
          form.reset();
        }
      };
      // Нажатие на показ формы редактирования
      var onUploadFileClick = function () {
        var file = uploadFile.files[0];
        var fileName = file.name.toLowerCase();
        var matches = window.const.FILE_IMG_TYPES.some(function (it) {
          return fileName.endsWith(it);
        });
        if (matches) {
          var reader = new FileReader();
          reader.addEventListener('load', function () {
            imgUploadPreview.src = reader.result;
          });
          reader.readAsDataURL(file);
        }
        element.classList.remove('hidden');
        document.addEventListener('keydown', onEscDown);
      };
      // Клик на кнопку закрытия формы редактирования
      var onUploadFileCancelClick = function () {
        element.classList.add('hidden');
        resetUploadSettings(img, scale, pin, depth);
        document.removeEventListener('keydown', onEscDown);
        form.reset();
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
          resultBlock = viewResultBlock(img, scale, pin, depth, templateSuccess);
          buttons = resultBlock.querySelectorAll('.success__button');

          buttons.forEach(function (it) {
            it.addEventListener('click', onButtonsClick);
          });
          document.addEventListener('keydown', onEscPress);
          document.addEventListener('click', onDocumentClick);
        };
        // Ошибка отправки формы
        var errorHandler = function (errorMessage) {
          resultBlock = viewResultBlock(img, scale, pin, depth, templateError, errorMessage);
          buttons = resultBlock.querySelectorAll('.error__button');

          buttons.forEach(function (it) {
            it.addEventListener('click', onButtonsClick);
          });
          document.addEventListener('keydown', onEscPress);
          document.addEventListener('click', onDocumentClick);
        };

        var formData = new FormData(form);
        window.backend.saveData(formData, submitHandler, errorHandler);
        form.reset();
      });
    }
  };
})();
