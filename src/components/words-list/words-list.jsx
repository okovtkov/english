import './words-list.scss';

function WordsList(props) {
  return (
    <dl className="words-list">
      {props.data.map((item) => (
        <div key={item.english} className="words-list__wrapper">
          <dt className="words-list__word">{item.english}</dt>
          <dd className="words-list__translate">{item.russian}</dd>
        </div>
      ))}
    </dl>
  );
}

export default WordsList;
