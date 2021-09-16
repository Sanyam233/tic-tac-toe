import { useState, useContext, createContext } from "react";

const GameContext = createContext();

export const useGame = () => {
  return useContext(GameContext);
};

export const GameProvider = (props) => {
  const [isGameOver, setGameOver] = useState(false);
  const [gameID, setGameID] = useState("");
  const [isInRoom, setInRoom] = useState(false);
  const [isGameStarted, setGameStarted] = useState(false);
  const [gameOverMessage, setGameOverMessage] = useState("");

  const gameOverHandler = (message) => {
    setGameOver(true);
    setGameOverMessage(message);
  };

  const resetGameHandler = () => {
    setGameOver(false);
    setGameOverMessage("");
  };

  const quitGameHandler = () => {
    setGameOver(false);
    setInRoom(false);
    setGameStarted(false);
    setGameOverMessage("");
    setGameID("");
  }

  return (
    <GameContext.Provider
      value={{
        isInRoom,
        gameID,
        isGameStarted,
        isGameOver,
        gameOverMessage,
        gameOverHandler,
        resetGameHandler,
        setGameStarted,
        setInRoom,
        setGameID,
        quitGameHandler
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
};
