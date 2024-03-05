// ** Variaveis **

// ** Botões **
const html = document.querySelector("html");
const cardsBt = document.querySelectorAll(".app__card-button");
const banner = document.querySelector(".app__image");
const title = document.querySelector(".app__title");
const contextBT = document.querySelectorAll(".app__card-button");
const startPauseBt = document.querySelector('#start-pause');
const startPauseImg = document.querySelector('.app__card-primary-butto-icon');


// ** Music **
const musicInputFoco = document.querySelector('#alternar-musica');
const music = new Audio('/sons/luna-rise-part-one.mp3');
const playMusic = new Audio('/sons/play.wav');
const pauseMusic = new Audio('/sons/pause.mp3');
const beep = new Audio('/sons/beep.mp3');

// ** Temporizador **
var tempoDecorridoSegundos = 1500;
var intervalo = null;
const tempoNaTela = document.querySelector('#timer');
var state = 'stoped';


// ** Funções e eventos dos botoes **

cardsBt.forEach((bt, idx) => {
  var contexto = ["foco", "descanso-curto", "descanso-longo"];
  function alterarContexto(contexto) {
    // **Alterando o TEMA **
    setTimeout(function () {
    html.setAttribute("data-contexto", contexto);
    // **Alterando as IMAGENS **
    banner.setAttribute("src", `/imagens/${contexto}.png`);
  
    // **Alterando os TEXTOS e setando o TEMPO para aquele contexto **
    switch (contexto) {
      case "foco":
        title.innerHTML = `
                Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
                `;
                tempoDecorridoSegundos = 1500;
        break;
      case "descanso-curto":
        title.innerHTML = `
                Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>
                `;
                tempoDecorridoSegundos = 300;
        break;

      case "descanso-longo":
        title.innerHTML = `
            Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `;
            tempoDecorridoSegundos = 900;
        break;}
        contextBT.forEach( (contexto) => {
            contexto.classList.remove("active");
        })
        bt.classList.add("active");
      }, 500)}

  // ** Evento dos Botoes de Contexto **
  bt.addEventListener("click", () => {
    alterarContexto(contexto[idx]);
    startPauseBt.innerHTML = `
          <img class="app__card-primary-butto-icon" src="/imagens/play_arrow.png" alt=""><span>Iniciar</span>`
        startPauseBt.classList.remove('paused')
        startPauseBt.classList.add('app__card-primary-button')
        zerarTempo();
    mostrarTempo();
    
  });
});

// ** Inserindo e configurando o som **
music.loop = true;
music.volume = 0.4;
musicInputFoco.addEventListener('change', () => {
    if (music.paused){
        music.play()
    } else{
        music.pause()
    }
})


// ** Inserindo o Temporizador **

function iniciar () {
  state = 'running';
  if (state === 'running') {  
          if (intervalo == null){
          playMusic.play();
          startPauseBt.innerHTML = `
          <img class="app__card-primary-butto-icon" src="/imagens/pause.png" alt=""><span>Pausar</span>`
          startPauseBt.classList.remove('app__card-primary-button')
          startPauseBt.classList.add('paused')

      } else {
          pauseMusic.play();
          startPauseBt.innerHTML = `
          <img class="app__card-primary-butto-icon" src="/imagens/play_arrow.png" alt=""><span>Continuar</span>`
          startPauseBt.classList.remove('paused')
          startPauseBt.classList.add('app__card-primary-button')
          
      }
      if (intervalo) {
      state = 'paused';
      zerarTempo();
      return
      }
      const contagemRegressiva = () => {
          if (tempoDecorridoSegundos <= 0) {
            const focoAtivo = html.getAttribute("data-contexto") == 'foco';
            if (focoAtivo) {
              const evento = new CustomEvent('focoFinalizado');
              document.dispatchEvent(evento);
            }
            state = 'stoped';
            zerarTempo();
            beep.play();
            return
          }    
          tempoDecorridoSegundos -= 1;
          mostrarTempo();
      }
      
      intervalo = setInterval(contagemRegressiva, 1000);

      
    }}

    function zerarTempo() {
      clearInterval(intervalo);
      intervalo = null;
      if (state === 'stoped') {
        startPauseBt.innerHTML = `
        <img class="app__card-primary-butto-icon" src="/imagens/play_arrow.png" alt=""><span>Iniciar</span>`
        startPauseBt.classList.remove('paused')
        startPauseBt.classList.add('app__card-primary-button')
      }
      else if (state === 'paused') {
        startPauseBt.innerHTML = `
        <img class="app__card-primary-butto-icon" src="/imagens/play_arrow.png" alt=""><span>Continuar</span>`
        startPauseBt.classList.remove('paused')
        startPauseBt.classList.add('app__card-primary-button')
      }
  }

startPauseBt.addEventListener('click', iniciar);


function mostrarTempo () {
  const tempo = new Date(tempoDecorridoSegundos * 1000);
  const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'});
  tempoNaTela.innerHTML = `
  ${tempoFormatado}`
}

mostrarTempo();