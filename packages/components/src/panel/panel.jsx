import Button from '../button/button';
import { useCallback } from 'react';
import './panel.scss';

function Panel(props) {
  const onClick = useCallback(
    (type) => {
      props.onChangeVisible(false);
      const counter = type === 'next' ? props.index + 1 : props.index - 1;
      if (counter < props.length && counter >= 0) props.onChangeIndex(counter);
    },
    [props]
  );

  return (
    <div className={`panel ${props.className}`}>
      <Button
        onClick={() => setTimeout(() => onClick('prev'), 0)}
        className={`panel__prev ${props.className}`}
      >
        назад
      </Button>
      <Button
        onClick={() => setTimeout(() => onClick('next'), 0)}
        className={`panel__next ${props.className}`}
      >
        далее
      </Button>
    </div>
  );
}

export default Panel;
