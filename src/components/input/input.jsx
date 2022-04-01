import './input.scss';

function Input(props) {
  return (
    <input
      value={props.value}
      type={props.type}
      className={`input ${props.className}`}
      onChange={props.onChange}
      required={props.required}
    />
  )
}

export default Input;
