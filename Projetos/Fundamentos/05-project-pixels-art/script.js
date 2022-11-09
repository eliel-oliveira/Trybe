const pixelB = document.getElementById('pixel-board');
// cria blocos com palletes de cores
function createPalette() {
  const colorPalette = document.getElementById('color-palette');
  for (let index = 0; index < 4; index += 1) {
    const color = document.createElement('div');
    color.className = 'color';
    colorPalette.appendChild(color);
  }
  document.getElementsByClassName('color')[0].className += ' selected';
}

function load() {
  const prop = document.getElementsByClassName('selected')[0].style.backgroundColor;
  return prop;
}

function loads(paint) {
  const paintB = paint;
  paintB.target.style.backgroundColor = load();
}

function paintBox() {
  const box = document.getElementsByClassName('pixel');
  for (let index = 0; index < box.length; index += 1) {
    box[index].addEventListener('click', loads);
  }
}

function blackFunc() {
  for (let index = 0; index < 4; index += 1) {
    const listView = document.getElementsByClassName('color')[index];
    listView.classList.remove('selected');
  }
  const addSelect = document.getElementsByClassName('color')[0];
  addSelect.classList.add('selected');
  load();
}

function redFunc() {
  for (let index = 0; index < 4; index += 1) {
    const listView = document.getElementsByClassName('color')[index];
    listView.classList.remove('selected');
  }
  const addSelect = document.getElementsByClassName('color')[1];
  addSelect.classList.add('selected');
  load();
}

function greenFunc() {
  for (let index = 0; index < 4; index += 1) {
    const listView = document.getElementsByClassName('color')[index];
    listView.classList.remove('selected');
  }
  const addSelect = document.getElementsByClassName('color')[2];
  addSelect.classList.add('selected');
  load();
}

function blueFunc() {
  for (let index = 0; index < 4; index += 1) {
    const listView = document.getElementsByClassName('color')[index];
    listView.classList.remove('selected');
  }
  const addSelect = document.getElementsByClassName('color')[3];
  addSelect.classList.add('selected');
  load();
}

function randonColor() {
  const array = '0123456789ABCDEF';
  let color = '#';
  for (let index = 0; index < 6; index += 1) {
    color += array[Math.floor(Math.random() * 16)];
  }
  console.log(color);
  return color;
}

// atribui cores para o pallete de cores
function changeColors() {
  const black = document.getElementsByClassName('color')[0];
  black.style.backgroundColor = 'black';
  black.addEventListener('click', blackFunc);
  const red = document.getElementsByClassName('color')[1];
  red.style.backgroundColor = randonColor();
  red.addEventListener('click', redFunc);
  const green = document.getElementsByClassName('color')[2];
  green.style.backgroundColor = randonColor();
  green.addEventListener('click', greenFunc);
  const blue = document.getElementsByClassName('color')[3];
  blue.style.backgroundColor = randonColor();
  blue.addEventListener('click', blueFunc);
}

function resize() {
  const inputValue = document.getElementById('board-size');
  let number = inputValue.value;
  if (number.length === 0) {
    number = 5;
  }
  number = parseInt(number, 10);
  if (number < 5) {
    number = 5;
  } if (number > 50) {
    number = 50;
  }
  return number;
}

function numberPixel() {
  const qtdPixel = resize();
  return qtdPixel;
}

// cria board com pixels
function pixelBoard() {
  const pixel = pixelB;
  const lineF = pixelB;
  for (let indexLine = 0; indexLine < numberPixel(); indexLine += 1) {
    const lineD = document.createElement('div');
    lineD.className = 'line';
    lineF.appendChild(lineD);
    for (let index = 0; index < numberPixel(); index += 1) {
      const line = document.createElement('div');
      line.className = 'pixel';
      // line.id = `${index}`;
      pixel.appendChild(line);
    }
  }
}

function resetBoard() {
  const resetPixel = document.getElementsByClassName('pixel').length;
  for (let index = 0; index < resetPixel; index += 1) {
    const RemoveItens = document.querySelector('.pixel');
    pixelB.removeChild(RemoveItens);
  }
}

function reloadBoard() {
  let input = document.getElementById('board-size').value;
  if (input.length === 0) {
    window.alert('Board inválido!');
  }
  input = parseInt(input, 10);
  if (input < 1) {
    window.alert('Board inválido!');
  } else {
    resetBoard();
    pixelBoard();
    resize();
    paintBox();
  }
}

// função para limpar todos blocos
function clearBox() {
  const reset = document.getElementsByClassName('pixel');
  for (let index = 0; index < reset.length; index += 1) {
    reset[index].style.backgroundColor = 'white';
  }
}

// botão LIMPAR chama funcão para limpar blocos
function clearBtn() {
  const clear = document.getElementById('clear-board');
  clear.addEventListener('click', clearBox);
}

const vqvBtn = document.getElementById('generate-board');
vqvBtn.addEventListener('click', reloadBoard);

// após carregamento da página, chama as funções necessárias
window.onload = function exe() {
  createPalette();
  changeColors();
  pixelBoard();
  paintBox();
  clearBtn();
};
