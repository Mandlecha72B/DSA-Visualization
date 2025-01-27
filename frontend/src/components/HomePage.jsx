import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HomePage.module.css'; // Create and style this CSS file
import toast from 'react-hot-toast';

const HomePage = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        try{
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            toast.success('Logged out successfully');
            navigate('/');

        }
        catch(err){
            console.log(err);
            toast.error('Something went wrong. Please try again!');
        }
        

    }

    return (
        <div className={styles.homepageTitle}>
            <header className={styles.homepageTitle}>
                <h1>Welcome to Data Structure Visualizer</h1>
                <p>Explore and learn data structures with intuitive visualizations.</p>
            </header>
            <div className={styles.homepageButtons}>
                <button className={styles.loginButton} onClick={handleLogout}>Logout</button>
                <button onClick={() => navigate('/login')} className={styles.loginButton}>Login</button>
                <button onClick={() => navigate('/signup')} className={styles.signupButton}>Signup</button>
            </div>
        </div>
    );
};

export default HomePage;