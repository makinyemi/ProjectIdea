//Interface for the Form component to allow expected props to submit form details
interface FormProps {
  prompt: string;
  setPrompt: any;
  onSubmit: any;
  charLimit: number;
  isLoading: any;
}

const Form: React.FC<FormProps> = (props) => {
  const isPromptValid =
    props.prompt.length <= props.charLimit && props.prompt.length > 0;

  const updatePromptValue = (text: string) => {
    if (text.length <= props.charLimit) {
      props.setPrompt(text);
    }
  };
  return (
    <>
      <p>Give me a topic and I will give you a project idea!</p>
      <input
        type="text"
        value={props.prompt}
        placeholder="sandwiches"
        onChange={(e) => updatePromptValue(e.currentTarget.value)}
      />
      <div>
        {props.prompt.length}/{props.charLimit}
      </div>
      <input
        type="button"
        value="Submit"
        onClick={props.onSubmit}
        disabled={!isPromptValid || props.isLoading}
      />
    </>
  );
};

export default Form;
