import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react'
import axios from 'axios';
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordShown, setPasswordShown] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const toast = useToast();
    const history = useHistory();

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

    const submitHandler = async () => {
        setIsLoading(true);

        if (!name || !email || !password || !confirmPassword) {
            toast({
                title: "You must fill all fields!",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top"
            });
            setIsLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            toast({
                title: "Passwords do not match!",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top"
            });
            setIsLoading(false);
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data } = await axios.post("/api/user", { name, email, password }); // add config here

            toast({
                title: "Registration successfull!",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top"
            });

            localStorage.setItem("userInfo", JSON.stringify(data));
            setIsLoading(false);
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
            setIsLoading(false);
        }

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

                    <Button type="submit" mt="20px" isLoading={isLoading} onClick={submitHandler}>Register</Button>

                </FormControl>
            </VStack>
        </>
    )
}

export default Register
