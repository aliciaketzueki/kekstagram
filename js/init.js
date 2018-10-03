'use strict';
// 1.8. Функция инициализации
(function () {
  // модуль pictures.js
  window.pictures.createNewPhotosArr();

  // модуль form.js
  var imgUpload = document.querySelector('.img-upload__overlay');
  var imgUploadPreview = imgUpload.querySelector('.img-upload__preview').querySelector('img');
  var scaleControlValue = imgUpload.querySelector('.scale__control--value');
  var pinHandle = imgUpload.querySelector('.effect-level__pin');
  var effectLevelDepth = imgUpload.querySelector('.effect-level__depth');

  window.form.changeUploadFile(imgUpload, imgUploadPreview, scaleControlValue, pinHandle, effectLevelDepth);

  // модуль formSubmit.js
  window.formSubmit.submitForm(imgUploadPreview, scaleControlValue, pinHandle, effectLevelDepth);

  // модуль effects.js
  var effectsArr = [];

  window.effects.createEffectsArr(effectsArr);
  window.effects.changeEffects(imgUpload, imgUploadPreview, effectsArr, pinHandle, effectLevelDepth);
  window.effects.changeFilterLevel(imgUploadPreview, effectsArr, pinHandle, effectLevelDepth);
  window.effects.changeImgSize(imgUpload, imgUploadPreview, scaleControlValue);

  // модуль validation.js
  window.validation.checkValidityHashtags(imgUpload);
  window.validation.checkValidityText(imgUpload);
})();
