const { Router } = require("express");
const PersonController = require("./PersonController");
const personController = new PersonController();

const routes = Router();

routes.post("/pessoas", personController.create);

routes.put("/pessoas/:id", personController.update);

routes.get("/pessoas/:id", personController.show);

routes.get("/pessoas", personController.index);

routes.delete("/pessoas/:id", personController.delete);

module.exports = routes;