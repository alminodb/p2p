import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordShown, setPasswordShown] = useState(false);

    const nameHandler = (event) => {
        setName(event.target.value);
    }

    const emailHandler = (event) => {
        setEmail(event.target.value);
    }

    const passwordHandler = (event) => {
        setPassword(event.target.value);
    }

    const confirmPasswordHandler = (event) => {
        setConfirmPassword(event.target.value);
    }

    const passwordShownHandler = () => {
        setPasswordShown(passwordShown ? false : true);
    }

    const submitHandler = (event) => {
        event.preventDefaults();
    }

    return (
        <>
            <VStack>
                <FormControl id="register-form">
                    <FormLabel>Name</FormLabel>
                    <Input id="register-form__name" placeholder="Name" onChange={nameHandler} />

                    <FormLabel>Email</FormLabel>
                    <Input id="register-form__email" placeholder="Email" onChange={emailHandler} />

                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                        <Input id="register-form__password" placeholder="Password" onChange={passwordHandler} type={passwordShown ? "text" : "password"} />
                        <InputRightElement><Button onClick={passwordShownHandler}>{passwordShown ? "Hide" : "Show"}</Button></InputRightElement>
                    </InputGroup>

                    <FormLabel>Confirm password</FormLabel>
                    <InputGroup>
                        <Input id="register-form__confirm-password" placeholder="Confirm Password" onChange={confirmPasswordHandler} type={passwordShown ? "text" : "password"} />
                        <InputRightElement><Button onClick={passwordShownHandler}>{passwordShown ? "Hide" : "Show"}</Button></InputRightElement>
                    </InputGroup>

                    <Button mt="20px">Register</Button>

                </FormControl>
            </VStack>
        </>
    )
}

export default Register
