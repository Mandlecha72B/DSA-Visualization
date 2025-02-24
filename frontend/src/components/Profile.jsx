
import React, { useState, useEffect } from "react";
import { User, LogOut, ChevronDown } from "lucide-react";
import toast from "react-hot-toast";
import { uploadProfilePictureApi } from "./utils/ApiFunctions";

const Profile = ({ handleLogout }) => {
    const [profilePicture, setProfilePicture] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [showUploadPopup, setShowUploadPopup] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user.profilePicture) {
            setProfilePicture(user.profilePicture);
        }
    }, []);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const uploadProfilePicture = async () => {
        if (!selectedFile) return;
        setLoading(true);
        try {
            const response = await uploadProfilePictureApi(selectedFile);
            if (response.success) {
                setProfilePicture(response.profilePicture);
                let user = JSON.parse(localStorage.getItem("user"));
                user.profilePicture = response.profilePicture;
                localStorage.setItem("user", JSON.stringify(user));
                toast.success(response.message);
            } else {
                toast.error(response.message);
            }
            setShowUploadPopup(false);
        } catch (error) {
            toast.error("Something went wrong. Please try again!");
            console.error("Upload error:", error);
        }
        setLoading(false);
    };

    return (
        <div className="relative">
            {/* Profile Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 sm:space-x-3 bg-white/10 backdrop-blur-lg px-3 py-2 sm:px-4 sm:py-2 rounded-full shadow-md border border-white/20 transition-all"
            >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-200 flex items-center justify-center shadow">
                    {profilePicture ? (
                        <img src={profilePicture} alt="Profile" className="w-full h-full rounded-full object-cover" />
                    ) : (
                        <User className="w-6 h-6 sm:w-7 sm:h-7 text-gray-700" />
                    )}
                </div>
                <ChevronDown
                    className="w-5 h-5 text-white transition-transform duration-300"
                    style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-40 sm:w-48 bg-white shadow-lg rounded-lg overflow-hidden text-sm sm:text-base z-50">
                    <button
                        className="block w-full px-4 py-2 sm:py-3 text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUploadPopup(true)}
                    >
                        Change Profile Picture
                    </button>
                    <button
                        className="block w-full px-4 py-2 sm:py-3 text-red-500 hover:bg-gray-100"
                        onClick={handleLogout}
                    >
                        <LogOut className="inline-block mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                        Logout
                    </button>
                </div>
            )}

            {/* Profile Upload Popup */}
            {showUploadPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-3">
                    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-xl w-11/12 max-w-md text-center relative animate-fadeIn">
                        {/* Close Button */}
                        <button
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-all"
                            onClick={() => setShowUploadPopup(false)}
                        >
                            ✕
                        </button>

                        {/* Title */}
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
                            Upload Profile Picture
                        </h2>

                        {/* Profile Preview */}
                        {preview && (
                            <div className="mb-4">
                                <img src={preview} alt="Preview" className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mx-auto border shadow-md" />
                            </div>
                        )}

                        {/* File Input */}
                        <label className="cursor-pointer bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-all inline-block">
                            Choose File
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </label>

                        {/* Buttons */}
                        <div className="flex justify-center space-x-4 mt-4">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
                                onClick={uploadProfilePicture}
                                disabled={loading}
                            >
                                {loading ? "Uploading..." : "Upload"}
                            </button>
                            <button
                                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all"
                                onClick={() => setShowUploadPopup(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;



/*import React, { useState,useEffect } from "react";
import { User, LogOut, ChevronDown } from "lucide-react";

import toast from "react-hot-toast";
import { uploadProfilePictureApi } from "./utils/ApiFunctions";


const Profile = ({ handleLogout }) => {
    const [profilePicture, setProfilePicture] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [showUploadPopup, setShowUploadPopup] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user.profilePicture) {
            setProfilePicture(user.profilePicture);
        }
    }, []); // Runs once when component mounts



    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file)); // Create a preview URL
        }
    };

    const uploadProfilePicture = async () => {
        if (!selectedFile) return;

        setLoading(true);


        try {
            const response = await uploadProfilePictureApi(selectedFile);



            if (response.success) {
                setProfilePicture(response.profilePicture);
                let user = JSON.parse(localStorage.getItem("user"));
                user.profilePicture = response.profilePicture;
                localStorage.setItem("user", JSON.stringify(user));
                toast.success(response.message);

            }
            else {
                toast.error(response.message);
            }


            setShowUploadPopup(false);
        } catch (error) {
            toast.error("Something went wrong. Please try again!");
            console.error("Upload error:", error);
        }
        setLoading(false);
    };

    return (
        <div className="absolute top-8 right-6">
            {/*Profile Button }
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-3 bg-white/10 backdrop-blur-lg px-4 py-2 rounded-full shadow-md border border-white/20 transition-all"
            >
                <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center shadow">
                    {profilePicture ? (
                        <img src={profilePicture} alt="Profile" className="w-9 h-9 rounded-full object-cover" />
                    ) : (
                        <User className="w-7 h-7 text-gray-700" />
                    )}
                </div>
                <ChevronDown className="w-5 h-5 text-white transition-transform duration-300"
                    style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
            </button>

            {/*Dropdown Menu}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden">
                    <button
                        className="block w-full px-4 py-3 text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUploadPopup(true)}
                    >
                        Change Profile Picture
                    </button>
                    <button
                        className="block w-full px-4 py-3 text-red-500 hover:bg-gray-100"
                        onClick={handleLogout}
                    >
                        <LogOut className="inline-block mr-2 w-5 h-5" />
                        Logout
                    </button>
                </div>
            )}

            {/*Profile Upload Popup }
            {showUploadPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
                    <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md text-center relative animate-fadeIn">
                        {/* Close Button }
                        <button
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-all"
                            onClick={() => setShowUploadPopup(false)}
                        >
                            ✕
                        </button>

                        {/*Title }
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Upload Profile Picture</h2>

                        {/*Profile Preview}
                        {preview && (
                            <div className="mb-4">
                                <img src={preview} alt="Preview" className="w-24 h-24 rounded-full mx-auto border shadow-md" />
                            </div>
                        )}


                        {/*File Input }
                        <label className="cursor-pointer bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-all inline-block">
                            Choose File
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </label>

                        {/*Buttons }
                        <div className="flex justify-center space-x-4 mt-5">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
                                onClick={uploadProfilePicture}
                                disabled={loading}
                            >
                                {loading ? "Uploading..." : "Upload"}
                            </button>
                            <button
                                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all"
                                onClick={() => setShowUploadPopup(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}


        </div>
    );

    

};

export default Profile;*/



