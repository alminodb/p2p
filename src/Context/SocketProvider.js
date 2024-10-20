import React, { useContext, useEffect } from 'react'
import { createContext } from 'react'
import { io } from 'socket.io-client';
import { ChatState } from './ChatProvider';

const socketContext = createContext();

const __ENDPOINT = "http://localhost:5000";

const SocketProvider = ({ children }) => {

    const socket = io(__ENDPOINT);

    return (
        <socketContext.Provider value={socket}>
            {children}
        </socketContext.Provider>
    );
}

export const SocketState = () => {
    return useContext(socketContext);
}

export default SocketProvider
