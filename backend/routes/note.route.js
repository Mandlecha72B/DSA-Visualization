
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const {
    addNote, deleteNote,
    editNote,
    getAllNotes,
    searchNote,
    updateNotePinned,
} = require("../controllers/note.controller");

const express = require('express');

const router = express.Router();
router.post("/add", ensureAuthenticated, addNote)
router.post("/edit/:noteId", ensureAuthenticated, editNote)
router.get("/all", ensureAuthenticated, getAllNotes)
router.delete("/delete/:noteId", ensureAuthenticated, deleteNote)
router.put("/update-note-pinned/:noteId", ensureAuthenticated, updateNotePinned)
router.get("/search", ensureAuthenticated, searchNote)

module.exports = router;