import { useCallback, useState } from "react";
import Button from "../button/button";
import CloseButton from "../close-button/close-button";
import Input from "../input/input";
import { words } from '../../api/words';
import './create-form.scss';
import { useNavigate } from "react-router-dom";

function CreateForm(props) {
  const [wordsData, setWordsData] = useState({
    id: '',
    words: {
      name: '',
      words: [
        {
          english: '',
          russian: '',
        },
        {
          english: '',
          russian: '',
        },
        {
          english: '',
          russian: '',
        },
        {
          english: '',
          russian: '',
        },
        {
          english: '',
          russian: '',
        },
      ]
    }
  });
  const navigate = useNavigate();

  const closeHandler = useCallback((item, i) => {
    console.log(wordsData)
    const clone = {...wordsData};
    clone.words.words.splice(i, 1);
    setWordsData(clone);
  }, [wordsData]);

  const addHandler = useCallback(() => {
    const word = {
      english: '',
      russian: '',
    };
    const clone = {...wordsData};
    clone.words.words.push(word);
    setWordsData(clone);
  }, [wordsData]);

  const changeNameHandler = useCallback((e) => {
    const name = e.target.value;
    const clone = {...wordsData};
    clone.words.name = name;
    setWordsData(clone);
  }, [wordsData]);

  const changeEnglishHandler = useCallback((e, i) => {
    const english = e.target.value;
    const clone = {...wordsData};
    clone.words.words[i].english = english;
    setWordsData(clone);
  }, [wordsData]);

  const changeTranslateHandler = useCallback((e, i) => {
    const russian = e.target.value;
    const clone = {...wordsData};
    clone.words.words[i].russian = russian;
    setWordsData(clone);
  }, [wordsData]);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    words.add(wordsData.words).then((resp) => {
      const { id } = resp;
      const { data } = props;
      const cloneData = [...data];
      const cloneWordsData = {...wordsData};
      cloneWordsData.id = id;
      setWordsData(cloneWordsData);
      cloneData.push(cloneWordsData);
      props.onChangeData(cloneData);
      navigate('/edit/');
    });
  }, [navigate, props, wordsData]);

  return(
    <form className="create-form">
      <div className="create-form__head-wrapper">
        <label className="create-form__label create-form__label--name">
          Придумайте название раздела
          <Input
            type="text"
            className="create-form__input--name"
            onChange={(e) => changeNameHandler(e)}
            value={wordsData.words.name}
            required={true}
          />
        </label>
        <Button
          className="create-form__button create-form__button--send"
          type="submit"
          onClick={(e) => onSubmit(e)}
        >Создать</Button>
      </div>
      <div className="create-form__wrapper">
        {wordsData.words.words.map((item, i) => (
          <div key={i} className="create-form__words-wrapper">
            <CloseButton className="create-form__close" onClick={() => closeHandler(item, i)}/>
            <label className="create-form__label">
              Введите слово на английском
              <Input
                type="text"
                onChange={(e) => changeEnglishHandler(e, i)}
                value={item.english}
                required={true}
              />
            </label>
            <label className="create-form__label">
              Введите перевод
              <Input
                type="text"
                onChange={(e) => changeTranslateHandler(e, i)}
                value={item.russian}
                required={true}
              />
            </label>
          </div>
        ))}
        <div className="create-form__button-wrapper">
          <Button onClick={addHandler} className="create-form__button">+</Button>
        </div>
      </div>
    </form>
  )
}

export default CreateForm;

// протестировать, законсолить useCallback в компаре арр
