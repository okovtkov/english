'use client';
import './input.scss';

function Input(props) {
  const { value, type, className, onChange, required, placeholder, ...rest } = props;

  return (
    <input
      value={props.value}
      type={props.type}
      className={`input ${props.className}`}
      required={props.required}
      placeholder={props.placeholder}
      {...rest}
      onChange={props.onChange}
    />
  );
}

export default Input;
