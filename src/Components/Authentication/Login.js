import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, useToast, VStack } from '@chakra-ui/react'
import axios from 'axios';
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordShown, setPasswordShown] = useState(false);

    const toast = useToast();
    const history = useHistory();

    const emailHandler = (event) => {
        setEmail(event.target.value);
    }

    const passwordHandler = (event) => {
        setPassword(event.target.value);
    }

    const passwordShownHandler = () => {
        setPasswordShown(passwordShown ? false : true);
    }

    const submitHandler = async() => {
        if (!email || !password) {
            toast({
                title: "You must fill all fields!",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top"
            });
            return;
        }

        try {
            const { data } = await axios.post("/api/user/login", { email, password });

            toast({
                title: "Login successfull!",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top"
            });

            localStorage.setItem("userInfo", JSON.stringify(data));
            history.push("chats");
        } catch (error) {
            toast({
                title: "Error occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top"
            });
        }
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

                    <Button type='submit' mt="20px" onClick={submitHandler}>Login</Button>
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
