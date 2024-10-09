import { BellIcon, ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Avatar, Box, Button, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, Tooltip } from "@chakra-ui/react";
import { useState } from "react";
import { ChatState } from "../../../Context/ChatProvider";

const SideDrawer = () => {

    const { user } = ChatState();

    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState();

    return (
        <>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                bg="white"
                w="100%"
                p="5px 10px 5px 10px"
            >
                <Tooltip label="Search users for chatting" hasArrow placement="bottom-end">
                    <Button variant="ghost">
                        <i class="fa fa-search"></i>
                        <Text display={{ base: "none", md: "flex" }} px="4">
                            Search users
                        </Text>
                    </Button>
                </Tooltip>

                <Text fontSize="2xl" fontFamily="Work sans">
                    Chat
                </Text>

                <div>
                    <Menu>
                        <MenuButton p={1}>
                            <BellIcon fontSize="2xl" m={1} />
                        </MenuButton>
                    </Menu>

                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                            <Avatar size='sm' cursor="pointer" name={user.name} src={user.pic} />
                        </MenuButton>
                        <MenuList>
                            <MenuItem>My profile</MenuItem>
                            <MenuDivider />
                            <MenuItem color="red" fontWeight="bold">Logout</MenuItem>
                        </MenuList>
                    </Menu>
                </div>
            </Box>
        </>
    )
};

export default SideDrawer;