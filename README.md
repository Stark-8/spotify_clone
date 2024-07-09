Project: Spotify_clone


Overview: This project is a web-based music player and playlist creator inspired by Spotify, featuring a modern and intuitive interface. The core functionality includes a home page displaying a curated list of songs with play and pause controls, and a "Create Playlist" page allowing users to create custom playlists by selecting songs from a predefined list. The user interface is designed with a sleek, dark-themed aesthetic, incorporating responsive design elements to ensure compatibility across different devices. Users can control playback, adjust volume, and navigate between songs using the player controls. The project leverages HTML, CSS, and JavaScript, with local storage used to persist playlist data. This combination of technologies provides a seamless and engaging user experience for music enthusiasts.


Elements: The provided HTML, CSS, and JavaScript code create a basic music streaming interface that allows users to play songs, adjust volume, and create playlists. Here's a brief explanation of the core components:
index.html
This file serves as the main page for the application, featuring a navigation bar, a list of songs, a song banner, and controls for playing and managing music.
createPlaylist.html
This file provides a form for users to create new playlists by selecting available songs. The form dynamically adds selected songs to the playlist and saves it to localStorage.
style.css
This file contains styles for the various HTML elements, ensuring a visually appealing layout for the navigation bar, song list, and playlist creation form.
script.js
This script manages the core functionality of the music player, including:
Initializing the audio element and controlling play/pause actions.
Updating the progress bar and volume.
Switching between songs using next and previous buttons.
Loading and displaying playlists from localStorage.
Handling the play/pause functionality for songs within playlists.
createPlaylist.js
This script handles the functionality of the playlist creation page:
Dynamically populates the dropdown with available songs.
Allows users to add selected songs to a playlist.
Saves the playlist to localStorage upon form submission.


Key Functionalities:
Play/Pause Control: The play button toggles between playing and pausing the current song.
Progress Bar: Displays the current playback progress and allows seeking within the song.
Volume Control: Adjusts the volume of the audio element.
Next/Previous Buttons: Allows navigation between songs.
Playlist Management: Users can create and delete playlists, and play songs from the playlists.
Local Storage: Playlists are saved to and loaded from localStorage, ensuring persistence across page reloads.

