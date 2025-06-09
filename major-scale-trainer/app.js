// 簡易なフラッシュカードアプリ（JavaScript、HTML）
// ブラウザで動作します。TypeScript変換も容易なように記述
const keys = [
  { name: "C", scale: ["ド", "レ", "ミ", "ファ", "ソ", "ラ", "シ", "ド"] },
  { name: "D", scale: ["レ", "ミ", "ファ#", "ソ", "ラ", "シ", "ド#", "レ"] },
  { name: "E", scale: ["ミ", "ファ#", "ソ#", "ラ", "シ", "ド#", "レ#", "ミ"] },
  { name: "F", scale: ["ファ", "ソ", "ラ", "シ♭", "ド", "レ", "ミ", "ファ"] },
  { name: "G", scale: ["ソ", "ラ", "シ", "ド", "レ", "ミ", "ファ#", "ソ"] },
  { name: "A", scale: ["ラ", "シ", "ド#", "レ", "ミ", "ファ#", "ソ#", "ラ"] },
  { name: "B", scale: ["シ", "ド#", "レ#", "ミ", "ファ#", "ソ#", "ラ#", "シ"] },
  { name: "B♭", scale: ["シ♭", "ド", "レ", "ミ♭", "ファ", "ソ", "ラ", "シ♭"] },
  { name: "E♭", scale: ["ミ♭", "ファ", "ソ", "ラ♭", "シ♭", "ド", "レ", "ミ♭"] },
  { name: "A♭", scale: ["ラ♭", "シ♭", "ド", "レ♭", "ミ♭", "ファ", "ソ", "ラ♭"] },
  { name: "D♭", scale: ["レ♭", "ミ♭", "ファ", "ソ♭", "ラ♭", "シ♭", "ド", "レ♭"] },
  { name: "G♭", scale: ["ソ♭", "ラ♭", "シ♭", "ド♭", "レ♭", "ミ♭", "ファ", "ソ♭"] }
];

const stats = new Map(keys.map(k => [k.name, { correct: 0, total: 0 }]));
let lastKey = null;
let currentKey = null;

function weightedRandomKey() {
  const weights = keys.map(k => {
    const s = stats.get(k.name);
    const acc = s.total > 0 ? (1 - s.correct / s.total) + 0.1 : 1.5;
    return { key: k, weight: acc };
  });

  const filtered = weights.filter(w => w.key.name !== lastKey);
  const totalWeight = filtered.reduce((sum, w) => sum + w.weight, 0);
  const r = Math.random() * totalWeight;

  let acc = 0;
  for (const w of filtered) {
    acc += w.weight;
    if (r < acc) return w.key;
  }
  return filtered[0].key;
}

function showQuestion() {
  currentKey = weightedRandomKey();
  lastKey = currentKey.name;

  const app = document.getElementById("app");
  app.innerHTML = `
    <h2>このキーの音階は？</h2>
    <div style="font-size: 2rem; margin: 1rem;">${currentKey.name}</div>
    <button id="showAnswer">答えを見る</button>
  `;

  document.getElementById("showAnswer").onclick = () => showAnswer();
}

function showAnswer() {
  const app = document.getElementById("app");
  app.innerHTML += `
    <div style="margin-top: 1rem; font-size: 1.5rem;">
      正解: ${currentKey.scale.join("、")}
    </div>
    <div style="margin-top: 1rem;">
      <button id="btnCorrect">正解だった</button>
      <button id="btnWrong">間違えた</button>
    </div>
  `;
  document.getElementById("btnCorrect").onclick = () => recordResult(true);
  document.getElementById("btnWrong").onclick = () => recordResult(false);
}

function recordResult(isCorrect) {
  const stat = stats.get(currentKey.name);
  stat.total++;
  if (isCorrect) stat.correct++;
  showQuestion();
  renderStats();
}

function renderStats() {
  const statsDiv = document.getElementById("stats");
  const tableRows = Array.from(stats.entries()).map(([key, s]) => {
    const rate = s.total > 0 ? `${Math.round((s.correct / s.total) * 100)}%` : "-";
    return `<tr><td>${key}</td><td>${s.correct}</td><td>${s.total}</td><td>${rate}</td></tr>`;
  });

  statsDiv.innerHTML = `
    <h3>成績</h3>
    <table>
      <tr><th>キー</th><th>正解数</th><th>出題数</th><th>正解率</th></tr>
      ${tableRows.join("")}
    </table>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  const container = document.createElement("div");
  container.id = "app";
  document.body.appendChild(container);

  const btn = document.createElement("button");
  btn.textContent = "スタート";
  btn.onclick = () => {
    btn.remove();
    showQuestion();
  };
  document.body.appendChild(btn);
});

