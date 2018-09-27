'use strict';
// 1.8. Функция инициализации
(function () {
  // модуль pictures.js
  var pictureIndex = window.util.createArr(1, 26);
  var photos = [];
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var pictureDestination = document.querySelector('.pictures');

  window.pictures.createPhotos(pictureIndex, photos);
  window.pictures.addElements(photos, pictureDestination, pictureTemplate);
  // модуль bigPhoto.js
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureComments = bigPicture.querySelector('.social__comments');
  var bigPictureComment = bigPictureComments.querySelector('.social__comment');

  window.bigPhoto.openBigPhoto(bigPicture, photos, bigPictureComments, bigPictureComment);
  window.bigPhoto.closeBigPhoto(bigPicture, bigPictureComments);
  // модуль upload.js
  var uploadFile = document.getElementById('upload-file');
  var imgUpload = document.querySelector('.img-upload__overlay');
  var imgUploadCancel = imgUpload.querySelector('.img-upload__cancel');
  var imgUploadPreview = imgUpload.querySelector('.img-upload__preview').querySelector('img');
  var scaleControlValue = imgUpload.querySelector('.scale__control--value');
  var pinHandle = imgUpload.querySelector('.effect-level__pin');
  var effectLevelDepth = imgUpload.querySelector('.effect-level__depth');

  window.upload.openUploadFileOverlay(imgUpload, uploadFile, imgUploadPreview, scaleControlValue, pinHandle, effectLevelDepth);
  window.upload.closeUploadFileOverlay(imgUpload, imgUploadCancel, imgUploadPreview, scaleControlValue, pinHandle, effectLevelDepth);
  // модуль effects.js
  var effectsArr = [];

  window.effects.createEffectsArr(effectsArr);
  window.effects.changeEffects(imgUpload, imgUploadPreview, effectsArr, pinHandle, effectLevelDepth);
  window.effects.changeFilterLevel(imgUploadPreview, effectsArr, pinHandle, effectLevelDepth);
  window.effects.changeImgSize(imgUpload, imgUploadPreview, scaleControlValue);
  // модуль form.js
  window.form.checkValidityHashtags(imgUpload);
  window.form.checkValidityText(imgUpload);

  window.backend.saveData(new FormData(window.form.formData), window.form.submitHandler, window.form.errorHandler);
})();
