from fastapi import FastAPI, HTTPException
from storyteller import generate_related_title, generate_story
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

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/generate_title")
async def generate_title_api(prompt: str):
    validate_input_length(prompt)
    title = generate_related_title(prompt)
    return {"story": None, "title": title}

@app.get("/tell_story")
async def tell_story(prompt: str):
    validate_input_length(prompt)
    story = generate_story(prompt)
    return {"story": story, "title": []}

@app.get("/tell_a_story_with_a_title")
async def tell_a_story(prompt: str):
    validate_input_length(prompt)
    story = generate_story(prompt)
    title = generate_related_title(prompt)

    return {"story": story, "title": title}


def validate_input_length(prompt: str):
    if len(prompt) >= MAX_INPUT_LENGTH:
        raise HTTPException(status_code=400, detail=f"Input lenght is too long. Must be under {MAX_INPUT_LENGTH}")
    pass


# uvicorn storyteller_api:app --reload