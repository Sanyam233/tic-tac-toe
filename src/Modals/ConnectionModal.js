import { useGame } from "../Context/GameProvider";
import Spinner from "../UI/Spinner/Spinner";
import Modal from "../UI/Modal/Modal";
import "../styles/UI.css";

const ConnectionModal = (props) => {
  const { gameID } = useGame();

  const copyToClipboard = () => {
    if (!navigator.clipboard) {
      const textField = document.createElement("textarea");
      textField.innerText = gameID;
      document.body.appendChild(textField);
      textField.select();
      document.execCommand("copy");
      textField.remove();
    } else {
      navigator.clipboard.writeText(gameID);
    }
  };

  return (
    <Modal>
      <h1 className="modal-header">Game Guideline</h1>
      <p className="modal-para">
        Waiting for another user to join the room.
        Please share the game ID{" "}
        {
          <span onClick={copyToClipboard} className="game-id">
            {gameID}
          </span>
        }
        {" "}to play together.
      </p>
      <div>
        <Spinner />
      </div>
    </Modal>
  );
};

export default ConnectionModal;
