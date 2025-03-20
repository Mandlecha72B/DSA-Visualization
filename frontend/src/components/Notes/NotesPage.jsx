/*import React, { useEffect, useState } from "react"
import NoteCard from "./NoteCard"
import { MdAdd } from "react-icons/md"
import Modal from "react-modal"
import AddEditNotes from "./AddEditNotes"
import { useNavigate } from "react-router-dom"
import Navbar from "./Navbar"

import toast from "react-hot-toast"
import EmptyCard from "./EmptyCard"
import { deleteNote, getAllNotes, searchNote, updateNotePinned } from "../utils/NotesAPI"
Modal.setAppElement("#root");

const NotesPage = () => {


    const [allNotes, setAllNotes] = useState([])

    const [isSearch, setIsSearch] = useState(false)

    // console.log(allNotes)

    const navigate = useNavigate()

    const [openAddEditModal, setOpenAddEditModal] = useState({
        isShown: false,
        type: "add",
        data: null,
    })

    useEffect(() => {
        getNotes()
    }, [])

    // get all notes
    const getNotes = async () => {
        try {
            const res = await getAllNotes();

            if (res.success === false) {
                console.log(res)
                toast.error(res.message)
                return
            }

            // console.log(res.data)
            setAllNotes(res.notes)
            toast.success(res.message)
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const handleEdit = (noteDetails) => {
        setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" })
    }

    // Delete Note
    const handleDeleteNotes = async (data) => {


        try {
            const res = await deleteNote(data);

            if (res.success === false) {
                toast.error(res.message)
                return;
            }

            toast.success(res.message)
            getNotes()
        } catch (error) {
            toast.error(error.message)
        }
    }

    const onSearchNote = async (query) => {
        try {
            const res = await searchNote(query)

            if (res.success === false) {
                console.log(res.message)
                toast.error(res.message)
                return
            }
            setIsSearch(true)
            setAllNotes(res.notes)
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const handleClearSearch = () => {
        setIsSearch(false)
        getNotes()
    }

    /*const updateIsPinned = async (noteData) => {


        try {
            const res = updateNotePinned(noteData);

            if (res.success === false) {
                toast.error(res.message)
                console.log(res.message)
                return
            }

            toast.success(res.message);
            getNotes();
        } catch (error) {
            console.log(error.message)
        }
    }

    const updateIsPinned = async (noteData) => {
        try {
            console.log("🔹 Toggling pin status for note:", noteData);

            const res = await updateNotePinned(noteData); // Added `await`

            if (res.success === false) {
                console.log("❌ Error updating note:", res.message);
                toast.error(res.message);
                return;
            }

            // ✅ Update the local state instead of refetching all notes
            setAllNotes((prevNotes) =>
                prevNotes.map((note) =>
                    note._id === noteData._id ? { ...note, isPinned: !note.isPinned } : note
                )
            );

            toast.success(res.message);
            console.log("✅ Pinned status updated successfully");
        } catch (error) {
            console.log("❌ Error updating pinned status:", error.message);
            toast.error("Failed to update note");
        }
    };


    return (
        <>
            <Navbar

                onSearchNote={onSearchNote}
                handleClearSearch={handleClearSearch}
            />

            <div className="container mx-auto">
                {allNotes.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-8 max-md:m-5">
                        {allNotes.map((note, index) => (
                            <NoteCard
                                key={note._id}
                                title={note.title}
                                date={note.createdAt}
                                content={note.content}
                                tags={note.tags}
                                isPinned={note.isPinned}
                                onEdit={() => {
                                    handleEdit(note)
                                }}
                                onDelete={() => {
                                    handleDeleteNotes(note)
                                }}
                                onPinNote={() => {
                                    updateIsPinned(note)
                                }}
                            />
                        ))}
                    </div>
                ) : (
                    <EmptyCard
                        imgSrc={
                            isSearch
                                ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtakcQoMFXwFwnlochk9fQSBkNYkO5rSyY9A&s"
                                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDCtZLuixBFGTqGKdWGLaSKiO3qyhW782aZA&s"
                        }
                        message={
                            isSearch
                                ? "Oops! No Notes found matching your search"
                                : `Ready to capture your ideas? Click the 'Add' button to start noting down your thoughts, inspiration and reminders. Let's get started!`
                        }
                    />
                )}
            </div>

            <button
                className="w-16 h-16 flex items-center justify-center rounded-2xl bg-[#2B85FF] hover:bg-blue-600 absolute right-10 bottom-10"
                onClick={() => {
                    setOpenAddEditModal({ isShown: true, type: "add", data: null })
                }}
            >
                <MdAdd className="text-[32px] text-white" />
            </button>

            <Modal
                isOpen={openAddEditModal.isShown}
                onRequestClose={() => { }}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0,0,0,0.2)",
                    },
                }}
                contentLabel=""
                className="w-[40%] max-md:w-[60%] max-sm:w-[70%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
            >
                <AddEditNotes
                    onClose={() =>
                        setOpenAddEditModal({ isShown: false, type: "add", data: null })
                    }
                    noteData={openAddEditModal.data}
                    type={openAddEditModal.type}
                    getNotes={getNotes}
                />
            </Modal>
        </>
    )
}

export default NotesPage*/

