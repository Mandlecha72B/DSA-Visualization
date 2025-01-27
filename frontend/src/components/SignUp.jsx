
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { signup } from './utils/ApiFunctions';

const SignUp = () => {
    const navigate = useNavigate();
    
    const [signInfo, setSignInfo] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });


    const handleChanges = (e) => {
        const { name, value } = e.target;
        setSignInfo({
            ...signInfo,
            [name]: value
        });
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        const { username, email, password, confirmPassword } = signInfo;
        if (!username || !email || !password || !confirmPassword) {
            toast.error('All fields are required!');
            return;
        }
        if (password !== confirmPassword) {
            toast.error("Passwords don't match!");
            return;
        }

        try {
            // Call the signup API
            const response = await signup(signInfo);

            if (response.success) {
                toast.success(response.message); // Success toast from backend
                navigate('/login'); // Redirect to login page
            } else {
                toast.error(response.message); // Error toast from backend
            }
        } catch (error) {
            console.error(error); // Log for debugging
            toast.error('Something went wrong. Please try again!'); // Handle network or unexpected errors
        }


        
    };

    return (
        <div className="flex items-center justify-center min-h-[380px] min-w-[340px] bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 text-white p-4  shadow-lg">
            <div className="card w-full max-w-md bg-base-100 shadow-xl ">
                <div className="text-center px-6 py-4">
                    <h2 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
                        Welcome to Algosphere!
                    </h2>
                    <p className="text-gray-500 text-sm mb-4">
                        The ultimate learning platform to sharpen your skills.
                    </p>
                </div>
                <div className="px-6 pb-4">
                    <h2 className="text-xl font-semibold mb-4 text-center text-primary">
                        Create an Account
                    </h2>
                    <div className="form-control space-y-3">
                        <input
                            name='username'
                            type="text"
                            placeholder="Username"
                            value={signInfo.username}
                            onChange={handleChanges}
                            className="input input-bordered input-primary w-full rounded-full px-4 py-2"
                        />
                        <input
                            name='email'
                            type="email"
                            placeholder="Email"
                            value={signInfo.email}
                            onChange={handleChanges}
                            className="input input-bordered input-primary w-full rounded-full px-4 py-2"
                        />
                        <input
                            name='password'
                            type="password"
                            placeholder="Password"
                            value={signInfo.password}
                            onChange={handleChanges}
                            className="input input-bordered input-primary w-full rounded-full px-4 py-2"
                        />
                        <input
                            name='confirmPassword'
                            type="password"
                            placeholder="Confirm Password"
                            value={signInfo.confirmPassword}
                            onChange={handleChanges}
                            className="input input-bordered input-primary w-full rounded-full px-4 py-2"
                        />
                    </div>

                    <div className="flex justify-center">
                        <button
                            onClick={handleSignup}
                            className="btn btn-primary w-auto px-6 mt-4 rounded-full text-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out"
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
                <div className="text-center mt-2 pb-4">
                    <p className="text-sm text-gray-500">
                        Already have an account?{' '}
                        <span
                            onClick={() => navigate('/login')}
                            className="text-primary font-bold cursor-pointer"
                        >
                            Log In
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;


/*import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import  styles  from './SignUp.module.css';

const SignUp = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignup = () => {
        if (password !== confirmPassword) {
            setError("Passwords don't match!");
            return;
        }

        // Perform signup logic here (e.g., API call to create a user, validation, etc.)

        // On successful signup, navigate to the login page or home page
        navigate('/login'); // Redirect to login after successful signup
    };

    return (
        <div className={styles.signupContainer}>
            <div className={styles.signupCard}>
                <h2>Join Us!</h2>
                <p>Start your journey with Algosphere!</p>
            </div>

            <div className={styles.formContainer}>
                <h2>Create an Account</h2>
                <div className={styles.inputContainer}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <span className={styles.focusBorder}></span>
                </div>
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
                <div className={styles.inputContainer}>
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <span className={styles.focusBorder}></span>
                </div>
                {error && <div className={styles.error}>{error}</div>}
                <button onClick={handleSignup} className={styles.signupBtn}>
                    Signup
                </button>
            </div>
        </div>
    );
};

export default SignUp;*/
