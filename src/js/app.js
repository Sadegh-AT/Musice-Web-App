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

const musicTable = document.querySelector("#music-table");
let elementHtml = `<tbody
                        class="mb-4 flex w-full cursor-pointer dark:text-[#0C0C0C] dark:hover:bg-[#d4d4d4] dark:border-[#D2D2D2] justify-between rounded-lg border-2 border-[#404040] p-2 text-white opacity-80 transition-all hover:bg-[#3e3e3e]">
                        <tr class="flex space-x-7">
                            <td>1</td>
                            <td>1</td>
                            <td>Prologue</td>
                        </tr>
                        <tr class="flex space-x-8">
                            <td>3:45</td>
                            <td>6.66 MB</td>
                            <td>17.92 MB</td>
                        </tr>
                    </tbody>`;

new MusicTrack(musicTable, elementHtml, 100);
