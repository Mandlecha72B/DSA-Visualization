import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const OperationsCollapse = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <div className="fixed left-0 sm:left-0 top-[80%] md:top-[70%] flex flex-row-reverse items-center z-50 transition-all duration-300">
            <div
                
                className={`bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 text-white 
                h-auto max-h-60 p-3 sm:p-4 rounded-lg shadow-lg
                transition-all duration-300 ease-in-out
                ${isOpen ? "w-48 sm:w-64 md:w-80 opacity-100 translate-x-0" : "w-0 opacity-0 -translate-x-full"}
                overflow-hidden`}
            >
                {isOpen && (
                    <div className="text-xs sm:text-sm md:text-base break-words whitespace-normal overflow-auto">
                        {children}
                    </div>
                )}
            </div>

            <button
                className="mr-2 p-2 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 text-white 
                rounded-md transition duration-300 flex items-center focus:outline-none focus:ring-2 focus:ring-white"
                onClick={handleToggle}
                aria-label={isOpen ? "Close PseudoCode" : "Open PseudoCode"}
            >
                {isOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
            </button>
        </div>
    );
};

export default OperationsCollapse;
