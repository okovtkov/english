import { useCallback, useRef } from 'react';
import './switcher.scss';

function Switcher({ onChange, className, theme, firstOption, secondOption, checked }) {
  const ref = useRef();

  const onChangeHandler = useCallback(() => {
    const isChecked = ref.current.checked;
    onChange(isChecked);
  }, [onChange]);

  return (
    <label className={`switcher ${className} switcher--${theme}`}>
      {firstOption && <div className="switcher__icon">{firstOption}</div>}
      <input
        checked={checked}
        ref={ref}
        type="checkbox"
        className="switcher__checkbox"
        onChange={onChangeHandler}
      />
      <div className="switcher__switch" />
      {secondOption && <div className="switcher__icon">{secondOption}</div>}
    </label>
  );
}

export default Switcher;
