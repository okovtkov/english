import IconSound from '../svg-icon/icon-sound';
import { audio } from '../../api/audio';
import './words-list.scss';

function WordsList(props) {
  console.log(props)
  return (
    <dl className="words-list">
      {props.data.map((item) => (
        <div key={item.english} className="words-list__wrapper">
          <dt className="words-list__word">
            {item.english}
            <button className="words-list__sound" onClick={() => audio.get(item.english)}>
              <IconSound />
            </button>
          </dt>
          <dd className="words-list__translate">{item.russian}</dd>
        </div>
      ))}
    </dl>
  );
}

export default WordsList;
