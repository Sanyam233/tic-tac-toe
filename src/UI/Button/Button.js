import "../../styles/UI.css";

export default function Button(props) {
  return (
    <button
      className={`button`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
