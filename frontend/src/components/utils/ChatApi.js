import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export async function getAllUsers() {
    try {
        const response = await api.get('/users/', {
            headers: {
                'Content-Type': 'application/json',
                ...getHeader(), // Properly merging headers

            }
        });
        return response.data; // Axios automatically parses the JSON response
    } catch (error) {
        // Handle error properly
        if (error.response) {
            // If the server responded with a status code outside the 2xx range
            console.error(error);
            return error.response.data; // Return error response data if needed
        }
        return { success: false, message: 'Network error or server unreachable' };
    }
}

export async function getAllMessages(userId) {
    try {
        const response = await api.get(`/messages/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
                ...getHeader(), // Properly merging headers

            }
        }); // No need to JSON.stringify(signInfo)
        return response.data; // Axios automatically parses the JSON response
    } catch (error) {
        // Handle error properly
        if (error.response) {
            // If the server responded with a status code outside the 2xx range
            console.error(error);
            return error.response.data; // Return error response data if needed
        }
        return { success: false, message: 'Network error or server unreachable' };
    }
}

/*export async function sendMessageToUser(messageData, selectedUser) {
    try {
        if (!messageData ) {
            return { success: false, message: "Invalid message data" }; // Prevents sending invalid JSON
        }

        const response = await api.post(`/messages/send/${selectedUser._id}`, messageData, {
            headers: {
                'Content-Type': 'application/json',
                ...getHeader(), // Properly merging headers

            }
        }); 
        return response.data; // Axios automatically parses the JSON response
    } catch (error) {
        // Handle error properly
        if (error.response) {
            // If the server responded with a status code outside the 2xx range
            console.error(error);
            return error.response.data; // Return error response data if needed
        }
        return { success: false, message: 'Network error or server unreachable' };
    }
}*/

export async function sendMessageToUser(messageData, selectedUser) {
    try {
        if (!messageData) {
            return { success: false, message: "Invalid message data" };
        }

        // 🔥 Handle Broadcast (No selected user)
        const apiUrl = selectedUser
            ? `/messages/send/${selectedUser._id}` // Private message
            : `/messages/send`; // Broadcast message (no ID)

        const response = await api.post(apiUrl, messageData, {
            headers: {
                'Content-Type': 'application/json',
                ...getHeader(),
            }
        });

        return response.data;
    } catch (error) {
        if (error.response) {
            console.error(error);
            return error.response.data;
        }
        return { success: false, message: 'Network error or server unreachable' };
    }
}

