function audioPlayer(audioSrc) {
  const audioPlayer = document.querySelector(".audio-player");
  audioPlayer.classList.remove("dis");
  const playBtn = document.getElementById("play");
  const btnIcon = playBtn.querySelector("i");
  const volumeEl = audioPlayer.querySelector("#volume");
  const volumeIcon = volumeEl.querySelector("i");

  const audio = document.querySelector("#myAudio");

  audio.src = audioSrc;

  audio.addEventListener(
    "loadeddata",
    () => {
      audioPlayer.querySelector("#song-duration").textContent =
        getTimeCodeFromNum(audio.duration);
      audio.volume = 0.75;
      playAudio(audio, btnIcon);
      volumeAudio(audio, volumeIcon);
    },
    false
  );

  //click on timeline to skip around
  const timeline = audioPlayer.querySelector(".timeline");
  timeline.addEventListener(
    "click",
    (e) => {
      const timelineWidth = window.getComputedStyle(timeline).width;
      const timeToSeek = (e.offsetX / parseInt(timelineWidth)) * audio.duration;
      audio.currentTime = timeToSeek;
    },
    false
  );

  //check audio percentage and update time accordingly
  setInterval(() => {
    const progressBar = audioPlayer.querySelector(".progress");
    progressBar.style.width = (audio.currentTime / audio.duration) * 100 + "%";
    audioPlayer.querySelector("#time-elapsed").textContent = getTimeCodeFromNum(
      audio.currentTime
    );
  }, 500);

  //toggle between playing and pausing on button click

  playBtn.addEventListener(
    "click",
    () => {
      if (audio.paused) {
        btnIcon.className = "fa-solid fa-pause";
        audio.play();
      } else {
        btnIcon.className = "fa-solid fa-play";
        audio.pause();
      }
    },
    false
  );

  volumeEl.addEventListener("click", () => {
    console.log(audio.muted);
    audio.muted = !audio.muted;

    if (audio.muted) {
      volumeIcon.classList = "fa-solid fa-volume-xmark";
    } else {
      volumeIcon.classList = "fa-solid fa-volume-high";
    }
  });
}

// function formatTime(time) {
//   const minutes = Math.floor(time / 60);
//   const seconds = Math.floor(time % 60);
//   return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
// }
function getTimeCodeFromNum(num) {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  const hours = parseInt(minutes / 60);
  minutes -= hours * 60;

  if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  return `${String(hours).padStart(2, 0)}:${minutes}:${String(
    seconds % 60
  ).padStart(2, 0)}`;
}

function playAudio(audio, btnIcon) {
  btnIcon.className = "fa-solid fa-pause";
  audio.play();
}
function volumeAudio(audio, volumeIcon) {
  audio.muted = false;
  volumeIcon.classList = "fa-solid fa-volume-high";
}
