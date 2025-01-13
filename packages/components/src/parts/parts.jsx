'use client';
import Link from 'next/link';
import Ref from '../ref/ref';
import './parts.scss';

function Parts({ data }) {
  return (
    <div className="parts">
      {data.length === 0 ? (
        <p className="parts__void">
          У вас пока что нет разделов со словами.
          <Link className="parts__link" href={'/edit/create'}>
            Создать
          </Link>
        </p>
      ) : (
        <div className="parts__wrapper">
          <h1>Выбери часть, которую желаешь повторить</h1>
          <div className="parts__general">
            <Ref className="parts__ref" path="test" id="general">
              Общее
            </Ref>
            <Ref className="parts__ref" path="test" id="favourite">
              Избранное
            </Ref>
          </div>
          <div className="parts__another">
            {data.map((item) => (
              <Ref path="test" key={item.id} id={item.id}>
                {item.words.name}
              </Ref>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Parts;
