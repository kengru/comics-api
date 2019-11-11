const express = require("express");

const feedController = require("../controllers/feed");
const router = express.Router();

// GET /feed/mangas
router.get("/mangas", feedController.getMangas);

module.exports = router;