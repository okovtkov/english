import CreateForm from "../../components/create-form/create-form";

function Create(props) {
  return (
    <CreateForm data={props.data} onChangeData={props.onChangeData} />
  );
}

export default Create;
