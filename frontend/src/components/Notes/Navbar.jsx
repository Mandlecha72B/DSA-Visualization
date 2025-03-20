/*import React, { useState } from "react"
import NotesSearchBar from "./NotesSearchBar"

const Navbar = ({  onSearchNote, handleClearSearch }) => {
    const [searchQuery, setSearchQuery] = useState("")

    //const navigate = useNavigate()
    
    const handleSearch = () => {
        if (searchQuery) {
            onSearchNote(searchQuery)
        }
    }

    const onClearSearch = () => {
        setSearchQuery("")
        handleClearSearch()
    }

    

    return (
        <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
            
                <h2 className="text-xl font-medium text-black py-2">
                    <span className="text-slate-500">Good</span>
                    <span className="text-slate-900">Notes</span>
                </h2>
           

            <NotesSearchBar
                value={searchQuery}
                onChange={({ target }) => setSearchQuery(target.value)}
                handleSearch={handleSearch}
                onClearSearch={onClearSearch}
            />

            
        </div>
    )
}

export default Navbar*/

import React, { useState } from "react"
import NotesSearchBar from "./NotesSearchBar"
import { MdNotes } from "react-icons/md" // Import Notes Icon

const Navbar = ({ onSearchNote, handleClearSearch }) => {
    const [searchQuery, setSearchQuery] = useState("")

    const handleSearch = () => {
        if (searchQuery) {
            onSearchNote(searchQuery)
        }
    }

    const onClearSearch = () => {
        setSearchQuery("")
        handleClearSearch()
    }

    return (
        <nav className="w-full fixed top-0 left-0  shadow-md py-3 px-6 md:px-12 flex items-center justify-between z-50">
            {/* Brand Logo with Icon */}
            <div className="flex items-center gap-2 cursor-pointer transition-transform duration-300 hover:scale-105">
                <MdNotes className="text-white text-3xl" /> {/* Notes Icon */}
                <h2 className="text-2xl font-bold text-white tracking-wide">
                    <span className="text-gray-200">Good</span>
                    <span className="text-white">Notes</span>
                </h2>
            </div>

            {/* Search Bar */}
            <NotesSearchBar
                value={searchQuery}
                onChange={({ target }) => setSearchQuery(target.value)}
                handleSearch={handleSearch}
                onClearSearch={onClearSearch}
            />
        </nav>
    )
}

export default Navbar

