import { create } from "zustand";
import { io } from "socket.io-client";
//import { api } from "../../utils/ChatApi"; // Ensure this is correctly set
import { jwtDecode } from "jwt-decode";

export const useAuthStore = create((set, get) => ({
    socket: null,
    onlineUsers: [],

    /*connectSocket: () => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.warn("⚠️ No token found. User might not be authenticated.");
            return;
        }

        if (get().socket?.connected) {
            console.log("🔄 Socket is already connected.");
            return;
        }

        try {
            const decodedToken = jwtDecode(token); // Decode the JWT token
            const userId = decodedToken?._id || decodedToken?.id; // Extract user ID

            if (!userId) {
                console.error("❌ User ID not found in token!");
                return;
            }

            console.log("🟢 Connecting socket with userId:", userId);

            const socket = io(api.defaults.baseURL, {
                query: { userId }, // Ensure userId is sent properly
                transports: ["websocket", "polling"], // Support multiple transports
            });

            socket.on("connect", () => {
                console.log("✅ Socket connected:", socket.id);
                set({ socket });
            });

            socket.on("connect_error", (err) => {
                console.error("❌ Socket connection error:", err.message);
            });

            socket.on("getOnlineUsers", (userIds) => {
                console.log("👥 Online Users:", userIds);
                set({ onlineUsers: userIds });
            });

        } catch (error) {
            console.error("❌ Error decoding token:", error);
        }
    },*/

    connectSocket: () => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.warn("⚠️ No token found. User might not be authenticated.");
            return;
        }

        if (get().socket?.connected) {
            console.log("🔄 Socket is already connected.");
            return;
        }

        try {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken?._id || decodedToken?.id;

            if (!userId) {
                console.error("❌ User ID not found in token!");
                return;
            }

            console.log("🟢 Connecting socket with userId:", userId);

            const socket = io("http://localhost:3000", { // Ensure correct backend URL
                query: { userId },
                transports: ["websocket"],


            });

            socket.on("connect", () => {
                console.log("✅ Socket connected:", socket.id);
                set({ socket });
            });

            socket.on("connect_error", (err) => {
                console.error("❌ Socket connection error:", err.message);
            });

            socket.on("getOnlineUsers", (users) => {
                console.log("👥 Online Users:", users);
                set({ onlineUsers: users });
            });

        } catch (error) {
            console.error("❌ Error decoding token:", error);
        }
    },


    disconnectSocket: () => {
        const socket = get().socket;
        if (socket?.connected) {
            console.log("🔴 Disconnecting socket:", socket.id);
            socket.disconnect();
            
        } else {
            console.warn("⚠️ No active socket connection to disconnect.");
        }
    },
}));
