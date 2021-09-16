import { useState, useRef } from "react";
import { useSocket } from "../Context/SocketProvider";
import { v4 as uuid4 } from "uuid";

import Button from "../UI/Button/Button";
import { useGame } from "../Context/GameProvider";
import "../styles/Login.css";

const joinGameRoom = async (socket, gameID) => {
  return new Promise((resolve, reject) => {
    socket.emit("join_room", { gameID });
    socket.on("room_joined", () => resolve(true));
    socket.on("join_room_error", ({ error }) => {
      reject(error);
    });
  });
};

const Login = (props) => {
  const [isJoining, setIsJoining] = useState(false);
  const gameIDRef = useRef();
  const { socket } = useSocket();
  const { setInRoom, gameID, setGameID } = useGame();

  const createGameIDHandler = (event) => {
    event.preventDefault();
    const randomGameID = uuid4();
    setGameID(randomGameID);
  };

  const joinGameRoomCaller = async (socket, gameID) => {
    return await joinGameRoom(socket, gameID).catch((err) => {
      alert(err);
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (!gameID || gameID.trim().length === 0 || !socket) return;

    setIsJoining(true);

    const joined = joinGameRoomCaller(socket, gameID);
    if (joined) setInRoom(true);
    gameIDRef.current.value = "";

    setIsJoining(false);
  };

  const gameIDChangeHandler = (event) => {
    const value = event.target.value;
    setGameID(value);
  };

  return (
    <div className="login">
      <h1 className="login-header">
        Welcome to <span>Tic Tac Toe</span>
      </h1>
      <form>
        <div className="login-input-field">
          <label>Game ID</label>
          <input
            type="text"
            onChange={gameIDChangeHandler}
            value={gameID}
            ref={gameIDRef}
            placeholder="Enter or create a game ID"
          />
        </div>
        <div className="flex-column-container">
          <Button onClick={submitHandler} disabled={isJoining}>
            Start
          </Button>
          <Button onClick={createGameIDHandler}>Create Game ID</Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
