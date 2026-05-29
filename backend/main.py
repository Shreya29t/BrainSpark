from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from groq import Groq
from dotenv import load_dotenv
import fitz
import os
import json
import re

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_FOLDER = "uploads"

if not os.path.exists(
    UPLOAD_FOLDER
):
    os.makedirs(
        UPLOAD_FOLDER
    )


@app.get("/")
def home():
    return {
        "message":
        "Backend working!"
    }


@app.post("/upload-pdf")
async def upload_pdf(
    file: UploadFile = File(...)
):
    try:

        file_path = os.path.join(
            UPLOAD_FOLDER,
            file.filename
        )

        with open(
            file_path,
            "wb"
        ) as f:
            content = await file.read()
            f.write(content)

        # Extract PDF text
        doc = fitz.open(
            file_path
        )

        extracted_text = ""

        for page in doc:
            extracted_text += (
                page.get_text()
            )

        doc.close()

        text_for_ai = (
            extracted_text[:4000]
        )

        completion = (
            client.chat.completions.create(
                model="llama-3.3-70b-versatile",
                messages=[
                    {
                        "role":
                        "system",
                        "content":
                        """
You are an expert teacher.

Return ONLY valid JSON.
No markdown.
"""
                    },
                    {
                        "role":
                        "user",
                        "content":
f"""
Generate:

1. 5 flashcards
2. 5 MCQ quiz questions

Return in this EXACT format:

{{
  "flashcards": [
    {{
      "question":
      "Question here",

      "answer":
      "Answer here"
    }}
  ],

  "quiz": [
    {{
      "question":
      "Question here",

      "options": [
        "option1",
        "option2",
        "option3",
        "option4"
      ],

      "answer":
      "correct option"
    }}
  ]
}}

Study Material:
{text_for_ai}
"""
                    }
                ],
                temperature=0.3
            )
        )

        response_text = (
            completion
            .choices[0]
            .message.content
        )

        cleaned_response = re.sub(
            r"```json|```",
            "",
            response_text
        ).strip()

        try:
            ai_data = json.loads(
                cleaned_response
            )

        except Exception as e:
            print(
                "JSON ERROR:",
                e
            )

            ai_data = {
                "flashcards": [],
                "quiz": []
            }

        return ai_data

    except Exception as e:
        print(
            "SERVER ERROR:",
            e
        )

        return {
            "error":
            str(e)
        }