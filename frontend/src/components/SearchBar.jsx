
import React from "react";
import { Search } from "lucide-react";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
    return (
        <div className="w-full sm:w-72 md:w-96 lg:w-[40rem] px-4 flex justify-center">
            <div className="relative w-full">
                {/* Search Icon with More Space */}
                <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 text-white-600" />

                {/* Input Field */}
                <input
                    name="search"
                    type="text"
                    placeholder="Search for algorithms"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-3 sm:p-4 pl-10 sm:pl-12 h-10 sm:h-11 text-base sm:text-lg rounded-2xl shadow-md border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all placeholder:text-sm sm:placeholder:text-base md:placeholder:text-lg"
                />
            </div>
        </div>
    );
};

export default SearchBar;



/*import React from "react";
import { Search } from "lucide-react";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
    return (
        <div className="absolute top-6 sm:top-10 left-1/2 transform -translate-x-1/2 w-full sm:w-72 md:w-96 lg:w-[40rem] px-4">
            <div className="relative">
                <input
                    name="search"
                    type="text"
                    placeholder="Search for algorithms, topics..."
                    value={searchQuery} // 🔹 Set the search query
                    onChange={(e) => setSearchQuery(e.target.value)} // 🔹 Update search query on change
                    //
                    className="w-full p-4 pl-12 h-11 text-lg rounded-2xl shadow-md border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-white-700" />
            </div>
        </div>
    );
};

export default SearchBar;*/






