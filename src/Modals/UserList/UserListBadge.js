import { CloseIcon } from '@chakra-ui/icons';
import { Badge } from '@chakra-ui/react';
import React from 'react'

const UserListBadge = ({ user, handleFunction, admin }) => {
    return (
        <Badge
            px={2}
            py={1}
            borderRadius="lg"
            m={1}
            mb={2}
            variant="solid"
            fontSize={12}
            colorScheme="purple"
            cursor="pointer"
        >
            {user.name}
            {admin?._id === user?._id && <span style={{color: "orange"}}> (Admin)</span>}
            <CloseIcon pl={1} onClick={handleFunction} _hover={{color: "black"}} />
        </Badge>
    );
}

export default UserListBadge
