const spanList = document.getElementById('carta-gerada');
const styleGroup = ['newspaper', 'magazine1', 'magazine2'];
const lengthGroup = ['medium', 'big', 'reallybig'];
const rotateGroup = ['rotateleft', 'rotateright'];
const inclinationGroup = ['skewleft', 'skewright'];

function checkInput() {
  const checkIn = document.getElementById('carta-texto').value;
  if (checkIn === ' ' || checkIn === '') {
    spanList.innerText = 'Por favor, digite o conteúdo da carta.';
  } else {
    spanList.innerText = '';
  }
}

function reload(event) {
  const on = event.target;
  for (let index = 0; index < 3; index += 1) {
    on.classList.remove(styleGroup[index]);
    on.classList.remove(lengthGroup[index]);
    on.classList.remove(rotateGroup[index]);
    on.classList.remove(inclinationGroup[index]);
  }
  const random3 = Math.floor(Math.random() * (0, 3));
  const random2 = Math.floor(Math.random() * (0, 2));
  on.classList.add(styleGroup[random3]);
  on.classList.add(lengthGroup[random3]);
  on.classList.add(rotateGroup[random2]);
  on.classList.add(inclinationGroup[random2]);
}

document.getElementById('criar-carta').addEventListener('click', () => {
  checkInput();
  const textInput = document.getElementById('carta-texto').value;
  const space = ' ';
  const textArray = textInput.split(space);
  document.getElementById('carta-contador').innerText = textArray.length;
  console.log(textArray);
  for (let index = 0; index < textArray.length; index += 1) {
    const span = document.createElement('span');
    span.addEventListener('click', reload);
    spanList.appendChild(span);
    const random3 = Math.floor(Math.random() * (0, 3));
    const random2 = Math.floor(Math.random() * (0, 2));
    span.classList.add(styleGroup[random3]);
    span.classList.add(lengthGroup[random3]);
    span.classList.add(rotateGroup[random2]);
    span.classList.add(inclinationGroup[random2]);
    span.innerText = `${textArray[index]}`;
  }
});
