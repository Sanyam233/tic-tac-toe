import ReactDOM  from "react-dom";

import "../../styles/UI.css";

const Backdrop = () => {
    return <div className = "backdrop"></div>;
}

const Modal = (props) => {

    const modal = (
        <>
        <Backdrop/>
        <div className = "modal">
            {props.children}
        </div>
        </>
    )

    return ReactDOM.createPortal(modal, document.getElementById('modal-root'))
}

export default Modal;