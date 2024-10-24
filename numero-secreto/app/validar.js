let contador = 3
let jogoTerminado = false
const btn_reiniciar = document.querySelector('#btn_reiniciar')
const chances = document.querySelector('.box_chance')
const dica = document.querySelector('.dica')

chances.innerHTML = contador


function validar() {
    if (contador > 0) {
        vitoria()
        contador -= 1
        chances.innerHTML = contador        
        if (contador == 0 && !jogoTerminado) {
            recognition.stop()
            alert('Você perdeu!', 'O número secreto é: ' + numero_secreto)
            alert('O número secreto é: ' + numero_secreto)
            recognition.stop()
            btn_chutar.setAttribute('disabled', true)}
}}

function vitoria() {
        jogoTerminado = true    
        if (numero_secreto === res && contador < 3) {
        alert('Parabéns, você venceu!', 'O número secreto é: ' + numero_secreto)
        alert('O número secreto é: ' + numero_secreto)
        btn_chutar.setAttribute('disabled', true)
        recognition.stop()
    }
}

btn_reiniciar.addEventListener('click', reiniciar)

function reiniciar () {
    alert('Vamos começar novamente!')
    btn_chutar.removeAttribute('disabled')
    gerarNumeroAleatorio()
    console.log('Número Secreto: ', numero_secreto)
    contador = 3
    chances.innerHTML = contador
    jogoTerminado = false
    palpite.innerHTML = ' -  -  '
    dica.innerHTML = ''
}

function dicas() {
    if (numero_secreto > res) {
        dica.innerHTML = 'O número é maior <i class="fa-solid fa-arrow-up"></i>'
    }else if (numero_secreto < res) {
        dica.innerHTML = 'O número é menor <i class="fa-solid fa-arrow-down"></i>'
    }
}