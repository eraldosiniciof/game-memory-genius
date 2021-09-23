let order = []
let clickedOrder = []
let score = 0
/*
0 é VERDE
1 é VERMELHO
2 é AMARELO
3 é AZUL
*/

const blue = document.querySelector('.blue')
const red = document.querySelector('.red')
const green = document.querySelector('.green')
const yellow = document.querySelector('.yellow')
const buttonStart = document.querySelector('button')

// Acende próxima cor
const ligthColor = (element, number) => {
  number = number * 500
  setTimeout(() => {
    element.classList.add('selected')
  }, number - 250)
  setTimeout(() => {
    element.classList.remove('selected')
  }, number)
}

// Função que retorna a cor
const createColorElement = color => {
  if (color === 0) {
    return green
  } else if (color === 1) {
    return red
  } else if (color === 2) {
    return yellow
  } else if (color === 3) {
    return blue
  }
}

// Cria ordem aleatória de cores
const shuffleOrder = () => {
  let colorOrder = Math.floor(Math.random() * 4)
  order[order.length] = colorOrder
  clickedOrder = []

  for (let i in order) {
    let elementColor = createColorElement(order[i])
    ligthColor(elementColor, Number(i) + 1)
  }
}

// Função para próximo nível do jogo
const nextLevel = () => {
  score++
  shuffleOrder()
}

// Função para iniciar o game
const playGame = () => {
  buttonStart.classList.add('hide')
  setTimeout(() => {
    score = 0
    nextLevel()
  }, 500)
}

// Função para game over
const gameOver = () => {
  buttonStart.classList.remove('hide')
  alert(`Pontuação: ${score}\nVocê perdeu o jogo!`)
  order = []
  clickedOrder = []
}

// Checa se os botões clicado são os mesmos da ordem gerada no jogo
const checkOrder = () => {
  for (let i in clickedOrder) {
    if (clickedOrder[i] !== order[i]) {
      return gameOver()
    }
  }
  if (clickedOrder.length === order.length) {
    // alert(`Potuação: ${score}\nVocê acertou! Iniciando próximo nível.`)
    setTimeout(() => {
      nextLevel()
    }, 700)
  }
}

// Função para o clique do usuário
const click = color => {
  clickedOrder[clickedOrder.length] = color
  createColorElement(color).classList.add('selected')

  setTimeout(() => {
    createColorElement(color).classList.remove('selected')
    checkOrder()
  }, 250)
}

// Eventos de cliquei do usuário
green.onclick = () => click(0)
red.onclick = () => click(1)
yellow.onclick = () => click(2)
blue.onclick = () => click(3)
