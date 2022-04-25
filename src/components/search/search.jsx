import Input from '../input/input';
import './search.scss';

function Search(props) {
  return (
    <Input type="search" placeholder="Поиск..." className={`search ${props.className}`} />
  );
}

export default Search;
