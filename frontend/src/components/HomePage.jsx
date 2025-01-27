import React from 'react';
import { useNavigate } from 'react-router-dom';
import  styles  from './HomePage.module.css'; // Create and style this CSS file

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.homepageTitle}>
            <header className={styles.homepageTitle}>
                <h1>Welcome to Data Structure Visualizer</h1>
                <p>Explore and learn data structures with intuitive visualizations.</p>
            </header>
            <div className={styles.homepageButtons}>
                <button onClick={() => navigate('/login')} className={styles.loginButton}>Login</button>
                <button onClick={() => navigate('/signup')} className={styles.signupButton}>Signup</button>
            </div>
        </div>
    );
};

export default HomePage;