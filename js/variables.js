'use strict';
(function () {
  variables = {
    pictureIndex: window.util.createArr(1, 26),
    photos: [],
    pictureTemplate: document.querySelector('#picture').content.querySelector('.picture'),
    pictureDestination: document.querySelector('.pictures'),

    bigPicture: document.querySelector('.big-picture'),
    bigPictureComments: bigPicture.querySelector('.social__comments'),
    bigPictureComment: bigPictureComments.querySelector('.social__comment'),

    uploadFile: document.getElementById('upload-file'),
    imgUpload: document.querySelector('.img-upload__overlay'),
    imgUploadCancel: imgUpload.querySelector('.img-upload__cancel'),
    imgUploadPreview: imgUpload.querySelector('.img-upload__preview').querySelector('img'),
    scaleControlValue: imgUpload.querySelector('.scale__control--value'),
    pinHandle: imgUpload.querySelector('.effect-level__pin'),
    effectLevelDepth: imgUpload.querySelector('.effect-level__depth'),

    effectsArr: [],

    form: document.querySelector('.img-upload__form')
  }
})();
