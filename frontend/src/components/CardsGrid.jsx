
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Card from "./Card";

const CardsGrid = ({ topics, searchQuery }) => {
    const [itemsPerPage, setItemsPerPage] = useState(4);
    const [currentPage, setCurrentPage] = useState(0);
    const [iconSize, setIconSize] = useState(36); // Default icon size

    // 🔹 Adjust items per page & icon size based on screen size
    useEffect(() => {
        const updateResponsiveSettings = () => {
            if (window.innerWidth < 640) {
                setItemsPerPage(1);
                setIconSize(20);
            } else if (window.innerWidth < 768) {
                setItemsPerPage(2);
                setIconSize(24);
            } else if (window.innerWidth < 1024) {
                setItemsPerPage(3);
                setIconSize(28);
            } else {
                setItemsPerPage(4);
                setIconSize(36);
            }
        };

        updateResponsiveSettings(); // Run initially
        window.addEventListener("resize", updateResponsiveSettings);

        return () => window.removeEventListener("resize", updateResponsiveSettings);
    }, []);

    const handleCardSelect =(e)=>{
        console.log(e);
    }

    // 🔹 Filter topics based on search query
    const filteredTopics = topics.filter((topic) =>
        topic.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredTopics.length / itemsPerPage);

    // 🔹 Reset currentPage to 0 when searchQuery changes
    useEffect(() => {
        setCurrentPage(0);
    }, [searchQuery]);

    // 🔹 Handle keyboard navigation (Arrow Keys)
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "ArrowRight" && currentPage < totalPages - 1) {
                setCurrentPage((prev) => prev + 1);
            } else if (event.key === "ArrowLeft" && currentPage > 0) {
                setCurrentPage((prev) => prev - 1);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [currentPage, totalPages]); // Depend on currentPage and totalPages

    // 🔹 Functions for button clicks
    const nextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen py-10 px-4">
            {/* Left Arrow */}
            <button
                onClick={prevPage}
                className={`p-2 md:p-3 rounded-full bg-gray-200 shadow-md transition-transform duration-200 ${currentPage === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-300"
                    }`}
                disabled={currentPage === 0}
            >
                <ChevronLeft size={iconSize} />
            </button>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-4 w-full max-w-6xl">
                {filteredTopics
                    .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
                    .map((item, index) => (
                        <Card key={index} title={item.title} description={item.description} handleCardSelect ={handleCardSelect}/>
                    ))}
            </div>

            {/* Right Arrow */}
            <button
                onClick={nextPage}
                className={`p-2 md:p-3 rounded-full bg-gray-200 shadow-md transition-transform duration-200 ${currentPage === totalPages - 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-300"
                    }`}
                disabled={currentPage === totalPages - 1}
            >
                <ChevronRight size={iconSize} />
            </button>
        </div>
    );
};

export default CardsGrid;



/*import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Card from "./Card";

const CardsGrid = ({ topics, searchQuery }) => {
    const itemsPerPage = 4;
    const [currentPage, setCurrentPage] = useState(0);

    // 🔹 Filter topics based on search query
    const filteredTopics = topics.filter((topic) =>
        topic.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredTopics.length / itemsPerPage);

    // 🔹 Reset currentPage to 0 when searchQuery changes
    useEffect(() => {
        setCurrentPage(0);
    }, [searchQuery]);

    const nextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen py-10">
            {/* Left Arrow }
            <button
                onClick={prevPage}
                className={`p-3 rounded-full bg-gray-200 shadow-md ${currentPage === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-300"
                    }`}
                disabled={currentPage === 0}
            >
                <ChevronLeft size={32} />
            </button>

            {/* Cards Grid }
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mx-4">
                {filteredTopics
                    .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
                    .map((item, index) => (
                        <Card key={index} title={item.title} description={item.description} />
                    ))}
            </div>

            {/* Right Arrow }
            <button
                onClick={nextPage}
                className={`p-3 rounded-full bg-gray-200 shadow-md ${currentPage === totalPages - 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-300"
                    }`}
                disabled={currentPage === totalPages - 1}
            >
                <ChevronRight size={32} />
            </button>
        </div>
    );
};

export default CardsGrid;*/
