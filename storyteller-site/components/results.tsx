interface ResultsProps {
  prompt: string;
  title: string;
  story: string;
  onReset: any;
}

const Result: React.FC<ResultsProps> = (props) => {
  const resultSection = (label: string, body: any) => {
    return (
      <div className="bg-slate-700 p-4 my-2 rounded-md">
        <div className="text-slate-500 text-sm font-bold mb-1">{label}</div>
        <div className="text-lg font-bold">{body}</div>
      </div>
    );
  };

  return (
    <>
      <div>
        <div>{resultSection("Prompt", props.prompt)}</div>
        <div>{resultSection("Title", props.title)}</div>
        <div>{resultSection("Story", props.story)}</div>
      </div>
      <button
        className="bg-gradient-to-r from-teal-400 to-blue-500 disabled:opacity-50 w-full p-2 rounded-md text-lg"
        onClick={props.onReset}
      >
        Back
      </button>
    </>
  );
};

export default Result;
