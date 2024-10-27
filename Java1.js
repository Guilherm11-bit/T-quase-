console.log('Script carregado');

const audio = document.getElementById('audio');
const playPauseButton = document.getElementById('play-pause');
const trackButtons = document.querySelectorAll('.track');
const seekBar = document.getElementById('seek-bar');
const currentTimeDisplay = document.getElementById('current-time');
const durationDisplay = document.getElementById('duration');
const albumCover = document.getElementById('album-cover');
const lyricsDisplay = document.getElementById('lyrics'); // Seleciona o elemento para exibir a letra
let isPlaying = false;

// Função para formatar o tempo (minutos e segundos)
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Exibe a duração do áudio assim que os metadados carregam
audio.addEventListener('loadedmetadata', () => {
    durationDisplay.textContent = formatTime(audio.duration);
});

// Atualiza o tempo atual e a barra de progresso enquanto o áudio toca
audio.addEventListener('timeupdate', () => {
    currentTimeDisplay.textContent = formatTime(audio.currentTime);
    seekBar.value = (audio.currentTime / audio.duration) * 100;
});

// Adiciona funcionalidade a cada botão de faixa para reproduzir e exibir a letra
trackButtons.forEach(button => {
    button.addEventListener('click', () => {
        console.log('Botão da faixa clicado:', button.dataset.src);
        console.log('Capa do álbum:', button.dataset.cover);

        // Atualiza o arquivo de áudio, a imagem da capa e a letra da música
        audio.src = button.dataset.src;
        albumCover.src = button.dataset.cover;

        // Divide a letra da música em linhas usando o delimitador "|"
        const lyricsLines = button.dataset.lyrics.split('|');
        lyricsDisplay.innerHTML = ''; // Limpa o conteúdo anterior

        // Cria um parágrafo para cada linha da letra
        lyricsLines.forEach(line => {
            const lineElement = document.createElement('p');
            lineElement.textContent = line;
            lyricsDisplay.appendChild(lineElement);
        });

        // Toca o áudio e altera o botão para "Pause"
        audio.play().then(() => {
            playPauseButton.textContent = 'Pause';
            isPlaying = true;
        }).catch(error => {
            console.error('Erro ao tentar reproduzir o áudio:', error);
        });
    });
});

// Alterna entre tocar e pausar o áudio
playPauseButton.addEventListener('click', () => {
    console.log('Botão Play/Pause clicado');
    if (isPlaying) {
        audio.pause();
        playPauseButton.textContent = 'Play';
    } else {
        audio.play().then(() => {
            playPauseButton.textContent = 'Pause';
        }).catch(error => {
            console.error('Erro ao tentar reproduzir o áudio:', error);
        });
    }
    isPlaying = !isPlaying;
});

// Avança o áudio em 10 segundos ao clicar no botão de avanço
document.getElementById('jump').addEventListener('click', () => {
    audio.currentTime += 10;
});

// Atualiza o tempo do áudio conforme o valor da barra de progresso muda
seekBar.addEventListener('input', () => {
    audio.currentTime = (seekBar.value / 100) * audio.duration;
});

