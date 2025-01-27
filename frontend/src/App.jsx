import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import HomePage from './components/HomePage';
import AnimatedBar from './components/AnimatedBar'; // Import the AnimatedBar Component
import { Link } from 'react-router-dom';
import ForgotPassword from './components/ForgotPassword';

import { Toaster } from 'react-hot-toast';
import RefreshHandler from './components/RefreshHandler';
import { useState } from 'react';



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />
  }
  return (
    
      <Router>
        {/* Toaster for showing toast notifications*/ }
        <Toaster position="top-right" reverseOrder={false} />
        <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
        <Routes>

          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/homepage" element={<PrivateRoute element={<HomePage />} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </Router>


  );
}

const LandingPage = () => {
  return (
    <div className="relative h-screen overflow-hidden bg-cover bg-center flex justify-center items-center" style={{ backgroundImage: 'url("/backgroundimage.jpeg")' }}>
      {/* Background animation*/ }
      <div className="animated-bar-container">
        <AnimatedBar />
      </div>

      {/* Content overlay*/ }
      <div className="text-center text-white shadow-lg p-8 bg-black bg-opacity-60 rounded-xl z-20 max-w-lg mx-auto space-y-6">
        {/* Title */}
        <h1 className="text-5xl font-extrabold mb-4 tracking-wide">ALGOSPHERE</h1>
        <p className="text-xl mb-6">Visualizing Data Structures and Algorithms</p>

        {/* Buttons*/ }
        <div className="space-y-4">
          {/* Login Button*/ }
          <Link
            to="/login"
            className="inline-block w-full py-3 px-6 text-lg font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl"
          >
            Login
          </Link>
          {/* Sign-Up Button*/ }
          <Link
            to="/signup"
            className="inline-block w-full py-3 px-6 text-lg font-medium text-white bg-gradient-to-r from-green-400 to-teal-500 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl"
          >
            Sign Up
          </Link>
          {/* Google Sign-In Button*/ }
          <Link
            to="/"
            className="inline-flex items-center justify-center w-full py-3 px-6 text-lg font-medium text-gray-800 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl"
            

          >
            <img
              src="https://img.icons8.com/color/24/000000/google-logo.png"
              alt="Google Logo"
              className="mr-3"
            />
            Sign Up with Google
          </Link>

        </div>
      </div>
    </div>
  );
};


export default App;









/*import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import HomePage from './components/HomePage';
import AnimatedBar from './components/AnimatedBar'; // Import the AnimatedBar Component
import { Link } from 'react-router-dom';
import ForgotPassword from './components/ForgotPassword';
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleSignUp from './components/GoogleSignUp';
import { Toaster } from 'react-hot-toast';
import RefreshHandler from './components/RefreshHandler';
import { useState } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />
  }
  return (
    <Router>
      {/* Toaster for showing toast notifications }
      <Toaster position="top-right" reverseOrder={false} />
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>

        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/homepage" element={<PrivateRoute element={<HomePage />} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/" element={<GoogleWrapper />} />


        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </Router>

  );
}

/*const GoogleWrapper = () => (
  <GoogleOAuthProvider clientId="839781239604-dntoojc8hciqdjk0b4g0dsco2uc8o48s.apps.googleusercontent.com">
    <GoogleSignUp responseType="code"></GoogleSignUp>
  </GoogleOAuthProvider>
);

const LandingPage = () => {
  return (
    <div className="relative h-screen overflow-hidden bg-cover bg-center flex justify-center items-center" style={{ backgroundImage: 'url("/backgroundimage.jpeg")' }}>
      {/* Background animation }
      <div className="animated-bar-container">
        <AnimatedBar />
      </div>

      {/* Content overlay }
      <div className="text-center text-white shadow-lg p-8 bg-black bg-opacity-60 rounded-xl z-20 max-w-lg mx-auto space-y-6">
        {/* Title }
        <h1 className="text-5xl font-extrabold mb-4 tracking-wide">ALGOSPHERE</h1>
        <p className="text-xl mb-6">Visualizing Data Structures and Algorithms</p>

        {/* Buttons }
        <div className="space-y-4">
          {/* Login Button }
          <Link
            to="/login"
            className="inline-block w-full py-3 px-6 text-lg font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl"
          >
            Login
          </Link>
          {/* Sign-Up Button }
          <Link
            to="/signup"
            className="inline-block w-full py-3 px-6 text-lg font-medium text-white bg-gradient-to-r from-green-400 to-teal-500 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl"
          >
            Sign Up
          </Link>
          {/* Google Sign-In Button }
          <GoogleWrapper />

        </div>
      </div>
    </div>
  );
};


export default App;*/

