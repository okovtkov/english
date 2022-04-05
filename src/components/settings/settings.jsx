import { useCallback, useEffect, useState } from 'react';
import Button from '../button/button';
import CloseButton from '../close-button/close-button';
import Ref from '../ref/ref';
import Popup from '../popup/popup';
import classNames from 'classnames';
import { words } from '../../api/words';
import './settings.scss';

function Settings(props) {
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
    words.deleteDoc(currentId);

    setTimeout(() => {
      const index = props.data.findIndex(item => item.id === currentId);
      const clone = [...props.data];
      clone.splice(index, 1);
      props.onChangeData(clone);
    }, 150);

    setCurrentId('');
    setCurrentElement(null);
    setPopup(false);
  }, [currentElement, currentId, props]);

  useEffect(() => {
    if (props.data.length === 0) setEditing(true)
    else setEditing(false);
  }, [props.data.length]);

  return (
    <>
      <div className="settings">
        <div className="settings__parts">
          <p className={classNames("settings__void", {
            "settings__void--active": props.data.length === 0 && editing === false,
          })}>У вас пока что нет разделов со словами.</p>
          {props.data.map((item) => (
            <div key={item.id} className={classNames("settings__wrapper", {
              "settings__wrapper--editing": editing,
            })}>
              <Ref
                path="edit"
                id={item.id}
                className={!editing && "settings__ref settings__ref--disabled"}
                onClick={!editing && ((e) => e.preventDefault())}
              >{item.words.name}</Ref>
              <CloseButton className="settings__close" onClick={(e) => onClick(item, e)}/>
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

export default Settings;
