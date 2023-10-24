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

const musicTable = document.querySelector("#music-table");
addTrack(musicTable).then(() => {
  const deleteBtn = document.querySelectorAll(".delBtn");
  deleteBtn.forEach((item) =>
    item.addEventListener("click", async function (e) {
      e.stopPropagation();
      await fetch(`http://localhost:3000/music/delete/${item.dataset.id}`, {
        method: "DELETE",
      }).then((response) => {
        if (response.status === 204) {
          // The server should respond with a 204 No Content status upon successful deletion.
          // After receiving a successful response, you can use JavaScript to redirect the client with a different method.
          window.location.href = "http://localhost:3000"; // Redirect the client to '/new-url'
        }
      });
    })
  );
});

function selectMusic(element) {
  const a = document.querySelector("dis");
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
