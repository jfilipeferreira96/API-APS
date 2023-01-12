import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ModalComponent from "../components/Modal";
import { useNavigate } from "react-router-dom";

export default function Activity() {
  const navigate = useNavigate();
  const { activityID, inveniraStdID } = useParams();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [params, setParams] = useState({
    title: "",
    summary: "",
    documentation: [],
    correctAnswer: "",
    tipInfo: "",
    imgUrl: ""
  });

  const [analytics, setAnalytics] = useState({
    inveniraStdID: inveniraStdID,
    numOfSubmits: 0,
    wasInformationClicked: false,
    answer: ""
  });


  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const fetchParams = async (activityID, inveniraStdID) => {
    try {
      const paramsData = await fetch('https://dummyjson.com/products/1');
      const response = await paramsData.json();

      if (response)
      {
        console.log(response)
        setParams({
          title: "",
          summary: "",
          documentation: [],
          correctAnswer: "",
          tipInfo: "",
          imgUrl: ""
        })
      } else {
        navigate('/404')
      }

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
   
    if (activityID && inveniraStdID){
       fetchParams();
    }
    
  }, []);

/*    { name: "title", type: "text/plain" },
      { name: "summary", type: "text/plain" },
      { name: "documentation", type: "array" },
      { name: "correctAnswer", type: "array" },
      { name: "tipInfo", type: "text/plain" },
      { name: "imgUrl", type: "text/plain" }, */
  
/*        { numOfResets: "numOfResets", value: 0 },
          { name: "numOfSubmits", value: 1 },
          { name: "wasInformationClicked", value: false },
          { name: "answer", type: ["color:blue"] }, */

  const handleAnswer = (e) => {
    setAnalytics(prevState => ({...prevState, answer: e.target.value }));
  }

  const handleClear = () => {
    setAnalytics(prevState => ({...prevState, answer:"" }));
  }

  const handleSubmit = () => {
    setAnalytics(prevState => ({ ...prevState, numOfSubmits: analytics.numOfSubmits + 1 }));
    //chama post
  }
  
  return (
    <div className="content">
      <h2>Ativity {activityID}</h2>
      <h3>{ params.title }</h3>
      <p>{params.summary}</p>
      
      {params.img &&
        <img src={params.img} alt="Activity Image" />
      }

      {params.documentation.map((doc) => (
        <p>{doc.url}</p>
      ))}

      <ModalComponent information={params.tipInfo} openModal={openModal} closeModal={closeModal} modalIsOpen={modalIsOpen} />

      <div>
        <textarea  id="answer" name="answer" value={analytics.answer} onChange={handleAnswer}>
        </textarea>
      </div>

      <button className={'button'} style={{background:"#bd6f6f"}} onClick={handleClear}>Clear</button>
      <button className={'button'} onClick={handleSubmit}>Submit</button>
    </div>
  );
}
