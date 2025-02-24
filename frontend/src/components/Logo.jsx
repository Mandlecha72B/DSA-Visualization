
import React from "react";

const Logo = () => {
    return (
        <div className="relative flex flex-col sm:flex-row items-center sm:items-center p-2 sm:p-4 z-50">
            {/* Responsive Rotating Logo */}
            <img
                src="../algoSphere_logo.png"
                alt="Logo"
                className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain animate-vertical-flip"
            />

            {/* Responsive Text */}
            <div className="mt-1 sm:mt-0 text-base sm:text-lg md:text-2xl lg:text-3xl font-bold text-white sm:ml-2 flex items-center">
                AlgoSphere
            </div>
        </div>
    );
};

export default Logo;



/*import React from "react";

const Logo = () => {
    return (
        <div className="absolute top-0 left-0 flex items-center p-4">
            {/* Rotating logo }
            <img
                src="../algoSphere_logo.png"
                alt="Logo"
                className="w-15 h-15 object-contain mr-3 animate-vertical-flip"
            />
            <div className="text-2xl font-bold text-white">AlgoSphere</div>
        </div>
    );
};

export default Logo;*/




