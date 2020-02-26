'use strict';


(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';
  var WIZARD_COAT = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  // настройки

  var userDialog = document.querySelector('.setup');
  // userDialog.classList.remove('hidden'); // Открываем диалог.
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = userDialog.querySelector('.setup-close'); // Крестик
  var form = userDialog.querySelector('.setup-wizard-form');

  // настройки мага

  var userNameInput = userDialog.querySelector('.setup-user-name'); // Валидация ввода имени персонажа
  var setupWizardCoat = userDialog.querySelector('.setup-wizard .wizard-coat'); // Изменение цвета мантии
  var setupWizardEyes = userDialog.querySelector('.setup-wizard .wizard-eyes'); // Изменение цвета глаз
  var setupFireball = userDialog.querySelector('.setup-fireball-wrap'); // Изменение цвета фаерболов
  var setupPlayer = document.querySelector('.setup-player');


  // Хендлеры эскейп

  var onPopupEscPress = function (evt) {
    if (evt.key === ESC_KEY) {
      closePopup();
    }
  };

  var removeEscPress = function () {
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var addEscPress = function () {
    document.addEventListener('keydown', onPopupEscPress);
  };

  // Листенеры открытия и закрытия + enter
  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER_KEY) {
      openPopup();
    }
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER_KEY) {
      closePopup();
    }
  });


  // Валидация ввода имени персонажа

  userNameInput.addEventListener('invalid', function () {
    if (userNameInput.validity.tooShort) {
      userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else if (userNameInput.validity.tooLong) {
      userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
    } else if (userNameInput.validity.valueMissing) {
      userNameInput.setCustomValidity('Обязательное поле');
    } else {
      userNameInput.setCustomValidity('');
    }
  });

  // При фокусе на имени эскейп не работает и обратно.
  userNameInput.addEventListener('focus', function () {
    removeEscPress();
  });

  userNameInput.addEventListener('blur', function () {
    addEscPress();
  });

  // Открываем попап и подключаем листенеры
  var openPopup = function () {
    userDialog.classList.remove('hidden');
    addEscPress();
    setupWizardCoat.addEventListener('click', onWizardCoat);
    setupWizardEyes.addEventListener('click', onWizardEyes);
    setupFireball.addEventListener('click', onWizardFireball);
  };

  // Закрываем попап.
  var closePopup = function () {
    userDialog.classList.add('hidden');
    removeEscPress();
    setupWizardCoat.removeEventListener('click', onWizardCoat);
    setupWizardEyes.removeEventListener('click', onWizardEyes);
    setupFireball.removeEventListener('click', onWizardFireball);
  };


  var onWizardCoat = function () {
    var coatColor = window.util.getRandomElement(WIZARD_COAT);
    setupWizardCoat.style.fill = coatColor;
    setupPlayer.querySelector('input[name="coat-color"]').value = coatColor;
  };

  var onWizardEyes = function () {
    var eyesColor = window.util.getRandomElement(WIZARD_EYES);
    setupWizardEyes.style.fill = eyesColor;
    setupPlayer.querySelector('input[name="eyes-color"]').value = eyesColor;
  };

  var onWizardFireball = function () {
    var fireColor = window.util.getRandomElement(FIREBALL_COLORS);
    setupFireball.style = 'background: ' + fireColor + ';';
    setupFireball.querySelector('input').value = fireColor;
  };

  // отправка данных
  var getPostForm = function () {
    userDialog.classList.add('hidden');
  };

  // отправка данных
  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), getPostForm, window.backend.onError);
    evt.preventDefault();
  });

  window.setup = {
    WIZARD_COAT: WIZARD_COAT,
    WIZARD_EYES: WIZARD_EYES,
    FIREBALL_COLORS: FIREBALL_COLORS,
  };

})();
