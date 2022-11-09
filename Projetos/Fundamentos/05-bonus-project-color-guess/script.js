const line = document.querySelector('.colorList');
const paintBall = document.getElementsByClassName('ball');
let scor = 0;
document.getElementById('score').innerText = scor;

function scoreValue() {
  document.getElementById('answer').innerText = 'Acertou!';
  scor += 3;
  document.getElementById('score').innerText = scor;
}

// recebe como parametro evento do click e recupera cor do círculo clicado e compara respostas
function checkAnswer(paint) {
  const getColor = paint.target.style.backgroundColor;
  // console.log(getColor);
  const answer = document.getElementById('rgb-color').innerText;
  if (answer !== getColor) {
    document.getElementById('answer').innerText = 'Errou! Tente novamente!';
  } else {
    scoreValue();
  }
}

// adiciona addEventLister ao clicar em um círculo
document.querySelector('.colorList').addEventListener('click', checkAnswer);

// gera cores aleatórias para serem usadas para pintar círculos
function randomColor() {
  let color = 'rgb(';
  const red = Math.floor(Math.random() * (0, 255));
  const green = Math.floor(Math.random() * (0, 255));
  const blue = Math.floor(Math.random() * (0, 255));
  color += `${red} ,${green} ,${blue})`;
  // console.log(color);
  return color;
}

// pinta circulos utilizando cores aleatórias e gera cor a ser adivinhada
function genColor() {
  for (let index = 0; index < paintBall.length; index += 1) {
    paintBall[index].style.backgroundColor = randomColor();
  }
  // gera cor a ser adivinhada
  const numberRandom = Math.floor(Math.random() * (0, 6));
  const rgbNumbers = paintBall[numberRandom].style.backgroundColor;
  document.getElementById('rgb-color').innerText = rgbNumbers;
  document.getElementById('answer').innerText = 'Escolha uma cor';
}

// gera circulos com elementos filhos de colorList(line)
function ballGen() {
  for (let index = 0; index < 6; index += 1) {
    const ball = document.createElement('div');
    ball.classList.add('ball');
    line.appendChild(ball);
  }
  genColor();
}

// gera código rgb a ser adivinhado
function genRgb() {
  document.getElementById('reset-game').addEventListener('click', genColor);
}

// chama funções após carregamento da página
window.onload = function exe() {
  ballGen();
  genRgb();
};
