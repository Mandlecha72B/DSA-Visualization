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


export async function getAllNotes(){
    try {
        const response = await api.get('/note/all',{
            headers:{
                'Content-Type': 'application/json',
                ...getHeader(), // Properly merging headers
                
            }
        }); // No need to JSON.stringify(signInfo)
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

export async function deleteNote(note) {
    try {
        const noteId = note._id;
        const response = await api.delete(`/note/delete/${noteId}`, {
            headers: {
                'Content-Type': 'application/json',
                ...getHeader(), // Properly merging headers

            }
        }); // No need to JSON.stringify(signInfo)
        return response.data; // Axios automatically parses the JSON response
    } catch (error) {
        // Handle error properly
        console.log(error)
        if (error.response) {
            // If the server responded with a status code outside the 2xx range
            return error.response.data; // Return error response data if needed
        }
        return { success: false, message: 'Network error or server unreachable' };
    }
}

export async function searchNote(query) {
    try {
        
        const response = await api.get('/note/search',  {
            params: { query },
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
            return error.response.data; // Return error response data if needed
        }
        return { success: false, message: 'Network error or server unreachable' };
    }
}

/*export async function updateNotePinned(noteData) {
    try {
        noteId = noteData._id;

        const response = await api.put(`/update-note-pinned/${noteId}`, { isPinned: !noteData.isPinned }, {
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
            return error.response.data; // Return error response data if needed
        }
        return { success: false, message: 'Network error or server unreachable' };
    }
}*/

export async function updateNotePinned(noteData) {
    try {
        const noteId = noteData._id; // Fixed: Declared properly
        const newPinnedStatus = !noteData.isPinned; // Toggle pinned status

        console.log("🔹 Sending request to update pin status", { noteId, isPinned: newPinnedStatus });

        const response = await api.put(
            `/note/update-note-pinned/${noteId}`,
            { isPinned: newPinnedStatus },
            {
                headers: {
                    'Content-Type': 'application/json',
                    ...getHeader(), // Properly merging headers
                },
            }
        );

        console.log("✅ Response from server:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Error in updateNotePinned API call:", error);

        if (error.response) {
            console.error("❌ Server responded with:", error.response.data);
            return error.response.data;
        }

        return { success: false, message: 'Network error or server unreachable' };
    }
}


export async function addNewNote(noteData) {
    try {
        if (!noteData || Object.keys(noteData).length === 0) {
            return { success: false, message: "Invalid note data" }; // Prevents sending invalid JSON
        }

        const response = await api.post('/note/add', noteData, {
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
            return error.response.data; // Return error response data if needed
        }
        return { success: false, message: 'Network error or server unreachable' };
    }
}

export async function editNote(noteData) {
    try {
        console.log("Sending request to edit note", noteData);

        const response = await api.post(`/note/edit/${noteData._id}`, noteData, {
            headers: {
                'Content-Type': 'application/json',
                ...getHeader(),
            }
        });

        console.log("Response from editNote:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error in editNote API call:", error);

        if (error.response) {
            console.error("Server responded with:", error.response.data);
            return error.response.data;
        }
        return { success: false, message: 'Network error or server unreachable' };
    }
}






