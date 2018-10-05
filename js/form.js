'use strict';
(function () {
  var form = document.querySelector('.img-upload__form');
  var imgUpload = document.querySelector('.img-upload__overlay');
  var uploadFile = document.querySelector('#upload-file');
  var imgUploadCancel = imgUpload.querySelector('.img-upload__cancel');

  window.form = {
    // Форма редактирования
    changeUploadFile: function (element, preview) {
      // Закрыть форму редактирования по нажатию на ESC
      var onEscDown = function (evt) {
        var target = evt.target;
        if (target.classList.contains('text__hashtags') || target.classList.contains('text__description')) {
          evt.stopPropagation();
        } else if (evt.keyCode === window.const.ESC_KEYDOWN) {
          element.classList.add('hidden');
          window.effects.resetUploadSettings();
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
        window.effects.resetUploadSettings();
        document.removeEventListener('keydown', onEscDown);
        form.reset();
      };

      uploadFile.addEventListener('change', onUploadFileClick);
      imgUploadCancel.addEventListener('click', onUploadFileCancelClick);
    }
  };
})();
