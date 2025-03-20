const express = require("express");
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const  getUsersForSidebar  = require("../controllers/user.controller");

const router = express.Router();

router.get("/", ensureAuthenticated, getUsersForSidebar);

module.exports = router;