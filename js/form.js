'use strict';
(function () {
  var form = document.querySelector('.img-upload__form');
  var uploadFile = document.querySelector('#upload-file');

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
    }
  };
})();
