/*import React from "react"
import { FaMagnifyingGlass } from "react-icons/fa6"
import { IoMdClose } from "react-icons/io"

const NotesSearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
    return (
        <div className="w-40 sm:w-60 md:w-80 flex  items-center px-4 bg-slate-100 rounded-md">
            <input
                type="text"
                placeholder="Search Notes..."
                className="w-full text-xs bg-transparent py-[11px] outline-none"
                value={value}
                onChange={onChange}
            />

            {value && (
                <IoMdClose
                    className="text-slate-500 text-xl cursor-pointer hover:text-black mr-3"
                    onClick={onClearSearch}
                />
            )}

            <FaMagnifyingGlass
                className="text-slate-500 text-xl cursor-pointer hover:text-black mr-3"
                onClick={handleSearch}
            />
        </div>
    )
}

export default NotesSearchBar*/

import React from "react"
import { FaSearch } from "react-icons/fa" // More consistent search icon
import { IoMdClose } from "react-icons/io"

const NotesSearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
    return (
        <div className="w-48 sm:w-64 md:w-80 flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm transition-all duration-300 focus-within:border-blue-500">
            {/* Search Input */}
            <input
                type="text"
                placeholder="Search Notes..."
                className="w-full text-sm bg-transparent outline-none placeholder-gray-400 text-gray-700"
                value={value}
                onChange={onChange}
            />

            {/* Clear Button (Appears Only When Input Has Value) */}
            {value && (
                <IoMdClose
                    className="text-gray-500 text-lg cursor-pointer hover:text-red-500 transition duration-200 mr-2"
                    onClick={onClearSearch}
                />
            )}

            {/* Search Icon */}
            <FaSearch
                className="text-gray-500 text-lg cursor-pointer hover:text-blue-500 transition duration-200"
                onClick={handleSearch}
            />
        </div>
    )
}

export default NotesSearchBar

