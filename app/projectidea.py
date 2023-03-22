import os
import openai
import argparse
import re

MAX_INPUT_LENGTH = 32

def main():
    print("Running Story Time!")
    
    parser = argparse.ArgumentParser(description="Give us a topic, well give you a project")
    parser.add_argument("--input", "-i", type=str, required=True)
    args = parser.parse_args()
    user_input = args.input

    print(f"User input: {user_input}")
    if validate_length(user_input):
        generate_project_description(user_input)
        generate_project_title(user_input)
    else:
        raise ValueError(f"Input length is too long, Must be under {MAX_INPUT_LENGTH}. Submitted input: {user_input} is {len(user_input) - MAX_INPUT_LENGTH} character too long")

def validate_length(prompt: str) -> bool:
    return len(prompt) <= MAX_INPUT_LENGTH

def generate_project_title(prompt: str) -> str:
    # Load your API key from an environment variable or secret management service
    openai.api_key = os.getenv("OPENAI_API_KEY")

    enriched_prompt = f"Generate a title for a simple coding project on {prompt}"
    print(enriched_prompt)

    response = openai.Completion.create(
        model="text-davinci-003", prompt=enriched_prompt, max_tokens=100, top_p=1, frequency_penalty=0.0, temperature=0.35,
    )

    #Extract output text.
    keyword_text = response["choices"][0]["text"]

    #Strip leading and trailing whitespace
    keyword_text = keyword_text.strip() 

    print(f"Title: {keyword_text}")
    return keyword_text

def generate_project_description(prompt: str) -> str:
    # Load your API key from an environment variable or secret management service
    openai.api_key = os.getenv("OPENAI_API_KEY")

    enriched_prompt = f"Generate a description for a simple coding project on {prompt}"
    print(enriched_prompt)
    response = openai.Completion.create(
        model="text-davinci-003", prompt=enriched_prompt, max_tokens=200, top_p=1, frequency_penalty=0.0, temperature=0,
    )

    #Extract output text.
    branding_text = response["choices"][0]["text"]

    #Strip leading and trailing whitespace
    branding_text = branding_text.strip()    

    print(f"Story: {branding_text}")
    return branding_text



if __name__ == "__main__":
    main()


