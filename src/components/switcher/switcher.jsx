import { useCallback, useRef } from 'react';
import './switcher.scss';

function Switcher(props) {
  const ref = useRef();

  const onChangeHandler = useCallback(() => {
    const isChecked = ref.current.checked;
    if (isChecked) props.onChangeMode('sound');
    else props.onChangeMode('text');
  }, [props]);

  return (
    <label className={`switcher ${props.className}`}>
      <div className="switcher__icon">
        {props.firstOption}
      </div>
      <input ref={ref} type="checkbox" className="switcher__checkbox" onChange={onChangeHandler} />
      <div className="switcher__switch" />
      <div className="switcher__icon">
        {props.secondOption}
      </div>
    </label>
  );
}

export default Switcher;
