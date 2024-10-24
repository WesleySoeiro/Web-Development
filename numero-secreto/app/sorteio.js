const menorValor = 1
const maiorValor = 20
let numero_secreto = null
const elMenorValor = document.querySelector('#menor_valor')
const elMaiorValor = document.querySelector('#maior_valor')

gerarNumeroAleatorio()
function gerarNumeroAleatorio() {
    numero_secreto = parseInt(Math.random() * maiorValor + 1)
    return numero_secreto
}

elMenorValor.innerHTML = menorValor
elMaiorValor.innerHTML = maiorValor


console.log('Número Secreto: ', numero_secreto)



