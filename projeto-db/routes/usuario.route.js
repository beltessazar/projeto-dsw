const express = require("express");
//const model = require("./models");
const usuarioController = require("../controllers/usuario.controller.js");
const routes = express.Router();

routes.post("/usuario", usuarioController.create);
routes.get("/usuarios", usuarioController.getAll);
routes.get("/usuario/?", usuarioController.findByPk);
routes.delete("/usuario/:id", usuarioController.deleteByPk);
//routes.delete("/usuario/?", usuarioController.deleteByPk);

module.exports = routes;