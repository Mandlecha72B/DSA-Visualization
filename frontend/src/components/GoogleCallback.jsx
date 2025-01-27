import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const GoogleCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Extract the query parameters from the URL
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const email = urlParams.get('email');
        const username = urlParams.get('username');
        const profilePicture = urlParams.get('profilePicture');

        if (token) {
            // Save token and user data in localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify({ email, username, profilePicture }));

            // Show success message
            toast.success('Login Successful!');

            // Redirect to homepage only after the success toast is shown
            setTimeout(() => navigate('/homepage'), 1000);  // Added timeout to ensure toast is shown before navigation
        } else {
            // Handle missing token (Authentication failure)
            toast.error('Authentication failed!');

            // Redirect to login page after the error toast is shown
            setTimeout(() => navigate('/'), 1000);  // Added timeout to ensure toast is shown before navigation
        }
    }, [navigate]);  // This effect will run only once after the component mounts

    return <div>Loading...</div>; // or show loading indicator
};

export default GoogleCallback;
