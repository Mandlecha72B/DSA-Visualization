
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PseudoCode = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <div className={`fixed top-[70%] sm:top-[35%] md:top-[38%] flex items-center z-50 transition-all duration-300
            ${window.innerWidth < 640 ? "left-0 flex-row-reverse" : "right-0 flex-row"} `}>

            {/* Content Box */}
            <div
                className={`bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 text-white 
                h-auto max-h-40 sm:max-h-48 md:max-h-56 p-1 sm:p-1 md:p-1 rounded-lg shadow-lg
                transition-all duration-300 ease-in-out
                ${isOpen ? "w-48 sm:w-64 md:w-72 opacity-100" : "w-0 opacity-0"}
                ${isOpen ? (window.innerWidth < 640 ? "translate-x-0" : "translate-x-0") : (window.innerWidth < 640 ? "-translate-x-full" : "translate-x-full")}`}
            >
                {isOpen && (
                    <div className="text-xs sm:text-sm md:text-sm break-words whitespace-normal 
                        overflow-auto max-h-36 sm:max-h-44 md:max-h-52 pr-2">
                        {children}
                    </div>
                )}
            </div>

            {/* Toggle Button */}
            <button
                className="ml-2 p-2 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 text-white 
                rounded-md transition duration-300 flex items-center focus:outline-none focus:ring-2 focus:ring-white"
                onClick={handleToggle}
                aria-label={isOpen ? "Close PseudoCode" : "Open PseudoCode"}
            >
                {isOpen ? (
                    <ChevronLeft size={24} className={window.innerWidth < 640 ? "" : "hidden"} />
                ) : (
                    <ChevronRight size={24} className={window.innerWidth < 640 ? "" : "hidden"} />
                )}
                {isOpen ? (
                    <ChevronRight size={24} className={window.innerWidth >= 640 ? "" : "hidden"} />
                ) : (
                    <ChevronLeft size={24} className={window.innerWidth >= 640 ? "" : "hidden"} />
                )}
            </button>
        </div>
    );
};

export default PseudoCode;


/*import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PseudoCode = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <div className="fixed right-0 top-1.5/4 flex items-center">
            <div
                className={`bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 text-white 
                h-auto max-h-60 p-3 sm:p-4 rounded-lg shadow-lg
                transition-all duration-300 ease-in-out
                ${isOpen ? "w-64 sm:w-72 md:w-80 opacity-100 translate-x-0" : "w-0 opacity-0 translate-x-full"}
                overflow-hidden`}
            >
                {isOpen && (
                    <div className="text-sm sm:text-base break-words whitespace-normal overflow-auto">
                        {children}
                    </div>
                )}
            </div>

            <button
                className="ml-2 p-2 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 text-white 
                rounded-md transition duration-300 flex items-center focus:outline-none focus:ring-2 focus:ring-white"
                onClick={handleToggle}
                aria-label={isOpen ? "Close PseudoCode" : "Open PseudoCode"}
            >
                {isOpen ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
            </button>
        </div>
    );
};

export default PseudoCode;*/

