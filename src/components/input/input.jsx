import './input.scss';

function Input(props) {
  return (
    <input
      value={props.value}
      type={props.type}
      className={`input ${props.className}`}
      onChange={props.onChange}
      required={props.required}
      placeholder={props.placeholder}
    />
  );
}

export default Input;
