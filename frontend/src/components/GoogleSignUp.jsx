import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const GoogleSignUp = () => {
    const navigate = useNavigate();

    const responseGoogle = async (authResult) => {
        try {
            console.log('Google Response:', authResult); // Debug log
            const { code } = authResult;
            if (!code) {
                toast.error('Google Login Failed: No authorization code received.');
                return; // Exit early
            }

            const result = await axios.get(`http://localhost:3000/api/auth/google?code=${code}`);
            const { email, username, profilePicture } = result.data.user;
            const token = result.data.token;

            const obj = { email, username, profilePicture };
            localStorage.setItem('user-info', JSON.stringify(obj));
            localStorage.setItem('token', token);

            navigate('/homepage');
        } catch (error) {
            console.error('Error during Google Login:', error);
            toast.error('Something went wrong. Please try again!');
        }
    };

    const googleLogin = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: responseGoogle,
        flow: 'auth-code',
        scope: 'profile email'
       
    });

    return (
        <Link
            to="/"
            className="inline-flex items-center justify-center w-full py-3 px-6 text-lg font-medium text-gray-800 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl"
            onClick={googleLogin}
        >
            <img
                src="https://img.icons8.com/color/24/000000/google-logo.png"
                alt="Google Logo"
                className="mr-3"
            />
            Sign Up with Google
        </Link>
    );
};

export default GoogleSignUp;
