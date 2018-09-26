'use strict';
(function () {
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
    // Показ формы редактирования
    openUploadFileOverlay: function (element, button, img, scale, pin, depth) {
      button.addEventListener('change', function () {
        element.classList.remove('hidden');

        document.addEventListener('keydown', function (evt) {
          var target = evt.target;
          if (target.classList.contains('text__hashtags') || target.classList.contains('text__description')) {
            evt.stopPropagation();
          } else if (evt.keyCode === window.const.ESC_KEYDOWN) {
            element.classList.add('hidden');
            resetUploadSettings(img, scale, pin, depth);
          }
        });
      });
    },
    // Закрытие формы редактирования
    closeUploadFileOverlay: function (element, button, img, scale, pin, depth) {
      button.addEventListener('click', function () {
        element.classList.add('hidden');
        resetUploadSettings(img, scale, pin, depth);

        document.removeEventListener('keydown', function (evt) {
          if (evt.keyCode === window.const.ESC_KEYDOWN) {
            element.classList.add('hidden');
          }
        });
      });
    }
  };
})();
