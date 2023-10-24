const darkmodeBtn = document.querySelector("#darkmodeBtn");
const fonticon = darkmodeBtn.querySelector("span");
const modalOpen = document.getElementById("modalOpen");
const modalClose = document.getElementById("modalClose");
const modal = document.querySelector(".modal");
modalOpen.addEventListener("click", () => {
  modal.classList.add("active");
});
modalClose.addEventListener("click", () => {
  modal.classList.remove("active");
});
SetDarkorLight();
Darkmode(darkmodeBtn);
function Darkmode(darkmode) {
  darkmode.addEventListener("click", function () {
    if (localStorage.getItem("color-theme") != "dark") {
      localStorage.setItem("color-theme", "dark");

      fonticon.innerHTML = `<i class="fa-solid fa-sun"></i>`;
    } else {
      localStorage.setItem("color-theme", "light");

      fonticon.innerHTML = `<i class="fa-solid fa-moon"></i>`;
    }
    SetDarkorLight();
  });
}
function SetDarkorLight() {
  if (
    localStorage.getItem("color-theme") === "dark" ||
    (!("color-theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
    fonticon.innerHTML = `<i class="fa-solid fa-sun"></i>`;
  } else {
    document.documentElement.classList.remove("dark");
    fonticon.innerHTML = `<i class="fa-solid fa-moon"></i>`;
  }
}

addTrack();

function selectMusic(element) {
  const a = document.querySelector(".dis");
  console.log(a);
  if (a) a.classList.remove("dis");
  element.classList.add("dis");
  createAndReplaceAudio(`../${element.dataset.src}`);
}

function markFormSubmitted() {
  // When the form is submitted successfully, set the hidden field to "true"
  document.getElementById("formSubmitted").value = "true";
}

// Check if the form was successfully submitted and redirect if needed
if (document.getElementById("formSubmitted").value === "true") {
  // Redirect to the main page or the URL of your choice
  window.location.href = "index.html";
}

// Function to create a new Audio element and remove the previous one
function createAndReplaceAudio(newAudioSrc) {
  const previousAudio = document.querySelector("audio");

  if (previousAudio) {
    previousAudio.pause();
    previousAudio.remove();
  }

  audioPlayer(newAudioSrc);
}

// Example: Create a new Audio element with a different source and remove the previous one
