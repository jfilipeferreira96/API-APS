import { useEffect } from "react"
import { useParams } from "react-router-dom"

// nested routes

export default function Activity() {
  let { activityID, inveniraStdID } = useParams();
  console.log(activityID, inveniraStdID )
  useEffect(() => {
    
  }, [])

  return (
    <div className="content">
      <h2>Ativity { activityID }</h2>

  
    </div>
  )
}
