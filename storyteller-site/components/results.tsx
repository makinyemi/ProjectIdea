interface ResultsProps {
    prompt: string;
    title: string;
    story: string;
    onReset: any;
}
const Result: React.FC<ResultsProps> = (props) => {
    return (
        <>
            <div>
                <div>
                    <div>
                        <strong>Prompt</strong>
                    </div>
                    <div>
                        {props.prompt}
                    </div>
                </div>
                <div>
                    <div>
                        <strong>Title</strong> 
                    </div>
                    <div>
                        {props.title}
                    </div>
                </div>
                <div>
                    <div>
                        <strong>Story</strong>
                    </div>
                    <div>
                        {props.story}
                    </div>
                </div>
            </div>
            <button onClick={props.onReset}>Back</button>
        </>
    );
}

export default Result;