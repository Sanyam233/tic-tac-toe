import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { SocketProvider } from "./Context/SocketProvider";
import { GameProvider } from "./Context/GameProvider";
import { BoardProvider } from "./Context/BoardProvider";

ReactDOM.render(
  <React.StrictMode>
    <SocketProvider>
      <BoardProvider>
        <GameProvider>
          <App />
        </GameProvider>
      </BoardProvider>
    </SocketProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
