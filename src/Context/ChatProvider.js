import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [selectedChat, setSelectedChat] = useState("");
    const [chats, setChats] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [activeUsers, setActiveUsers] = useState([]);

    const history = useHistory();

    const fetchUser = async (userInfo) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
            };

            const { data } = await axios.get(`/api/user?search=${userInfo.email}`, config);
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (!userInfo) {
            history.push("/");
        }
        else if (userInfo) {
            setUser(userInfo);
            fetchUser(userInfo);
        }
    }, [history]);

    return (
        <ChatContext.Provider
            value={{
                user,
                setUser,
                selectedChat,
                setSelectedChat,
                chats,
                setChats,
                notifications,
                setNotifications,
                activeUsers,
                setActiveUsers,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

export const ChatState = () => {
    return useContext(ChatContext);
};

export default ChatProvider;