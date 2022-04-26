import { Link } from 'react-router-dom';
import Loading from '../loading/loading';
import Ref from '../ref/ref';
import './parts.scss';

function Parts(props) {
  if (!props.checked) return (
    <div className="parts-loading">
      <Loading />
    </div>
  )

  return (
    <div className="parts">
      {props.data.length === 0 && props.checked ? (
        <p className="parts__void">
          У вас пока что нет разделов со словами.
          <Link className="parts__link" to={'/edit/create'}>Создать</Link>
        </p>
      ) : (
        <div className="parts__wrapper">
          <h1>Выбери часть, которую желаешь повторить</h1>
          <div className="parts__general">
            <Ref path="test" id="general">Общее</Ref>
            <Ref path="test" id="favourite">Избранное</Ref>
          </div>
          <div className="parts__another">
            {props.data.map((item) => (
              <Ref path="test" key={item.id} id={item.id}>{item.words.name}</Ref>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Parts;
