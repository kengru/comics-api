import { validationResult } from "express-validator";

import User from "../models/user";

const signUp = async (req, res, next) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
}

export default {
  signUp: signUp
};
