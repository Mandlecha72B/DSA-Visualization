import { useChatStore } from "./store/useChatStore";
import { useEffect, useRef, useState } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./Skeletons/MessageSkeleton";

import { formatMessageTime } from "./util";
import { jwtDecode } from "jwt-decode";


const ChatContainer = () => {
    const {
        messages,
        getMessages,
        isMessagesLoading,
        selectedUser,
        subscribeToMessages,
        unsubscribeFromMessages,
    } = useChatStore();

    const [profilePicture, setProfilePicture] = useState("");
    const [authUserId, setAuthUserId] = useState();

    const messageEndRef = useRef(null);
    useEffect(() => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const decodedToken = jwtDecode(token);
            const userId = decodedToken._id || decodedToken.id;
            if (!userId) return;

            setAuthUserId(userId);

            const user = JSON.parse(localStorage.getItem("user"));
            if (user?.profilePicture) {
                setProfilePicture(user.profilePicture);
            }
        } catch (error) {
            console.error("Invalid or expired token:", error);
        }
    }, []);


    useEffect(() => {
        if (!selectedUser?._id) return; // Prevent errors
        console.log("🔍 Selected User in ChatContainer:", selectedUser);

        getMessages(selectedUser._id); // FIX: Use `_id`, not `id`
        unsubscribeFromMessages(); // Unsubscribe first
        subscribeToMessages(); // Then re-subscribe

        return () => unsubscribeFromMessages(); // Cleanup when component unmounts
    }, [selectedUser?._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);



    useEffect(() => {
        if (messageEndRef.current && messages) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    if (isMessagesLoading) {
        return (
            <div className="flex-1 flex flex-col overflow-auto">
                <ChatHeader />
                <MessageSkeleton />
                <MessageInput />
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col overflow-auto">
            <ChatHeader />

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((mes) => (
                    <div
                        key={mes._id}
                        className={`chat ${mes.senderId === authUserId ? "chat-end" : "chat-start"}`}
                        ref={messageEndRef}
                    >
                        <div className=" chat-image avatar">
                            <div className="size-10 rounded-full border">
                                <img
                                    src={
                                        mes.senderId === authUserId
                                            ? profilePicture || "/avatar.png"
                                            : selectedUser?.profilePicture || "/avatar.png"
                                    }
                                    alt="profile pic"
                                />
                            </div>
                        </div>
                        <div className="chat-header mb-1">
                            <time className="text-xs opacity-50 ml-1">
                                {formatMessageTime(mes.createdAt)}
                            </time>
                        </div>
                        <div className="chat-bubble flex flex-col">
                            {mes.image && (
                                <img
                                    src={mes.image}
                                    alt="Attachment"
                                    className="sm:max-w-[200px] rounded-md mb-2"
                                />
                            )}
                            {mes.message && <p>{mes.message}</p>}
                        </div>
                    </div>
                ))}
            </div>

            <MessageInput />
        </div>
    );
};
export default ChatContainer;