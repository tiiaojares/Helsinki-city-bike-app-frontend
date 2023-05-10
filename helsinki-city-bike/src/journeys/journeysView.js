import { useState, useEffect } from 'react';
import journeysService from '../services/journeys';
import { useNavigate } from 'react-router-dom';
import './journeys.css'

const JourneyTable = ({ journeys }) => {

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
          <h2> Toteutuneet matkat: </h2>
          <div className="picture">
            <img className="journeysViewPicture" src="https://cdn.pixabay.com/photo/2014/12/02/03/16/winding-road-553481__340.jpg" />
          </div>
            {journeys &&
              <div className="table-responsive tableView">
                <table className="table">
                  <thead>
                  <tr>
                      <th scope="col"> Lähtöasema </th> 
                      <th scope="col"> Paluuasema </th> 
                      <th scope="col"> Pituus (km) </th> 
                      <th scope="col"> Kesto (min) </th> 
                  </tr>
                  </thead>
                  <tbody>
                      <JourneyTable journeys={journeys} />
                  </tbody>
                </table>
                <button 
                  className="btn btn-dark btn-sm"
                  onClick={() => navigate("/journeys/find")}> 
                  Tarkennettu haku 
                </button>
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