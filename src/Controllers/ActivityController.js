const path = require("path");

class ActivityController {
  //1.parâmetros respetivos
  async SendParams(req, res) {
    //const { ativityID } = req.body;

    //Implementar busca na BD que devolve os parametros da atividade com id xxxx

    const sendTestParams = [
      { name: "title", type: "text/plain" },
      { name: "summary", type: "text/plain" },
      { name: "documentation", type: "array" },
      { name: "correctAnswer", type: "array" },
      { name: "tipInfo", type: "text/plain" },
    ];

    return res.status(200).json(sendTestParams);
  }

  //2. Lista de analytics da atividade
  // analytics_list_url: URL para um Web service que devolve a lista de analytics que o Activity Provider recolherá
  async GetAnalytics(req, res) {
    const activityID = req.params.activityID;

    //Implementar busca na BD que devolve os parametros da atividade com id xxxx

    const sendTestAnalytics = [
      {
        name: "inveniraStdID",
        type: "integer",
        analytics: [
          { name: "numOfResets", type: "integer" },
          { name: "numOfSubmits", type: "integer" },
          { name: "wasInformationClicked", type: "boolean" },
          { name: "answer", type: "array" },
        ],
      },
    ];

    return res.status(200).json(sendTestAnalytics);
  }

  //3.GET Deploy de atividade
  async DeployActivityGet(req, res) {
    const { activityID } = req.params;
    let data = { message: `It's required an activity id.` };
    let responseCode = 400;

    if (activityID) {
      data = { deployURL: `https://${req.headers.host}/activity/${activityID}` };
      responseCode = 200;
    }

    res.status(responseCode).json(data);
  }

  async DeployActivityPost(req, res) {
    const { activityID, inveniraStdID, json_params } = req.body;
    console.log(req.body);
    if (!activityID) {
      return res.status(400).json({ message: "Invalid activity ID." });
    }
    if (!inveniraStdID) {
      return res.status(400).json({ message: "Invalid student ID." });
    }
    if (!json_params) {
      return res.status(400).json({ message: "Invalid json_params." });
    }

    res.status(responseCode).json({ deployURL: `https://${req.headers.host}/activity/${activityID}/${inveniraStdID}` });
  }

  async GetActivityPage(req, res) {
    const { activityID, inveniraStdID, json_params } = req.body;

    let indexPath = path.join(__dirname, "../Views/activity_page.html");
    return res.sendFile(indexPath);
  }

  //4. Analytics de atividade
  //devolve analytics_url
  async GetActivityAnalytics(req, res) {
    const { activityID } = req.body;

    const sendTestAnalytics = [
      {
        activityID: activityID,
        inveniraStdID: 1001,
        analytics: [
          { numOfResets: "numOfResets", value: 2 },
          { name: "numOfSubmits", value: 3 },
          { name: "wasInformationClicked", value: true },
          { name: "answer", type: ["align:left"] },
        ],
      },
      {
        activityID: activityID,
        inveniraStdID: 1002,
        analytics: [
          { numOfResets: "numOfResets", value: 0 },
          { name: "numOfSubmits", value: 1 },
          { name: "wasInformationClicked", value: false },
          { name: "answer", type: ["color:blue"] },
        ],
      },
    ];

    return res.status(200).json(sendTestAnalytics);
  }
}

module.exports = new ActivityController();
