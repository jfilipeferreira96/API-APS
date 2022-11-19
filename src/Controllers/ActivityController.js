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
  //− user_url: URL para um Web service que permite efetuar o deploy da atividade, recebendo como parâmetro uma identificação da instância na Inven!RA;
  async GetActivityPage(req, res) {
    const { activityID, inveniraStdID, json_params } = req.body;

    //devo armazenar o id da atividade na bd
    //não deve enviar a pagina mas sim um url com a pagina!
    let indexPath = path.join(__dirname, "../Views/activity_page.html");
    return res.sendFile(indexPath);
  }
  //3.POST
  async SendActivityPageURL(req, res) {
    const { activityID, inveniraStdID, json_params } = req.body;

    const data = { deployURL: `https://api-aps.herokuapp.com/${activityID}/${inveniraStdID}` };
    res.json(data);
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
