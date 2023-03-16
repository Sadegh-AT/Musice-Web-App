const audioPlayer = document.getElementById("audio-player");
const playBtn = document.getElementById("play");

const timeElapsed = document.getElementById("time-elapsed");
const songDuration = document.getElementById("song-duration");

const playerTrack = document.getElementById("player-track");

playBtn.addEventListener("click", function () {
  playAndPause();
});

audioPlayer.addEventListener("timeupdate", function () {
  const currentTime = audioPlayer.currentTime;
  const duration = audioPlayer.duration;
  const progressPercent = (currentTime / duration) * 100;

  playerTrack.value = progressPercent;
  timeElapsed.innerHTML = formatTime(currentTime);
  songDuration.innerHTML = formatTime(duration);
});

function playAndPause() {
  const btnIcon = playBtn.querySelector("i");
  if (btnIcon.className == "fa-solid fa-play") {
    btnIcon.className = "fa-solid fa-pause";
    audioPlayer.play();
  } else {
    btnIcon.className = "fa-solid fa-play";
    audioPlayer.pause();
  }
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}
