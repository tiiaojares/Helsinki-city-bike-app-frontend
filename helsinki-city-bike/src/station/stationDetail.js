import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './station.css'



const StationDetail = () => {
    const [journeysDepartureId, setJourneysDepartureId] = useState([]);
    const [journeysReturnId, setJourneysReturnId] = useState([]);
    const [selectedStation, setSelectedStation] = useState(null);

    const params = useParams();
    const id = params.id;

    const navigate = useNavigate();

    useEffect(() => {
        const request1 = axios.get('/api/stations/'+id)
            .then(response1 => {
                setSelectedStation(response1.data)
                console.log("selected: ", response1)
            });


        const request2 = axios.get('/api/journeys/departure/'+id)
            .then(response2 => {
                setJourneysDepartureId(response2.data)
                console.log("departure: ", response2.data.length)
            });
        const request3 = axios.get('/api/journeys/return/'+id)
            .then(response3 => {
                setJourneysReturnId(response3.data)
                console.log("return: ", response3.data.length)
            });

      }, []);

    const name = () => {
        if (selectedStation) {
            return selectedStation[0].Nimi
        }
    };

    const address = () => {
        if (selectedStation) {
            return selectedStation[0].Osoite
        }
    };

    const kapasiteet = () => {
        if (selectedStation) {
            return selectedStation[0].Kapasiteet
        }
    };


    function longestTrip(journeys) {
        if(journeys) {
            const distances = journeys.map(j => j.distance);
            const maxValue = (Math.max(...distances)/1000).toFixed(1);  
            console.log(maxValue)
            return maxValue;
        }
    }

    function shortestTrip(journeys) {
        if(journeys) {
            const distances = journeys.map(j => j.distance);
            const minValue = Math.min(...distances);
            console.log("shortestTrip: ", minValue)
            return minValue
        }
    }
    

    function longestTripMin(journeys) {
        if(journeys) {
            const durations = journeys.map(j => j.duration);
            const maxValue = (Math.max(...durations)/120).toFixed(0);
            return maxValue;
        }
        
    }
    function shortestTripMin(journeys) {
        if(journeys) {
            const durations = journeys.map(j => j.duration);
            const minValue = (Math.min(...durations)/60).toFixed(1);
            return minValue;
        }
    }


    return ( 
        <div>
            <h2> {name()} </h2>
                <table className="table stationDetail">
                    <tr>
                        <th scope="col"> ID </th>
                        <td> { id } </td>
                    </tr>
                    <tr>
                        <th scope="col"> Osoite </th>
                        <td> {address()} </td>
                    </tr>
                    <tr>
                        <th scope="col"> Kapasiteetti </th>
                        <td> {kapasiteet()} </td>
                    </tr>
                </table>

            <div className="row">
                <div className="col-sm-5">
                <img className="journeyPicture" src="https://cdn.pixabay.com/photo/2014/12/02/03/16/winding-road-553481__340.jpg" />
                </div>

                <div className="col-sm-7">  

                <table className="table journeyDetail">
                    <tr>
                        <th scope="col"> Asemalta lähdettyjen matkojen määrä: </th>
                        <td> {journeysDepartureId.length} </td>
                    </tr>
                    <tr>
                        <td > Lyhyin matka (m): </td>
                        <td> {shortestTrip(journeysDepartureId)} </td>
                    </tr>
                    <tr>
                        <td > Nopein matka (min): </td>
                        <td> {shortestTripMin(journeysDepartureId)} </td>
                    </tr>
                    <tr>
                        <td > Pisin matka (km): </td>
                        <td> {longestTrip(journeysDepartureId)} </td>
                    </tr>
                    <tr>
                        <td > Pisin matka (h): </td>
                        <td> {longestTripMin(journeysDepartureId)} </td>
                    </tr>
                </table>

                <table className="table journeyDetail">
                    <tr>
                        <th scope="col"> Asemalle palattujen matkojen määrä: </th>
                        <td> {journeysReturnId.length} </td>
                    </tr>
                    <tr>
                        <td > Lyhyin matka (m): </td>
                        <td> {shortestTrip(journeysReturnId)} </td>
                    </tr>
                    <tr>
                        <td > Nopein matka (min): </td>
                        <td> {shortestTripMin(journeysReturnId)} </td>
                    </tr>
                    <tr>
                        <td > Pisin matka (km): </td>
                        <td> {longestTrip(journeysReturnId)} </td>
                    </tr>
                    <tr>
                        <td > Pisin matka (h): </td>
                        <td> {longestTripMin(journeysReturnId)} </td>
                    </tr>
                </table>
                </div>
            </div>
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

export { StationDetail }