import { useCallback, useState } from 'react';
import Button from '../button/button';
import Ref from '../ref/ref';
import classNames from 'classnames';
import { words } from '../../api/words';
import './edit.scss';

function Edit(props) {
  const [editing, setEditing] = useState(false);
  const deleteHandler = useCallback((item, e) => {
    const wrapper = e.target.closest('.edit__wrapper');
    wrapper.classList.add('edit__wrapper--deleted');
    setTimeout(() => wrapper.remove(), 150);
    words.deleteDoc(item.id);
  }, []);

  return (
    <div className="edit">
      <div className="edit__parts">
        {props.data.map((item) => (
          <div key={item.id} className={classNames("edit__wrapper", {
            "edit__wrapper--editing": editing,
          })}>
            <Ref path="edit" id={item.id}>{item.words.id}</Ref>
            <button className="edit__close" onClick={(e) => deleteHandler(item, e)} />
          </div>
        ))}
      </div>
      <Button className="edit__button" onClick={() => setEditing(!editing)}>
        {editing ? 'Отмена' : 'Удалить'}
      </Button>
    </div>
  );
}

export default Edit;
