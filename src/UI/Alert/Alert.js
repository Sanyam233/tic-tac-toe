import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import "../../styles/UI.css";

const AlertOverlay = (props) => {

    return (
    <div className = "alert">
        {props.children}
        <button className = "dismiss-button" onClick = {props.onDismiss}>
            <FontAwesomeIcon icon = "times"/>
        </button>
    </div>);
}

const Alert = (props) => {
    return ReactDOM.createPortal(<AlertOverlay {...props} />, document.getElementById('alert-root'));
}

export default Alert;
