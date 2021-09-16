import { useEffect, useState } from "react";

import Confetti from "react-confetti";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faRedo,
  faSignOutAlt,
  faAward,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

import Login from "./Authentication/Login";
import Game from "./Game/Game";

import "./styles/App.css";
import GameOverModal from "./Modals/GameOverModal";
import ConnectionModal from "./Modals/ConnectionModal";
import Alert from "./UI/Alert/Alert";

import { useGame } from "./Context/GameProvider";
import { useSocket } from "./Context/SocketProvider";
import { useBoard } from "./Context/BoardProvider";

library.add(faRedo, faSignOutAlt, faAward, faTimes);

function App() {
  const { socket } = useSocket();
  const { isGameOver, isGameStarted, isInRoom, quitGameHandler } = useGame();
  const [hasQuit, setHasQuit] = useState(false);
  const { quitBoardHandler } = useBoard();

  useEffect(() => {
    if (!socket) return;
    socket.on("quit_game", () => {
      quitGameHandler();
      quitBoardHandler();
      socket.emit("leave_room");
      setHasQuit(true);
    });
  }, [socket, quitGameHandler, quitBoardHandler]);

  const dismissAlert = () => {
    setHasQuit(false);
  };

  console.log("running");

  return (
    <>
      {hasQuit && (
        <Alert onDismiss={dismissAlert}>Other player has left the game</Alert>
      )}
      {isGameOver && <Confetti />}
      {isGameOver && <GameOverModal />}
      {!isGameStarted && isInRoom && <ConnectionModal />}
      <div className="App">
        {!isInRoom && <Login />}
        {isInRoom && <Game />}
      </div>
    </>
  );
}

export default App;
