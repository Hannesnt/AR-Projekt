const models = document.querySelector(".Model");

//Array with all 3D Models
const modelArray = [
  ["#defaultpanel-asset", "#goldenpanel-asset", "#copperpanel-asset"],
  ["#liftBtnModel-asset",
    "#liftBtnModelCopper-asset",
    "#liftBtnModelGold-asset",],
  ["#vase-asset"],
  ["#airportGold-asset", "#airportSilver-asset"],
];

const modelConfig = {
  "#defaultpanel-asset":{scale: "0.8 0.8 0.8", position: "0 0 0", rotation: "90 0 0"},
  "#goldenpanel-asset":{scale: "0.8 0.8 0.8", position: "0 0 0", rotation: "90 0 0"},
  "#copperpanel-asset":{scale: "0.8 0.8 0.8", position: "0 0 0", rotation: "90 0 0"},
  "#liftBtnModel-asset":{ scale: "0.3 0.3 0.3", position: "-1 -0.3 -0.1", rotation: "-90 0 0" },
  "#liftBtnModelCopper-asset":{ scale: "0.3 0.3 0.3", position: "-1 -0.3 -0.1", rotation: "-90 0 0" },
  "#liftBtnModelGold-asset":{ scale: "0.3 0.3 0.3", position: "-1 -0.3 -0.1", rotation: "-90 0 0" },
  "#vase-asset": { scale: "0.002 0.002 0.002" },
  "#airportGold-asset": { scale: "0.03 0.03 0.03", rotation: "-2 0 0", name: "#airportGold-asset" },
  "#airportSilver-asset": { scale: "0.03 0.03 0.03", rotation: "0 0 0", position: "0 0 0", name: "#airportSilver-asset" },
}

//Functions

function switchModel(model) {
  models.removeAttribute("gltf-model");
  models.removeAttribute("scale");
  models.removeAttribute("position");
  models.removeAttribute("rotation");
  models.removeAttribute("gesture-handler");
  models.setAttribute("gltf-model", model);

  const config = modelConfig[model];
  if (config) {
    Object.entries(config).forEach(([attribute, value]) => {
      models.setAttribute(attribute, value);
    });
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
  console.log(index);
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
  }, 1000);
});


const modelPicker = document.querySelectorAll(".menuImg");
for(let i = 0; i < modelPicker.length; i++){
  modelPicker[i].addEventListener("click", function(){
    switchModel(modelArray[i][0]);
    pickModelColor(i);
  })
}



