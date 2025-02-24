import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {verifyToken} from './utils/ApiFunctions'

function RefreshHandler({ setIsAuthenticated }) {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const verifytoken = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setIsAuthenticated(false);
                return;
            }

            try {
                const response = await verifyToken();
              

                if (response.valid) {
                    
                    setIsAuthenticated(true);
                    if (
                        location.pathname === '/' ||
                        location.pathname === '/login' ||
                        location.pathname === '/signup'
                    ) {
                        navigate('/homepage', { replace: true });
                    }
                } else {
                    // Token is invalid or expired
                    setIsAuthenticated(false);
                    localStorage.removeItem('token');
                    navigate('/', { replace: true });
                }
            } catch (error) {
                console.error('Error verifying token:', error);
                setIsAuthenticated(false);
                localStorage.removeItem('token');
                navigate('/', { replace: true });
            }
        };

        verifytoken();
    }, [location, navigate, setIsAuthenticated]);

    return null;
}

export default RefreshHandler;
