const { Router } = require("express");
const routes = Router();
const Activity = require("./Controllers/Activity");
const Analytics = require("./Controllers/Analytics");
const Actions = require("./Controllers/Actions");

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
routes.get("/json_params_url", Activity.SendParams);

//2
routes.get("/analytics_list", Activity.GetAnalytics);

//3.1
routes.get("/deploy_activity/:activityID?", Activity.DeployActivityGet);
//devolve o seguinte link:
//3.2
routes.post("/activity/:activityID", Activity.DeployActivityPost);

//acede á pagina
routes.get("/activity/:activityID?/:inveniraStdID?", Activity.GetActivityPage);

//4
routes.post("/analytics", Analytics.FetchAnalytics);

routes.get("/params/:activityID?/:inveniraStdID?", Actions.ActivityPageParams);
routes.post("/analytics/:activityID?/:inveniraStdID?", Actions.SaveAnalytics);

module.exports = routes;
