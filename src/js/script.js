document.addEventListener("DOMContentLoaded", () => {
    // Controle de áudio do Beat Destaque
    const playDestaque = document.getElementById("play-destaque");
    const playButtons = document.querySelectorAll('.play-button');
    const audioDestaque = document.getElementById("audio-destaque");
    const progressBar = document.getElementById("progress-bar");
    let currentAudio = null;

    playDestaque.addEventListener("click", () => {
        if (currentAudio && currentAudio !== audioDestaque) {
            currentAudio.pause();
        }
        if (audioDestaque.paused) {
            audioDestaque.play();
            playDestaque.textContent = "⏸ Pause";
        } else {
            audioDestaque.pause();
            playDestaque.textContent = "▶ Play";
        }
        currentAudio = audioDestaque;
    });

    audioDestaque.addEventListener("timeupdate", () => {
        const progress = (audioDestaque.currentTime / audioDestaque.duration) * 100;
        progressBar.value = progress;
    });

    progressBar.addEventListener("input", () => {
        const seekTime = (progressBar.value / 100) * audioDestaque.duration;
        audioDestaque.currentTime = seekTime;
    });
    

    // Filtro de Gêneros
    const genreFilter = document.getElementById("genre-filter");
    const beatsList = document.getElementById("beats-list");
    const beatsItems = beatsList.getElementsByClassName("beat-item");

    genreFilter.addEventListener("change", (e) => {
        const selectedGenre = e.target.value;

        // Mostrar ou esconder beats com base no gênero selecionado
        for (let beat of beatsItems) {
            const genre = beat.getAttribute("data-genre");

            if (selectedGenre === "all" || selectedGenre === genre) {
                beat.style.display = "block"; // Exibir o beat
            } else {
                beat.style.display = "none"; // Esconder o beat
            }
        }
    });
});