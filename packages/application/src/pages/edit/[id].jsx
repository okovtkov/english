/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form } from '@english/components';
import { api } from '@english/api';

function EditPart(props) {
  const navigate = useNavigate();
  const params = useParams();
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      api.words.update(props.wordsData.words, params.id).then(() => {
        navigate('/edit/');
      });
    },
    [navigate, params.id, props],
  );

  useEffect(() => {
    api.words.getById(params.id).then((resp) => {
      props.onChangeWordsData(resp);
    });
  }, []);

  return (
    <Form
      data={props.data}
      onChangeData={props.onChangeData}
      onSubmit={onSubmit}
      wordsData={props.wordsData}
      onChangeWordsData={props.onChangeWordsData}
      buttonText="Сохранить"
    />
  );
}

export default EditPart;
