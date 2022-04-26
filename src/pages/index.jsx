import '../index.scss';
import Parts from '../components/parts/parts';
import { useEffect } from 'react';

function Index(props) {
  useEffect(() => {
    props.getWords();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.getWords]);

  return (
    <Parts data={props.data} checked={props.checked} />
  );
}

export default Index;
