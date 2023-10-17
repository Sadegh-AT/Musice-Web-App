const audioPlayer = document.getElementById("audio-player");

const playBtn = document.getElementById("play");

const timeElapsed = document.getElementById("time-elapsed");
const songDuration = document.getElementById("song-duration");

const playerTrack = document.getElementById("player-track");

const volumeBtn = document.getElementById("volume");
const volumeRange = document.getElementById("volume-range");

volumeRange.value = Number(localStorage.getItem("music-volume"));

volumeBtn.addEventListener("click", function () {
  volumeRange.classList.toggle("hidden");
});

volumeRange.addEventListener("input", function () {
  audioPlayer.volume = volumeRange.value;
});
volumeRange.addEventListener("change", function () {
  localStorage.setItem("music-volume", volumeRange.value);
});

audioPlayer.addEventListener("loadedmetadata", function () {
  const duration = Math.round(audioPlayer.duration);
  playerTrack.max = duration;

  volumeRange.value = Number(localStorage.getItem("music-volume"));

  audioPlayer.volume = Number(localStorage.getItem("music-volume"));
});

playBtn.addEventListener("click", function () {
  playAndPause();
});

playerTrack.addEventListener("change", function () {
  audioPlayer.currentTime = playerTrack.value;
});

audioPlayer.addEventListener("timeupdate", function () {
  playerTrack.value = audioPlayer.currentTime;
  playerTrack.max = Math.round(audioPlayer.duration);
  const currentTime = audioPlayer.currentTime;
  const duration = audioPlayer.duration;
  timeElapsed.innerHTML = formatTime(currentTime);
  songDuration.innerHTML = formatTime(duration);
});

audioPlayer.addEventListener("ended", function () {
  playBtn.dataset.isplay = "true";
  playAndPause();

  playerTrack.value = 0;
  playerTrack.max = Math.round(audioPlayer.duration);
  const currentTime = audioPlayer.currentTime;
  const duration = audioPlayer.duration;
  timeElapsed.innerHTML = formatTime(currentTime);
  songDuration.innerHTML = formatTime(duration);
});

async function playAndPause() {
  const btnIcon = playBtn.querySelector("i");
  if (playBtn.dataset.isplay == "false") {
    btnIcon.className = "fa-solid fa-pause";
    await audioPlayer.play();
    playBtn.dataset.isplay = "true";
  } else if (playBtn.dataset.isplay == "true") {
    btnIcon.className = "fa-solid fa-play";
    await audioPlayer.pause();
    playBtn.dataset.isplay = "false";
  }
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}
