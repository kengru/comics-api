import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";

import User from "../models/user";

const signUp = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 422;
    error.data = errors.array();
    next(error);
  }

  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  
  try {
    const hashedPw = await bcrypt.hash(password, 12);
    const user = new User({
      email: email,
      username: username,
      password: hashedPw
    });
    const result = await user.save();
    res.status(201).json({
      message: "User created!",
      userId: result._id
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

const logIn = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error("A user with this email could not be found.");
      error.statusCode = 401;
      next(error);
    }
    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      const error = new Error("Wrong password!");
      error.statusCode = 401;
      next(error);
    }
    
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

export default {
  signUp: signUp,
  logIn: logIn
};
