import { useCallback, useState } from 'react';
import Button from '../button/button';
import Ref from '../ref/ref';
import Popup from '../popup/popup';
import classNames from 'classnames';
import { words } from '../../api/words';
import './edit.scss';

function Edit(props) {
  const [currentElement, setCurrentElement] = useState(null);
  const [currentId, setCurrentId] = useState('');
  const [editing, setEditing] = useState(false);
  const [popup, setPopup] = useState(false);

  const onClick = useCallback((item, e) => {
    setCurrentElement(e.target);
    setPopup(true);
    setCurrentId(item.id);
  }, []);

  const deleteHandler = useCallback(() => {
    const wrapper = currentElement.closest('.edit__wrapper');
    wrapper.classList.add('edit__wrapper--deleted');
    setTimeout(() => wrapper.remove(), 150);
    words.deleteDoc(currentId);
    setCurrentId('');
    setCurrentElement(null);
    setPopup(false);
  }, [currentElement, currentId]);

  return (
    <>
      <div className="edit">
        <div className="edit__parts">
          {props.data.map((item) => (
            <div key={item.id} className={classNames("edit__wrapper", {
              "edit__wrapper--editing": editing,
            })}>
              <Ref path="edit" id={item.id}>{item.words.id}</Ref>
              <button className="edit__close" onClick={(e) => onClick(item, e)} />
            </div>
          ))}
          <div className={classNames("edit__new", {
            "edit__new--active": editing,
          })}>
            <Ref path="edit/create">+</Ref>
          </div>
        </div>
        <Button className="edit__button" onClick={() => setEditing(!editing)}>
          {editing ? 'Отмена' : 'Редактировать'}
        </Button>
      </div>
      {popup && (
        <Popup onAgree={deleteHandler} onCancel={() => setPopup(false)}>
          Вы действительно хотите удалить данный раздел?
        </Popup>
      )}
    </>
  );
}

export default Edit;
