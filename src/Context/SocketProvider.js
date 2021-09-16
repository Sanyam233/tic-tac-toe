import { useState, useEffect, useContext, createContext } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => {
    return useContext(SocketContext);
}

export const SocketProvider = (props) => {

    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io("https://tic-tac-toe-0001.herokuapp.com/");
        setSocket(newSocket);
        return () => newSocket.close();
    }, []);

    return (
        <SocketContext.Provider value = { { socket } }>
            {props.children}
        </SocketContext.Provider>
    )
}