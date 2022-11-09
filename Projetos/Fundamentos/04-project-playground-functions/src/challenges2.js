// Desafio 11 ref https://www.w3schools.com/jsref/jsref_splice.asp //https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/join
function generatePhoneNumber(number) {
  if (number.length !== 11) {
    return 'Array com tamanho incorreto.';
  }
  let cont;
  for (let index = 0; index < number.length; index += 1) {
    cont = 0;
    for (let index1 = 0; index1 < number.length; index1 += 1) {
      if (number[index] === number[index1]) {
        cont += 1;
      } if (cont === 3) {
        return 'não é possível gerar um número de telefone com esses valores';
      }
    }
  }
  number.splice(0, 0, '(');
  number.splice(3, 0, ')');
  number.splice(4, 0, ' ');
  number.splice(10, 0, '-');
  number = number.join('');
  if (number.length !== 15 || cont >= 3) {
    return 'não é possível gerar um número de telefone com esses valores';
  } return number;
}

// Desafio 12
function triangleCheck(lineA, lineB, lineC) {
  if (lineA < lineB + lineC && lineB < lineA + lineC && lineC < lineA + lineC) {
    return true;
  }
  return false;
}

// Desafio 13 ref https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/parseInt
function hydrate(bebidas) {
  let num = bebidas.replace(/[^0-9]/g, '');
  let array = [];
  let soma = 0;
  for (let index = 0; index < num.length; index += 1) {
    array.push(num[index]);
    let int = array[index];
    int = parseInt(int, 10);
    soma += int;
  } if (soma === 1) {
    return `${soma} copo de água`;
  } return `${soma} copos de água`;
}
//

module.exports = {
  generatePhoneNumber,
  hydrate,
  triangleCheck,
};
