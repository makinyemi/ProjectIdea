//Interface for the Form component to allow expected props to submit form details
interface FormProps {
  prompt: string;
  setPrompt: any;
  onSubmit: any;
  charLimit: number;
  isLoading: any;
}

const Form: React.FC<FormProps> = (props) => {
  const isPromptValid = props.prompt.length < props.charLimit;

  const isPromptEmpty = props.prompt.length == 0;

  const updatePromptValue = (text: string) => {
    if (text.length <= props.charLimit) {
      props.setPrompt(text);
    }
  };

  let statusColor = "text-slate-500";
  let statusText = null;
  if (!isPromptValid) {
    statusColor = "text-red-400";
    statusText = `Input must be less than ${props.charLimit} characters.`;
  }
  return (
    <>
      <div className="mb-6 text-slate-200">
        <p>Give me a topic and I will give you a project idea:</p>
      </div>

      <input
        className="p-2 w-full rounded-md focus:outline-teal-400 focus:outline text-slate-700"
        type="text"
        value={props.prompt}
        placeholder="sandwiches"
        disabled={props.isLoading}
        onChange={(e) => updatePromptValue(e.currentTarget.value)}
      />
      <div className={statusColor + " flex justify-between my-2 mb-6 text-sm"}>
        <div>{statusText}</div>
        <div>
          {props.prompt.length}/{props.charLimit}
        </div>
      </div>
      <input
        className="bg-gradient-to-r from-teal-400 
      to-blue-500 disabled:opacity-50 w-full p-2 rounded-md text-lg"
        type="button"
        value="Submit"
        onClick={props.onSubmit}
        disabled={!isPromptValid || props.isLoading || isPromptEmpty}
      />
    </>
  );
};

export default Form;
