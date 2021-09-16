import { useEffect } from "react";
import { useSocket } from "../Context/SocketProvider";
import { useGame } from "../Context/GameProvider";
import { useBoard } from "../Context/BoardProvider";
import GameBar from "./GameBar/GameBar";

import "../styles/Game.css";

const Game = () => {
  const { socket } = useSocket();
  const {
    setGameStarted,
    gameOverHandler,
    resetGameHandler,
  } = useGame();

  const {
    board,
    symbol,
    hasTurn,
    player,
    setBoard,
    setHasTurn,
    setSymbol,
    setPlayer,
    resetBoardHandler,
  } = useBoard();

  const checkGameState = (rowIdx, colIdx) => {
    let rcount = 0;
    let ccount = 0;
    let ldcount = 0;
    let rdcount = 0;

    for (let i = 0; i < 3; i++) {
      if (board[i][colIdx] === symbol) rcount++;
      if (board[rowIdx][i] === symbol) ccount++;
      if (board[i][i] === symbol) ldcount++;
      if (board[i][2 - i] === symbol) rdcount++;
    }

    let tieCount = 0;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] !== "") tieCount++;
      }
    }

    let res = -1;

    if (tieCount === 9) {
      res = 0;
    } else if (rcount === 3 || ccount === 3 || ldcount === 3 || rdcount === 3) {
      res = 1;
    }

    return res;
  };

  const updateBoard = (rowIdx, colIdx, symbol) => {
    if (!hasTurn || board[rowIdx][colIdx] !== "") return;
    
    const newBoard = [...board];
    newBoard.map((row) => [...row]);
    newBoard[rowIdx][colIdx] = symbol;
    setBoard(newBoard);

    if (socket) {
      socket.emit("update_game", { board });
      setHasTurn(false);
    }

    const gameState = checkGameState(rowIdx, colIdx);

    if (gameState === -1) return;

    let message = "Draw Game";

    if (gameState === 0) {
      socket.emit("game_over", { message });
    } else if (gameState === 1) {
      message = `Player ${player} has won the game`;
      socket.emit("game_over", { message });
    }

    gameOverHandler(message);
  };

  useEffect(() => {
    if (!socket) return;

    socket.on("on_game_update", ({ board }) => {
      setBoard(board);
      setHasTurn(true);
    });

    socket.on("start_game", ({ start, symbol, player }) => {
      setGameStarted(true);
      setHasTurn(start);
      setSymbol(symbol);
      setPlayer(player);
    });

    socket.on("game_over", ({ message }) => {
      gameOverHandler(message);
    });

    socket.on("play_again_reset", () => {
      resetBoardHandler();
      resetGameHandler();
    });
  }, [
    socket,
    setGameStarted,
    setBoard,
    gameOverHandler,
    setHasTurn,
    setPlayer,
    resetBoardHandler,
    resetGameHandler,
    setSymbol,
  ]);

  return (
    <>
      <GameBar />
      <div className="game">
        {board.map((row, rowIdx) => {
          return (
            <div className="game-row" key = {rowIdx}>
              {board[rowIdx].map((col, colIdx) => {
                return (
                  <div key = {colIdx}
                    onClick={() => updateBoard(rowIdx, colIdx, symbol)}
                    className="game-row-cell"
                    style={{
                      borderLeft: colIdx > 0 && "3px solid #E0E0E0",
                      borderTop: rowIdx * 3 + colIdx > 2 && "3px solid #E0E0E0",
                      borderBottom:
                        rowIdx * 3 + colIdx < 6 && "3px solid #E0E0E0",
                      borderRight: colIdx < 2 && "3px solid #E0E0E0",
                    }}
                  >
                    {col !== "" && (
                      <span className={col === "X" ? "tac" : "tic"}></span>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Game;
