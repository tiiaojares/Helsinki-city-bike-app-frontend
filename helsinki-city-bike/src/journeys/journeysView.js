import { useState, useEffect } from 'react';
import journeysService from '../services/journeys';
import { useNavigate } from 'react-router-dom';


const JourneyTable = ({journeys}) => {

  const maxJourneysToShow = 15;

  const journeysToShow = journeys.slice(0, maxJourneysToShow);

  return (
    journeysToShow.map(j => 

       <tr key={j._id}>
            <td> {j.departure_name} </td> 
            <td> {j.return_name} </td> 
            <td> {j.distance / 1000} </td> 
            <td> {(j.duration / 60).toFixed(1)} </td>
        </tr>)
  )
}

const JourneysView = () => {
    const [journeys, setJourneys] = useState([]);
    
     //get journeys from the backend
     useEffect(() => {
        journeysService
          .getAll()
          .then(response => {
            setJourneys(response);
          })
      }, []);
    
    const navigate = useNavigate();
    
    return (
        <div>
            {journeys &&
              <div className="table-responsive tableView">
                <table className="table">
                  <thead>
                  <tr>
                      <th scope="col"> Departure station </th> 
                      <th scope="col"> Return station </th> 
                      <th scope="col"> Distance (km) </th> 
                      <th scope="col"> Duration (min) </th> 
                  </tr>
                  </thead>
                  <tbody>
                      <JourneyTable 
                          journeys={journeys}
                      />
                  </tbody>
                </table>
              </div>
            }
          <nav class="navbar fixed-bottom navbar-dark bg-dark">
            <div className="container"> 
              <a 
                className="navbar-brand bottom"
                onClick={() => navigate(-1)}>
                Takaisin
              </a>
            </div>
          </nav>
        </div>
    )
}

export { JourneysView }