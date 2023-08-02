console.log("Welcome to spotify");
let songIndex = 0;
let audioElement = new Audio();
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let songs = [
    { songName: "Alot 21 savage ft. J.cole", filePath: "songs/alot.mp3", coverPath: "covers/21s.jpg" },
    { songName: "Instant Crush by Daft Punk", filePath: "songs/instant.mp3", coverPath: "covers/df.jpg" },
    { songName: "Private Landing by Don Toliver", filePath: "songs/private.mp3", coverPath: "covers/dt.jpg" },
    { songName: "Privilleged Rappers Drake ft. 21 savage", filePath: "songs/rappers.mp3", coverPath: "covers/her.jpg" },
    { songName: "Lova Sosa by Cheif Keef", filePath: "songs/sosa.mp3", coverPath: "covers/ck.jpg" },
    { songName: "Spin Bout U", filePath: "songs/spin.mp3", coverPath: "covers/her.jpg" },
    { songName: "Too Many Nights Metro Boomin", filePath: "songs/toomany.mp3", coverPath: "covers/mb.jpg" },
    { songName: "Trancae By Metro Bookin", filePath: "songs/trance.mp3", coverPath: "covers/mb.jpg" },
    { songName: "Trancef By Metro Bookin", filePath: "songs/trance.mp3", coverPath: "covers/mb.jpg" },
    { songName: "Transce By Metro Bookin", filePath: "songs/trance.mp3", coverPath: "covers/mb.jpg" },
];

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// play and pause click
masterPlay.addEventListener("click", () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove("fa-pause-circle");
        masterPlay.classList.add("fa-play-circle");
        gif.style.opacity = 0;
    }
});

audioElement.addEventListener("timeupdate", () => {
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
    element.addEventListener("click", (e) => {
        makeAllPlays();
        index = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = songs[index - 1].filePath; // Subtract 1 to match the array index
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    });
});

document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    updateSong(songIndex);
    masterSongName.innerText = songs[songIndex].songName;
});

document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    updateSong(songIndex);
});

// Function to update the song details
function updateSong(index) {
    audioElement.src = songs[index].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
    document.querySelector(".songInfo").innerHTML = `<img src="${songs[index].coverPath}" width="42px" alt="" id="gif"> ${songs[index].songName}`;
}
