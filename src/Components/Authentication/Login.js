import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordShown, setPasswordShown] = useState(false);

    const emailHandler = (event) => {
        setEmail(event.target.value);
    }

    const passwordHandler = (event) => {
        setPassword(event.target.value);
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
                <FormControl id="login-form">
                    <FormLabel>Email</FormLabel>
                    <Input id="login-form__email" placeholder="Email" onChange={emailHandler} />

                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                        <Input id="login-form__password" placeholder="Password" onChange={passwordHandler} type={passwordShown ? "text" : "password"} />
                        <InputRightElement><Button onClick={passwordShownHandler}>{passwordShown ? "Hide" : "Show"}</Button></InputRightElement>
                    </InputGroup>

                    <Button mt="20px">Login</Button>
                    <Button mt="20px" onClick={() => {
                        setEmail("almin@example.com");
                        setPassword("123123123");
                    }} colorScheme='red'>Give me auto credentials</Button>

                </FormControl>
            </VStack>
        </>
    )
}

export default Login
