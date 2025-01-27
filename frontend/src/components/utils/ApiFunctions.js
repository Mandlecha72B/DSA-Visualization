import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getHeader = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        },
    };
}


export async function signup(signInfo) {
    try {
        const response = await api.post('/auth/signUp', signInfo); // No need to JSON.stringify(signInfo)
        return response.data; // Axios automatically parses the JSON response
    } catch (error) {
        // Handle error properly
        if (error.response) {
            // If the server responded with a status code outside the 2xx range
            return error.response.data; // Return error response data if needed
        }
        return { success: false, message: 'Network error or server unreachable' };
    }
}


export async function login(loginInfo) {
    try {
        const response = await api.post('/auth/login', loginInfo);
        return response.data;
    } catch (error) {
        if (error.response) {
            // If the server responded with a status code outside the 2xx range
            return error.response.data; // Return error response data if needed
        }
        return { success: false, message: 'Network error or server unreachable' };
    }
}

export async function resetPassword(resetInfo) {
    try {
        const response = await api.post('/auth/forgot-password', resetInfo);
        return response.data;
    } catch (error) {
        if (error.response) {
            // If the server responded with a status code outside the 2xx range
            return error.response.data; // Return error response data if needed
        }
        return { success: false, message: 'Network error or server unreachable' };
    }
}

//export const googleAuth = (code) => api.get(`/auth/google?code=${code}`);