import { validationResult } from "express-validator";

import Manga from "../models/manga";

const getManga = async (req, res, next) => {
  const mangaId = req.params.mangaId;

  try {
    const manga = await Manga.findById(mangaId);
    res.status(200).json({
      message: "Manga retrieved successfully.",
      manga: manga
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const createManga = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 422;
    next(error);
  }

  const manga = new Manga({
    title: req.body.title,
    desc: req.body.desc,
    thumbnailUrl: req.body.thumbnailUrl,
    source: req.body.source,
    sourceId: req.body.sourceId,
    lastChapter: req.body.lastChapter,
  });

  try {
    const saved = await manga.save();
    res.status(201).json({
      message: "Manga added successfully.",
      manga: saved
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const updateManga = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 422;
    next(error);
  }

  const mangaId = req.params.mangaId;
  const lastChapter = req.body.lastChapter;

  try {
    const manga = await Manga.findById(mangaId);
    if (!manga) {
      const error = new Error("Could not find the manga.");
      error.statusCode = 404;
      throw error;
    }
    manga.lastChapter = lastChapter;
    await manga.save();
    res.status(200).json({
      message: "Manga updated."
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const deleteManga = async (req, res, next) => {
  const mangaId = req.params.mangaId;

  try {
    const result = await Manga.findByIdAndDelete(mangaId);
    if (!result) {
      const error = new Error("Could not find the manga to delete.");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      message: "Manga deleted."
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export default {
  getManga: getManga,
  createManga: createManga,
  updateManga: updateManga,
  deleteManga: deleteManga
};
