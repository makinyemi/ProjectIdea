interface ResultProps {
  prompt: string;
  title: string;
  description: string;
  onBack: any;
}

const Results: React.FC<ResultProps> = (props) => {
  return (
    <>
      <div>
        Heres a great idea:
        <div>
          <b>Your Topic</b>
        </div>
        <div> {props.prompt}</div>
        <div>
          <b>Title</b>
        </div>
        <div> {props.title}</div>
        <div>
          <b>Description</b>
        </div>
        <div> {props.description}</div>
      </div>
      <input type="button" value="Back" onClick={props.onBack} />
    </>
  );
};

export default Results;
