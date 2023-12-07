const models = document.querySelector(".Model");

//Arrays
const modelArray = [
  "#defaultpanel-asset",
  "#liftBtnModel-asset",
  "#plate-asset",
  "#vase-asset",
];
const colorArray = [
  ["#defaultpanel-asset", "#goldenpanel-asset", "#copperpanel-asset"],
  [
    "#liftBtnModel-asset",
    "#liftBtnModelCopper-asset",
    "#liftBtnModelGold-asset",
  ],
  ["#plate-asset"],
  ["#vase-asset"],
];
const imgArray = [
  [
    "/images/defaultpanel.png",
    "/images/goldenpanel.png",
    "/images/copperpanel.png",
  ],
  [
    "./images/defaultLiftbtn-transformed.png",
    "/images/copperLiftBtn-transformed.png",
    "/images/goldbtnmodell-transformed.png",
  ],
  ["./images/plateimg.png"],
  ["./images/vaseimg.png"],
];

//Functions

function switchModel(model) {
  models.removeAttribute("gltf-model");
  models.removeAttribute("scale");
  models.removeAttribute("position");
  models.removeAttribute("rotation");
  models.removeAttribute("gesture-handler");
  models.setAttribute("gltf-model", model);
  if (colorArray[0].includes(model)) {
    models.setAttribute("scale", "0.3 0.3 0.3");
    models.setAttribute("position", "0 0 0");
    models.setAttribute("rotation", "90 360 0");
    models.setAttribute("gesture-handler", "minScale: 0.5; maxScale: 2");
  }
  if (colorArray[1].includes(model)) {
    models.setAttribute("scale", "0.1 0.1 0.1");
    models.setAttribute("position", "-0.3 -0.3 -0.1");
    models.setAttribute("rotation", "-90 360 0");
    models.setAttribute("gesture-handler", "minScale: 0.25; maxScale: 0.6");
  }
  if (colorArray[2].includes(model)) {
    models.setAttribute("scale", "0.05 0.05 0.05");
    models.setAttribute("gesture-handler", "minScale: 0.05; maxScale: 0.08");
  }
  if (colorArray[3].includes(model)) {
    models.setAttribute("scale", "0.001 0.001 0.001");
    models.setAttribute("gesture-handler", "minScale: 0.001; maxScale: 0.005");
  }
}

function pickModelColor(asset) {
  document.querySelector(".menuBtn").style.display = "none";
  document.querySelector(".backBtn").style.display = "block";
  const menuImg = document.querySelectorAll(".menuImg");
  for (let i = 0; i < menuImg.length; i++) {
    menuImg[i].remove();
  }
  for (let i = 0; i < imgArray[asset].length; i++) {
    let colorBtn = document.createElement("img");
    colorBtn.setAttribute("class", "footer-image");
    colorBtn.setAttribute("src", imgArray[asset][i]);
    colorBtn.addEventListener("click", function () {
      switchModel(colorArray[asset][i]);
    });
    let footerDiv = document.querySelector(".footer");
    footerDiv.appendChild(colorBtn);
    document.querySelector(".backBtn").addEventListener("click", openModelMenu);
  }
}

function openModelMenu() {
  document.querySelector(".menuBtn").style.display = "none";
  document.querySelector(".backBtn").style.display = "none";
  const removeElements = document.querySelectorAll(".footer-image");
  for (let i = 0; i < removeElements.length; i++) {
    removeElements[i].remove();
  }
  for (let i = 0; i < modelArray.length; i++) {
    let buttonDiv = document.querySelector(".footer");
    let newModelBtn = document.createElement("img");
    newModelBtn.setAttribute("class", `footer-image menuImg`);
    newModelBtn.setAttribute("src", imgArray[i][0]);
    buttonDiv.appendChild(newModelBtn);
    newModelBtn.addEventListener("click", function () {
      switchModel(modelArray[i]);
      pickModelColor(i);
    });
  }
}

//Listeners
document.addEventListener("DOMContentLoaded", function () {
  const loadingOverlay = document.getElementById("loading-overlay");
  const loadingSpinner = document.getElementById("loading-spinner");
  const loadingImage = document.getElementById("loading-image");
  setTimeout(function () {
    loadingOverlay.style.display = "none";
  }, 3000);

  const buttons = document.querySelectorAll(".footer-image");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
      switchModel(colorArray[0][i]);
    });
  }
});

const menuBtn = document.querySelector(".menuBtn");
menuBtn.addEventListener("click", openModelMenu);
