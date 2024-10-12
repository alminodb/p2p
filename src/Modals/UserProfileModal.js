import { Avatar, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, VStack } from '@chakra-ui/react'
import React from 'react'

const UserProfileModal = ({ children, user }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();


    return (
        <>
            {children &&
                (
                    <>
                        <span onClick={onOpen}>{children}</span>
                        <Modal isCentered isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay
                                bg='blackAlpha.300'
                                backdropFilter='blur(10px) hue-rotate(90deg)'
                            />
                            <ModalContent>
                                <ModalHeader></ModalHeader>
                                {/* <ModalCloseButton /> */}
                                <ModalBody>
                                    <VStack>
                                        <Avatar src={user.pic} size="2xl" name={user.name} />
                                        <Text>{user.name}</Text>
                                        <Text>{user.email}</Text>
                                    </VStack>
                                </ModalBody>
                                <ModalFooter display="flex" justifyContent="center">
                                    <Button onClick={onClose}>Close</Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                    </>
                )
            }
        </>
    )
}

export default UserProfileModal
