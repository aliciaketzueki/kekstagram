'use strict';
// 1.8. Функция инициализации
(function () {
  // модуль pictures.js
//  var pictureIndex = window.util.createArr(1, 26);
  var photos = [];


//  window.pictures.createPhotos(pictureIndex, photos);

  window.backend.uploadData(window.pictures.successHandler, window.pictures.errorHandler);
  // модуль bigPhoto.js
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureComments = bigPicture.querySelector('.social__comments');
  var bigPictureComment = bigPictureComments.querySelector('.social__comment');

  window.bigPhoto.openBigPhoto(bigPicture, photos, bigPictureComments, bigPictureComment);
  window.bigPhoto.closeBigPhoto(bigPicture, bigPictureComments);
  // модуль upload.js
  var imgUpload = document.querySelector('.img-upload__overlay');
  var imgUploadPreview = imgUpload.querySelector('.img-upload__preview').querySelector('img');
  var scaleControlValue = imgUpload.querySelector('.scale__control--value');
  var pinHandle = imgUpload.querySelector('.effect-level__pin');
  var effectLevelDepth = imgUpload.querySelector('.effect-level__depth');

  window.upload.changeUploadFile(imgUpload, imgUploadPreview, scaleControlValue, pinHandle, effectLevelDepth);
  window.upload.submitForm(imgUploadPreview, scaleControlValue, pinHandle, effectLevelDepth);
  // модуль effects.js
  var effectsArr = [];

  window.effects.createEffectsArr(effectsArr);
  window.effects.changeEffects(imgUpload, imgUploadPreview, effectsArr, pinHandle, effectLevelDepth);
  window.effects.changeFilterLevel(imgUploadPreview, effectsArr, pinHandle, effectLevelDepth);
  window.effects.changeImgSize(imgUpload, imgUploadPreview, scaleControlValue);
  // модуль form.js
  window.form.checkValidityHashtags(imgUpload);
  window.form.checkValidityText(imgUpload);
})();
