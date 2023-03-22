import React from "react";
import Form from "./form";
import Results from "./results";

const ProjectIdea: React.FC = () => {
  const MAX_CHARACTERS = 32;
  const ENDPOINT: string =
    "https://dra2owtcdd.execute-api.us-east-1.amazonaws.com/prod/generate_a_project_title_and_description";

  //Hooks for updating the state of elements
  const [prompt, setPrompt] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [hasResult, setHasResult] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  /**
   * Anonymous function that uses API Gateway Endpoint to fetch results
   * of prompt entered by user. Converts result into json format and
   * passes result into onResult function.
   */
  const onSubmit = () => {
    setIsLoading(true);
    console.log("Submitting " + prompt);
    fetch(`${ENDPOINT}?prompt=${prompt}`)
      .then((res) => res.json()) //Converts result of fetch to json
      .then(onResult);
  };

  /**
   * Anonymus fucntion that takes a parameter data which is takes json
   * data from enpoint fetch result and updates the hook for project title
   * and description.
   * @param data
   */
  const onResult = (data: any) => {
    setTitle(data.title);
    setDescription(data.description);
    setHasResult(true);
  };

  const onBack = () => {
    setPrompt("");
    setHasResult(false);
    setIsLoading(false);
  };

  //Variable to store the displayed element given the state of the page
  let displayedElement = null;

  displayedElement = hasResult ? (
    <Results
      title={title}
      description={description}
      onBack={onBack}
      prompt={prompt}
    />
  ) : (
    <Form
      prompt={prompt}
      setPrompt={setPrompt}
      onSubmit={onSubmit}
      charLimit={MAX_CHARACTERS}
      isLoading={isLoading}
    />
  );

  return (
    <>
      <h1>Project Idea Generator</h1>
      {displayedElement}
    </>
  );
};

export default ProjectIdea;
