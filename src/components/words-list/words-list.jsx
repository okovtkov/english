import Loading from '../loading/loading';
import SmallCard from '../small-card/small-card';
import './words-list.scss';

function WordsList(props) {
  return (
    <dl className="words-list">
      <div className="words-list__container">
        {props.data ? props.data.map((item, i) => (
          <SmallCard
            key={`${item.english}+${i}`}
            word={item.english}
            translate={item.russian}
            className="words-list__card"
          />
        )) : <Loading />}
      </div>
    </dl>
  );
}

export default WordsList;
