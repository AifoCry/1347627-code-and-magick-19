'use strict';


(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';
  // настройки

  var userDialog = document.querySelector('.setup');
  // userDialog.classList.remove('hidden'); // Открываем диалог.
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = userDialog.querySelector('.setup-close'); // Крестик

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
    var coatColor = window.util.getRandomElement(window.similarWizards.WIZARD_COAT);
    setupWizardCoat.style.fill = coatColor;
    setupPlayer.querySelector('input[name="coat-color"]').value = coatColor;
  };

  var onWizardEyes = function () {
    var eyesColor = window.util.getRandomElement(window.similarWizards.WIZARD_EYES);
    setupWizardEyes.style.fill = eyesColor;
    setupPlayer.querySelector('input[name="eyes-color"]').value = eyesColor;
  };

  var onWizardFireball = function () {
    var fireColor = window.util.getRandomElement(window.similarWizards.FIREBALL_COLORS);
    setupFireball.style = 'background: ' + fireColor + ';';
    setupFireball.querySelector('input').value = fireColor;
  };

})();
