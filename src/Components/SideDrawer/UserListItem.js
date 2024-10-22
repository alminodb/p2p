import { Avatar } from "@chakra-ui/avatar";
import { Box, Text } from "@chakra-ui/layout";
import { Button, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { ChatState } from "../../Context/ChatProvider";

const UserListItem = ({ listUser, handleFunction }) => {

    const [addFriend, setAddFriend] = useState(false);
    const { user } = ChatState();

    const toast = useToast();

    const handleAddFriend = () => {

        if(user.friends.some(v => v._id === listUser._id)) {
            handleFunction();
        }
        else {
            !addFriend && setAddFriend(true);
        }
    }

    const handleCloseButton = () => {
        addFriend && setAddFriend(false);
    }

    const handleAddFriendButton = async () => {

        if(addFriend) {
            try {
                const config = {
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${user.token}`
                    }
                }
                const { data } = await axios.post("/api/user/friend/add", { userId: listUser._id }, config);


                setAddFriend(false);
                toast({
                    title: `You added ${listUser.name} as a friend`,
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "top",
                });
            } catch (error) {
                toast({
                    title: `Error occured.`,
                    description: error.response.data.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "top",
                });
            }
            setAddFriend(false);
        }
    }

    return (
        <Box
            onClick={handleAddFriend}
            cursor="pointer"
            bg="#E8E8E8"
            _hover={{
                background: "#38B2AC",
                color: "white",
            }}
            w="100%"
            display="flex"
            alignItems="center"
            color="black"
            px={3}
            py={2}
            mb={2}
            borderRadius="lg"
            position="relative"
            overflow="hidden"
        >
            <Avatar
                mr={2}
                size="sm"
                cursor="pointer"
                name={listUser.name}
                src={listUser.pic}
            />
            <Box>
                <Text>{listUser.name}</Text>
                <Text fontSize="xs">
                    <b>Email : </b>
                    {listUser.email}
                </Text>
            </Box>
            <Box
                position="absolute"
                left="0"
                h="100%"
                w="100%"
                display={addFriend ? "flex" : "none"}
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                bg="#E8E8E8"
                color="black"
            >
                <Text>Add friend?</Text>
                <Box display="flex" columnGap="10px">
                    <Button colorScheme='teal' size='sm' onClick={handleAddFriendButton}>
                        Yes
                    </Button>
                    <Button colorScheme='red' size='sm' onClick={handleCloseButton}>
                        No
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default UserListItem;