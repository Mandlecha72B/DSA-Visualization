/*import React, { useState } from "react"
import { MdClose } from "react-icons/md"
import TagInput from "./TagInput"

import toast  from "react-hot-toast"
import { addNewNote, editNote } from "../utils/NotesAPI"

const AddEditNotes = ({ onClose, noteData, type, getNotes }) => {
    const [title, setTitle] = useState(noteData?.title || "")
    const [content, setContent] = useState(noteData?.content || "")
    const [tags, setTags] = useState(noteData?.tags || [])
    const [error, setError] = useState(null)
    

    //   Edit Note
    const handleEditNote = async () => {
        
        try {
            const newNoteData = { title, content, tags, _id:noteData._id }; // Ensure valid JSON data
            const res = await editNote(newNoteData)

            console.log(res)

            if (res.success === false) {
                console.log(res.message)
                setError(res.message)
                toast.error(res.message)
                return
            }

            toast.success(res.message)
            getNotes()
            onClose()
        } catch (error) {
            toast.error(error.message)
            console.log(error.message)
            setError(error.message)
        }
    }

    //   Add Note
    const handleAddNewNote = async () => {
        try {
            const newNoteData = { title, content, tags }; // Ensure valid JSON data
            const res = await addNewNote(newNoteData);

            if (res.success === false) {
                console.log(res.message)
                setError(res.message)
                toast.error(res.message)
                return
            }

            toast.success(res.message)
            getNotes()
            onClose()
        } catch (error) {
            toast.error(error.message)
            console.log(error.message)
            setError(error.message)
        }
    }

    const handleAddNote = () => {
        if (!title) {
            setError("Please enter the title")
            return
        }

        if (!content) {
            setError("Please enter the content")
            return
        }

        setError("")

        if (type === "edit") {
            handleEditNote()
        } else {
            handleAddNewNote()
        }
    }

    return (
        <div className="relative">
            <button
                className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50"
                onClick={onClose}
            >
                <MdClose className="text-xl text-slate-400" />
            </button>
            <div className="flex flex-col gap-2">
                <label className="input-label text-red-400 uppercase">Title</label>

                <input
                    type="text"
                    className="text-2xl outline-none text-white"
                    placeholder="Wake up at 6 a.m."
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                />
            </div>
            <div className="flex flex-col gap-2 mt-4">
                <label className="input-label text-red-400 uppercase">Content</label>

                <textarea
                    type="text"
                    className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
                    placeholder="Content..."
                    rows={10}
                    value={content}
                    onChange={({ target }) => setContent(target.value)}
                />
            </div>

            <div className="mt-3">
                <label className="input-label text-red-400 uppercase">tags</label>
                <TagInput tags={tags} setTags={setTags} />
            </div>

            {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

            <button
                className="w-full mt-5 p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
                onClick={handleAddNote}
            >
                {type === "edit" ? "Update Note" : "Add Note"}
            </button>
        </div>
    )
}

export default AddEditNotes*/

import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import TagInput from "./TagInput";
import toast from "react-hot-toast";
import { addNewNote, editNote } from "../utils/NotesAPI";

const AddEditNotes = ({ onClose, noteData, type, getNotes }) => {
    const [title, setTitle] = useState(noteData?.title || "");
    const [content, setContent] = useState(noteData?.content || "");
    const [tags, setTags] = useState(noteData?.tags || []);
    const [error, setError] = useState(null);

    //   Edit Note
    const handleEditNote = async () => {
        try {
            const newNoteData = { title, content, tags, _id: noteData._id };
            const res = await editNote(newNoteData);

            if (res.success === false) {
                setError(res.message);
                toast.error(res.message);
                return;
            }

            toast.success(res.message);
            getNotes();
            onClose();
        } catch (error) {
            toast.error(error.message);
            setError(error.message);
        }
    };

    //   Add Note
    const handleAddNewNote = async () => {
        try {
            const newNoteData = { title, content, tags };
            const res = await addNewNote(newNoteData);

            if (res.success === false) {
                setError(res.message);
                toast.error(res.message);
                return;
            }

            toast.success(res.message);
            getNotes();
            onClose();
        } catch (error) {
            toast.error(error.message);
            setError(error.message);
        }
    };

    const handleAddNote = () => {
        if (!title) {
            setError("Please enter the title");
            return;
        }

        if (!content) {
            setError("Please enter the content");
            return;
        }

        setError("");

        if (type === "edit") {
            handleEditNote();
        } else {
            handleAddNewNote();
        }
    };

    return (
        <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-xl shadow-xl max-w-lg mx-auto transform transition-all duration-300 hover:scale-105">
            {/* Close Button */}
            <button
                className="absolute top-3 right-3 p-2 rounded-full bg-gray-700 hover:bg-red-500 transition-all text-white shadow-md hover:scale-110"
                onClick={onClose}
            >
                <MdClose className="text-xl" />
            </button>

            {/* Title Input */}
            <div className="flex flex-col gap-1">
                <label className="text-gray-300 font-semibold uppercase text-sm tracking-wider">
                    Title
                </label>
                <input
                    type="text"
                    className="text-lg font-semibold outline-none border-b-2 border-gray-600 bg-transparent focus:border-blue-400 transition-all p-2"
                    placeholder="Title of Notes...."
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                />
            </div>

            {/* Content Textarea */}
            <div className="flex flex-col gap-1 mt-4">
                <label className="text-gray-300 font-semibold uppercase text-sm tracking-wider">
                    Content
                </label>
                <textarea
                    className="text-sm text-gray-200 outline-none border border-gray-600 rounded-lg p-3 bg-gray-800 focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="Write your notes here..."
                    rows={6}
                    value={content}
                    onChange={({ target }) => setContent(target.value)}
                />
            </div>

            {/* Tags Input */}
            <div className="mt-4">
                <label className="text-gray-300 font-semibold uppercase text-sm tracking-wider">
                    Tags
                </label>
                <TagInput tags={tags} setTags={setTags} />
            </div>

            {/* Error Message */}
            {error && <p className="text-red-400 text-xs pt-3">{error}</p>}

            {/* Submit Button */}
            <button
                className="w-full mt-5 p-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg transition-all transform hover:scale-105"
                onClick={handleAddNote}
            >
                {type === "edit" ? "Update Note" : "Add Note"}
            </button>
        </div>
    );
};

export default AddEditNotes;
