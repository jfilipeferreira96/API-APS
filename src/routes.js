const { Router } = require("express");
const routes = Router();
const Controller = require("./Controllers/ActivityController");

routes.get("/", (req, res) => {
  res.sendFile("Views/home_page.html", { root: __dirname });
});

//1. Página de configuração de uma atividade
//config_url: URL da página do Activity Provider que permite configurar a atividade;
routes.get("/activity_config.html", (req, res) => {
  // Esta página não guarda nada no Activity Provider: é apenas usado pela Inven!RA, que o usa para apresentar a página de configuração ao utilizador.
  res.sendFile("Views/config_page.html", { root: __dirname });
});

//1.
routes.get("/json_params_url", Controller.SendParams);

//2
routes.get("/analytics_list", Controller.GetAnalytics);

//3.1
routes.get("/deploy_activity/:activityID", Controller.DeployActivityGet);
//devolve o seguinte link:
//3.2
routes.post("/activity/:activityID", Controller.DeployActivityPost);

routes.get("/activity/:activityID/:inveniraStdID", Controller.GetActivityPage);

//4
routes.post("/analytics", Controller.GetActivityAnalytics);

module.exports = routes;
