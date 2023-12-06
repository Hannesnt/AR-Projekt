const models = document.querySelector('.Model');

//Arrays
const modelNameArray = ["Snygg modell", "Lite tråkigare modell"]
const modelArray = ["#defaultpanel-asset", "#liftBtnModel-asset"]
const colorArray = [
  ["#defaultpanel-asset", "#goldenpanel-asset", "#copperpanel-asset"],
  ["#liftBtnModel-asset", "#liftBtnModelCopper-asset", "#liftBtnModelGold-asset"]
]
const imgArray = [
  ['/images/defaultpanel.png','/images/goldenpanel.png', '/images/copperpanel.png'],
  ['./images/defaultLiftbtn-transformed.png', '/images/copperLiftBtn-transformed.png', '/images/goldbtnmodell-transformed.png']
]


//Functions

function switchModel(model) {
  console.log(model);
  models.removeAttribute('gltf-model')
  models.setAttribute('gltf-model', model);
  if(colorArray[0].includes(model)){
    models.setAttribute('scale', "0.3 0.3 0.3");
    models.setAttribute('position', "0 0 0");
    models.setAttribute('rotation', "90 360 0");
    models.setAttribute('gesture-handler', "minScale: 0.5; maxScale: 2");
  }
  else{
    models.setAttribute('scale', "0.1 0.1 0.1");
    models.setAttribute('position', "-0.3 -0.3 -0.1");
    models.setAttribute('rotation', "-90 360 0");
    models.setAttribute('gesture-handler', "minScale: 0.25; maxScale: 0.6");
  }

 
}

function pickModelColor(asset){
  document.querySelector('.buttons').style.display = "inline";
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

function openModelMenu(){
  document.querySelector('.buttons').style.display = "none";
  const removeElements = document.querySelectorAll('.footer-image');
  for(let i = 0; i < removeElements.length; i++){
    removeElements[i].remove();
  }
  for(let i = 0; i < modelArray.length; i++){
      let buttonDiv = document.querySelector('.footer');
      let newModelBtn = document.createElement('button');
      newModelBtn.setAttribute("class", `modelBtn`);
      newModelBtn.textContent = modelNameArray[i];
      buttonDiv.appendChild(newModelBtn);
      newModelBtn.addEventListener('click', (function () {
        switchModel(modelArray[i]);
        pickModelColor(i);
    }));
    }
  }



//Listeners
document.addEventListener('DOMContentLoaded', function () {
  const loadingOverlay = document.getElementById("loading-overlay");
  const loadingSpinner = document.getElementById("loading-spinner");
  const loadingImage = document.getElementById("loading-image");
  setTimeout(function () {
    loadingOverlay.style.display = "none";
    loadingSpinner.style.display = "none";
    loadingImage.style.display = "none";
  }, 3000);

  const buttons = document.querySelectorAll('.footer-image');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', (function () {
        switchModel(colorArray[0][i]);
    }));
  }
  });


  const menuBtn = document.querySelector('.menuBtn');
  menuBtn.addEventListener('click', openModelMenu);
