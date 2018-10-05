'use strict';
(function () {
  var form = document.querySelector('.img-upload__form');
  var main = document.querySelector('main');
  var imgUpload = document.querySelector('.img-upload__overlay');
  var templateSuccess = document.querySelector('#success').content.querySelector('.success');
  var templateError = document.querySelector('#error').content.querySelector('.error');
  var resultBlock;
  var buttons;
  // Показать блок успеха или неудачи
  var viewResultBlock = function (img, scale, pin, depth, effectValue, template, errorMessage) {
    imgUpload.classList.add('hidden');
    var block = template.cloneNode(true);
    main.appendChild(block);
    if (block.querySelector('h2').classList.contains('error__title')) {
      block.querySelector('.error__title').textContent = errorMessage;
    } else {
      window.util.resetUploadSettings(img, scale, pin, depth, effectValue);
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

  window.formSubmit = {
    // Отправка формы
    submitForm: function (img, scale, pin, depth, effectValue) {
      form.addEventListener('submit', function (evnt) {
        evnt.preventDefault();
        // Успешный сценарий отправки формы
        var submitHandler = function () {
          resultBlock = viewResultBlock(img, scale, pin, depth, effectValue, templateSuccess);
          buttons = resultBlock.querySelectorAll('.success__button');

          buttons.forEach(function (it) {
            it.addEventListener('click', onButtonsClick);
          });
          document.addEventListener('keydown', onEscPress);
          document.addEventListener('click', onDocumentClick);
        };
        // Ошибка отправки формы
        var errorHandler = function (errorMessage) {
          resultBlock = viewResultBlock(img, scale, pin, depth, effectValue, templateError, errorMessage);
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
