import { useChatStore } from "./store/useChatStore";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect, useState } from "react";
import SideBar from "./SideBar";
import NoChatSelected from "./NoChatSelected";
import ChatContainer from "./ChatContainer";
import Navbar from "./Navbar";

const ChatApp = () => {
    const { selectedUser } = useChatStore();
    const { connectSocket, disconnectSocket, socket } = useAuthStore();
    const [theme, setToggleTheme] = useState("dark");

    useEffect(() => {
        console.log("🔵 ChatApp mounted, connecting socket...");
        connectSocket();
    }, []);
    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center ">
            <div className="w-full max-w-6xl">
                <Navbar theme={theme} setToggleTheme={setToggleTheme} />
                <div data-theme={theme === "dark" ? "" : "light"} className="bg-base-100 rounded-lg shadow-cl w-full h-[calc(100vh-8rem)] mt-0">
                    <div className="flex h-full rounded-lg overflow-hidden">
                        <SideBar />
                        {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ChatApp;
/*return (
        <div className="h-screen w-screen flex items-center justify-center" >
            
            <div className="flex-col items-center justify-center pt-2 px-4 w-screen">
                <Navbar />
                <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
                    <div className="flex h-full rounded-lg overflow-hidden">
                        <SideBar />

                        {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
                    </div>
                </div>
            </div>
        </div>
    );*/

/*if (!socket) {
       console.log("Reconnecting socket...");
       connectSocket();
   }*/

/*return () => {
    console.log("🟡 ChatApp unmounted, but keeping socket active...");
    // DO NOT DISCONNECT ON EVERY UNMOUNT IF USING SINGLE SOCKET ACROSS APP
};*/