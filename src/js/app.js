const darkmodeBtn = document.querySelector("#darkmodeBtn");
const fonticon = darkmodeBtn.querySelector("span");
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
