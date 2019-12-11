import express from "express";
import { body } from "express-validator";

import mangasController from "../controllers/mangas";
const router = express.Router();

// ROUTES for /mangas/
router.post(
  "/",
  [
    body("title")
      .trim()
      .isLength({ min: 3 }),
    body("desc")
      .trim()
      .isLength({ min: 5, max: 200 }),
    body("thumbnailUrl")
      .trim()
      .isLength({ min: 8 }),
    body("lastChapter").isNumeric(),
    body("lastLink")
      .trim()
      .isLength({ min: 8 })
  ],
  mangasController.createManga
);
router.put(
  "/:mangaId",
  [
    body("lastChapter").isNumeric(),
    body("lastLink")
      .trim()
      .isLength({ min: 8 })
  ],
  mangasController.updateManga
);
router.delete("/:mangaId", mangasController.deleteManga);

export default router;
