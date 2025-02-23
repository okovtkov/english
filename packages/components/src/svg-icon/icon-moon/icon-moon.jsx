'use client';
import classNames from 'classnames';
import './icon-moon.scss';

function IconMoon(props) {
  return (
    <svg
      className={classNames('icon-moon', { [`icon-moon--${props.theme}`]: props.theme })}
      xmlns="http://www.w3.org/2000/svg"
      height="30px"
      width="30px"
      version="1.1"
      id="Capa_1"
      viewBox="0 0 56 56"
    >
      <path d="M29,28c0-11.917,7.486-22.112,18-26.147C43.892,0.66,40.523,0,37,0C21.561,0,9,12.561,9,28  s12.561,28,28,28c3.523,0,6.892-0.66,10-1.853C36.486,50.112,29,39.917,29,28z" />
    </svg>
  );
}

export default IconMoon;
