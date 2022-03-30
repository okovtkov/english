import { useCallback, useState } from 'react';
import Button from '../button/button';
import Ref from '../ref/ref';
import Popup from '../popup/popup';
import classNames from 'classnames';
import { words } from '../../api/words';
import './settings.scss';

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
    const wrapper = currentElement.closest('.settings__wrapper');
    wrapper.classList.add('settings__wrapper--deleted');
    setTimeout(() => wrapper.remove(), 150);
    words.deleteDoc(currentId);
    setCurrentId('');
    setCurrentElement(null);
    setPopup(false);
  }, [currentElement, currentId]);

  return (
    <>
      <div className="settings">
        <div className="settings__parts">
          {props.data.map((item) => (
            <div key={item.id} className={classNames("settings__wrapper", {
              "settings__wrapper--editing": editing,
            })}>
              <Ref path="edit" id={item.id}>{item.words.id}</Ref>
              <button className="settings__close" onClick={(e) => onClick(item, e)} />
            </div>
          ))}
          <div className={classNames("settings__new", {
            "settings__new--active": editing,
          })}>
            <Ref path="edit/create">+</Ref>
          </div>
        </div>
        <Button className="settings__button" onClick={() => setEditing(!editing)}>
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
