import { Errors } from 'aws-cdk-lib/aws-stepfunctions';
import React from 'react';
import Form from './form';
import Log from './log';
import Results from './results';

const StoryTeller: React.FC = () => {
    const CHARACTER_LIMIT: number = 32;
    const ENDPOINT: string = 
        "https://qonco5lugh.execute-api.us-east-1.amazonaws.com/prod/tell_a_story_with_a_title"
    
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
            .catch(error => {
                setErrorPrompt(`Sorry we seem to have experienced a ${error} Please try again.`);
                setIsLoading(false);
                setHasError(true);
            });
    };

    const onReset = () => {
        setPrompt("");
        setHasResult(false);
        setIsLoading(false);
    }
    
    const onResult = (data: any) => {
        setStory(data.story);
        setTitle(data.title);
        setHasResult(true);
        setIsLoading(false);
    }

    let displayedElement = null;

    let displayErrorElement = null;

    if (hasResult) {
        displayedElement = (
            <Results title={title} story={story} onReset={onReset} prompt={prompt}/>
        )
    } else{
        displayedElement = (
            <Form prompt={prompt} setPrompt={setPrompt} onSubmit={onSubmit} isLoading={isLoading} characterLimit={CHARACTER_LIMIT}/>
        )
    }

    if (hasError) {
        displayErrorElement = (
            <Log prompt={errorPrompt} />
        )
    }
    return ( 
    <>
        <h1>Story Teller</h1>
        <div>
            {displayedElement}
        </div>
        <div>
            {displayErrorElement}
        </div>
    </>
    );
};

export default StoryTeller;