'use strict';
(function () {
  var form = document.querySelector('.img-upload__form');
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

  window.formSubmit = {
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

        var formData = new FormData(form);
        window.backend.saveData(formData, submitHandler, errorHandler);
      });
    }
  };
})();
