import express from "express";
import { body } from "express-validator";

import authController from "../controllers/auth";

import User from "../models/user";
const router = express.Router();

router.put(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom(async (value, { req }) => {
        const userDoc = await User.findOne({ email: value });
        if (userDoc) {
          return Promise.reject("E-Mail address already exists!");
        }
      })
      .normalizeEmail(),
    body("username")
      .trim()
      .notEmpty()
      .withMessage("Please enter an username.")
      .custom(async (value, { req }) => {
        const userDoc = await User.findOne({ username: value });
        if (userDoc) {
          return Promise.reject("Username already exists!");
        }
      }),
    body("password").trim().isLength({ min: 5 })
  ],
  authController.signUp
);
router.post("/login", authController.logIn);

export default router;
