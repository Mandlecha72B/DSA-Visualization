/*import React from "react";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Tooltip from "./Tooltip"; // Ensure you have the Tooltip component

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        try {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            toast.success("Logged out successfully");
            navigate("/");
        } catch (err) {
            console.log(err);
            toast.error("Something went wrong. Please try again!");
        }
    };

    return (
        <header className="w-full bg-gray-900 flex justify-between items-center px-2 sm:px-4 lg:px-6 py-1 sm:py-2 shadow-md fixed top-0 left-0 z-50 h-10 sm:h-12">
            {/* Logo & Title }
            <div className="flex items-center">
                <img
                    src="../algoSphere_logo.png"
                    alt="Logo"
                    className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 object-contain animate-vertical-flip"
                />
                <span className="ml-2 text-sm sm:text-base md:text-lg font-bold text-white">
                    AlgoSphere
                </span>
            </div>

            {/* Logout Button with Tooltip }
            <Tooltip content="Logout">
                <button
                    className="absolute top-2 right-4 text-red-500 hover:bg-gray-700 p-1 rounded"
                    onClick={handleLogout}
                >
                    <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
            </Tooltip>
        </header>
    );
};

export default Header;*/

import React from "react";
import { LogOut } from "lucide-react";
import { useLocation } from "react-router-dom";
import Tooltip from "./Tooltip"; // Ensure Tooltip is imported
import { useNavigate } from 'react-router-dom';

const Header = ({ handleLogout, text }) => {

    const navigate = useNavigate()

    const location = useLocation();

    // Mapping paths to corresponding data structure names
    const pageTitles = {
        "/array": "Array",
        "/stack": "Stack",
        "/queue": "Queue",
        "/linked-list": "Linked List",
        "/graph": "Graph",
        "/tree": "Tree",
        "/binary-tree": "Binary Tree",
        "/bst": "Binary Search Tree",
        "/trie": "Trie",
        "/hashmap": "Hash Map",
        "/prims": "Prim's Algorithm",
        "/dijkstra": "Dijkstra's Algorithm",
        "/kruskal": "Kruskal's Algorithm",
        "/kosaraju": "Kosaraju's Algorithm",
        "/bellman-ford": "Bellman-Ford Algorithm",
        "/floyd-warshall": "Floyd-Warshall Algorithm",
        "/heap": "Heap",
        "/recursion": "Recursion",
        "/backtracking": "Backtracking",
    };

    // Determine the heading based on the current route
    const dataStructure = pageTitles[location.pathname] || "AlgoSphere";
    let heading = dataStructure + " " + "(" + text + ")";



    return (
        <header className="w-full bg-gray-900 flex justify-between items-center px-3 sm:px-6 lg:px-10 py-1 sm:py-2 shadow-md fixed top-0 left-0 z-50 h-10">
            {/* Logo & Title */}
            <div className="flex items-center hover:cursor-pointer" onClick={() => { navigate('/homepage') }}>
                <img
                    src="../algoSphere_logo.png"
                    alt="Logo"
                    className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 object-contain animate-vertical-flip"
                />
                <span className="ml-2 text-sm sm:text-base md:text-lg font-bold text-white " >
                    AlgoSphere
                </span>
            </div>

            {/* Dynamic Heading */}
            <h2 className="text-white text-sm sm:text-base md:text-lg font-semibold">
                {heading}
            </h2>

            {/* Logout Button with Tooltip */}
            <Tooltip content="Logout">
                <button
                    className="text-red-500 hover:bg-gray-700 p-1 rounded"
                    onClick={handleLogout}
                >
                    <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
            </Tooltip>
        </header>
    );
};

export default Header;

