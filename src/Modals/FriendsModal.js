import React, { useEffect, useState } from 'react'
import {
    Box,
    Button,
    Flex,
    List,
    ListItem,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spinner,
    useDisclosure,
    useToast,
} from '@chakra-ui/react';
import { ChatState } from '../Context/ChatProvider';
import axios from 'axios';

const FriendsModal = ({ children, accessChat }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [loading, setLoading] = useState();
    const [friends, setFriends] = useState([]);
    const [pendingFriends, setPendingFriends] = useState([]);

    const { user } = ChatState();

    const toast = useToast();

    const fetchFriends = async () => {
        setLoading(true);
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }

            const { data } = await axios.get(`/api/user/friend/${user._id}`, config);

            setFriends(data.friends);
            setPendingFriends(data.pendingFriends);

            if (!isOpen) onOpen();

            setLoading(false);
        } catch (error) {
            toast({
                title: "Error occured!",
                description: error.response.data.message,
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top"
            });
        }
    }

    const handleAccept = async (id) => {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`
                }
            };

            const { data } = await axios.post("/api/user/friend/accept", { userId: id }, config);

            toast({
                title: `${data.name} is now your friend.`,
                status: "success",
                duration: 4000,
                isClosable: true,
                position: "top"
            });

            fetchFriends();
        } catch (error) {
            toast({
                title: "Error occured!",
                description: error.response.data.message,
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top"
            });
        }
    };

    const handleDecline = async (id) => {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`
                }
            };

            const { data } = await axios.post("/api/user/friend/decline", { userId: id }, config);

            toast({
                title: `You declined friend request from ${data.name}.`,
                status: "warning",
                duration: 4000,
                isClosable: true,
                position: "top"
            });

            fetchFriends();
        } catch (error) {
            toast({
                title: "Error occured!",
                description: error.response.data.message,
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top"
            });
        }
    };

    const handleRemoveFriend = async (id) => {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`
                }
            };

            const { data } = await axios.post("/api/user/friend/remove", { userId: id }, config);

            toast({
                title: `You removed ${data.name} from your friends list.`,
                status: "success",
                duration: 4000,
                isClosable: true,
                position: "top"
            });

            fetchFriends();
        } catch (error) {
            toast({
                title: "Error occured!",
                description: error.response.data.message,
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top"
            });
        }
    }

    const handleChat = (id) => {
        accessChat(id);
        onClose();
    };

    return (
        <>
            <span onClick={fetchFriends}>{children}</span>

            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                {!loading ? (<ModalContent>
                    <ModalHeader>Friends</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {/* Friend Requests */}
                        <Box mb={4}>
                            <Box fontWeight="bold" mb={2}>
                                Friend Requests
                            </Box>
                            <List spacing={3}>
                                {pendingFriends.length > 0 ? (
                                    pendingFriends.map((request) => (
                                        <ListItem key={request._id}>
                                            <Flex justify="space-between" align="center">
                                                <Box>{request.name}</Box>
                                                <Box>
                                                    <Button
                                                        size="sm"
                                                        colorScheme="green"
                                                        mr={2}
                                                        onClick={() => handleAccept(request._id)}
                                                    >
                                                        Accept
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        colorScheme="red"
                                                        onClick={() => handleDecline(request._id)}
                                                    >
                                                        Decline
                                                    </Button>
                                                </Box>
                                            </Flex>
                                        </ListItem>
                                    ))
                                ) : (
                                    <Box>No friend requests</Box>
                                )}
                            </List>
                        </Box>

                        {/* Friends List */}
                        <Box>
                            <Box fontWeight="bold" mb={2}>
                                Friends
                            </Box>
                            <List spacing={3}>
                                {friends.length > 0} : (
                                {friends.map((friend) => (
                                    <ListItem key={friend._id}>
                                        <Flex justify="space-between" align="center">
                                            <Box>{friend.name}</Box>
                                            <Box>
                                                <Button
                                                    size="sm"
                                                    colorScheme="blue"
                                                    mr={2}
                                                    onClick={() => handleChat(friend._id)}
                                                >
                                                    Chat
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    colorScheme="red"
                                                    onClick={() => handleRemoveFriend(friend._id)}
                                                >
                                                    Remove
                                                </Button>
                                            </Box>
                                        </Flex>
                                    </ListItem>
                                ))}
                                ) : (
                                <Box>No friends</Box>
                                )
                            </List>
                        </Box>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>) : (
                    <ModalContent>
                        <Spinner size="xl" />
                    </ModalContent>
                )}
            </Modal>
        </>
    );
}

export default FriendsModal
