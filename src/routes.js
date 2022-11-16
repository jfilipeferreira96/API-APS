const { Router } = require("express");
const routes = Router();
const Controller = require("./Controllers/ActivityController");

routes.get("/", (req, res) => {
  return res.status(200).json({ message: "Server is online" });
});

routes.get("/pagina-config", (req, res) => {
  res.sendFile("views/config_page.html", { root: __dirname });
});

routes.get("/pagina-params", Controller.SendParams);

routes.get("/activity-page", Controller.SendActivityPage);

module.exports = routes;
