const express = require("express");
const auth = require("../middleware/authorization");
const { deleteModel } = require("mongoose");

const autosRouter = express.Router();

userRouter.get("/crear-autos", createAutos);
userRouter.put("/actualizar-autos", loding);
userRouter.delete("/borrar-autos", deleteModel);

module.exports = userRouter;