const API_URL = window.BRAINSPARK_API_URL || "http://127.0.0.1:8000";

// ===== AUTH GUARD =====
firebase.auth().onAuthStateChanged(user => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }
  // Show welcome
  const bar = document.getElementById("welcomeBar");
  const nameEl = document.getElementById("userName");
  if (bar && nameEl) {
    nameEl.textContent = user.displayName || "there";
    bar.style.display = "block";
  }
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

// ===== LOGOUT =====
document.getElementById("logoutBtn")?.addEventListener("click", async () => {
  await firebase.auth().signOut();
  window.location.href = "login.html";
});

// ===== FILE INPUT =====
const fileInput = document.getElementById("fileInput");
const fileName = document.getElementById("fileName");
const generateBtn = document.getElementById("generateBtn");
const errorBox = document.getElementById("errorBox");

fileInput?.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (file) {
    fileName.textContent = `Selected: ${file.name} ✅`;
    fileName.style.display = "block";
    generateBtn.disabled = false;
    hideError();
  }
});

// ===== GENERATE =====
generateBtn?.addEventListener("click", async () => {
  const file = fileInput.files[0];
  if (!file) return;

  hideError();
  generateBtn.disabled = true;
  generateBtn.textContent = "Generating...";
  sessionStorage.removeItem("quizData");
  document.getElementById("flashcardsSection").style.display = "none";

  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await fetch(`${API_URL}/upload-pdf`, { method: "POST", body: formData });
    if (!res.ok) throw new Error(`Server error: ${res.status}`);

    const data = await res.json();

    if (data.error) {
      showError("⚠️ " + data.error);
      return;
    }

    if (data.flashcards?.length) renderFlashcards(data.flashcards);
    if (data.quiz?.length) sessionStorage.setItem("quizData", JSON.stringify(data.quiz));

  } catch (err) {
    showError(err.message.includes("fetch")
      ? "⚠️ Cannot connect to backend. Make sure it is running."
      : "⚠️ " + err.message);
  } finally {
    generateBtn.disabled = false;
    generateBtn.textContent = "Generate Flashcards";
  }
});

// ===== FLASHCARDS RENDER =====
function renderFlashcards(cards) {
  const grid = document.getElementById("flashcardGrid");
  const section = document.getElementById("flashcardsSection");
  grid.innerHTML = "";

  cards.forEach((card, i) => {
    const el = document.createElement("div");
    el.className = "flashcard";
    el.dataset.flipped = "false";
    el.innerHTML = `
      <div class="flashcard-top">
        <span class="flashcard-label">Question</span>
        <span class="flashcard-hint">Tap to flip</span>
      </div>
      <p class="flashcard-text">${card.question}</p>
    `;
    el.addEventListener("click", () => {
      const flipped = el.dataset.flipped === "true";
      el.dataset.flipped = String(!flipped);
      el.querySelector(".flashcard-label").textContent = flipped ? "Question" : "Answer";
      el.querySelector(".flashcard-text").textContent = flipped ? card.question : card.answer;
    });
    grid.appendChild(el);
  });

  section.style.display = "block";
  section.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ===== HELPERS =====
function showError(msg) {
  errorBox.textContent = msg;
  errorBox.style.display = "block";
}
function hideError() {
  errorBox.style.display = "none";
  errorBox.textContent = "";
}

function scrollToFlashcards() {
  document.getElementById("flashcards")?.scrollIntoView({ behavior: "smooth" });
}

function goToQuiz() {
  const stored = sessionStorage.getItem("quizData");
  if (!stored || stored === "[]") {
    alert("Please generate flashcards first to unlock the quiz 📚");
    return;
  }
  window.location.href = "quiz.html";
}