import React, { useEffect, useState } from "react";
import NoteCard from "./NoteCard";
import { MdAdd, MdClose } from "react-icons/md";
import Modal from "react-modal";
import AddEditNotes from "./AddEditNotes";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import toast from "react-hot-toast";
import EmptyCard from "./EmptyCard";
import { deleteNote, getAllNotes, searchNote, updateNotePinned } from "../utils/NotesAPI";
import Tooltip from "../Tooltip";

Modal.setAppElement("#root");

const NotesPage = () => {
    const [allNotes, setAllNotes] = useState([]);
    const [isSearch, setIsSearch] = useState(false);
    const navigate = useNavigate();
    const [openAddEditModal, setOpenAddEditModal] = useState({
        isShown: false,
        type: "add",
        data: null,
    });

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = async () => {
        try {
            const res = await getAllNotes();
            if (!res.success) {
                toast.error(res.message);
                return;
            }
            setAllNotes(res.notes);
            toast.success(res.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleEdit = (noteDetails) => {
        setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
    };

    const handleDeleteNotes = async (data) => {
        try {
            const res = await deleteNote(data);
            if (!res.success) {
                toast.error(res.message);
                return;
            }
            toast.success(res.message);
            getNotes();
        } catch (error) {
            toast.error(error.message);
        }
    };

    const onSearchNote = async (query) => {
        try {
            const res = await searchNote(query);
            if (!res.success) {
                toast.error(res.message);
                return;
            }
            setIsSearch(true);
            setAllNotes(res.notes);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleClearSearch = () => {
        setIsSearch(false);
        getNotes();
    };

    const updateIsPinned = async (noteData) => {
        try {
            const res = await updateNotePinned(noteData);
            if (!res.success) {
                toast.error(res.message);
                return;
            }
            setAllNotes((prevNotes) =>
                prevNotes.map((note) =>
                    note._id === noteData._id ? { ...note, isPinned: !note.isPinned } : note
                )
            );
            toast.success(res.message);
        } catch (error) {
            toast.error("Failed to update note");
        }
    };

    return (
        <>
            <Navbar onSearchNote={onSearchNote} handleClearSearch={handleClearSearch} />

            <div className="container mx-auto px-4">
                {allNotes.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                        {allNotes.map((note) => (
                            <NoteCard
                                key={note._id}
                                title={note.title}
                                date={note.createdAt}
                                content={note.content}
                                tags={note.tags}
                                isPinned={note.isPinned}
                                onEdit={() => handleEdit(note)}
                                onDelete={() => handleDeleteNotes(note)}
                                onPinNote={() => updateIsPinned(note)}
                            />
                        ))}
                    </div>
                ) : (
                    <EmptyCard
                        imgSrc={
                            isSearch
                                ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtakcQoMFXwFwnlochk9fQSBkNYkO5rSyY9A&s"
                                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDCtZLuixBFGTqGKdWGLaSKiO3qyhW782aZA&s"
                        }
                        message={
                            isSearch
                                ? "Oops! No Notes found matching your search"
                                : `Ready to capture your ideas? Click the 'Add' button to start noting down your thoughts, inspiration and reminders. Let's get started!`
                        }
                    />
                )}
            </div>

            {/* Floating Add Button */}
            <Tooltip content="Add Note" >
                <button
                    className="w-16 h-16 flex items-center justify-center rounded-full bg-[#2B85FF] hover:bg-blue-600 text-white fixed bottom-10 right-10 shadow-lg transition-transform duration-300 hover:scale-110"
                    onClick={() => setOpenAddEditModal({ isShown: true, type: "add", data: null })}
                >
                    <MdAdd className="text-[32px]" />
                </button>
            </Tooltip>

            {/* Add/Edit Notes Modal */}
            <Modal
                isOpen={openAddEditModal.isShown}
                onRequestClose={() => setOpenAddEditModal({ isShown: false, type: "add", data: null })}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0,0,0,0.4)",
                        backdropFilter: "blur(4px)",
                    },
                }}
                contentLabel="Manage Note"
                className="w-full max-w-lg rounded-lg shadow-lg mx-auto my-20 p-6 relative flex flex-col"
            >
                {/* Close Button */}
                <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                    onClick={() => setOpenAddEditModal({ isShown: false, type: "add", data: null })}
                >
                    <MdClose size={24} />
                </button>

                <AddEditNotes
                    onClose={() => setOpenAddEditModal({ isShown: false, type: "add", data: null })}
                    noteData={openAddEditModal.data}
                    type={openAddEditModal.type}
                    getNotes={getNotes}
                />
            </Modal>
        </>
    );
};

export default NotesPage;
