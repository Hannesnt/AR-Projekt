const models = document.querySelector('.Model');
const modelNameArray = ["Snygg panel", "Lite tråkigare panel"]
const modelArray = ["#defaultpanel-asset", "#panel-asset"]
const colorArray = [
  ["#defaultpanel-asset", "#goldenpanel-asset", "#copperpanel-asset"]
]
const imgArray = [
  ['/images/defaultpanel.png','/images/goldenpanel.png', '/images/copperpanel.png'],
  ['./images/redDummy.png', '/images/blueDummy.png']

]

const asset0 = document.querySelector('.asset0');

function switchModel(model) {
  models.removeAttribute('gltf-model')
  
  models.setAttribute('gltf-model', model);
 
}

function showModelColors(asset){
  document.querySelector('.menuBtn').style.display = "inline";
  const modelBtns = document.querySelectorAll(".modelBtn");
  for(let i = 0; i < modelBtns.length; i++){
    modelBtns[i].remove();
  }
  for(let i = 0; i < imgArray[asset].length; i++){
    let colorBtn = document.createElement('img');
    colorBtn.setAttribute('class', 'footer-image');
    colorBtn.setAttribute('src', imgArray[asset][i])
    colorBtn.addEventListener('click', (function () {
      switchModel(colorArray[asset][i]);
    }));
    let footerDiv = document.querySelector('.footer');
    footerDiv.appendChild(colorBtn);

  }
}

document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.footer-image');
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', (function () {
          switchModel(colorArray[0][i]);
      }));
    }
  });

  function openModelMenu(){
    document.querySelector('.menuBtn').style.display = "none";
    const removeElements = document.querySelectorAll('.footer-image');
    for(let i = 0; i < removeElements.length; i++){
      removeElements[i].remove();
    }
  
      
    for(let i = 0; i < modelArray.length; i++){
        let buttonDiv = document.querySelector('.footer');
        let newModelBtn = document.createElement('button');
        newModelBtn.setAttribute("class", `modelBtn Btn${i}`);
        newModelBtn.textContent = modelNameArray[i];
        buttonDiv.appendChild(newModelBtn);
        newModelBtn.addEventListener('click', (function () {
          switchModel(modelArray[i]);
          showModelColors(i);
      }));
      }
    }



    const menuBtn = document.querySelector('.menuBtn');
    menuBtn.addEventListener('click', openModelMenu);


