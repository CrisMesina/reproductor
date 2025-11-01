document.addEventListener("DOMContentLoaded", () => {

    const container = document.getElementById('app');


    // Mensajes que aparecen al iniciar la pagina

    const msg = [
        '<h1 class="title">Hola Karen</h1>',
        '<h1 class="title">Espero que esto ayude a que te animes un poco</h1>',
        '<h1 class="title">Para continuar, debes responder a la siguiente pregunta</h1>',
        '<h1 class="title">¿Quieres mejorar tus animos?</h1>',
        '<div class="button-container"><h1 id="titleText">Karen, selecciona bien la opcion...</h1><button id="yesBtn" class="yes-btn">Sí</button><button id="noBtn" class="no-btn">No</button></div>'
    ]


    // Mensajes que aparecen al presionar el boton "No"

    const titleMsg = [
        "Karen, selecciona bien la opcion...",
        "Vamos Karen, intenta de nuevo...",
        "No te rindas Karen, ¡tú puedes!",
        "¿Estas segura de tu opcion? Piensalo bien...",
        "¡SOLO DI QUE SI!",
        "KAREN PORFAVOR, VOY A LLORAR..."
    ]


    // Mensajes que aparecen si sigue presionando "No"

    const msgYesButton = [
        "No se como se te puede ocurrir seguir presionando no",
        "SABIENDO QUE TE LLEVARE AL SI AUNQUE NO QUIERAS",
        "Todo por llevarme la contraria...",
        "En fin...",
        "Como no sabia que hacerte de regalo, te hice esta pequeña pagina",
        "que contiene canciones que te hacen feliz o que te gusten",
        "NO TE COLOCARE CANCIONES TRISTES >:("
    ]

    let countClicks = 0;


    const noMeDejasOpcion = () =>{
        msgYesButton.forEach((msg, i )=>{
            setTimeout(()=>{
                container.innerHTML = `<h1 class="title">${msg}</h1>`;
            }, i * 2000);
            
        })

        setTimeout(()=>{
            buttonYes();
        }, msgYesButton.length * 2000);
        
    }


    const buttonYes = () => {
        // Lista de canciones
        const playlist = [
            { title: "10 Months ", artist: "ENHYPEN", src: "canciones/10Months.mp3" },
            { title: "Cupid", artist: "OH MY GIRL", src: "canciones/OHMYGIRLCupid.mp3" },
            { title: "Pretty U", artist: "SEVENTEEN", src: "canciones/PrettyU.mp3" },
            { title: "Rock With You", artist: "SEVENTEEN", src: "canciones/Rockwithyou.mp3" },
            { title: "After Midnight", artist: "ENHYPEN", src: "canciones/AfterMidnight.mp3" },
            { title: "Hikari Are", artist: "BURNOUT SYNDROMES", src: "canciones/HikariAre.mp3" },

        ];

        let currentSongIndex = 0;
        let isPlaying = false;
        const audio = new Audio();

        // Crear interfaz del reproductor
        const createPlayer = () => {
            container.innerHTML = `
                <div class="music-player">
                    <h2 class="player-title"></h2>
                    <div class="song-info">
                        <h3 id="songTitle">${playlist[currentSongIndex].title}</h3>
                        <p id="songArtist">${playlist[currentSongIndex].artist}</p>
                    </div>
                    <div class="progress-container">
                        <span id="currentTime">0:00</span>
                        <input type="range" id="progressBar" value="0" min="0" max="100">
                        <span id="duration">0:00</span>
                    </div>
                    <div class="controls">
                        <button id="prevBtn">⏮</button>
                        <button id="playPauseBtn">▶</button>
                        <button id="nextBtn">⏭</button>
                    </div>
                    <div class="volume-container">
                        <span>🔊</span>
                        <input type="range" id="volumeSlider" value="50" min="0" max="100">
                    </div>
                    <div class="playlist">
                        <h4>Lista de canciones:</h4>
                        <ul id="playlistUl"></ul>
                    </div>
                </div>
            `;
        };

        // Cargar canción actual
        const loadSong = () => {
            const song = playlist[currentSongIndex];
            audio.src = song.src;
            document.getElementById('songTitle').textContent = song.title;
            document.getElementById('songArtist').textContent = song.artist;
            updatePlaylist();
        };

        // Reproducir/pausar
        const togglePlayPause = () => {
            const playPauseBtn = document.getElementById('playPauseBtn');
            if (isPlaying) {
                audio.pause();
                playPauseBtn.textContent = '▶️';
                isPlaying = false;
            } else {
                audio.play();
                playPauseBtn.textContent = '⏸️';
                isPlaying = true;
            }
        };

        // Canción anterior
        const prevSong = () => {
            currentSongIndex = currentSongIndex === 0 ? playlist.length - 1 : currentSongIndex - 1;
            loadSong();
            if (isPlaying) audio.play();
        };

        // Siguiente canción
        const nextSong = () => {
            currentSongIndex = currentSongIndex === playlist.length - 1 ? 0 : currentSongIndex + 1;
            loadSong();
            if (isPlaying) audio.play();
        };

        // Actualizar barra de progreso
        const updateProgress = () => {
            const progressBar = document.getElementById('progressBar');
            const currentTime = document.getElementById('currentTime');
            const duration = document.getElementById('duration');
            
            if (audio.duration) {
                const progress = (audio.currentTime / audio.duration) * 100;
                progressBar.value = progress;
                currentTime.textContent = formatTime(audio.currentTime);
                duration.textContent = formatTime(audio.duration);
            }
        };

        // Formatear tiempo
        const formatTime = (seconds) => {
            const minutes = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${minutes}:${secs.toString().padStart(2, '0')}`;
        };

        // Actualizar lista de reproducción
        const updatePlaylist = () => {
            const playlistUl = document.getElementById('playlistUl');
            playlistUl.innerHTML = '';
            playlist.forEach((song, index) => {
                const li = document.createElement('li');
                li.textContent = `${song.title} - ${song.artist}`;
                li.className = index === currentSongIndex ? 'active-song' : '';
                li.addEventListener('click', () => {
                    currentSongIndex = index;
                    loadSong();
                    if (isPlaying) audio.play();
                });
                playlistUl.appendChild(li);
            });
        };

        // Inicializar reproductor
        createPlayer();
        loadSong();

        // Event listeners
        document.getElementById('playPauseBtn').addEventListener('click', togglePlayPause);
        document.getElementById('prevBtn').addEventListener('click', prevSong);
        document.getElementById('nextBtn').addEventListener('click', nextSong);

        // Control de volumen
        document.getElementById('volumeSlider').addEventListener('input', (e) => {
            audio.volume = e.target.value / 100;
        });

        // Control de progreso
        document.getElementById('progressBar').addEventListener('input', (e) => {
            const seekTime = (e.target.value / 100) * audio.duration;
            audio.currentTime = seekTime;
        });

        // Actualizar progreso automáticamente
        audio.addEventListener('timeupdate', updateProgress);

        // Auto siguiente canción
        audio.addEventListener('ended', nextSong);

        // Establecer volumen inicial
        audio.volume = 0.5;
    };

    msg.forEach((message, i) => {
        setTimeout(() => {
            container.innerHTML = message;

            if (i === msg.length - 1) {
                const yesBtn = document.getElementById('yesBtn');
                const noBtn = document.getElementById('noBtn');
                const titleText = document.getElementById('titleText');


                yesBtn.addEventListener('click', () => {
                    buttonYes();
                });

                noBtn.addEventListener('click', () => {
                    countClicks++;

                    const msgIndex = Math.min(countClicks, titleMsg.length - 1);
                    titleText.textContent = titleMsg[msgIndex];


                    if (countClicks >= titleMsg.length){
                        alert('NO ME DEJAS OPCION, A LA FUERZA TE LLEVARE AL SI >:(');
                        noMeDejasOpcion();
                        return;
                    }

                    const randomX = Math.floor(Math.random() * 500) + 'px';
                    const randomY = Math.floor(Math.random() * 500) + 'px';


                    const noScale = Math.max(1 - (countClicks * 0.15), 0.2);

                    const yesScale = 1 + (countClicks * 0.2);


                    noBtn.style.position = 'absolute';
                    noBtn.style.left = randomX;
                    noBtn.style.top = randomY;
                    noBtn.style.transition = 'all 0.3s ease';
                    noBtn.style.opacity = '0.5';
                    noBtn.style.transform = `scale(${noScale})`;
                    yesBtn.style.transform = `scale(${yesScale})`;
                    titleText.style.marginBottom = `${20 + (countClicks * 10)}px`;

                })

            }


        }, (i) * 3500);
    })




});