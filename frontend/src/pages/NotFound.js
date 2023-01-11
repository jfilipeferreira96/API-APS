import { useNavigate } from 'react-router-dom';

export default function Products()
{
  const history = useNavigate();

  return (
    <div className="content">
      <h1>Ops, something went wrong</h1>
      	<button className="button" onClick={() => history('/')}>Home</button>	
    </div>
  )
}
