import React from 'react'
import { ChatState } from '../Context/ChatProvider'
import { Box } from '@chakra-ui/react';
import SideDrawer from '../Components/SideDrawer/SideDrawer';
import MyChats from '../Components/MainViewComponents/MyChats/MyChats';
import ChatBox from '../Components/MainViewComponents/ChatBox/ChatBox';

const ChatPage = () => {

    const { user } = ChatState();

    return (
        <div style={{ width: "100%" }}>
            {user && <SideDrawer />}
            <Box
                display="flex"
                justifyContent="space-between"
                w="100%"
                h="91.5vh"
                p="10px"
            >
                {user && <MyChats />}
                { user && <ChatBox />}
            </Box>
        </div>
    )
}

export default ChatPage
