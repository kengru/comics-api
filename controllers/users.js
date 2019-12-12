import { validationResult } from "express-validator";

import User from "../models/user";

const getUser = async (req, res, next) => {};
const getMangas = async (req, res, next) => {};
const addManga = async (req, res, next) => {};
const removeManga = async (req, res, next) => {};

export default {
  getUser: getUser,
  getMangas: getMangas,
  addManga: addManga,
  removeManga: removeManga
};
