const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition()
const palpite = document.querySelector('.box')
const btn_chutar = document.querySelector('#btn_chutar')
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
        //vitoria()
        dicas()
    } else{
        alert('Valor inválido, Tente novamente!')
    }
}

recognition.addEventListener('end', () =>{
    isRecognitionActive = false
    recognition.stop()
})

