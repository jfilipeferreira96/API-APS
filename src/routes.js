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
routes.get("/analytics_list", Controller.GetAnalytics);

//3
routes.post("/deploy-activity/:activityID", Controller.DeployActivityGet);
routes.get("/deploy-activity/:activityID", Controller.DeployActivityPost);

//4
routes.post("/analytics", Controller.GetActivityAnalytics);

//Acesso do aluno a uma página de actividade apos o deploy!
routes.get("/:activityID/:inveniraStdID", Controller.GetActivityPage);

module.exports = routes;
