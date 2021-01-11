const express = require("express");
const passport = require("passport");
const routes = express.Router();

const administradorController = require("../controllers/administrador.controller.js");

const authMiddleware = (request, response, next) => {
    if (!request.isAuthenticated()) {
        console.log("Não está logado");
      response
        .status(401)
        .send("Você não está autorizado à acessar este recurso!");
    } else {
      next();
    }
};



routes.post("/api/login", administradorController.UserLogin);
routes.get("/api/logout", authMiddleware, administradorController.logout);
routes.get("/api/user", authMiddleware, administradorController.getUserData);
routes.post("/api/administrador", authMiddleware, administradorController.create);
routes.get("/api/administrador", authMiddleware, administradorController.getAll);
routes.delete("/api/administrador/:id", authMiddleware, administradorController.remove);

module.exports = routes;