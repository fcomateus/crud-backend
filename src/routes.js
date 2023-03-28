const { Router } = require("express");
const PersonController = require("./PersonController");
const personController = new PersonController();

const routes = Router();

routes.post("/pessoa", personController.create);

routes.put("/pessoa/:id", personController.update);

routes.get("/pessoa/:id", personController.show)

routes.delete("/pessoa/:id", personController.delete)

module.exports = routes;