
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from './utils/ApiFunctions';
import toast from 'react-hot-toast';

const Login = () => {
    const navigate = useNavigate();
    

    const [loginInfo, setLoginInfo] = useState({
        
        email: '',
        password: '',
        
    });


    const handleChanges = (e) => {
        const { name, value } = e.target;
        setLoginInfo({
            ...loginInfo,
            [name]: value
        });
    }

    const handleLogin= async (e) => {
        e.preventDefault();
        const {  email, password } = loginInfo;
        if ( !email || !password ) {
            toast.error('All fields are required!');
            return;
        }
        

        try {
            // Call the signup API
            const response = await login(loginInfo);

            if (response.success) {
                toast.success(response.message); // Success toast from backend
                localStorage.setItem('token', response.token); // Save token in local storage
                localStorage.setItem('user', JSON.stringify(response.user)); // Save user object in local storage
                //navigate('/login'); // Redirect to login page
                navigate('/homepage'); // Redirect to homepage after successful login
            } else {
                toast.error(response.message); // Error toast from backend
            }
        } catch (error) {
            console.error(error); // Log for debugging
            toast.error('Something went wrong. Please try again!'); // Handle network or unexpected errors
        }



    };

    const handleForgotPassword = () => {
        navigate('/forgot-password'); // Navigate to forgot password page
    };

    return (
        <div className="flex items-center justify-center min-h-[380px] min-w-[340px] bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 text-white p-4  shadow-lg">
            <div className="card w-full max-w-md bg-base-100 shadow-xl p-8">
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
                        Welcome Back!
                    </h2>
                    <p className="text-gray-500 text-sm mb-4">Please login to your account</p>
                </div>
                <div className="space-y-4">
                    <div className="form-control">
                        <input
                            name='email'
                            type="email"
                            placeholder="Email"
                            value={loginInfo.email}
                            onChange={handleChanges}
                            className="input input-bordered input-primary w-full rounded-full px-4 py-2"
                        />
                    </div>
                    <div className="form-control">
                        <input
                            name='password'
                            type="password"
                            placeholder="Password"
                            value={loginInfo.password}
                            onChange={handleChanges}
                            className="input input-bordered input-primary w-full rounded-full px-4 py-2"
                        />
                    </div>
                    
                    <div className="flex justify-center mt-4">
                        <button
                            onClick={handleLogin}
                            className="btn btn-primary w-auto px-6 py-2 rounded-full text-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out"
                        >
                            Login
                        </button>
                    </div>
                    <div className="text-center mt-4">
                        <span
                            onClick={handleForgotPassword}
                            className="text-primary font-bold cursor-pointer text-sm hover:underline"
                        >
                            Forgot Password?
                        </span>
                    </div>
                    <div className="text-center mt-4 pb-4">
                        <p className="text-sm text-gray-500">
                            Don't have an account?{' '}
                            <span
                                onClick={() => navigate('/signup')}
                                className="text-primary font-bold cursor-pointer"
                            >
                                Sign Up
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;


/*import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import  styles  from './Login.module.css';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        // Mock login logic - replace with real backend later
        if (email === 'user@example.com' && password === 'password123') {
            navigate('/dashboard'); // Redirect to dashboard or home page after successful login
        } else {
            setError('Invalid email or password'); // Show error if login fails
        }
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginCard}>
                <h2>Welcome Back!</h2>
                <p>Please login to your account</p>
                <div className={styles.inputContainer}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <span className={styles.focusBorder}></span>
                </div>
                <div className={styles.inputContainer}>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <span className={styles.focusBorder}></span>
                </div>
                <button onClick={handleLogin} className={styles.loginBtn}>Login</button>
                {error && <div className={styles.error}>{error}</div>}
            </div>
        </div>
    );
};

export default Login;*/

