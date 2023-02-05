const { Router } = require("express");
const routes = Router();
const Activity = require("./Controllers/Activity");
const Analytics = require("./Controllers/Analytics");
const StudentActions = require("./Controllers/StudentActions");

routes.get("/", (req, res) => {
  res.sendFile("Views/home_page.html", { root: __dirname });
});

//1. Página de configuração de uma atividade
//config_url: URL da página do Activity Provider que permite configurar a atividade;
// Esta página não guarda nada no Activity Provider: é apenas usado pela Inven!RA, que o usa para apresentar a página de configuração ao utilizador.
routes.get("/activity_config.html", Activity.ActivityConfig);

//1.
routes.get("/json_params_url", Activity.SendParams);

//2
routes.get("/analytics_list", Analytics.GetAnalytics);

//3.1
routes.get("/deploy_activity/:activityID?", Activity.DeployActivityGet);

//3.2
routes.post("/activity/:activityID", Activity.DeployActivityPost);

//4
routes.post("/analytics", Analytics.FetchAnalytics);

//Student interactions with the ActivityPage Routes
routes.get("/params/:activityID?/:inveniraStdID?", StudentActions.ActivityPageParams);
routes.post("/analytics/:activityID?/:inveniraStdID?", StudentActions.SaveAnalytics);

module.exports = routes;
