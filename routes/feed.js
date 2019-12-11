import express from "express";

import feedController from "../controllers/mangas";
const router = express.Router();

// GET /feed/mangas
router.get("/mangas", feedController.getMangas);
router.post("/mangas", feedController.createManga);

export default router;