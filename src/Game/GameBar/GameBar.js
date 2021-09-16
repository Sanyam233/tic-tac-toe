import IconButton from "../../UI/Button/IconButton";
import { useGame } from "../../Context/GameProvider";
import { useBoard } from "../../Context/BoardProvider";
import { useSocket } from "../../Context/SocketProvider";

const GameBar = (props) => {
  const { player } = useBoard();
  const { resetGameHandler, quitGameHandler, gameID } = useGame();
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
    <div className="game-bar">
      <IconButton icon="redo" onClick = {onPlayAgain}/>
      <div className="current-player-holder">
        <span>{`Player ${player}`}</span>
      </div>
      <IconButton icon="sign-out-alt" onClick = {onQuitHandler}/>
    </div>
  );
};

export default GameBar;
