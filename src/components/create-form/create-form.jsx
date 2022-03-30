import Button from "../button/button";
import './create-form.scss';

function CreateForm(props) {
  return(
    <div className="create">
      <h1 className="create__heading create__headeing--main">Создание нового раздела</h1>
      <h2 className="create__heading create__heading--name">Придумайте название раздела</h2>
      <input type="text" />
      <div className="create__wrapper">
        <label className="create__label">
          Введите слово на английском
          <input type="text" />
        </label>
        <label className="create__label">
          Введите перевод
          <input type="text" />
        </label>
        <Button>+</Button>
      </div>
    </div>
  )
}

export default CreateForm;

// стилизовать
// переименовать все id на name
// сделать добавление