const Note = require("../models/note.model");
const { errorHandler } = require("../utils/error");

const addNote = async (req, res, next) => {
    const { title, content, tags } = req.body

    const { _id } = req.user

    if (!title) {
        return next(errorHandler(400, "Title is required"))
    }

    if (!content) {
        return next(errorHandler(400, "Content is required"))
    }

    try {
        const note = new Note({
            title,
            content,
            tags: tags || [],
            userId: _id,
        })

        await note.save()

        res.status(201).json({
            success: true,
            message: "Note added successfully",
            note,
        })
    } catch (error) {
        next(error)
    }
}

const editNote = async (req, res, next) => {
    console.log("Received request to edit note", req.params.noteId); // Debugging

    try {
        const note = await Note.findById(req.params.noteId);

        if (!note) {
            console.log("Note not found"); // Debugging
            return next(errorHandler(404, "Note not found"));
        }

        console.log("Authenticated user ID:", req.user._id);
        console.log("Note owner ID:", note.userId);

        if (req.user._id.toString() !== note.userId.toString()) {
            console.log("Unauthorized attempt to edit note");
            return next(errorHandler(401, "You can only update your own note!"));
        }

        const { title, content, tags, isPinned } = req.body;
        console.log("Received body:", req.body); // Debugging

        if (!title && !content && !tags && typeof isPinned === "undefined") {
            console.log("No changes provided");
            return next(errorHandler(400, "No changes provided"));
        }

        if (title) note.title = title;
        if (content) note.content = content;
        if (tags) note.tags = tags;
        if (typeof isPinned !== "undefined") note.isPinned = isPinned;

        await note.save();

        console.log("Note updated successfully");
        res.status(200).json({
            success: true,
            message: "Note updated successfully",
            note,
        });
    } catch (error) {
        console.error("Error in editNote:", error);
        next(error);
    }
};

const getAllNotes = async (req, res, next) => {
    const userId = req.user._id

    try {
        const notes = await Note.find({ userId: userId }).sort({ isPinned: -1 })

        res.status(200).json({
            success: true,
            message: "All notes retrived successfully",
            notes,
        })
    } catch (error) {
        next(error)
    }
}

const deleteNote = async (req, res, next) => {
    const noteId = req.params.noteId

    const note = await Note.findOne({ _id: noteId, userId: req.user._id })

    if (!note) {
        return next(errorHandler(404, "Note not found"))
    }

    try {
        await Note.deleteOne({ _id: noteId, userId: req.user._id })

        res.status(200).json({
            success: true,
            message: "Note deleted successfully",
        })
    } catch (error) {
        next(error)
    }
}
/*const updateNotePinned = async (req, res, next) => {
    try {
        const note = await Note.findById(req.params.noteId)

        if (!note) {
            return next(errorHandler(404, "Note not found!"))
        }

        if (req.user._id !== note.userId) {
            return next(errorHandler(401, "You can only update your own note!"))
        }

        const { isPinned } = req.body

        note.isPinned = isPinned

        await note.save()

        res.status(200).json({
            success: true,
            message: "Note updated successfully",
            note,
        })
    } catch (error) {
        next(error)
    }
}*/

const updateNotePinned = async (req, res, next) => {
    try {
        console.log(" Received request to update pinned status");
        console.log(" Request Params:", req.params.noteId);
        console.log(" Request Body:", req.body);

        const note = await Note.findById(req.params.noteId);

        if (!note) {
            console.log(" Note not found");
            return next(errorHandler(404, "Note not found!"));
        }

        console.log("✅ Found Note:", note);

        if (req.user._id.toString() !== note.userId.toString()) {
            console.log(" Unauthorized access");
            return next(errorHandler(401, "You can only update your own note!"));
        }

        note.isPinned = req.body.isPinned; // Ensure correct update

        await note.save();
        console.log("Note updated successfully:", note);

        res.status(200).json({
            success: true,
            message: "Note updated successfully",
            note,
        });
    } catch (error) {
        console.error(" Error in updateNotePinned:", error);
        next(error);
    }
};

const searchNote = async (req, res, next) => {
    const { query } = req.query;
    console.log("Received search query:", query);

    if (!query) {
        return next(errorHandler(400, "Search query is required"))
    }

    try {
        const matchingNotes = await Note.find({
            userId: req.user._id,
            $or: [
                { title: { $regex: new RegExp(query, "i") } },
                { content: { $regex: new RegExp(query, "i") } },
            ],
        })

        res.status(200).json({
            success: true,
            message: "Notes matching the search query retrieved successfully",
            notes: matchingNotes,
        })
    } catch (error) {
        console.error(error)
        next(error)
    }
}

module.exports = {
    addNote,
    editNote,
    getAllNotes,
    deleteNote,
    updateNotePinned,
    searchNote,
};