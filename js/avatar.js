'use strict';
(function () {
  var fileChooser = document.querySelector('.img-upload__input');

  window.avatar = {
    loadPreview: function (preview) {
      fileChooser.addEventListener('change', function () {
        var file = fileChooser.files[0];
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
      });
    }
  }
})();
