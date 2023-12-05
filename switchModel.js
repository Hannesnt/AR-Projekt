document.addEventListener('DOMContentLoaded', function () {
    const modelArray = ["models/panelModel/scene.gltf", "models/liftBtnModel/scene.gltf", "models/carModel/scene.gltf"]
    const models = document.querySelector('.Model');
    for (let i = 0; i < models.length; i++) {
      models[i].setAttribute('visible', false);
    }

    function switchModel(model) {
      models.removeAttribute('gltf-model')
      
      models.setAttribute('gltf-model', model);
     
    }

    const buttons = document.querySelectorAll('.switchButtons');
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', (function () {
          switchModel(modelArray[i]);

      }));
    }
  });