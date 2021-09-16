import ModalButton from "../UI/Button/ModalButton";
import Modal from "../UI/Modal/Modal";
import { useGame } from "../Context/GameProvider";
import { useBoard } from "../Context/BoardProvider";
import { useSocket } from "../Context/SocketProvider";

const GameOverModal = () => {
  const { gameOverMessage, resetGameHandler, quitGameHandler, gameID } = useGame();
  const { resetBoardHandler, quitBoardHandler } = useBoard();
  const { socket } = useSocket();

  const onPlayAgain = () => {
    resetGameHandler();
    resetBoardHandler();
    socket.emit("play_again", { gameID });
  };

  const onQuitHandler = () => {
    quitBoardHandler();
    quitGameHandler();
    socket.emit("quit_game", { gameID });
  };

  return (
    <Modal>
      <h1 className="modal-header">Game Over</h1>
      <p className="modal-para">{gameOverMessage}</p>
      <div>
        <ModalButton onClick={onPlayAgain}>Play Again</ModalButton>
        <ModalButton onClick = {onQuitHandler}>Quit</ModalButton>
      </div>
    </Modal>
  );
};

export default GameOverModal;
