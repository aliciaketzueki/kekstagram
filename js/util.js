'use strict';
(function () {
  window.util = {
    // Нажатие на ESC
    onEscPress: function (element) {
      document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.const.ESC_KEYDOWN) {
          element.classList.add('hidden');
        }
      });
    },
    // Выбор случайного числа
    getRandomArbitary: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    // Создание массива чисел
    createArr: function (arrStart, arrLength) {
      var arr = [];
      for (var i = arrStart; i < arrLength; i++) {
        arr[i] = i;
      }
      return arr;
    },
    // Выбор рандомного элемента из массива
    selectRandomElement: function (arr) {
      var element;
      for (var i = 0; i < arr.length; i++) {
        element = arr[this.getRandomArbitary(0, arr.length - 1)];
      }
      return element;
    },
    // Удаление Node-элементов
    deleteNodeElements: function (parent) {
      while (parent.hasChildNodes()) {
        parent.removeChild(parent.lastChild);
      }
    },
    // Проверка повторения элементов в массиве
    calcRepeats: function (arr) {
      var repeat = 0;
      for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
          if (arr[j] === arr[i]) {
            repeat++;
          }
        }
      }
      return repeat;
    },
  };
})();
