'use strict';
(function () {
  window.backend = {
    // Загрузка данных с сервера
    uploadData: function (onLoad, onError) {
      var url = 'https://js.dump.academy/kekstagram/data';
      
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        switch (xhr.status) {
          case 200:
            onLoad(xhr.response);
            break;
          case 400:
            onError('Неверный запрос');
            break;
          case 401:
            onError('Пользователь не авторизован');
            break;
          case 404:
            onError('Ничего не найдено');
            break;
          default:
            onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполнится за ' + xhr.timeout + 'мс');
      });
      xhr.timeout = 10000;

      xhr.open('GET', url);
      xhr.send();
    },
    // Отправка данных на сервер
    saveData: function (data, onLoad, onError) {
      var url = 'https://js.dump.academy/kekstagram';

      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        switch (xhr.status) {
          case 200:
            onLoad(xhr.response);
            break;
          case 400:
            onError('Неверный запрос');
            break;
          case 401:
            onError('Пользователь не авторизован');
            break;
          case 404:
            onError('Ничего не найдено');
            break;
          default:
            onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function() {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполнится за ' + xhr.timeout + 'мс');
      });
      xhr.timeout = 10000;

      xhr.open('POST', url);
      xhr.send(data);
    }
  };
})();