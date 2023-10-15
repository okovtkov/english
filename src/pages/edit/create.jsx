/* eslint-disable react-hooks/exhaustive-deps */
import Form from "../../components/form/form";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { words } from "../../api/words";

function Create(props) {
  const navigate = useNavigate();
  const onSubmit = useCallback((e) => {
    e.preventDefault();
    const clone = {...props.wordsData};
    clone.words.createdAt = Date.now();
    clone.words.owner = props.user.uid;

    words.add(clone.words).then((resp) => {
      const { id } = resp;
      const { data } = props;
      const cloneData = [...data];
      const cloneWordsData = {...props.wordsData};
      cloneWordsData.id = id;
      props.onChangeWordsData(cloneWordsData);
      cloneData.push(cloneWordsData);
      props.onChangeData(cloneData);
      navigate('/edit/');
    });
  }, [navigate, props]);

  useEffect(() => {
    const dateNow = Date.now();
    props.onChangeWordsData({
      id: '',
      words: {
        name: '',
        words: [
          {
            english: '',
            russian: '',
            id: dateNow,
          },
          {
            english: '',
            russian: '',
            id: dateNow + 100,
          },
          {
            english: '',
            russian: '',
            id: dateNow + 101,
          },
          {
            english: '',
            russian: '',
            id: dateNow + 102,
          },
          {
            english: '',
            russian: '',
            id: dateNow + 103,
          },
        ]
      }
    })
  }, []);

  return (
    <Form
      user={props.user}
      data={props.data}
      onChangeData={props.onChangeData}
      onSubmit={onSubmit}
      wordsData={props.wordsData}
      onChangeWordsData={props.onChangeWordsData}
      buttonText="Создать"
    />
  );
}

export default Create;
