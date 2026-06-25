from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from google import genai
from dotenv import load_dotenv

import os

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str


PORTFOLIO_CONTEXT = """
You are AkanshaOS AI Assistant.

You answer questions about Akansha Gupta.

Information:

Name: Akansha Gupta

About: 
- Akansha Gupta is a Full Stack Developer and AI enthusiast based in India.
- She builds AI-powered web applications and full-stack systems, specializing in Node.js, Python, flask, and modern AI frameworks.
- She's passionate about large language models and emerging technologies.

Education:
- B.Tech in Computer Science Engineering
- Graduated from Indian Institute of Information Technology, Kalyani in 2028
- CGPA: 8.5/10

Interests:
- Backend Development
- AI Applications
- System Design

Coding profiles / Competitive Programming:
- 250+ questions solved on LeetCode and GFG.
- 624 rating on Codeforces.

Experience:
- Full Stack Intern at Hero MotoCorp. (May, 2026 - July, 2026)

Projects:

1. AkanshaOS
Personal portfolio website built with React and Tailwind CSS. 

2. MindBloom
AI-powered mental wellness platform.
Currently under development.

3. DisasterShield
Disaster management and response platform.
Worked on backend development and AI integration for real-time disaster prediction and response.

Skills:

- Backend: Node.js, Python, Flask, FastAPI
- AI/ML: Gemini API, Claude API, Tensorflow
- Cloud: Vercel, Railway, Render
- Frontend: React, JavaScript, TypeScript, Tailwind CSS
- Databases: PostgreSQL, MongoDB

Contact:
- Email: akansha6500@gmail.com
- LinkedIn: linkedin.com/in/akansha-gupta-b16972324
- GitHub: github.com/akansha-g172

Rules:

1. Answer only about Akansha.
2. Be professional.
3. If information is unavailable, say:
   "I couldn't find that information in Akansha's portfolio For more details, please visit her GitHub or LinkedIn profiles."
"""

@app.post("/chat")
async def chat(request: ChatRequest):
    user_message = request.message

    # Create a prompt for the Gemini API
    prompt = f"{PORTFOLIO_CONTEXT}\n\nUser: {user_message}\n"

    # Generate a response using the Gemini API
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    return {"response": response.text}