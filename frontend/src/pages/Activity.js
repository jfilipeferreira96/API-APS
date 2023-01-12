import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ModalComponent from "../components/Modal";
import { useNavigate } from "react-router-dom";

export default function Activity() {
  const navigate = useNavigate();
  const { activityID, inveniraStdID } = useParams();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [analytics, setAnalytics] = useState({
    inveniraStdID: inveniraStdID,
    numOfSubmits: 0,
    wasInformationClicked: false,
    answer: "",
  });
  const [params, setParams] = useState({
    title: "",
    summary: "",
    documentation: "",
    correctAnswer: "",
    tipInfo: "",
    imgUrl: "",
  });

  function openModal() {
    setIsOpen(true);

    if (analytics.wasInformationClicked !== true) {
      setAnalytics((prevState) => ({ ...prevState, wasInformationClicked: !analytics.wasInformationClicked }));
    }
  }

  function closeModal() {
    setIsOpen(false);
  }

  const fetchParams = async (activityID, inveniraStdID) => {
    try {
      const paramsData = await fetch(`http://localhost:5000/params/${activityID}/${inveniraStdID}`);
      const response = await paramsData.json();

      if (response) {
        setParams({
          title: response[0].title,
          summary: response[0].summary,
          documentation: response[0].documentation,
          correctAnswer: response[0].correctAnswer,
          tipInfo: response[0].tipInfo,
          imgUrl: response[0].imgUrl,
        });
      } else {
        navigate("/404");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (activityID && inveniraStdID) {
      fetchParams(activityID, inveniraStdID);
    }
  }, []);

  const handleAnswer = (e) => {
    setAnalytics((prevState) => ({ ...prevState, answer: e.target.value }));
  };

  const handleClear = () => {
    setAnalytics((prevState) => ({ ...prevState, answer: "" }));
  };

  const postAnalytics = async (activityID, inveniraStdID) => {
    try {
      const response = await fetch(`http://localhost:5000/analytics/${activityID}/${inveniraStdID}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          analytics: analytics,
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = () => {
    setAnalytics((prevState) => ({ ...prevState, numOfSubmits: analytics.numOfSubmits + 1 }));

    if (params.correctAnswer === analytics.answer.trim().toLocaleLowerCase()) {
      //chama post
      postAnalytics(activityID, inveniraStdID);
      alert("Sucess your anwser is correct");
      //navigate("/");
    }
  };

  if (params.title === "") {
    return <></>;
  }

  return (
    <div className="content">
      <h2>Ativity {activityID}</h2>
      <h3>Title: {params.title}</h3>
      <p>Summary: {params.summary}</p>

      <img src={params.imgUrl} alt="Activity Image" />

      <p>Documentação:</p>
      <p>{params.documentation}</p>

      <button className={"tipButton"} onClick={openModal}>
        Tip Info
      </button>

      <ModalComponent information={params.tipInfo} closeModal={closeModal} modalIsOpen={modalIsOpen} />

      <div>
        <textarea placeholder={`Correct answer is: ${params.correctAnswer}`} id="answer" name="answer" value={analytics.answer} onChange={handleAnswer}></textarea>
      </div>

      <button className={"button"} style={{ background: "#bd6f6f" }} onClick={handleClear}>
        Clear
      </button>

      <button className={"button"} onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}
