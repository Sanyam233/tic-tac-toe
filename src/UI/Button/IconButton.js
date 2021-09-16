import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../styles/UI.css";

export default function IconButton(props) {
  return (
    <button
      className="icon-button"
      onClick={props.onClick}
      disabled={props.disabled}
    >
      <FontAwesomeIcon icon = {props.icon}/>
    </button>
  );
}
