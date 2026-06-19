// ===== AUTH GUARD =====
firebase.auth().onAuthStateChanged(user => {
  if (!user) window.location.href = "login.html";
});

// ===== THEME =====
const themeBtn = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("theme") || "light";
document.body.className = savedTheme;
if (themeBtn) themeBtn.textContent = savedTheme === "dark" ? "☀️" : "🌙";

themeBtn?.addEventListener("click", () => {
  const isDark = document.body.classList.contains("dark");
  document.body.className = isDark ? "light" : "dark";
  localStorage.setItem("theme", isDark ? "light" : "dark");
  themeBtn.textContent = isDark ? "🌙" : "☀️";
});

document.getElementById("logoutBtn")?.addEventListener("click", async () => {
  await firebase.auth().signOut();
  window.location.href = "login.html";
});

// ===== QUIZ LOGIC =====
const stored = sessionStorage.getItem("quizData");
if (!stored || stored === "[]") {
  window.location.href = "index.html";
}

let quizData = [];
try {
  quizData = JSON.parse(stored);
  if (!quizData?.length) window.location.href = "index.html";
} catch {
  window.location.href = "index.html";
}

let currentQ = 0;
let score = 0;
let selected = null;
let countdownInterval = null;

const qNum = document.getElementById("qNum");
const qTotal = document.getElementById("qTotal");
const questionText = document.getElementById("questionText");
const optionsList = document.getElementById("optionsList");
const scoreDisplay = document.getElementById("scoreDisplay");
const progressFill = document.getElementById("progressFill");
const countdownEl = document.getElementById("countdown");
const quizContainer = document.getElementById("quizContainer");
const scoreScreen = document.getElementById("scoreScreen");

qTotal.textContent = `/${quizData.length}`;
quizContainer.style.display = "block";
renderQuestion();

function renderQuestion() {
  const q = quizData[currentQ];
  selected = null;
  clearInterval(countdownInterval);
  countdownEl.style.display = "none";

  qNum.textContent = currentQ + 1;
  questionText.textContent = q.question;
  progressFill.style.width = `${(currentQ / quizData.length) * 100}%`;

  optionsList.innerHTML = "";
  const letters = ["A", "B", "C", "D"];

  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.style.color = "#e2e8f0";
    btn.innerHTML = `
      <span class="option-letter" style="color:#e2e8f0">${letters[i]}.</span>
      <span class="option-text">${opt}</span>
      <span class="option-mark"></span>
    `;
    btn.addEventListener("click", () => handleAnswer(opt, q.answer));
    optionsList.appendChild(btn);
  });
}

function handleAnswer(chosen, correct) {
  if (selected) return;
  selected = chosen;

  if (chosen === correct) score++;
  scoreDisplay.textContent = score;

  // Color options
  Array.from(optionsList.children).forEach(btn => {
    btn.disabled = true;
    const optText = btn.querySelector(".option-text").textContent;
    const letterEl = btn.querySelector(".option-letter");
    const markEl = btn.querySelector(".option-mark");

    if (optText === correct) {
      btn.style.color = "#34d399";
      letterEl.style.color = "#34d399";
      markEl.textContent = "✓";
      markEl.style.color = "#34d399";
    } else if (optText === chosen) {
      btn.style.color = "#f87171";
      letterEl.style.color = "#f87171";
      markEl.textContent = "✗";
      markEl.style.color = "#f87171";
      btn.querySelector(".option-text").style.textDecoration = "line-through";
    } else {
      btn.style.color = "#475569";
      letterEl.style.color = "#475569";
    }
  });

  // Update progress bar
  progressFill.style.width = `${((currentQ + 1) / quizData.length) * 100}%`;

  // Countdown
  let count = 3;
  countdownEl.textContent = count;
  countdownEl.style.display = "flex";

  countdownInterval = setInterval(() => {
    count--;
    if (count <= 0) {
      clearInterval(countdownInterval);
      countdownEl.style.display = "none";
      if (currentQ < quizData.length - 1) {
        currentQ++;
        renderQuestion();
      } else {
        showScore();
      }
    } else {
      countdownEl.textContent = count;
    }
  }, 1000);
}

function showScore() {
  quizContainer.style.display = "none";
  scoreScreen.style.display = "block";

  const pct = Math.round((score / quizData.length) * 100);
  const emoji = pct === 100 ? "🏆" : pct >= 70 ? "🎉" : pct >= 40 ? "👍" : "💪";

  document.getElementById("scoreEmoji").textContent = emoji;
  document.getElementById("finalScore").textContent = score;
  document.getElementById("finalTotal").textContent = quizData.length;
  document.getElementById("percentText").textContent = `${pct}% correct`;

  const bar = document.getElementById("scoreBar");
  bar.style.backgroundColor = pct >= 70 ? "#34d399" : pct >= 40 ? "#fbbf24" : "#f87171";
  setTimeout(() => { bar.style.width = `${pct}%`; }, 100);
}
