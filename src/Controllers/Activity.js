const path = require("path");
const root = path.resolve(__dirname, "..");

class Activity {
  async ActivityConfig(req, res) {
    res.status(200).sendFile(path.join(root, "/Views/config_page.html"));
  }

  async SendParams(req, res) {
    const sendTestParams = [
      { name: "title", type: "text/plain" },
      { name: "summary", type: "text/plain" },
      { name: "documentation", type: "array" },
      { name: "correctAnswer", type: "array" },
      { name: "tipInfo", type: "text/plain" },
      { name: "imgUrl", type: "text/plain" },
    ];

    return res.status(200).json(sendTestParams);
  }

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

    //valida o conteudo do body
    if (!activityID) {
      return res.status(400).json({ message: "Invalid activity ID." });
    }
    if (!inveniraStdID) {
      return res.status(400).json({ message: "Invalid student ID." });
    }
    if (!json_params) {
      return res.status(400).json({ message: "Invalid json_params." });
    }

    //inserir dados do json params na bd para mais tarde o frontend utilizar estes dados

    res.status(200).json({ deployURL: `https://api-aps-jade.vercel.app/activity/${activityID}/${inveniraStdID}` });
  }
}

module.exports = new Activity();
