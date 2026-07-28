export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      erro: "Método não permitido"
    });
  }

  try {
    const { pergunta, materia } = req.body;

    if (!pergunta) {
      return res.status(400).json({
        erro: "Digite uma pergunta."
      });
    }

    const resposta = `Olá! 👋 Eu sou a LFIA.

Você perguntou: "${pergunta}"

Matéria: ${materia || "Não selecionada"}

Ainda estou sendo conectada a uma IA real. 🤖
Por enquanto, recebi sua pergunta corretamente!`;

    return res.status(200).json({
      resposta: resposta
    });

  } catch (erro) {
    return res.status(500).json({
      erro: "Erro ao responder."
    });
  }
}
