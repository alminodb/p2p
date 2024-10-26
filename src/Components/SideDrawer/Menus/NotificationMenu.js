import React, { useEffect, useState } from 'react'
import {
    Menu,
    MenuList,
    MenuItem,
    Spinner,
    useToast,
} from '@chakra-ui/react'
import axios from 'axios';
import { ChatState } from '../../../Context/ChatProvider';

const NotificationMenu = ({ children, accessChat }) => {

    const { user, notifications, setNotifications } = ChatState();

    const [isLoading, setIsLoading] = useState(true);

    const toast = useToast();

    const config = {
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`
        }
    };

    const fetchNotifications = async () => {
        setIsLoading(true);
        try {
            const { data } = await axios.get("/api/notification", config);

            setNotifications(data);
        } catch (error) {
            console.log(error.response.data.message);
        } finally {
            setIsLoading(false);
        }
    }

    const deleteNotification = async (notification) => {
        try {
            accessChat(notification.sender);
            await axios.put("/api/notification/delete", { notificationId: notification._id }, config);
            setNotifications(notifications.filter(n => n._id !== notification._id));
        } catch (error) {
            toast({
                title: "Error fetching the chat",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
        }
    }

    useEffect(() => {
        fetchNotifications();
    }, []);

    return (
        <>
            <Menu>
                <span>{children}</span>
                {isLoading ? (
                    <MenuList>
                        <MenuItem display="flex" justifyContent="center">
                            <Spinner />
                        </MenuItem>
                    </MenuList>
                ) : (
                    <MenuList>
                        {(!notifications || notifications.length < 1) ? (<MenuItem>No notifications</MenuItem>) : (
                            notifications.map((notification) => <MenuItem key={notification._id} onClick={() => deleteNotification(notification)}>{notification.title}</MenuItem>)
                        )}
                    </MenuList>
                )}

            </Menu>
        </>
    );
}

export default NotificationMenu
