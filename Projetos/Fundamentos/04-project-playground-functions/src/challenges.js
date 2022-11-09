// Desafio 1
//  Recebe 2 parametros booleans e Retorna true se ambos os valores são verdadeiros, e retorna false se algum dos valores não o for.
function compareTrue(p1, p2) {
  if (p1 === true && p2 === true) {
    return true;
  } return false;
}
// compareTrue(true,false) --> false
// compareTrue(false,false) --> false
// compareTrue(true,true) --> true

// Desafio 2 Crie uma função que calcule a área de um triângulo
function calcArea(base, height) {
  return (base * height) / 2;
}


// Desafio 3 ref https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/split
function splitSentence(string) {
  let array = string.split(' ');
  return array;
}

// Desafio 4
function concatName(arrays) {
  let ultimoPrimeiro = `${arrays[arrays.length - 1]}, ${arrays[0]}`;
  return ultimoPrimeiro;
}

// Desafio 5
function footballPoints(wins, ties) {
  return (wins * 3) + ties;
}

// Desafio 6
function highestCount(repMaior) {
  let maiorNum = repMaior[0];
  let contador = 1;
  for (let index = 1; index < repMaior.length; index += 1) {
    if (repMaior[index] > maiorNum) {
      contador = 1;
      maiorNum = repMaior[index];
    } else if (repMaior[index] === maiorNum) {
      contador += 1;
    }
  }
  return contador;
}

// Desafio 7
function catAndMouse(mouse, cat1, cat2) {
  let proximidade = (cat1 - mouse) + (cat2 - mouse);
  if (proximidade === 0) {
    return 'os gatos trombam e o rato foge';
  } if (cat1 - mouse < cat2 - mouse) {
    return 'cat1';
  } return 'cat2';
}

// Desafio 8
function fizzBuzz(numbers) {
  for (let index = 0; index < numbers.length; index += 1) {
    if (numbers[index] % 3 === 0 && numbers[index] % 5 === 0) {
      numbers[index] = ('fizzBuzz');
    } else if (numbers[index] % 3 === 0) {
      numbers[index] = ('fizz');
    } else if (numbers[index] % 5 === 0) {
      numbers[index] = ('buzz');
    } else {
      numbers[index] = ('bug!');
    }
  }
  return numbers;
}

// Desafio 9 ref https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/replace
function encode(text) {
  let enc = text.replace(/a/g, '1')
    .replace(/e/g, '2')
    .replace(/i/g, '3')
    .replace(/o/g, '4')
    .replace(/u/g, '5');
  return enc;
}

function decode(text) {
  let dec = text.replace(/1/g, 'a')
    .replace(/2/g, 'e')
    .replace(/3/g, 'i')
    .replace(/4/g, 'o')
    .replace(/5/g, 'u');
  return dec;
}

// Desafio 10
function techList(tech, name) {
  tech = tech.sort();
  let result = [];
  if (tech.length === 0) {
    return 'Vazio!';
  }
  for (let index = 0; index < tech.length; index += 1) {
    let obj = {
      tech: tech[index],
      name,
    };
    result.push(obj);
  }
  return result;
}

// module.exports = {
//   calcArea,
//   catAndMouse,
//   compareTrue,
//   concatName,
//   decode,
//   encode,
//   fizzBuzz,
//   footballPoints,
//   highestCount,
//   splitSentence,
//   techList,
// };
