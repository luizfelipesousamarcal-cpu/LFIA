let history = JSON.parse(localStorage.getItem("history")) || [];

function addResult(result) {
  history.unshift(result);
  localStorage.setItem("history", JSON.stringify(history));
  updateDashboard();
}

function clearHistory() {
  if (confirm("Deseja apagar todo o histórico?")) {
    history = [];
    localStorage.removeItem("history");
    updateDashboard();
  }
}

function updateDashboard() {
  const player = history.filter(item => item === "PLAYER").length;
  const banker = history.filter(item => item === "BANKER").length;
  const tie = history.filter(item => item === "TIE").length;

  document.getElementById("playerCount").textContent = player;
  document.getElementById("bankerCount").textContent = banker;
  document.getElementById("tieCount").textContent = tie;

  const recent = history.slice(0, 30);

  document.getElementById("historyList").innerHTML =
    recent.length
      ? recent.map(item => `<span class="result ${item.toLowerCase()}">${item}</span>`).join("")
      : "<p>Nenhum resultado registrado.</p>";

  updateSignal(recent);
}

function updateSignal(recent) {
  const signalText = document.getElementById("signalText");
  const confidenceText = document.getElementById("confidenceText");
  const confidenceBar = document.getElementById("confidenceBar");
  const signalReasons = document.getElementById("signalReasons");

  if (recent.length < 5) {
    signalText.textContent = "⚪ AGUARDANDO DADOS";
    confidenceText.textContent = "Confiança: 0%";
    confidenceBar.style.width = "0%";
    signalReasons.innerHTML =
      "<li>Registre pelo menos 5 resultados.</li>";
    return;
  }

  const player = recent.filter(item => item === "PLAYER").length;
  const banker = recent.filter(item => item === "BANKER").length;

  let signal;
  let confidence;
  let reasons = [];

  if (player > banker) {
    signal = "PLAYER";
    confidence = Math.min(85, 55 + (player - banker) * 4);
    reasons.push(`PLAYER apareceu ${player} vezes.`);
    reasons.push(`BANKER apareceu ${banker} vezes.`);
  } else if (banker > player) {
    signal = "BANKER";
    confidence = Math.min(85, 55 + (banker - player) * 4);
    reasons.push(`BANKER apareceu ${banker} vezes.`);
    reasons.push(`PLAYER apareceu ${player} vezes.`);
  } else {
    signal = "SEM TENDÊNCIA";
    confidence = 50;
    reasons.push("PLAYER e BANKER estão equilibrados.");
  }

  signalText.textContent = `🟡 SINAL: ${signal}`;
  confidenceText.textContent = `Confiança estatística: ${confidence}%`;
  confidenceBar.style.width = `${confidence}%`;

  signalReasons.innerHTML =
    reasons.map(reason => `<li>${reason}</li>`).join("");
}

updateDashboard();
