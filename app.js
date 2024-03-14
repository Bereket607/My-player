const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        path: 'assets/1.mp3',
        displayName: 'FAVHELLA (feat. Mc Guidanny)',
        cover: 'assets/1.jpg',
        artist: 'Mc Guidanny, T-Mass, ANGELPLAYA',
    },
    {
        path: 'assets/2.mp3',
        displayName: 'King Of The Hill',
        cover: 'assets/2.jpg',
        artist: 'Nat James, Dirty Palm',
    },
    {
        path: 'assets/3.mp3',
        displayName: 'Done Better (feat. AViVA)',
        cover: 'assets/3.jpg',
        artist: 'AViVA, Clarx, Shiah Maisel',
    },
    {
        path: 'assets/4.mp3',
        displayName: 'Vienna (feat. PhiloSofie)',
        cover: 'assets/4.jpg',
        artist: 'AJames Mercy, PhiloSofie',
    }, {
        path: 'assets/5.mp3',
        displayName: 'RPM',
        cover: 'assets/5.jpg',
        artist: 'JOXION',
    }

];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;

    playBtn.classList.replace('fa-play', 'fa-pause');

    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;

    playBtn.classList.replace('fa-pause', 'fa-play');

    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);