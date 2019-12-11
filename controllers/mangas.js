import { validationResult } from "express-validator";

import Manga from "../models/manga";

const getMangas = (req, res, next) => {
  res.status(200).json({
    mangas: [
      {
        title: "Vagabond",
        desc: "A cool Samurai",
        thumbnailUrl: "vagabond.png",
        lastLink: "http://whatever",
        addedDate: "02/02/2011"
      }
    ]
  });
};

const createManga = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 422;
    throw error;
  }
  const manga = new Manga({
    title: req.body.title,
    desc: req.body.desc,
    thumbnailUrl: req.body.thumbnailUrl,
    lastChapter: req.body.lastChapter,
    lastLink: req.body.lastLink
  });
  try {
    const saved = await manga.save();
    res.status(201).json({
      message: "Manga added successfully!",
      manga: saved
    });
  } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
  }
};

export default {
  getMangas: getMangas,
  createManga: createManga
}