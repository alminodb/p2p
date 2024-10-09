import { Tabs, Tab, TabList, TabPanels, TabPanel } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import Login from '../Components/Authentication/Login'
import Register from '../Components/Authentication/Register'
import { useHistory } from 'react-router-dom'

const HomePage = () => {

    const history = useHistory();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo"));
        if (user) history.push("chats");
    }, [history]);

    return (
        <>
            <div>Chatbox</div>
            <Tabs variant='soft-rounded'>
                <TabList mb="1em">
                    <Tab>Login</Tab>
                    <Tab>Register</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Login />
                    </TabPanel>
                    <TabPanel>
                        <Register />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    )
}

export default HomePage
