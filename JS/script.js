const songs = [
  { title: "Mile Ho", artist: "Neha Kakkar", src: "songs/Mile.mp3" },
  { title: "Heeriye", artist: "Arijit Singh", src: "songs/Heeriye.mp3" },
  { title: "Suniyan Suniyan", artist: "Juss", src: "songs/suniyan.mp3" }
];

let currentSongIndex = 0;
let isPlaying = false;

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const playlistEl = document.getElementById("playlist");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volumeSlider = document.getElementById("volume");

songs.forEach((song, index) => {
  const li = document.createElement("li");
  li.textContent = song.title + " - " + song.artist;
  li.addEventListener("click", () => {
    currentSongIndex = index;
    loadSong();
    playSong();
  });
  playlistEl.appendChild(li);
});

function loadSong() {
  const song = songs[currentSongIndex];
  audio.src = song.src;
  title.textContent = song.title;
  artist.textContent = song.artist;
  updateActiveSong();
}

function playSong() {
  audio.play();
  isPlaying = true;
  playBtn.textContent = "⏸️";
}

function pauseSong() {
  audio.pause();
  isPlaying = false;
  playBtn.textContent = "▶️";
}

playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

nextBtn.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong();
  playSong();
});

prevBtn.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong();
  playSong();
});

audio.addEventListener("timeupdate", () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = percent + "%";
  currentTimeEl.textContent = formatTime(audio.currentTime);
  durationEl.textContent = formatTime(audio.duration);
});

document.querySelector(".progress-container").addEventListener("click", (e) => {
  const width = e.currentTarget.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
});

volumeSlider.addEventListener("input", (e) => {
  audio.volume = e.target.value;
});

function formatTime(time) {
  if (isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
}

function updateActiveSong() {
  const items = playlistEl.querySelectorAll("li");
  items.forEach((li, idx) => {
    li.classList.toggle("active", idx === currentSongIndex);
  });
}

loadSong();
