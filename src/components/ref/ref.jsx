import { Link } from "react-router-dom";
import './ref.scss';

function Ref(props) {
  return (
    <Link to={`/test/${props.part}`} data={props.data} className="ref">
      <div className="ref__children">
        {props.children}
      </div>
    </Link>
  );
}

export default Ref;