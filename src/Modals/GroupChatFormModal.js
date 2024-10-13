import { Badge, Box, Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Stack, useDisclosure, useToast, VStack } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import UserList from './UserList/UserList';
import UserListItem from './UserList/UserListItem';
import { CloseIcon } from '@chakra-ui/icons';
import UserListBadge from './UserList/UserListBadge';
import { ChatState } from '../Context/ChatProvider';

const GroupChatFormModal = ({ children }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [groupName, setGroupName] = useState("");
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [added, setAdded] = useState([])

    const toast = useToast();

    const { user, setChats, chats } = ChatState();

    const searchHandler = async () => {

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

    const onAdd = (userToAdd) => {
        if (userToAdd) {
            if (added.some(v => v._id === userToAdd._id)) {
                toast({
                    title: "User already added!",
                    status: "warning",
                    duration: 3000,
                    isClosable: true,
                    position: "top"
                });
            }
            else {
                setAdded([...added, userToAdd]);
            }
        }
    }

    const deleteHandler = (userId) => {
        setAdded(added.filter((u) => u._id !== userId));
    }

    const createGroupHandler = async () => {
        if (!groupName) {
            toast({
                title: "You must fill the group name field!",
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "top"
            });
        }
        else if (added && added.length < 2) {
            toast({
                title: "You need to select 2 or more people!",
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "top"
            });
        }

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            };

            const finalUsers = added.map(u => u._id);
            const { data } = await axios.post("/api/chat/group/create", { users: finalUsers, chatName: groupName }, config);

            setChats([data, ...chats]);
            onClose();

            toast({
                title: "New Group Chat Created!",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top",
            });
        } catch (error) {
            toast({
                title: "Error occured!",
                description: error.message,
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "top"
            });
        }
    }

    useEffect(() => {
        if (search.length > 0) {

            setLoading(true);
            const searchTimer = setTimeout(() => {
                searchHandler();
            }, 600)

            return () => {
                clearTimeout(searchTimer);
            }
        } else {
            setSearchResult([]);
        }
    }, [search])

    return (
        <>
            <span onClick={onOpen}>{children}</span>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create new group chat</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <Input placeholder='Group name' onChange={(e) => setGroupName(e.target.value)} />
                        </FormControl>
                        <Stack direction="row" mt="15px">
                            {
                                (added.length > 0 ? (
                                    added.map((s) => (
                                        <UserListBadge key={s._id} handleFunction={() => deleteHandler(s._id)} user={s} />
                                    ))
                                ) : (<></>))
                            }
                        </Stack>
                        <FormControl mt="10px">
                            <Input placeholder='Users' onChange={(e) => setSearch(e.target.value)} />
                        </FormControl>

                        <UserList>
                            {
                                loading ? (
                                    <Spinner />
                                ) : (
                                    (searchResult.length > 0 ? (
                                        searchResult.map((s) => (
                                            <UserListItem onAdd={onAdd} user={s} key={s._id} />
                                        ))
                                    ) : (<span>No result</span>))
                                )
                            }
                        </UserList>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={createGroupHandler}>
                            Create group
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default GroupChatFormModal
