import '../index.scss';
import Parts from '../components/parts/parts';

function Index(props) {
  return (
    <Parts data={props.data} checked={props.checked} />
  );
}

export default Index;
