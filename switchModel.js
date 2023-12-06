
const models = document.querySelector('.Model');
document.addEventListener('DOMContentLoaded', function () {
    const modelArray = ["models/panelModel/scene.gltf", "models/liftBtnModel/scene.gltf", "models/carModel/scene.gltf"]
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

  /*if(models.getAttribute('gltf-model') === "#defaultpanel-asset"){
    const btnDiv = document.querySelector('.buttons');
    for(let i = 0; i < 2; i++){
      let test = document.createElement("button");
      test.setAttribute('class', 'switchButtons');
      test.textContent = "test value";
      btnDiv.appendChild(test);
    }
   
  }*/