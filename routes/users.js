import express from "express";

import usersController from "../controllers/users";
import isAuth from "../middleware/is-auth";

const router = express.Router();

// ROUTES for /users/
router.get("/", isAuth, usersController.getUser);
router.get("/all", isAuth, usersController.getAllUsers);
router.get("/mangas", isAuth, usersController.getMangas);
router.put("/mangas/:mangaId", isAuth, usersController.addManga);
router.delete("/mangas/:mangaId", isAuth, usersController.removeManga);

export default router;
