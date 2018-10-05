'use strict';
// 1.8. Функция инициализации
(function () {
  // модуль pictures.js
  window.pictures.createNewPhotosArr();

  // модуль form.js
  var imgUpload = document.querySelector('.img-upload__overlay');
  var imgUploadPreview = imgUpload.querySelector('.img-upload__preview').querySelector('img');

  window.form.changeUploadFile(imgUpload, imgUploadPreview);
  window.formSubmit.submitForm(imgUpload);

  // модуль effects.js
  var effects = [];
  window.effects.createEffectsArr(effects);
  window.effects.changeEffects(effects);
  window.effects.changeFilterLevel(effects);
  window.effects.changeImgSize();

  // модуль validation.js
  window.validation.checkValidityHashtags(imgUpload);
  window.validation.checkValidityText(imgUpload);
})();
