import { create } from "zustand";
import toast from "react-hot-toast";

import { useAuthStore } from "./useAuthStore";
import { getAllUsers, getAllMessages, sendMessageToUser } from "../../utils/ChatApi";

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await getAllUsers();
            if (res.success === true) {
                set({ users: res.filteredUsers });
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error fetching users");
        } finally {
            set({ isUsersLoading: false });
        }
    },

    getMessages: async (userId) => {
        console.log("🔍 Fetching messages for userId:", userId); // Debugging

        if (!userId) {
            toast.error("User ID is missing!");
            return;
        }

        set({ isMessagesLoading: true });

        try {
            const res = await getAllMessages(userId);
            console.log("✅ getMessages Response:", res);

            if (res.success === true) {
                set({ messages: res.messages });
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            console.error("❌ Error fetching messages:", error);
            toast.error(error.response?.data?.message || "Failed to fetch messages");
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    /*sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();
        try {
            const res = await sendMessageToUser(messageData, selectedUser);
            if (res.success === true) {
                set({ messages: [...messages, res.newMessage] });
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to send message");
        }
    },*/
    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();
        try {
            // 🔥 If broadcast, don't include selectedUser._id
            const res = await sendMessageToUser(messageData, messageData.isBroadcast ? null : selectedUser);

            if (res.success === true) {
                set({ messages: [...messages, res.newMessage] });
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to send message");
        }
    },


   

    subscribeToMessages: () => {
        const { selectedUser } = get();
        if (!selectedUser) return;

        const socket = useAuthStore.getState().socket;

        if (!socket) {
            console.error("❌ Socket is not connected! Cannot subscribe to messages.");
            return;
        }

        console.log("🟢 Subscribing to new messages...");

        socket.on("newMessage", (newMessage) => {
            if (!newMessage || !selectedUser?._id) return;

            const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
            if (!isMessageSentFromSelectedUser) return;

            set({
                messages: [...get().messages, newMessage],
            });
        });
    },


    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;

        if (!socket) {
            console.warn("⚠️ No active socket found. Cannot unsubscribe.");
            return;
        }

        console.log("🔴 Unsubscribing from new messages...");
        socket.off("newMessage");
    },

    setSelectedUser: (selectedUser) => set({ selectedUser }),
}));


/*subscribeToMessages: () => {
       const { selectedUser } = get();
       if (!selectedUser) return;

       const socket = useAuthStore.getState().socket;

       if (!socket) {
           console.error("❌ Socket is not connected! Cannot subscribe to messages.");
           return;
       }

       console.log("🟢 Subscribing to new messages...");

       socket.on("newMessage", (newMessage) => {
           const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
           if (!isMessageSentFromSelectedUser) return;

           set({
               messages: [...get().messages, newMessage],
           });
       });
   },*/