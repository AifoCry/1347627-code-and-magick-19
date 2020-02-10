'use strict';

(function () {
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var WIZARD_COAT = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES = ['black', 'red', 'blue', 'yellow', 'green'];

  var userDialog = document.querySelector('.setup');
  userDialog.classList.remove('hidden'); // Открываем диалог.

  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

  // функция генерации случайных данных


  function randomVar(n) {
    return Math.floor(Math.random() * n);
  }

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

  // заполнения блока DOM-элементами
  function addWizards(wizards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < wizards.length; i++) {
      var generatedWizard = generateWizard(wizards[i]);
      fragment.appendChild(generatedWizard);
    }
    similarListElement.appendChild(fragment);
  }

  var wizardsObject = createWizardsObject();
  addWizards(wizardsObject);
  userDialog.querySelector('.setup-similar').classList.remove('hidden'); // Показываем копии.

})();
