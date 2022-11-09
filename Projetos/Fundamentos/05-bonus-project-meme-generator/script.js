const img = document.getElementById('meme-image');
const container = document.getElementById('meme-image-container');
const textOutput = document.getElementById('meme-text');
document.getElementById('text-input').addEventListener('input', (event) => {
  const valueText = event.target.value;
  textOutput.innerHTML = valueText;
});

// Essa parte de inserir uma imagem do meu computador eu tive dificuldades
// travei no facepath, mas encontrei essa solução de para armazenar a imagem no FileReader
// para depois usa-la https://www.javascripture.com/FileReader#readAsDataURL
document
  .getElementById('meme-insert')
  .addEventListener('change', (inputEvent) => {
    const input = inputEvent.target;
    const reader = new FileReader();
    reader.onload = () => {
      const dataURL = reader.result;
      const output = document.getElementById('meme-image');
      output.src = dataURL;
    };
    reader.readAsDataURL(input.files[0]);
  });

document.getElementById('fire').addEventListener('click', () => {
  container.style.border = '3px dashed red';
});

document.getElementById('water').addEventListener('click', () => {
  container.style.border = '5px double blue';
});

document.getElementById('earth').addEventListener('click', () => {
  container.style.border = '6px groove green';
});

document.getElementById('meme-1').addEventListener('click', (event1) => {
  const capImg1 = event1;
  const img1 = capImg1.target.src;
  img.src = img1;
});

document.getElementById('meme-2').addEventListener('click', (event2) => {
  const capImg1 = event2;
  const img1 = capImg1.target.src;
  img.src = img1;
});

document.getElementById('meme-3').addEventListener('click', (event3) => {
  const capImg1 = event3;
  const img1 = capImg1.target.src;
  img.src = img1;
});

document.getElementById('meme-4').addEventListener('click', (event4) => {
  const capImg1 = event4;
  const img1 = capImg1.target.src;
  img.src = img1;
});
