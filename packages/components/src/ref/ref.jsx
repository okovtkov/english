'use client';
import Link from 'next/link';
import './ref.scss';

function Ref(props) {
  return (
    <Link
      href={`/${props.path}/${props.id || ''}`}
      className={`ref ${props.className}`}
      onClick={props.onClick}
    >
      <div className="ref__children">{props.children}</div>
    </Link>
  );
}

export default Ref;
