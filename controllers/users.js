import _ from "lodash";

import User from "../models/user";
import Manga from "../models/manga";

const getUser = async (req, res, next) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId);
    res.status(200).json({
      message: "User information retrieved.",
      user: _.omit(user, "password")
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().populate("mangas");
    res.status(200).json({
      message: "Users retrieved.",
      users: users
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const getMangas = async (req, res, next) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId);
    res.status(200).json({
      message: "Mangas retrieved.",
      mangas: user.mangas
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const addManga = async (req, res, next) => {
  const userId = req.userId;
  const mangaId = req.params.mangaId;
  try {
    const user = await User.findById(userId);
    if (user.mangas.includes(mangaId)) {
      const err = new Error("This manga already exists on the user.");
      err.statusCode = 400;
      throw err;
    }
    const manga = await Manga.findById(mangaId);
    if (!manga) {
      const err = new Error("The ID provided does not exists.");
      err.statusCode = 404;
      throw err;
    }
    user.mangas.push(manga);
    user.save();
    res.status(201).json({
      message: "Manga added."
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const removeManga = async (req, res, next) => {
  const userId = req.userId;
  const mangaId = req.params.mangaId;
  try {
    const user = await User.findById(userId);
    if (!user.mangas.includes(mangaId)) {
      const err = new Error("This manga is not assigned to the user.");
      err.statusCode = 400;
      throw err;
    }
    const manga = await Manga.findById(mangaId);
    if (!manga) {
      const err = new Error("The ID provided does not exists.");
      err.statusCode = 404;
      throw err;
    }
    user.mangas.pull(manga);
    user.save();
    res.status(201).json({
      message: "Manga removed."
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export default {
  getUser: getUser,
  getAllUsers: getAllUsers,
  getMangas: getMangas,
  addManga: addManga,
  removeManga: removeManga
};
