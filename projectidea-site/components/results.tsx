interface ResultProps {
  prompt: string;
  title: string;
  description: string;
  onBack: any;
}

const Results: React.FC<ResultProps> = (props) => {
  const resultSection = (label: string, body: any) => {
    return (
      <div className="bg-slate-700 p-4 my-3 rounded-md">
        <div className="text-slate-400 text-sm font-bold mb-4">{label}</div>
        <div>{body}</div>
      </div>
    );
  };

  return (
    <>
      <div className="mb-6">
        {resultSection("Your Topic", props.prompt)}
        <p>Heres a great idea:</p>
        {resultSection("Title", props.title)}
        {resultSection("Description", props.description)}
      </div>
      <input
        className="bg-gradient-to-r from-teal-400 
        to-blue-500 disabled:opacity-50 w-full p-2 rounded-md text-lg"
        type="button"
        value="Back"
        onClick={props.onBack}
      />
    </>
  );
};

export default Results;
