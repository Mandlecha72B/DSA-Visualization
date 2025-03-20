/*import React from "react"
import { MdCreate, MdDelete, MdOutlinePushPin } from "react-icons/md"
import moment from "moment"


const NoteCard = ({
    title,
    date,
    content,
    tags,
    isPinned,
    onPinNote,
    onEdit,
    onDelete,
}) => {
    return (
        <div className="border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out">
            <div className="flex items-center justify-between">
                <div>
                    <h6 className="text-sm font-medium">{title}</h6>
                    <span className="text-xs text-green-700">
                        {moment(date).format("Do MMM YYYY")}
                    </span>
                </div>

                <MdOutlinePushPin
                    className={`icon-btn ${isPinned ? "text-[#2B85FF] " : "text-slate-300"
                        }`}
                    onClick={onPinNote}
                />
            </div>

            <p className="text-xs text-slate-600 mt-2">{content?.slice(0, 60)}</p>

            <div className="flex items-center justify-between mt-2">
                <div className="text-xs text-slate-500">
                    {tags.map((item) => `#${item} `)}
                </div>

                <div className="flex items-center gap-2">
                    <MdCreate
                        className="icon-btn hover:text-green-600"
                        onClick={onEdit}
                    />

                    <MdDelete
                        className="icon-btn hover:text-red-500"
                        onClick={onDelete}
                    />
                </div>
            </div>
        </div>
    )
}

export default NoteCard*/

/*import React from "react"
import { MdCreate, MdDelete, MdOutlinePushPin } from "react-icons/md"
import moment from "moment"

const NoteCard = ({
    title,
    date,
    content,
    tags,
    isPinned,
    onPinNote,
    onEdit,
    onDelete,
}) => {
    return (
        <div className="relative bg-white border border-gray-200 rounded-lg shadow-md p-4 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
            {/* Top Section - Title & Pin }
            <div className="flex items-start justify-between">
                <div>
                    <h6 className="text-base font-semibold text-gray-800">{title}</h6>
                    <span className="text-xs text-gray-500">
                        {moment(date).format("Do MMM YYYY")}
                    </span>
                </div>

                {/* Pin Icon }
                <MdOutlinePushPin
                    className={`text-2xl cursor-pointer transition-colors duration-300 ${isPinned ? "text-blue-500" : "text-gray-300 hover:text-gray-500"}`}
                    onClick={onPinNote}
                />
            </div>

            {/* Content Preview }
            <p className="text-sm text-gray-600 mt-3 line-clamp-2">{content?.slice(0, 80)}...</p>

            {/* Tags & Actions }
            <div className="flex items-center justify-between mt-4">
                {/* Tags }
                <div className="flex gap-1 flex-wrap">
                    {tags.map((tag, index) => (
                        <span key={index} className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                            #{tag}
                        </span>
                    ))}
                </div>

                {/* Action Icons }
                <div className="flex items-center gap-3">
                    <MdCreate
                        className="text-gray-500 text-xl cursor-pointer hover:text-green-600 transition"
                        onClick={onEdit}
                    />
                    <MdDelete
                        className="text-gray-500 text-xl cursor-pointer hover:text-red-500 transition"
                        onClick={onDelete}
                    />
                </div>
            </div>
        </div>
    )
}

export default NoteCard*/

import React, { useState } from "react";
import { MdCreate, MdDelete, MdOutlinePushPin, MdVisibility } from "react-icons/md";
import moment from "moment";
import Modal from "react-modal";

const NoteCard = ({
    title,
    date,
    content,
    tags,
    isPinned,
    onPinNote,
    onEdit,
    onDelete,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="relative bg-white border border-gray-200 rounded-lg shadow-md p-4 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
                {/* Top Section - Title & Pin */}
                <div className="flex items-start justify-between">
                    <div>
                        <h6 className="text-base font-semibold text-gray-800">{title}</h6>
                        <span className="text-xs text-gray-500">
                            {moment(date).format("Do MMM YYYY")}
                        </span>
                    </div>

                    {/* Pin Icon */}
                    <MdOutlinePushPin
                        className={`text-2xl cursor-pointer transition-colors duration-300 ${isPinned ? "text-blue-500" : "text-gray-300 hover:text-gray-500"}`}
                        onClick={onPinNote}
                    />
                </div>

                {/* Content Preview */}
                <p className="text-sm text-gray-600 mt-3 line-clamp-2">
                    {content?.slice(0, 80)}...
                </p>

                {/* Tags & Actions */}
                <div className="flex items-center justify-between mt-4">
                    {/* Tags */}
                    <div className="flex gap-1 flex-wrap">
                        {tags.map((tag, index) => (
                            <span key={index} className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                                #{tag}
                            </span>
                        ))}
                    </div>

                    {/* Action Icons */}
                    <div className="flex items-center gap-3">
                        {/* View Note Icon */}
                        <MdVisibility
                            className="text-gray-500 text-xl cursor-pointer hover:text-blue-500 transition"
                            onClick={() => setIsModalOpen(true)}
                        />
                        <MdCreate
                            className="text-gray-500 text-xl cursor-pointer hover:text-green-600 transition"
                            onClick={onEdit}
                        />
                        <MdDelete
                            className="text-gray-500 text-xl cursor-pointer hover:text-red-500 transition"
                            onClick={onDelete}
                        />
                    </div>
                </div>
            </div>

            {/* Modal for Full Note */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                style={{
                    overlay: { backgroundColor: "rgba(0,0,0,0.5)" },
                }}
                className="w-[40%] max-md:w-[60%] max-sm:w-[70%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-auto shadow-lg"
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
                    <button
                        className="text-gray-600 hover:text-red-500 transition"
                        onClick={() => setIsModalOpen(false)}
                    >
                        ✖
                    </button>
                </div>
                <p className="text-gray-700">{content}</p>
            </Modal>
        </>
    );
};

export default NoteCard;


