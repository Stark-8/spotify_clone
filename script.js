console.log("JavaScript is working");

// Initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let currentTime = document.getElementById('currentTime');
let duration = document.getElementById('duration');
let volumeControl = document.getElementById('volumeControl');
let currentSongCover = document.getElementById('currentSongCover');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    { songName: 'Under the influence', filepath: 'songs/1.mp3', coverpath: 'covers/1.jpg' },
    { songName: 'Greddy', filepath: 'songs/2.mp3', coverpath: 'covers/2.jpg' },
    { songName: 'The Machine', filepath: 'songs/3.mp3', coverpath: 'covers/3.jpg' },
    { songName: 'Electric Love', filepath: 'songs/4.mp3', coverpath: 'covers/4.jpg' },
    { songName: 'MILLION DOLLAR BABY', filepath: 'songs/5.mp3', coverpath: 'covers/5.jpg' },
    { songName: 'We Will Rock You', filepath: 'songs/6.mp3', coverpath: 'covers/6.jpg' },
    { songName: 'Not Like Us', filepath: 'songs/7.mp3', coverpath: 'covers/7.jpg' }
];

songItems.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].coverpath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
});

// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        gif.style.opacity = 0;
    }
});

// Update progress bar and time
audioElement.addEventListener('timeupdate', () => {
    // Update progress bar value
    let progress = (audioElement.currentTime / audioElement.duration) * 100;
    myProgressBar.value = progress;

    // Update current time and duration
    currentTime.innerText = formatTime(audioElement.currentTime);
    duration.innerText = formatTime(audioElement.duration);
});

// Seek functionality
myProgressBar.addEventListener('input', () => {
    // Calculate the new time based on the progress bar value
    let seekTime = (myProgressBar.value / 100) * audioElement.duration;
    audioElement.currentTime = seekTime;
});

// Volume control functionality
volumeControl.addEventListener('input', () => {
    audioElement.volume = volumeControl.value / 100;
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    });
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');
        audioElement.src = songs[songIndex].filepath;
        masterSongName.innerText = songs[songIndex].songName;
        currentSongCover.src = songs[songIndex].coverpath;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
    });
});

// Handle next button click
document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = songs[songIndex].filepath;
    masterSongName.innerText = songs[songIndex].songName;
    currentSongCover.src = songs[songIndex].coverpath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
});

// Handle previous button click
document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = songs.length - 1;
    } else {
        songIndex -= 1;
    }
    audioElement.src = songs[songIndex].filepath;
    masterSongName.innerText = songs[songIndex].songName;
    currentSongCover.src = songs[songIndex].coverpath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
});

// Utility function to format time in minutes and seconds
const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }
    return `${minutes}:${seconds}`;
};





window.addEventListener('load', () => {
    let playlists = JSON.parse(localStorage.getItem('playlists')) || [];
    let playlistContainer = document.getElementById('playlistContainer');

    playlists.forEach((playlist, playlistIndex) => {
        let li = document.createElement('li');
        li.classList.add('playlistItem');
        li.dataset.playlistIndex = playlistIndex;

        let playlistNameSpan = document.createElement('span');
        playlistNameSpan.textContent = playlist.name;

        let deleteIcon = document.createElement('i');
        deleteIcon.classList.add('fa', 'fa-trash');
        deleteIcon.dataset.playlistIndex = playlistIndex;
        deleteIcon.addEventListener('click', deletePlaylist);

        li.appendChild(playlistNameSpan);
        li.appendChild(deleteIcon);

        let songList = document.createElement('ul');
        songList.classList.add('playlistSongs');
        playlist.songs.forEach((song, songIndex) => {
            let songLi = document.createElement('li');
            songLi.classList.add('songItem');
            songLi.dataset.playlistIndex = playlistIndex;
            songLi.dataset.songIndex = songIndex;

            let img = document.createElement('img');
            img.src = song.coverpath;
            img.alt = songIndex + 1;

            let songNameSpan = document.createElement('span');
            songNameSpan.classList.add('songName');
            songNameSpan.textContent = song.songName;

            let songListPlay = document.createElement('span');
            songListPlay.classList.add('songlistplay');

            let timestampSpan = document.createElement('span');
            timestampSpan.classList.add('timestamp');
            timestampSpan.textContent = '3:00'; // Dummy timestamp, replace with actual duration if available

            let playPauseIcon = document.createElement('i');
            playPauseIcon.classList.add('fa', 'fa-play', 'songItemPlay');
            playPauseIcon.dataset.playlistIndex = playlistIndex;
            playPauseIcon.dataset.songIndex = songIndex;
            playPauseIcon.addEventListener('click', playPauseSong);

            timestampSpan.appendChild(playPauseIcon);
            songListPlay.appendChild(timestampSpan);

            songLi.appendChild(img);
            songLi.appendChild(songNameSpan);
            songLi.appendChild(songListPlay);
            songList.appendChild(songLi);
        });
        li.appendChild(songList);
        playlistContainer.appendChild(li);
    });

    function deletePlaylist(e) {
        let playlistIndex = e.target.dataset.playlistIndex;
        playlists.splice(playlistIndex, 1);
        localStorage.setItem('playlists', JSON.stringify(playlists));
        location.reload();
    }

    function playPauseSong(e) {
        let playlistIndex = e.target.dataset.playlistIndex;
        let songIndex = e.target.dataset.songIndex;
        let song = playlists[playlistIndex].songs[songIndex];

        if (audioElement.src !== song.filepath) {
            audioElement.src = song.filepath;
            masterSongName.innerText = song.songName;
            currentSongCover.src = song.coverpath;
            audioElement.currentTime = 0;
            audioElement.play();
            masterPlay.classList.remove('fa-play');
            masterPlay.classList.add('fa-pause');
            updatePlayPauseIcons(e.target);
        } else if (audioElement.paused) {
            audioElement.play();
            masterPlay.classList.remove('fa-play');
            masterPlay.classList.add('fa-pause');
            updatePlayPauseIcons(e.target);
        } else {
            audioElement.pause();
            masterPlay.classList.remove('fa-pause');
            masterPlay.classList.add('fa-play');
            updatePlayPauseIcons();
        }
    }

    function updatePlayPauseIcons(activeElement) {
        document.querySelectorAll('.songItemPlay').forEach(icon => {
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-play');
        });
        if (activeElement) {
            activeElement.classList.remove('fa-play');
            activeElement.classList.add('fa-pause');
        }
    }
});

