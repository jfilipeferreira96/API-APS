const DB = require("../config/database");
const { Subject, ConsoleObserver, InsertStudentObserver } = require("./Observer");

class StudentActionsController {
  async ActivityPageParams(req, res) {
    const { activityID, inveniraStdID } = req.params;
    let response = { status: "Failed" };

    if (!activityID) {
      return res.status(400).json({ message: "Invalid activity ID." });
    }
    if (!inveniraStdID) {
      return res.status(400).json({ message: "Invalid student ID." });
    }

    //extra validaçao para verificar se este aluno já fez a atividade!
    const checkStudent = await DB.Query(`SELECT * FROM student_analytics WHERE activityID = ${activityID} AND stdID = ${inveniraStdID}`);
    if (checkStudent.length > 0) {
      const id = checkStudent[0].id;
      const numOfSubmits = checkStudent[0].numOfSubmits;

      if (numOfSubmits == null) {
        const deleteEntry = await DB.Query(`DELETE FROM student_analytics WHERE id=${id}`);
      } else {
        response = { status: "AlreadySubmited" };
        return res.json(response);
      }
    }

    const params = await DB.Query(`SELECT * FROM page_params WHERE activityID = ${activityID}`);
    if (params.length > 0) {
      response = { status: "Success", params: params };

      let subject = new Subject();
      subject.addActivity(activityID, inveniraStdID);

      let consoleObserver = new ConsoleObserver("Observer 1");
      let insertRowDb = new InsertStudentObserver("Observer 2");

      subject.addObserver(consoleObserver);
      subject.addObserver(insertRowDb);

      console.log("Subject class looks like:", subject);

      subject.notifyAllObservers();
    }

    return res.json(response);
  }

  async SaveAnalytics(req, res) {
    const { activityID, inveniraStdID } = req.params;
    const { analytics } = req.body;
    let response = { status: "Failed" };

    if (!activityID) {
      return res.status(400).json({ message: "Invalid activity ID." });
    }
    if (!inveniraStdID) {
      return res.status(400).json({ message: "Invalid student ID." });
    }

    console.log(analytics);

    return res.json({ message: "tudo ok" });
  }
}

module.exports = new StudentActionsController();
