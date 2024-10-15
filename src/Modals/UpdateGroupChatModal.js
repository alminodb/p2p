import { Badge, Box, Button, FormControl, FormLabel, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Stack, useDisclosure, useToast, VStack } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { ChatState } from '../Context/ChatProvider';
import UserList from './UserList/UserList';
import { ViewIcon } from '@chakra-ui/icons';
import UserListBadge from './UserList/UserListBadge';
import axios from 'axios';
import UserListItem from './UserList/UserListItem';

const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain, fetchMessages }) => {

    const { onOpen, onClose, isOpen } = useDisclosure();
    const { user, selectedChat, setSelectedChat } = ChatState();

    const groupNameRef = useRef();

    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);

    const toast = useToast();

    const updateNameHandler = async () => {
        if (!groupNameRef.current.value) {
            toast({
                title: "Name must not be empty!",
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "top"
            });
            return;
        }
        if (groupNameRef.current.value === selectedChat.chatName) {
            toast({
                title: "Name is the same as before!",
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "top"
            });
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`
                }
            };

            const { data } = await axios.put("/api/chat/group/rename", { chatId: selectedChat._id, chatName: groupNameRef.current.value }, config);

            setSelectedChat(data);
            onClose();
            setFetchAgain(!fetchAgain);

            toast({
                title: "You successfully changed name of the group!",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top"
            });
        } catch (error) {
            toast({
                title: "Error occured!",
                description: error.message,
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top"
            });
        }
    }

    const searchHandler = async () => {

        setLoading(true);
        if (search) {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                };

                const { data } = await axios.get(`/api/user?search=${search}`, config);

                setSearchResult(data);
            } catch (error) {
                toast({
                    title: "Error occured!",
                    description: error.message,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                    position: "top"
                });
            }
        }

        setLoading(false);
    }

    const onAdd = async (userToAdd) => {
        if (userToAdd) {
            if (selectedChat.users?.some(v => v._id === userToAdd._id)) {
                toast({
                    title: "User already in group!",
                    status: "warning",
                    duration: 3000,
                    isClosable: true,
                    position: "top"
                });
            }
            else {
                const config = {
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${user.token}`
                    }
                };

                const { data } = await axios.put("/api/chat/group/add", { chatId: selectedChat._id, userId: userToAdd._id }, config);

                setSelectedChat(data);
                setFetchAgain(!fetchAgain);

                toast({
                    title: `You added ${userToAdd.name} from the group.`,
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "top"
                });
            }
        }
    }

    const onRemove = async (u) => {
        if (!u) {
            toast({
                title: "There is no user to remove from the group!",
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "top"
            });
            return;
        }

        if (user._id !== selectedChat.groupAdmin._id) {
            toast({
                title: "Only admin can do that!",
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "top"
            });
            return;
        }

        if (u._id === selectedChat.groupAdmin._id) {
            toast({
                title: "You cant remove an admin from the group!",
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "top"
            });
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`
                }
            };

            const { data } = await axios.put("/api/chat/group/remove", { chatId: selectedChat._id, userId: u._id }, config);
            setSelectedChat(data);
            setFetchAgain(!fetchAgain);

            toast({
                title: `You removed ${u.name} from the group.`,
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top"
            });
        } catch (error) {
            toast({
                title: "Error occured!",
                description: error.message,
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top"
            });
        }
    }

    const leaveGroupHandler = async () => {
        if (user._id === selectedChat.groupAdmin._id) { // if admin leaves the group
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`
                }
            };

            try {
                const { data } = await axios.put("/api/chat/group/delete", { chatId: selectedChat._id }, config);

                toast({
                    title: `You left and deleted group ${selectedChat.chatName}`,
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "top"
                });

                setSelectedChat("");
                setFetchAgain(!fetchAgain);
            } catch (error) {
                toast({
                    title: "Error occured!",
                    description: error.message,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                    position: "top"
                });
            }

        } else {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`
                }
            };

            const { data } = await axios.put("/api/chat/group/remove", { chatId: selectedChat._id, userId: user._id }, config);

            toast({
                title: `You left "${selectedChat.chatName}"`,
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top"
            });

            setSelectedChat("");
            setFetchAgain(!fetchAgain);
        }
    }

    useEffect(() => {
        const searchTimer = setTimeout(() => {
            searchHandler();
        }, 500);

        return () => {
            clearTimeout(searchTimer);
        }
    }, [search])

    return (
        <>
            <IconButton display={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />

            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        fontSize="35px"
                        fontFamily="Work sans"
                        display="flex"
                        justifyContent="center"
                    >
                        {selectedChat.chatName}
                    </ModalHeader>

                    <ModalCloseButton />
                    <ModalBody display="flex" flexDir="column" alignItems="center">
                        <Box w="100%" display="flex" flexWrap="wrap" pb={3}>
                            {selectedChat.users.map((u) => (
                                <UserListBadge
                                    key={u._id}
                                    user={u}
                                    admin={selectedChat.groupAdmin}
                                    handleFunction={() => onRemove(u)}
                                />
                            ))}
                        </Box>
                        <FormControl display="flex">
                            <Input
                                placeholder="Chat Name"
                                mb={3}
                                ref={groupNameRef}
                                value={selectedChat.name}
                            />
                            <Button
                                variant="solid"
                                colorScheme="teal"
                                ml={1}
                                onClick={updateNameHandler}
                            >
                                Update
                            </Button>
                        </FormControl>
                        <FormControl>
                            <Input
                                placeholder="Add User to group"
                                mb={1}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </FormControl>

                        <UserList>
                            {
                                loading ? (
                                    <Spinner />
                                ) : (
                                    (searchResult.length > 0 ? (
                                        searchResult.map((s) => (
                                            <UserListItem user={s} key={s._id} onAdd={onAdd} />
                                        ))
                                    ) : (<span>No result</span>))
                                )
                            }
                        </UserList>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="red" onClick={leaveGroupHandler}>
                            {(selectedChat.groupAdmin._id === user._id) ? ("Leave and delete group") : ("Leave group")}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default UpdateGroupChatModal
