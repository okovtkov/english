/* eslint-disable react-hooks/exhaustive-deps */
import Form from "../../components/form/form";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { words } from "../../api/words";

function Create(props) {
  const navigate = useNavigate();
  const onSubmit = useCallback((e) => {
    e.preventDefault();
    words.add(props.wordsData.words).then((resp) => {
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
    props.onChangeWordsData({
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
    })
  }, []);

  return (
    <Form
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
