import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import ScrollableFeed from "react-scrollable-feed";
import {
    isLastMessage,
    isSameSender,
    isSameSenderMargin,
    isSameUser,
} from "../../../Config/ChatLogic";
import { ChatState } from "../../../Context/ChatProvider";
import { useEffect, useRef, useState } from "react";

const ScrollableChat = ({ messages }) => {
    const { user } = ChatState();

    const [loaded, setLoaded] = useState(20);
    const [scrollAgain, setScrollAgain] = useState(false);
    const [heightCompare, setheightCompare] = useState(0);

    const scrollRef = useRef();

    const handleScroll = () => {
        if (scrollRef.current.wrapperRef.current.scrollTop === 0) {
            setheightCompare(scrollRef.current.wrapperRef.current.scrollHeight);
            setLoaded(loaded + 15);
            setheightCompare(scrollRef.current.wrapperRef.current.scrollHeight);
        }
    }


    useEffect(() => {
        scrollRef.current.wrapperRef.current.scrollTo({left: 0, top: scrollRef.current.wrapperRef.current.scrollHeight - heightCompare})
    }, [heightCompare]);

    return (
        <ScrollableFeed className="ajdebrateee" ref={scrollRef} onScroll={handleScroll}>
            {messages &&
                messages.map((m, i) => (i > messages.length - (loaded + 2)) && (
                    <div style={{ display: "flex" }} key={m._id}>
                        {(isSameSender(messages, m, i, user._id) ||
                            isLastMessage(messages, i, user._id)) && (
                                <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                                    <Avatar
                                        mt="7px"
                                        mr={1}
                                        size="sm"
                                        cursor="pointer"
                                        name={m.sender.name}
                                        src={m.sender.pic}
                                    />
                                </Tooltip>
                            )}
                        <span
                            style={{
                                backgroundColor: `${m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                                    }`,
                                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                                borderRadius: "20px",
                                padding: "5px 15px",
                                maxWidth: "75%",
                            }}
                        >
                            {m.content}
                        </span>
                    </div>
                ))}
        </ScrollableFeed>
    );
};

export default ScrollableChat;