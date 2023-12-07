const models = document.querySelector(".Model");

//Arrays
const modelArray = [
  ["#defaultpanel-asset", "#goldenpanel-asset", "#copperpanel-asset"],
  [
    "#liftBtnModel-asset",
    "#liftBtnModelCopper-asset",
    "#liftBtnModelGold-asset",
  ],
  ["#plate-asset"],
  ["#vase-asset"],
  ["#airport-asset"],
  ["#office-asset"],
];

//Functions

function switchModel(model) {
  models.removeAttribute('gltf-model')
  models.removeAttribute('scale');
  models.removeAttribute('position');
  models.removeAttribute('rotation');
  models.removeAttribute('gesture-handler');
  models.setAttribute('gltf-model', model);
  if(modelArray[0].includes(model)){
    models.setAttribute('scale', "0.8 0.8 0.8");
    models.setAttribute('position', "0 0 0");
    models.setAttribute('rotation', "90 0 0");
    models.setAttribute('gesture-handler', "minScale: 0.5; maxScale: 1.5");
  }
  if(modelArray[1].includes(model)){
    models.setAttribute('scale', "0.3 0.3 0.3");
    models.setAttribute('position', "-1 -0.3 -0.1");
    models.setAttribute('rotation', "-90 0 0");
    models.setAttribute('gesture-handler', "minScale: 0.5; maxScale: 1.5");
  }
  if (modelArray[2].includes(model)) {
    models.setAttribute("scale", "0.08 0.08 0.08");
  }
  if (modelArray[3].includes(model)) {
    models.setAttribute("scale", "0.002 0.002 0.002");
  }
}

function openModelMenu(asset) {
  document.querySelector(".backBtn").style.display = "none";
  document.getElementById(`modelColor${asset}`).style.display = "none";
  const menuImg = document.querySelectorAll(".menuImg");
  for (let i = 0; i < menuImg.length; i++) {
    menuImg[i].style.display = "block";
  }
}


function pickModelColor(index) {
  document.querySelector(".backBtn").style.display = "block";
  const menuImg = document.querySelectorAll(".menuImg");
  for (let i = 0; i < menuImg.length; i++) {
    menuImg[i].style.display = "none";
  }
  const modelDiv = document.getElementById(`modelColor${index}`);
  document.getElementById(`modelColor${index}`).style.display = "block";
  for(let i = 0; i < modelDiv.children.length; i++){
    modelDiv.children[i].addEventListener("click", function () {
      switchModel(modelArray[index][i]);
    });
  }
    const backBtn = document.querySelector(".backBtn");
    backBtn.addEventListener("click", function(){
      openModelMenu(index)
    })
}


//Listeners

document.addEventListener("DOMContentLoaded", function () {
  const loadingOverlay = document.getElementById("loading-overlay");
  setTimeout(function () {
    loadingOverlay.style.display = "none";
  }, 3000);
});


const modelPicker = document.querySelectorAll(".menuImg");
for(let i = 0; i < modelPicker.length; i++){
  modelPicker[i].addEventListener("click", function(){
    switchModel(modelArray[i][0]);
    pickModelColor(i);
  })
}



