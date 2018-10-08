'use strict';
// 1.8. Функция инициализации
(function () {
  // модуль pictures.js
  window.pictures.createNewPhotosArr();

  var imgUpload = document.querySelector('.img-upload__overlay');
  var imgUploadPreview = imgUpload.querySelector('.img-upload__preview').querySelector('img');

  // Модуль form.js
  window.form.changeUploadFile(imgUpload, imgUploadPreview);

  // модуль effects.js
  var effects = [];
  window.effects.createEffectsArr(effects);
  window.effects.changeEffects(effects, imgUploadPreview);
  window.effects.changeFilterLevel(effects, imgUploadPreview);
  window.effects.changeImgSize(imgUploadPreview);

  // модуль validation.js
  window.validation.checkValidityHashtags(imgUpload);
  window.validation.checkValidityText(imgUpload);

  // formSubmit.js
  window.formSubmit.submitForm(imgUpload, imgUploadPreview);
})();
