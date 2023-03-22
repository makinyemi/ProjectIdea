from fastapi import FastAPI, HTTPException
from projectidea import generate_project_title, generate_project_description
from mangum import Mangum
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
handler = Mangum(app)
MAX_INPUT_LENGTH = 32

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)  

@app.get("/generate_project_title")
async def generate_title_api(prompt: str):
    validate_input_length(prompt)
    title = generate_project_title(prompt)
    return {"description": None, "title": title}

@app.get("/generate_project_description")
async def generate_project_api(prompt: str):
    validate_input_length(prompt)
    description = generate_project_description(prompt)
    return {"description": description, "title": None}

@app.get("/generate_a_project_title_and_description")
async def generate_full_project_api(prompt: str):
    validate_input_length(prompt)
    description = generate_project_description(prompt)
    title = generate_project_title(prompt)

    return {"description": description, "title": title}


def validate_input_length(prompt: str):
    if len(prompt) >= MAX_INPUT_LENGTH:
        raise HTTPException(status_code=400, detail=f"Input lenght is too long. Must be under {MAX_INPUT_LENGTH}")
    pass


# uvicorn storyteller_api:app --reload