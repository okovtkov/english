import './close-button.scss';

function CloseButton(props) {
  return (
    <button
      type="button"
      data-testid="close-button"
      className={`close-button ${props.className}`}
      onClick={props.onClick}
    />
  );
}

export default CloseButton;
