const availableSongs = [
    { songName: 'Under the influence', filepath: 'songs/1.mp3', coverpath: 'covers/1.jpg' },
    { songName: 'Greddy', filepath: 'songs/2.mp3', coverpath: 'covers/2.jpg' },
    { songName: 'The Machine', filepath: 'songs/3.mp3', coverpath: 'covers/3.jpg' },
    { songName: 'Electric Love', filepath: 'songs/4.mp3', coverpath: 'covers/4.jpg' },
    { songName: 'MILLION DOLLAR BABY', filepath: 'songs/5.mp3', coverpath: 'covers/5.jpg' },
    { songName: 'We Will Rock You', filepath: 'songs/6.mp3', coverpath: 'covers/6.jpg' },
    { songName: 'Not Like Us', filepath: 'songs/7.mp3', coverpath: 'covers/7.jpg' }
];

document.addEventListener('DOMContentLoaded', () => {
    let availableSongsDropdown = document.getElementById('availableSongs');
    availableSongs.forEach((song, index) => {
        let option = document.createElement('option');
        option.value = index;
        option.textContent = song.songName;
        availableSongsDropdown.appendChild(option);
    });
});

document.getElementById('addSong').addEventListener('click', () => {
    let selectedSongIndex = document.getElementById('availableSongs').value;
    let selectedSong = availableSongs[selectedSongIndex];
    let selectedSongsList = document.getElementById('selectedSongs');

    let li = document.createElement('li');
    li.textContent = selectedSong.songName;
    li.dataset.filepath = selectedSong.filepath;
    li.dataset.coverpath = selectedSong.coverpath;
    selectedSongsList.appendChild(li);
});

document.getElementById('playlistForm').addEventListener('submit', function (e) {
    e.preventDefault();
    let playlistName = document.getElementById('playlistName').value;
    let selectedSongsList = document.getElementById('selectedSongs').children;
    let songs = Array.from(selectedSongsList).map(li => ({
        songName: li.textContent,
        filepath: li.dataset.filepath,
        coverpath: li.dataset.coverpath
    }));

    let playlists = JSON.parse(localStorage.getItem('playlists')) || [];
    playlists.push({ name: playlistName, songs: songs });
    localStorage.setItem('playlists', JSON.stringify(playlists));

    alert('Playlist created successfully!');
    document.getElementById('playlistForm').reset();
    document.getElementById('selectedSongs').innerHTML = '';
});
