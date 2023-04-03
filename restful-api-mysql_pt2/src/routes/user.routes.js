const express = require("express");
const userController = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");
const verifyToken = require("../middleware/auth.middleware");

const userRoutes = express.Router();

userRoutes.get("/me", userController.displayUser);

userRoutes.post("/me/update", verifyToken, authController.updateUser);

module.exports = userRoutes;