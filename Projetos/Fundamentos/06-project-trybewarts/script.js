// header login and password
const email = document.getElementById('email');
const password = document.getElementById('pass');
// button loggin validation
document.getElementById('btn-login').addEventListener('click', (event) => {
  event.preventDefault();
  if (email.value === 'tryber@teste.com' && password.value === '123456') {
    window.alert('Olá, Tryber!');
  } else {
    window.alert('Email ou senha inválidos.');
  }
});

// requisito 18
const checkAgreement = document.getElementById('agreement');
const submitBtn = document.getElementById('submit-btn');

checkAgreement.addEventListener('change', () => {
  if (checkAgreement.checked === true) {
    submitBtn.disabled = false;
  }
  if (checkAgreement.checked === false) {
    submitBtn.disabled = true;
  }
});

// forms data
const nome = document.getElementById('input-name');
const sobrenome = document.getElementById('input-lastname');
const inputEmail = document.getElementById('input-email');
const house = document.getElementById('house');
const labelFamily = document.querySelectorAll('.familyRadio');
const subjects = document.querySelectorAll('.subject');
const rate = document.querySelectorAll('.rateClass');
const obs = document.getElementById('textarea');
// create paragraphs
const createFullName = document.createElement('p');
const createEmail = document.createElement('p');
const createHouse = document.createElement('p');
const createObs = document.createElement('p');
const createFamily = document.createElement('p');
const createSubjects = document.createElement('p');
const createAvaliation = document.createElement('p');

// requisito 20
const contCaracters = document.getElementById('counter');
const textArea = document.getElementById('textarea');
document.getElementById('textarea').addEventListener('input', () => {
  const qtd = textArea.value.length;
  const limit = 500;
  contCaracters.innerText = limit - qtd;
});
// requisito 21
function family() {
  for (let index = 0; index < labelFamily.length; index += 1) {
    if (labelFamily[index].checked === true) {
      return labelFamily[index].value;
    }
  }
  return 'Nenhuma fámilia selecionada';
}

function selectedSubjects() {
  const arraySubjects = [];
  for (let index = 0; index < subjects.length; index += 1) {
    if (subjects[index].checked === true) {
      arraySubjects.push(` ${subjects[index].value}`);
    }
    if (arraySubjects === '') {
      return 'Nenhuma matéria selecionada';
    }
  }
  return arraySubjects;
}

function avaliation() {
  for (let index = 0; index < rate.length; index += 1) {
    if (rate[index].checked === true) {
      return rate[index].value;
    }
  }
  return 'Nenhuma fámilia selecionada';
}
const form = document.getElementById('evaluation-form');
submitBtn.addEventListener('click', (submit) => {
  submit.preventDefault();
  form.innerHTML = '';
  createFullName.innerText = `Nome: ${nome.value} ${sobrenome.value}`;
  form.appendChild(createFullName);
  createEmail.innerText = `Email: ${inputEmail.value}`;
  form.appendChild(createEmail);
  createHouse.innerText = `Casa: ${house.value}`;
  form.appendChild(createHouse);
  createFamily.innerText = `Família: ${family()}`;
  form.appendChild(createFamily);
  createSubjects.innerText = `Matérias: ${selectedSubjects()}`;
  form.appendChild(createSubjects);
  createAvaliation.innerText = `Avaliação: ${avaliation()}`;
  form.appendChild(createAvaliation);
  createObs.innerText = `Observações: ${obs.value}`;
  form.appendChild(createObs);
});
