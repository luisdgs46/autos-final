const express = require("express");
const auth = require("../middleware/authorization");
const { createUser, login, verifytoken } = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/register", createUser);
userRouter.post("/login", login);
userRouter.get("/verifytoken", auth, verifytoken);

module.exports = userRouter;