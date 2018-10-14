'use strict';
(function () {
  var form = document.querySelector('.img-upload__form');
  var uploadFile = document.querySelector('#upload-file');
  var main = document.querySelector('main');
  var templateSuccess = document.querySelector('#success').content.querySelector('.success');
  var templateError = document.querySelector('#error').content.querySelector('.error');
  var resultBlock;
  var buttons;

  // Показать блок успеха или неудачи
  var viewResultBlock = function (element, template, preview, errorMessage) {
    element.classList.add('hidden');
    var block = template.cloneNode(true);
    main.appendChild(block);
    if (block.querySelector('h2').classList.contains('error__title')) {
      block.querySelector('.error__title').textContent = errorMessage;
    } else {
      window.effects.resetUploadSettings(preview);
    }
    return block;
  };
  // Закрыть блок результата по нажатию на кнопку(и)
  var onButtonsClick = function () {
    form.reset();
    main.removeChild(resultBlock);
    document.removeEventListener('keydown', onEscPress);
    document.removeEventListener('click', onDocumentClick);
  };
  // Закрыть блок результата по нажатию на ESC
  var onEscPress = function (evt) {
    if (main.lastChild === resultBlock && evt.keyCode === window.const.ESC_KEYDOWN) {
      form.reset();
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
      form.reset();
      main.removeChild(resultBlock);
      buttons.forEach(function (it) {
        it.removeEventListener('click', onButtonsClick);
      });
      document.removeEventListener('keydown', onEscPress);
    }
  };

  window.form = {
    // Форма редактирования
    changeUploadFile: function (element, preview) {
      var imgUploadCancel = element.querySelector('.img-upload__cancel');
      // Закрыть форму редактирования по нажатию на ESC
      var onEscDown = function (evt) {
        var target = evt.target;
        if (target.classList.contains('text__hashtags') || target.classList.contains('text__description')) {
          evt.stopPropagation();
        } else if (evt.keyCode === window.const.ESC_KEYDOWN) {
          element.classList.add('hidden');
          window.effects.resetUploadSettings(preview);
          form.reset();
        }
      };
      // Нажатие на показ формы редактирования
      var onUploadFileChanges = function () {
        var file = uploadFile.files[0];
        var fileName = file.name.toLowerCase();
        var matches = window.const.FILE_IMG_TYPES.some(function (it) {
          return fileName.endsWith(it);
        });
        if (matches) {
          var reader = new FileReader();
          reader.addEventListener('load', function () {
            preview.src = reader.result;
          });
          reader.readAsDataURL(file);
        }
        element.classList.remove('hidden');
        document.addEventListener('keydown', onEscDown);
      };
      // Клик на кнопку закрытия формы редактирования
      var onUploadFileCancelClick = function () {
        element.classList.add('hidden');
        window.effects.resetUploadSettings(preview);
        document.removeEventListener('keydown', onEscDown);
        form.reset();
      };

      uploadFile.addEventListener('change', onUploadFileChanges);
      imgUploadCancel.addEventListener('click', onUploadFileCancelClick);
    },
    // Отправка формы
    submitForm: function (element, preview) {
      form.addEventListener('submit', function (evnt) {
        evnt.preventDefault();
        // Успешный сценарий отправки формы
        var submitHandler = function () {
          resultBlock = viewResultBlock(element, templateSuccess, preview);
          buttons = resultBlock.querySelectorAll('.success__button');
          buttons.forEach(function (it) {
            it.addEventListener('click', onButtonsClick);
          });
          document.addEventListener('keydown', onEscPress);
          document.addEventListener('click', onDocumentClick);
        };
        // Ошибка отправки формы
        var errorHandler = function (errorMessage) {
          resultBlock = viewResultBlock(element, templateError, preview, errorMessage);
          buttons = resultBlock.querySelectorAll('.error__button');

          buttons.forEach(function (it) {
            it.addEventListener('click', onButtonsClick);
          });
          document.addEventListener('keydown', onEscPress);
          document.addEventListener('click', onDocumentClick);
        };

        try {
          var formData = new FormData(form);
          window.backend.saveData(submitHandler, errorHandler, formData);
        } catch (err) {
          errorHandler(window.const.INTERNAL_SERVER_ERROR_TEXT);
        }
      });
    }
  };
})();
