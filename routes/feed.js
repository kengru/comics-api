const express = require("express");

const feedController = require("../controllers/feed");
const router = express.Router();

// GET /feed/mangas
router.get("/mangas", feedController.getMangas);
router.post("/mangas", feedController.postMangas);

module.exports = router;