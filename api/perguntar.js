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

    const resposta = `Você perguntou: ${pergunta}. A matéria selecionada foi: ${materia}.`;

    return res.status(200).json({
      resposta: resposta
    });

  } catch (erro) {
    return res.status(500).json({
      erro: "Ocorreu um erro."
    });
  }
}
