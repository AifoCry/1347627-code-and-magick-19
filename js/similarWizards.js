'use strict';

(function () {

  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var WIZARD_COAT = window.setup.WIZARD_COAT;
  var WIZARD_EYES = window.setup.WIZARD_EYES;
  var randomVar = window.util.randomVar;
  var wizardCount = 4;

  // var userDialog = document.querySelector('.setup');
  var setupSimilar = document.querySelector('.setup-similar');
  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  // Генерим рандомные обьекты и заполняем массив wizards
  function createWizardsObject() {
    var wizards = [];

    for (var i = 0; i < 4; i++) {
      wizards[i] =
      {
        name: WIZARD_NAMES[randomVar(WIZARD_NAMES.length)] + ' ' + WIZARD_SURNAMES[randomVar(WIZARD_SURNAMES.length)],
        coatColor: WIZARD_COAT[randomVar(WIZARD_COAT.length)],
        eyesColor: WIZARD_EYES[randomVar(WIZARD_EYES.length)]
      };
    }
    return wizards;
  }


  // создание DOM-элемента на основе JS-объекта
  function generateWizard(wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name; // имя персонажа name запишите как текст в блок .setup-similar-label;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor; // цвет мантии coatColor задайте как цвет заливки fill в стилях элемента .wizard-coat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor; // цвет глаз eyesColor задайте как цвет заливки fill в стилях элемента .wizard-eyes.
    return wizardElement;
  }

  // генерация визарда из данных по сети
  var generateWizardNet = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  // заполнения блока DOM-элементами
  function addWizards(wizards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < wizards.length; i++) {
      var generatedWizard = generateWizard(wizards[i]);
      fragment.appendChild(generatedWizard);
    }
    // similarListElement.appendChild(fragment); Отключено что бы использовать данные из сети.
  }

  var wizardsObject = createWizardsObject();
  addWizards(wizardsObject);
  // userDialog.querySelector('.setup-similar').classList.remove('hidden'); // Показываем копии.

  // загрузка магов
  var loadWizards = function (wizards) {
    var fragment = document.createDocumentFragment();
    // добавление магов в фрагмент
    for (var i = 0; i < wizardCount; i++) {
      fragment.appendChild(generateWizardNet(wizards[i]));
    }
    // добавление магов на страницу
    similarListElement.appendChild(fragment);
    setupSimilar.classList.remove('hidden');
  };

  window.backend.load(loadWizards, window.backend.onError);

  window.similarWizards = {
    WIZARD_NAMES: WIZARD_NAMES,
    WIZARD_SURNAMES: WIZARD_SURNAMES,
  };

})();
