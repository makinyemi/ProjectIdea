import React from "react";
import Form from "./form";
import Log from "./log";
import Results from "./results";

const StoryTeller: React.FC = () => {
  const CHARACTER_LIMIT: number = 32;
  const ENDPOINT: string =
    "https://qonco5lugh.execute-api.us-east-1.amazonaws.com/prod/tell_a_story_with_a_title";

  const [prompt, setPrompt] = React.useState("");
  const [story, setStory] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [hasResult, setHasResult] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorPrompt, setErrorPrompt] = React.useState("");
  const [hasError, setHasError] = React.useState(false);

  const onSubmit = () => {
    console.log("Submitting: " + prompt);
    setIsLoading(true);
    setHasError(false);
    fetch(`${ENDPOINT}?prompt=${prompt}`)
      .then((res) => res.json())
      .then(onResult)
      .catch((error) => {
        setErrorPrompt(
          `Sorry we seem to have experienced a ${error} Please try again.`
        );
        setIsLoading(false);
        setHasError(true);
      });
  };

  const onReset = () => {
    setPrompt("");
    setHasResult(false);
    setIsLoading(false);
  };

  const onResult = (data: any) => {
    setStory(data.story);
    setTitle(data.title);
    setHasResult(true);
    setIsLoading(false);
  };

  let displayedElement = null;

  let displayErrorElement = null;

  if (hasResult) {
    displayedElement = (
      <Results title={title} story={story} onReset={onReset} prompt={prompt} />
    );
  } else {
    displayedElement = (
      <Form
        prompt={prompt}
        setPrompt={setPrompt}
        onSubmit={onSubmit}
        isLoading={isLoading}
        characterLimit={CHARACTER_LIMIT}
      />
    );
  }

  if (hasError) {
    displayErrorElement = <Log prompt={errorPrompt} />;
  }

  const gradientTextStyle =
    "text-white text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 w-fit mx-auto ";

  return (
    <div className="h-screen flex">
      <div className="max-w-md m-auto p-2">
        <div className="bg-gray-800 p-6 rounded-md text-white">
          <div className="text-center my-6">
            <h1 className={gradientTextStyle + "text-3xl font-light"}>
              Story Teller
            </h1>
            <div className={gradientTextStyle + "text-sm"}>
              Snippet intro to your next AI generated story ...
            </div>
          </div>

          <div>{displayedElement}</div>

          <div>{displayErrorElement}</div>
        </div>
      </div>
    </div>
  );
};

export default StoryTeller;
