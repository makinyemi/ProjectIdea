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

  const gradientTextStyle =
    "text-white text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 font-light w-fit mx-auto";
  return (
    <div className="h-screen flex">
      <div className="max-w-md m-auto p-3">
        <div className="bg-slate-600 p-6 rounded-md text-white">
          <div className="text-center my-6">
            <h1 className={gradientTextStyle + " text-3xl font-light"}>
              Project Idea Generator
            </h1>
            <div className={gradientTextStyle}>AI powered idea creator</div>
          </div>

          {displayedElement}
        </div>
      </div>
    </div>
  );
};

export default ProjectIdea;
