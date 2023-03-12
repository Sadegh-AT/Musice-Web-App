const darkmodeBtn = document.querySelector("#darkmodeBtn");

SetDarkorLight();
Darkmode(darkmodeBtn);
function Darkmode(darkmode) {
  darkmode.addEventListener("click", function () {
    if (localStorage.getItem("color-theme") != "dark") {
      localStorage.setItem("color-theme", "dark");
      const fonticon = darkmode.querySelector("span");
      fonticon.innerHTML = `<i class="fa-solid fa-sun"></i>`;
    } else {
      localStorage.setItem("color-theme", "light");
      const fonticon = darkmode.querySelector("span");
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
  } else {
    document.documentElement.classList.remove("dark");
  }
}
