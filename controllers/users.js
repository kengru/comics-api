import _ from "lodash";

import User from "../models/user";

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

const getMangas = async (req, res, next) => {};

const addManga = async (req, res, next) => {
  const mangaId = req.params.mangaId;
};

const removeManga = async (req, res, next) => {};

export default {
  getUser: getUser,
  getMangas: getMangas,
  addManga: addManga,
  removeManga: removeManga
};
