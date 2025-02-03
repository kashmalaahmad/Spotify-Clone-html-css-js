console.log("Welcome to Spotify");

// Initialize variables
let audioelement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById("masterPlay");
let progressBar = document.getElementById("progressBar");
let gif = document.getElementById("gif");
let songIndex = 0;

// Song list array
let songList = [
    { songName: "Song 1", filepath: "songs/1.mp3", coverpath: "covers/1.jpg" },
    { songName: "Song 2", filepath: "songs/2.mp3", coverpath: "covers/2.jpg" },
    { songName: "Song 3", filepath: "songs/3.mp3", coverpath: "covers/3.jpg" },
    { songName: "Song 4", filepath: "songs/4.mp3", coverpath: "covers/4.jpg" },
    { songName: "Song 5", filepath: "songs/5.mp3", coverpath: "covers/5.jpg" },
];

let songsItem = Array.from(document.getElementsByClassName("songItem"));

// Handle Master Play button
masterPlay.addEventListener('click', () => {
    if (audioelement.paused || audioelement.currentTime <= 0) {
        audioelement.play();
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        gif.style.opacity = 1;
    } else {
        audioelement.pause();
        masterPlay.classList.add("fa-circle-play");
        masterPlay.classList.remove("fa-circle-pause");
        gif.style.opacity = 0;
    }
});

// Update progress bar
audioelement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioelement.currentTime / audioelement.duration) * 100);
    progressBar.value = progress;
});

progressBar.addEventListener('change', () => {
    audioelement.currentTime = (progressBar.value * audioelement.duration) / 100;
});

// Update song details in the DOM
songsItem.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songList[i].coverpath;
    element.getElementsByClassName("songName")[0].innerText = songList[i].songName;
});

// Function to reset all play buttons
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
        element.classList.remove("fa-circle-pause");
        element.classList.add("fa-circle-play");
    });
};

// Handle individual song play
Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove("fa-circle-play");
        e.target.classList.add("fa-circle-pause");
        audioelement.src = `songs/${songIndex}.mp3`;
        audioelement.currentTime = 0;
        audioelement.play();
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        gif.style.opacity = 1;
    });
});
