const express = require("express");
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const { getMessages, sendMessage } = require("../controllers/message.controller");


const router = express.Router();

router.get("/:id", ensureAuthenticated, getMessages);
router.post("/send/:id", ensureAuthenticated, sendMessage);
router.post("/send", ensureAuthenticated, sendMessage);

module.exports = router;