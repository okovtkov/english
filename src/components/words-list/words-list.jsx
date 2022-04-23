import IconSound from '../svg-icon/icon-sound';
import { audio } from '../../api/audio';
import Loading from '../loading/loading';
import './words-list.scss';

function WordsList(props) {
  return (
    <dl className="words-list">
      <div className="words-list__container">
        {console.log(props.data)}
        {props.data ? props.data.map((item, i) => (
          <div key={`${item.english}+${i}`} className="words-list__wrapper">
            <dt className="words-list__word">
              {item.english}
              <button className="words-list__sound" onClick={() => audio.get(item.english, item.russian)}>
                <IconSound />
              </button>
            </dt>
            <dd className="words-list__translate">{item.russian}</dd>
          </div>
        )) : <Loading />}
      </div>
    </dl>
  );
}

export default WordsList;
