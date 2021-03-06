'use strict';
(function () {
  window.const = {
    PERCENT_MAX: 100,
    ESC_KEYDOWN: 27,
    ENTER_KEYDOWN: 13,
    DESCRIPTION_ARR: [
      'Тестим новую камеру!',
      'Затусили с друзьями на море',
      'Как же круто тут кормят',
      'Отдыхаем...',
      'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
      'Вот это тачка!'
    ],
    AVATAR_MIN: 1,
    AVATAR_MAX: 6,
    LIKES_AMOUNT_MIN: 15,
    LIKES_AMOUNT_MAX: 200,
    MAX_PICTURE_LENGTH: 25,
    NEW_PICTURE_LENGTH: 10,
    FILTER_LINE_WIDTH: 455,
    EFFECTS_CHROME_MAX: 1,
    EFFECTS_SEPIA_MAX: 1,
    EFFECTS_MARVIN_MAX: 100,
    EFFECTS_PHOBOS_MAX: 3,
    EFFECTS_HEAT_MAX: 3,
    EFFECTS_HEAT_MIN: 1,
    IMAGE_SIZE_MAX: 100,
    IMAGE_SIZE_MIN: 25,
    IMAGE_SIZE_STEP: 25,
    HASHTAG_MAX_LENGTH: 20,
    HASHTAG_MIN_LENGTH: 2,
    HASHTAG_AMOUNT: 5,
    COMMENT_MAX_LENGTH: 140,
    SUCCESS_CODE: 200,
    BAD_REQUEST_ERROR_CODE: 400,
    UNAUTHORIZED_ERROR_CODE: 401,
    NOT_FOUND_ERROR_CODE: 404,
    BAD_REQUEST_ERROR_TEXT: 'Неверный запрос',
    UNAUTHORIZED_ERROR_TEXT: 'Пользователь не авторизован',
    NOT_FOUND_ERROR_TEXT: 'Ничего не найдено',
    CONNECTION_ERROR_TEXT: 'Произошла ошибка соединения',
    TIMEOUT: 10000,
    NEW_PHOTOS_AMOUNT: 10,
    DEBOUNCE_INTERVAL: 500,
    PHOTOS_COMMENTS_VIEW: 5,
    FILE_IMG_TYPES: ['jpg', 'png', 'jpeg', 'gif']
  };
})();
