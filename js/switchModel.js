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
  "#defaultpanel-asset":{scale: "0.8 1 1.2", position: "0 0 0", rotation: "90 0 0"},
  "#goldenpanel-asset":{scale: "0.8 1 1.2", position: "0 0 0", rotation: "90 0 0"},
  "#copperpanel-asset":{scale: "0.8 1 1.2", position: "0 0 0", rotation: "90 0 0"},
  "#liftBtnModel-asset":{ scale: "0.2 0.2 0.2", position: "0 0 0", rotation: "0 0 0" },
  "#liftBtnModelCopper-asset":{ scale: "0.2 0.2 0.2", position: "0 0 0", rotation: "0 0 0" },
  "#liftBtnModelGold-asset":{ scale: "0.2 0.2 0.2", position: "0 0 0", rotation: "0 0 0" },
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
  //models.removeAttribute("gesture-handler");
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

//Gesture Handlers component, tog bort ena axeln ifrån rotationen: https://github.com/fcor/arjs-gestures/blob/master/gesture-handler.js
AFRAME.registerComponent("gesture-handlerr", {
  schema: {
    enabled: { default: true },
    rotationFactor: { default: 3 },
    minScale: { default: 0.3 },
    maxScale: { default: 8 },
  },

  init: function () {
    this.handleScale = this.handleScale.bind(this);
    this.handleRotation = this.handleRotation.bind(this);

    this.isVisible = false;
    this.initialScale = this.el.object3D.scale.clone();
    this.scaleFactor = 1;

    this.el.sceneEl.addEventListener("markerFound", (e) => {
      this.isVisible = true;
    });

    this.el.sceneEl.addEventListener("markerLost", (e) => {
      this.isVisible = false;
    });
  },

  update: function () {
    if (this.data.enabled) {
      this.el.sceneEl.addEventListener("onefingermove", this.handleRotation);
      this.el.sceneEl.addEventListener("twofingermove", this.handleScale);
    } else {
      this.el.sceneEl.removeEventListener("onefingermove", this.handleRotation);
      this.el.sceneEl.removeEventListener("twofingermove", this.handleScale);
    }
  },

  remove: function () {
    this.el.sceneEl.removeEventListener("onefingermove", this.handleRotation);
    this.el.sceneEl.removeEventListener("twofingermove", this.handleScale);
  },

  handleRotation: function (event) {
  if (this.isVisible) {
    this.el.object3D.rotation.y +=
      event.detail.positionChange.x * this.data.rotationFactor;
  }
},


  handleScale: function (event) {
    if (this.isVisible) {
      this.scaleFactor *=
        1 + event.detail.spreadChange / event.detail.startSpread;

      this.scaleFactor = Math.min(
        Math.max(this.scaleFactor, this.data.minScale),
        this.data.maxScale
      );

      this.el.object3D.scale.x = this.scaleFactor * this.initialScale.x;
      this.el.object3D.scale.y = this.scaleFactor * this.initialScale.y;
      this.el.object3D.scale.z = this.scaleFactor * this.initialScale.z;
    }
  },
});
