const path = require("path");

class ActivityController {
  async SendParams(req, res) {
    //const { ativityID } = req.body;

    //Implementar busca na BD que devolve os parametros da atividade com id xxxx

    const sendTestParams = {
      s1: "Setting 1",
      s2: "Setting 2",
      s3: "Setting 3",
    };

    return res.status(200).json(sendTestParams);
  }

  async SendActivityPage(req, res) {
    //const { studentID } = req.body;

    //Implementar alguma maneira de guardar e enviar este valor para a página do aluno
    let indexPath = path.join(__dirname, "../Views/activity_page.html");
    return res.sendFile(indexPath);
  }

  async GetAnalytics(req, res) {
    //const { ativityID } = req.body;

    //Implementar busca na BD que devolve os parametros da atividade com id xxxx

    const sendTestAnalytics = [
      {
        analytic1: "Setting 1",
      },
      {
        analytic2: "Setting 1",
      },
    ];

    return res.status(200).json(sendTestAnalytics);
  }
}

module.exports = new ActivityController();
