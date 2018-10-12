'use strict';
(function () {
  var ResponseCodeMap = {
    200: function (res, load) {
      load(res.response);
    },
    400: function (error) {
      error(window.const.BAD_REQUEST_ERROR_TEXT);
    },
    401: function (error) {
      error(window.const.UNAUTHORIZED_ERROR_TEXT);
    },
    404: function (error) {
      error(window.const.NOT_FOUND_ERROR_TEXT);
    }
  };

  var handleResponse = function (res, load, error) {
    var status = res.status;
    var action = ResponseCodeMap[status];
    action(res, load, error);
  };

  window.backend = {
    // Загрузка данных с сервера
    uploadData: function (onLoad, onError) {
      var url = 'https://js.dump.academy/kekstagram/data';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        handleResponse(xhr, onLoad, onError);
      });
      xhr.addEventListener('error', function () {
        onError(window.const.CONNECTION_ERROR_TEXT);
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполнится за ' + xhr.timeout + 'мс');
      });
      xhr.timeout = window.const.TIMEOUT;

      xhr.open('GET', url);
      xhr.send();
    },
    // Отправка данных на сервер
    saveData: function (data, onLoad, onError) {
      var url = 'https://js.dump.academy/kekstagram';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        handleResponse(xhr, onLoad, onError);
      });
      xhr.addEventListener('error', function () {
        onError(window.const.CONNECTION_ERROR_TEXT);
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполнится за ' + xhr.timeout + 'мс');
      });
      xhr.timeout = window.const.TIMEOUT;

      xhr.open('POST', url);
      xhr.send(data);
    }
  };
})();
