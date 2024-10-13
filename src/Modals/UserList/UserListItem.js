import { Avatar, Badge, Box, Text, VStack } from '@chakra-ui/react';
import React from 'react'

const UserListItem = ({ user, onAdd }) => {

  const addHandler = () => {
    onAdd(user);
  }

  return (
    <>
      <Box
        w="100%"
        display="flex"
        alignItems="center"
        columnGap="15px"
        _hover={{
          background: "#3182ce",
          color: "white",
          cursor: "pointer"
        }}
        borderRadius="25px 0 0 25px"
        onClick={addHandler}
      >
        <Avatar src={user.pic} bgColor="#eee" />
        <Box ml='3'>
          <Text fontWeight='bold'>
            {user.name}
          </Text>
          <Text fontSize='sm'>{user.email}</Text>
        </Box>
      </Box>
    </>
  )
}

export default UserListItem;
