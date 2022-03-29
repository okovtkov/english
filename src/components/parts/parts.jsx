import Ref from '../ref/ref';
import './parts.scss';

function Parts(props) {
  return (
    <div className="parts">
      <h1>Выбери часть, которую желаешь повторить</h1>
      <div className="parts__general">
        <Ref path="test" id="general">General</Ref>
      </div>
      <div className="parts__another">
        {props.data.map((item) => (
          <Ref path="test" key={item.id} id={item.id}>{item.words.id}</Ref>
        ))}
      </div>
    </div>
  );
}

export default Parts;
