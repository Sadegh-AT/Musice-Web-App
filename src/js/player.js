const audioPlayer = document.getElementById('audio-player');
const playBtn = document.getElementById("play")

playBtn.addEventListener("click", function () {
    playAndPause()
})


function playAndPause() {
    const btnIcon = playBtn.querySelector("i")
    if (btnIcon.className == "fa-solid fa-play") {
        
        btnIcon.className = "fa-solid fa-pause"
        
    } else {
        btnIcon.className = "fa-solid fa-play"
        
        
    }
    
}