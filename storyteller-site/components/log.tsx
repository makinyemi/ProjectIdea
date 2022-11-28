interface LogProps {
    prompt: string;
}

const Log: React.FC<LogProps> = (props) => {
    return (
        <>{props.prompt}</>
    );
}

export default Log;