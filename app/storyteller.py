import os
import openai
import argparse
import re

MAX_INPUT_LENGTH = 12

def main():
    print("Running Story Time!")

    parser = argparse.ArgumentParser(description="What do you want a story about?")
    parser.add_argument("--input", "-i", type=str, required=True)
    args = parser.parse_args()
    user_input = args.input

    print(f"User input: {user_input}")
    if validate_length(user_input):
        generate_story(user_input)
        generate_related_title(user_input)

    else:
        raise ValueError(f"Input length is too long, Must be under {MAX_INPUT_LENGTH}. Submitted input is: {user_input}")

def validate_length(prompt: str) -> bool:
    return len(prompt) <= MAX_INPUT_LENGTH

def generate_related_title(prompt: str) -> str:
    # Load your API key from an environment variable or secret management service
    openai.api_key = os.getenv("OPENAI_API_KEY")

    enriched_prompt = f"Give me a story title for {prompt}"
    print(enriched_prompt)

    response = openai.Completion.create(
        model="text-davinci-002", prompt=enriched_prompt, max_tokens=28
    )

    #Extract output text.
    keyword_text = response["choices"][0]["text"]

    #Strip leading and trailing whitespace
    keyword_text = keyword_text.strip() 
    keyword_array = re.split(",|\n|;|-", keyword_text)
    # keyword_array = [k.lower().strip() for k in keyword_array]
    # keyword_array = [k for k in keyword_array if len(k) > 0]
    keyword_text = keyword_array[0]

    # while not keyword_text[-1].isalpha():
    #     keyword_text = keyword_text[:-1]

    print(f"Title: {keyword_text}")
    return keyword_text

def generate_story(prompt: str) -> str:
    # Load your API key from an environment variable or secret management service
    openai.api_key = os.getenv("OPENAI_API_KEY")

    enriched_prompt = f"Tell me a story about {prompt}"
    print(enriched_prompt)
    response = openai.Completion.create(model="text-davinci-002", prompt=enriched_prompt, max_tokens=28)

    #Extract output text.
    branding_text = response["choices"][0]["text"]

    #Strip leading and trailing whitespace
    branding_text = branding_text.strip()

    #Adding ... to truncated statments.
    last_char = branding_text[-1]
    if last_char not in {".", "!", "?"}:
        branding_text += "..."

    print(f"Story: {branding_text}")
    return branding_text



if __name__ == "__main__":
    main()

# Before running in command line, export OPENAI_API_KEY=<Secret key>