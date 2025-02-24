

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ExplanationCollapse = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <div
            className={`fixed top-[88%] sm:top-[58%] md:top-[68%] flex items-center z-50 transition-all duration-300
            ${window.innerWidth < 640 ? "left-0 flex-row-reverse" : "right-0 flex-row"}`}
        >
            {/* Explanation Box */}
            <div
                className={`bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 text-white 
                h-auto max-h-36 sm:max-h-48 md:max-h-56 p-1 sm:p-1 md:p-1 rounded-lg shadow-lg
                transition-all duration-300 ease-in-out
                ${isOpen ? "w-48 sm:w-64 md:w-72 opacity-100" : "w-0 opacity-0"}
                ${isOpen ? (window.innerWidth < 640 ? "translate-x-0" : "translate-x-0") : (window.innerWidth < 640 ? "-translate-x-full" : "translate-x-full")}`}
            >
                {isOpen && (
                    <div className="text-xs sm:text-sm md:text-sm break-words whitespace-normal 
                        overflow-auto max-h-32 sm:max-h-40 md:max-h-48 pr-2">
                        {children}
                    </div>
                )}
            </div>

            {/* Toggle Button */}
            <button
                className="ml-2 p-2 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 text-white 
                rounded-md transition duration-300 flex items-center focus:outline-none focus:ring-2 focus:ring-white"
                onClick={handleToggle}
                aria-label={isOpen ? "Close Explanation" : "Open Explanation"}
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

export default ExplanationCollapse;



/*import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ExplanationCollapse = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <div
            className="fixed right-0 sm:right-0 top-[68%] sm:top-[57%] md:top-[60%] flex items-center z-50 transition-all duration-300"
        >
            <div
                className={`bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 text-white 
                h-auto max-h-40 sm:max-h-48 md:max-h-56 p-2 sm:p-3 md:p-4 rounded-lg shadow-lg
                transition-all duration-300 ease-in-out
                ${isOpen ? "w-48 sm:w-64 md:w-72 opacity-100 translate-x-0" : "w-0 opacity-0 translate-x-full"}
                overflow-hidden`}
            >
                {isOpen && (
                    <div className="text-xs sm:text-sm md:text-base break-words whitespace-normal overflow-auto">
                        {children}
                    </div>
                )}
            </div>

            <button
                className="ml-2 p-2 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 text-white 
                rounded-md transition duration-300 flex items-center focus:outline-none focus:ring-2 focus:ring-white"
                onClick={handleToggle}
                aria-label={isOpen ? "Close Explanation" : "Open Explanation"}
            >
                {isOpen ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
            </button>
        </div>
    );
};

export default ExplanationCollapse;*




/*import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ExplanationCollapse = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <div className="fixed right-0 top-2/3 flex items-center">
            <div
                className={`bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 text-white 
                h-auto max-h-40 p-3 sm:p-4 rounded-lg shadow-lg
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
                className="ml-2 p-2 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 text-white 
                rounded-md transition duration-300 flex items-center focus:outline-none focus:ring-2 focus:ring-white"
                onClick={handleToggle}
                aria-label={isOpen ? "Close Explanation" : "Open Explanation"}
            >
                {isOpen ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
            </button>
        </div>
    );
};

export default ExplanationCollapse;*/

/*import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ExplanationCollapse = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <div
            className="fixed right-0 sm:right-0 top-[65%] sm:top-[56%] flex items-center z-50 transition-all duration-300"
        >
            <div
                className={`bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 text-white 
                h-auto max-h-40 p-3 sm:p-4 rounded-lg shadow-lg
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
                className="ml-2 p-2 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 text-white 
                rounded-md transition duration-300 flex items-center focus:outline-none focus:ring-2 focus:ring-white"
                onClick={handleToggle}
                aria-label={isOpen ? "Close Explanation" : "Open Explanation"}
            >
                {isOpen ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
            </button>
        </div>
    );
};

export default ExplanationCollapse;*/

