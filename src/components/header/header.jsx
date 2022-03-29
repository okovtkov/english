import { Link } from "react-router-dom";
import './header.scss';

function Header() {
  return(
    <header className="header">
      <Link to={'/'} className="header__link">Home</Link>
      <Link to={'/edit'} className="header__link">Add new words</Link>
    </header>
  )
}

export default Header;