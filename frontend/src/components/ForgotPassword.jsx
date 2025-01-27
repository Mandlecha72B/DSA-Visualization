
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resetPassword } from './utils/ApiFunctions';
import toast from 'react-hot-toast';

const ForgotPassword = () => {

    const navigate = useNavigate();
    const [resetInfo, setResetInfo] = useState({

        email: '',
        password: '',
        confirmPassword: ''
    });


    const handleChanges = (e) => {
        const { name, value } = e.target;
        setResetInfo({
            ...resetInfo,
            [name]: value
        });
    }

    const handleReset = async (e) => {
        e.preventDefault();
        const { email, password, confirmPassword } = resetInfo;
        if (!email || !password || !confirmPassword) {
            toast.error('All fields are required!');
            return;
        }
        if (password !== confirmPassword) {
            toast.error("Passwords don't match!");
            return;
        }

        try {
            // Call the signup API
            const response = await resetPassword(resetInfo);

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
                        Reset Password
                    </h2>
                    <p className="text-gray-500 text-sm mb-4">
                        Enter your email address and new password to reset
                    </p>
                </div>
                <div className="px-6 pb-4">

                    <div className="form-control space-y-3">

                        <input
                            name='email'
                            type="email"
                            placeholder="Email"
                            value={resetInfo.email}
                            onChange={handleChanges}
                            className="input input-bordered input-primary w-full rounded-full px-4 py-2"
                        />
                        <input
                            name='password'
                            type="password"
                            placeholder="Password"
                            value={resetInfo.password}
                            onChange={handleChanges}
                            className="input input-bordered input-primary w-full rounded-full px-4 py-2"
                        />
                        <input
                            name='confirmPassword'
                            type="password"
                            placeholder="Confirm Password"
                            value={resetInfo.confirmPassword}
                            onChange={handleChanges}
                            className="input input-bordered input-primary w-full rounded-full px-4 py-2"
                        />
                    </div>

                    <div className="flex justify-center">
                        <button
                            onClick={handleReset}
                            className="btn btn-primary w-auto px-6 mt-4 rounded-full text-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out"
                        >
                            Reset Password
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ForgotPassword;