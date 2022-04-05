import { Link } from 'react-router-dom';
import Ref from '../ref/ref';
import './parts.scss';

function Parts(props) {
  return (
    <div className="parts">
      {props.data.length !== 0 ? (
        <div>
          <h1>Выбери часть, которую желаешь повторить</h1>
          <div className="parts__general">
            <Ref path="test" id="general">Общее</Ref>
          </div>
          <div className="parts__another">
            {props.data.map((item) => (
              <Ref path="test" key={item.id} id={item.id}>{item.words.name}</Ref>
            ))}
          </div>
        </div>
      ) : (
        <p className="parts__void">
          У вас пока что нет разделов со словами.
          <Link className="parts__link" to={'/edit/create'}>Создать</Link>
        </p>
      )}
    </div>
  );
}

export default Parts;
