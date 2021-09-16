import "../../styles/UI.css";

export default function ModalButton(props) {
  return (
    <button
      className= "modal-button"
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
