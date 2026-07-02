# 🧠 BrainSpark — AI-Powered Flashcard & Quiz Generator

BrainSpark transforms your PDF study material into smart flashcards and quizzes using AI — making learning faster, smarter, and more effective.

## ✨ Features

- 📄 **PDF Upload** — Upload any PDF study material
- 🧠 **AI Flashcards** — Instantly generates 5 smart flashcards from your content
- ❓ **Quiz Mode** — 5 MCQ questions with auto-scoring and countdown timer
- 🌙 **Dark / Light Mode** — Toggle between themes
- 🔐 **Google Authentication** — Secure login via Firebase
- 📱 **Responsive Design** — Works on mobile and desktop

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Vanilla HTML, CSS, JavaScript |
| Backend | Python, FastAPI |
| AI Model | Groq API (`llama-3.3-70b-versatile`) |
| PDF Parsing | PyMuPDF |
| Authentication | Firebase Google Auth |
| Deployment | GitHub Pages + Render |

---

## 📁 Project Structure

```
BrainSpark/
├── frontend/
│   ├── login.html        # Google login page
│   ├── index.html        # Home + flashcard generator
│   ├── quiz.html         # Quiz page
│   ├── style.css         # All styles
│   ├── app.js            # Main app logic
│   ├── quiz.js           # Quiz logic
│   └── firebase-config.js # Firebase + API config
│
├── backend/
│   ├── main.py           # FastAPI app
│   ├── requirements.txt  # Python dependencies
│   └── .env.example      # Environment variables template
│
└── README.md
```

---

## ⚙️ Local Setup

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # Mac/Linux
pip install -r requirements.txt
cp .env.example .env         # Add your GROQ_API_KEY
uvicorn main:app --reload
```
Runs at `http://127.0.0.1:8000`

### Frontend
Open `frontend/index.html` with **Live Server** (VS Code extension) or:
```bash
cd frontend
python -m http.server 5500
```
Runs at `http://localhost:5500`

> Make sure `firebase-config.js` has your Firebase project values before running.

---

## 🔐 Environment Variables

### Backend `.env`
```
GROQ_API_KEY=your_groq_api_key
FRONTEND_URL=https://shreya29t.github.io
```

### Frontend `firebase-config.js`
```js
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  ...
};
firebase.initializeApp(firebaseConfig);
window.BRAINSPARK_API_URL = "https://your-backend.onrender.com";
```

---

## 🌐 Deployment

### Backend → Render
- Root: `backend`
- Build: `pip install -r requirements.txt`
- Start: `uvicorn main:app --host 0.0.0.0 --port $PORT`
- Env vars: `GROQ_API_KEY`, `FRONTEND_URL`

### Frontend → GitHub Pages
- Repo Settings → Pages → Source: `main` → `/frontend` folder

---

## 📸 Screenshots


---

## 👩‍💻 Author

**Shreya** — [GitHub](https://github.com/shreya29t)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
