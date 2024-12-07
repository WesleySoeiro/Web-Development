const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition()

// Seleção de Elementos
let box1 = document.querySelector('.box1')
let palpite_voce_disse = document.querySelector('.box')
let box2 = document.querySelector('.box2')
let btn_chutar = document.querySelector('#btn_chutar')
let btn_vit = document.querySelector('.box_div')


let res = null
let isRecognitionActive = false


recognition.lang = 'pt-Br';
recognition.stop()
btn_chutar.addEventListener('click', () => {
       
    chances.innerHTML = contador
    if (!isRecognitionActive){
        recognition.start()
        isRecognitionActive = true}
    })
   

recognition.addEventListener('result', onSpeak)


function onSpeak(e) {
    
    const text = e.results[0][0].transcript
    res = parseInt(text)

    if (!isNaN(res) && res <= maiorValor){
        palpite.innerHTML = e.results[0][0].transcript
        validar()
        dicas()
        console.log(contador);
        
        chances.innerHTML = contador
    } else{
        alert('Valor inválido, Tente novamente!')
    }
}

recognition.addEventListener('end', () =>{
    isRecognitionActive = false
    recognition.stop()
})

