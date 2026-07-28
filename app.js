let materiaSelecionada = "";

const botoesMateria = document.querySelectorAll(".materia");
const pergunta = document.getElementById("pergunta");
const botaoPerguntar = document.getElementById("botaoPerguntar");
const resposta = document.getElementById("resposta");

botoesMateria.forEach((botao) => {
  botao.addEventListener("click", () => {

    botoesMateria.forEach((item) => {
      item.classList.remove("selecionada");
    });

    botao.classList.add("selecionada");

    materiaSelecionada = botao.dataset.materia;

    resposta.innerHTML = `
      <h2>📚 ${materiaSelecionada}</h2>
      <p>Matéria selecionada! Agora escreva sua pergunta.</p>
    `;
  });
});

botaoPerguntar.addEventListener("click", () => {

  const textoPergunta = pergunta.value.trim();

  if (materiaSelecionada === "") {
    resposta.innerHTML = `
      <h2>⚠️ Escolha uma matéria</h2>
      <p>Toque em Matemática, Português, Geografia, Ciências ou História antes de perguntar.</p>
    `;
    return;
  }

  if (textoPergunta === "") {
    resposta.innerHTML = `
      <h2>⚠️ Escreva uma pergunta</h2>
      <p>Digite sua dúvida antes de apertar o botão.</p>
    `;
    return;
  }

  let respostaLFIA = "";

  if (
    textoPergunta.toLowerCase().includes("fração") ||
    textoPergunta.toLowerCase().includes("fracao")
  ) {

    respostaLFIA = `
      Uma fração representa uma parte de alguma coisa.

      Por exemplo:

      <strong>1/2</strong> significa uma de duas partes iguais.

      Se você dividir uma pizza em 2 pedaços iguais e comer 1 pedaço, você comeu <strong>1/2 da pizza</strong>. 🍕
    `;

  } else {

    respostaLFIA = `
      Você perguntou:

      <strong>${textoPergunta}</strong>

      A LFIA recebeu sua pergunta sobre <strong>${materiaSelecionada}</strong>. 📚
    `;
  }

  resposta.innerHTML = `
    <h2>🤖 Resposta da LFIA</h2>

    <p><strong>Matéria:</strong> ${materiaSelecionada}</p>

    <p>${respostaLFIA}</p>
  `;

});
