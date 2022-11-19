const { Router } = require("express");
const routes = Router();
const Controller = require("./Controllers/ActivityController");

routes.get("/", (req, res) => {
  res.sendFile("Views/home_page.html", { root: __dirname });
});

//1. Página de configuração de uma atividade
//config_url: URL da página do Activity Provider que permite configurar a atividade;
routes.get("/activity-config.html", (req, res) => {
  // Esta página não guarda nada no Activity Provider: é apenas usado pela Inven!RA, que o usa para apresentar a página de configuração ao utilizador.
  res.sendFile("Views/config_page.html", { root: __dirname });
});

//1.
routes.get("/json_params_url", Controller.SendParams);

//2
routes.get("/analytics", Controller.GetAnalytics);

//3
routes.post("/activity-page", Controller.SendActivityPageURL);
routes.get("/activity-page/:activityID/:inverniraStdID", Controller.GetActivityPage);

//4
routes.post("/analytics/:activityID", Controller.GetActivityAnalytics);

module.exports = routes;
