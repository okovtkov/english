import { Settings } from '@english/components';

function Edit(props) {
  return <Settings data={props.data} onChangeData={props.onChangeData} />;
}

export default Edit;
