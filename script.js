const botaoPlayPause = document.getElementById("play-pause");
const botaoAvancar = document.getElementById("proximo");
const botaoVoltar = document.getElementById("anterior");
const nomeCapitulo = document.getElementById("capitulo");
const audioCapitulo = document.getElementById("audio-capitulo");

const numeroCapitulos = 10;
let taTocando = 0;
let capituloAtual = 1;

function tocarFaixa() {
  audioCapitulo.play();
  botaoPlayPause.classList.remove("bi-play-circle-fill");
  botaoPlayPause.classList.add("bi-pause-circle-fill");
}

function pausarFaixa() {
  audioCapitulo.pause();
  botaoPlayPause.classList.add("bi-play-circle-fill");
  botaoPlayPause.classList.remove("bi-pause-circle-fill");
}

function tocarOuPausar() {
  if (taTocando === 0) {
    tocarFaixa();
    taTocando = 1;
  } else {
    pausarFaixa();
    taTocando = 0;
  }
}

function trocarNomeFaixa() {
  nomeCapitulo.innerText = "Capítulo 0" + capituloAtual;
  if (capituloAtual === 10) {
    nomeCapitulo.innerText = "Capítulo " + capituloAtual;
  } else {
    nomeCapitulo.innerText = "Capítulo 0" + capituloAtual;
  }
}

function proximaFaixa() {
  if (capituloAtual === numeroCapitulos) {
    capituloAtual = 1;
  } else {
    capituloAtual++;
  }

  audioCapitulo.src = "./books/dom-casmurro/" + capituloAtual + ".mp3";
  tocarFaixa();
  taTocando = 1;
  trocarNomeFaixa();
}

function voltarFaixa() {
  if (capituloAtual === 1) {
    capituloAtual = numeroCapitulos;
  } else {
    capituloAtual--;
  }

  audioCapitulo.src = "./books/dom-casmurro/" + capituloAtual + ".mp3";
  tocarFaixa();
  taTocando = 1;
  trocarNomeFaixa();
}

botaoPlayPause.addEventListener("click", tocarOuPausar);
botaoAvancar.addEventListener("click", proximaFaixa);
botaoVoltar.addEventListener("click", voltarFaixa);

// Barra de progresso do áudio

const progressBar = document.getElementById("progress-bar");
const currentTimeDisplay = document.getElementById("current-time");
const durationDisplay = document.getElementById("duration");

// Adicionando estilo à barra de progresso
progressBar.style.width = "100%";

audioCapitulo.addEventListener("timeupdate", function () {
  var percentage = (audioCapitulo.currentTime / audioCapitulo.duration) * 100;
  progressBar.value = percentage;

  // Ajustando a exibição de currentTimeDisplay e durationDisplay
  currentTimeDisplay.textContent = formatTime(audioCapitulo.currentTime);
  durationDisplay.textContent = formatTime(audioCapitulo.duration);

  // Definindo o estilo display para inline-block
  currentTimeDisplay.style.display = "inline-block";
  durationDisplay.style.display = "inline-block";
});

audioCapitulo.addEventListener("loadedmetadata", function () {
  durationDisplay.textContent = formatTime(audioCapitulo.duration);
});

progressBar.addEventListener("input", function () {
  var newPosition = (progressBar.value * audioCapitulo.duration) / 100;
  audioCapitulo.currentTime = newPosition;
});

function formatTime(seconds) {
  var minutes = Math.floor(seconds / 60);
  var remainingSeconds = Math.floor(seconds % 60);
  return minutes + ":" + (remainingSeconds < 10 ? "0" : "") + remainingSeconds;
}
