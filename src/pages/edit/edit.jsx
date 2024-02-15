import Settings from '../../components/settings/settings';

function Edit(props) {
  return <Settings data={props.data} onChangeData={props.onChangeData} />;
}

export default Edit;
