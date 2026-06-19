from dotenv import load_dotenv
import os

load_dotenv()
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from groq import Groq
from dotenv import load_dotenv
import fitz
import os
import json
import re

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

app = FastAPI()

# Allow localhost for dev + production frontend URL
allowed_origins = ["http://localhost:3000", "http://localhost:5500", "http://127.0.0.1:5500"]
frontend_url = os.getenv("FRONTEND_URL")
if frontend_url:
    allowed_origins.append(frontend_url)

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_FOLDER = "uploads"
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)


@app.get("/")
def home():
    return {"message": "BrainSpark backend is running!"}


@app.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):
    try:
        file_path = os.path.join(UPLOAD_FOLDER, file.filename)

        with open(file_path, "wb") as f:
            content = await file.read()
            f.write(content)

        # Extract PDF text
        doc = fitz.open(file_path)
        extracted_text = ""
        for page in doc:
            extracted_text += page.get_text()
        doc.close()

        # Clean up uploaded file after reading
        os.remove(file_path)

        text_for_ai = extracted_text[:4000]

        if not text_for_ai.strip():
            return {"error": "Could not extract text from PDF. Please ensure the PDF has readable text."}

        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "system",
                    "content": "You are an expert teacher. Return ONLY valid JSON. No markdown, no backticks, no explanation."
                },
                {
                    "role": "user",
                    "content": f"""Generate:
1. 5 flashcards
2. 5 MCQ quiz questions

Return in this EXACT format (valid JSON only):

{{
  "flashcards": [
    {{
      "question": "Question here",
      "answer": "Answer here"
    }}
  ],
  "quiz": [
    {{
      "question": "Question here",
      "options": ["option1", "option2", "option3", "option4"],
      "answer": "correct option (must match one of the options exactly)"
    }}
  ]
}}

Study Material:
{text_for_ai}"""
                }
            ],
            temperature=0.3
        )

        response_text = completion.choices[0].message.content

        cleaned_response = re.sub(r"```json|```", "", response_text).strip()

        try:
            ai_data = json.loads(cleaned_response)
        except Exception as e:
            print("JSON PARSE ERROR:", e)
            print("Raw response:", response_text)
            return {"error": "AI returned invalid JSON. Please try again."}

        # Validate structure
        if "flashcards" not in ai_data or "quiz" not in ai_data:
            return {"error": "AI response missing required fields. Please try again."}

        return ai_data

    except Exception as e:
        print("SERVER ERROR:", e)
        return {"error": str(e)}
