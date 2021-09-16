import { useState, useContext, createContext, useCallback } from "react";

const BoardContext = createContext();

export const useBoard = () => {
  return useContext(BoardContext);
};

export const BoardProvider = (props) => {
  const [hasTurn, setHasTurn] = useState(false);
  const [symbol, setSymbol] = useState("");
  const [player, setPlayer] = useState(1);

  const [board, setBoard] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);

  const resetBoardHandler = useCallback(() => {
    setBoard([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
  }, [setBoard]);

  const quitBoardHandler = useCallback(() => {
    setBoard([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
    setHasTurn(false);
    setSymbol("");
    setPlayer(1);
  }, [setBoard, setHasTurn, setSymbol, setPlayer]);

  return (
    <BoardContext.Provider
      value={{
        hasTurn,
        symbol,
        player,
        board,
        setHasTurn,
        setSymbol,
        setPlayer,
        setBoard,
        resetBoardHandler,
        quitBoardHandler
      }}
    >
      {props.children}
    </BoardContext.Provider>
  );
};
