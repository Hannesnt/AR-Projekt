document.addEventListener("DOMContentLoaded", function () {
  const loadingOverlay = document.getElementById("loading-overlay");
  const loadingSpinner = document.getElementById("loading-spinner");
  const loadingImage = document.getElementById("loading-image");
  setTimeout(function () {
    loadingOverlay.style.display = "none";
    loadingSpinner.style.display = "none";
    loadingImage.style.display = "none";
  }, 3000);
});
