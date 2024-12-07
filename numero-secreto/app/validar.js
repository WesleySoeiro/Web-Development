let numero_chances = 3
let contador
let jogoTerminado

let chances = document.querySelector('.box_chance')
let dica
let btn_reiniciar

let box_texto_chance = document.createElement('span')
let valor_palpite = document.createElement('span')

document.addEventListener('DOMContentLoaded', () => { 
    contador = numero_chances
    jogoTerminado = false
    dica = document.querySelector('.dica')
    
    chances.innerHTML = contador
    
    btn_reiniciar = document.querySelector('#btn_reiniciar')
    btn_reiniciar.addEventListener('click', reiniciar)
  
})

function validar() {
    if (!jogoTerminado){
        if (contador > 0) {
            vitoria()
            contador -= 1
            chances.innerHTML = contador}       
        if (contador < 1) {
           derrota() 
        }    
    }
}

    

function vitoria() {
           
        if (numero_secreto === res && contador != 0) {
        jogoTerminado = true 
        btn_vit.className = 'btns-vit'
        palpite.className = 'hide'
        palpite.innerHTML = ''
        chances.className = 'hide'
        box2.innerHTML = ''
        box1.innerHTML = `Parabéns, você venceu! <br><br><br> O número secreto é: ${numero_secreto}`
        btn_chutar.setAttribute('disabled', true)
        recognition.stop()

    }
}

function derrota () {
    if (contador < 1 && !jogoTerminado) {
        jogoTerminado = true
        recognition.stop()
        btn_vit.className = 'btns-vit'
        palpite.className = 'hide'
        palpite.innerHTML = ''
        chances.className = 'hide'
        box2.innerHTML = ''
        dica.className = 'hide'
        box1.innerHTML = `Você perdeu! <br><br><br> O número secreto é: ${numero_secreto}`
        btn_chutar.setAttribute('disabled', true)}
    }
        


function reiniciar () {

    /*jogoTerminado = false
    btn_chutar.removeAttribute('disabled')
    gerarNumeroAleatorio()
    console.log('Número Secreto: ', numero_secreto)
    textoReiniciar()
    contador = numero_chances
    chances.innerHTML = contador*/

    document.body.addEventListener('click', (e) => {
        if (e.target.id == 'btn_reiniciar') {
            window.location.reload()
        }
    })
    
    }

function dicas() {
    if (!jogoTerminado){
        if (numero_secreto > res) {
            dica.innerHTML = 'O número é maior <i class="fa-solid fa-arrow-up"></i>'
        }else{
            dica.innerHTML = 'O número é menor <i class="fa-solid fa-arrow-down"></i>'
        }
    }else{
        dica.className = 'hide'
    }
}


/*function textoReiniciar () {
    
    btn_vit.className = 'box_div'
    palpite_voce_disse.className = 'box'
    valor_palpite.className = 'box'
    valor_palpite.id = 'palpite'
    valor_palpite.innerHTML = ' -  -   '
    box1.innerHTML = 'Você disse: '
    box1.appendChild(valor_palpite)
    
    chances.className = '.box_chance'
    chances.innerHTML = contador
    box_texto_chance = chances
    box_texto_chance.className = 'box_chance'
    
    
    box2.innerHTML = 'Suas Chances: '
    box2.appendChild(box_texto_chance)
    
    jogoTerminado = false
    dica.innerHTML = ''
}*/



