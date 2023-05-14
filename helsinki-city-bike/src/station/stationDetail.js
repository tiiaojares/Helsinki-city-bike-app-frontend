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
    const idStation = Number(params.id);
    let idJourney = idStation;
    if (idStation < 10) {
        idJourney = "00" + idStation;
    } else if ( idStation < 100) {
        idJourney = "0" + idStation;
    }


    const navigate = useNavigate();

    useEffect(() => {
        const request1 = axios.get('/api/stations/'+idStation)
            .then(response1 => {
                setSelectedStation(response1.data)
                console.log("selected: ", response1)
            });


        const request2 = axios.get('/api/journeys/departure/'+idJourney)
            .then(response2 => {
                if (response2.data.length === 0) {
                    setJourneysDepartureId(null);
                } else {
                    setJourneysDepartureId(response2.data)
                    console.log("departure: ", response2.data.length)
                }
            });

        const request3 = axios.get('/api/journeys/return/'+idJourney)
            .then(response3 => {
                if (response3.data.length === 0) {
                    setJourneysReturnId(null)
                } else {
                    setJourneysReturnId(response3.data)
                    console.log("return: ", response3.data.length)
                }
            });

      }, []);

    function numberOfJourneys(journeys) {
        if (journeys) {
            if(journeys.length > 0) {
            return journeys.length
            }
    } else if (journeys === null) {
        return (
            <div> 0 </div>
        )
    }

    }
    

    function showName() {
        if (selectedStation) {
            return selectedStation[0].Nimi
        }
    };

    function showAddress() {
        if (selectedStation) {
            return selectedStation[0].Osoite
        }
    };

    function showKapasiteet()  {
        if (selectedStation) {
            return selectedStation[0].Kapasiteet
        }
    };


    function findLongestTrip(journeys) {
        if(journeys) {
            const distances = journeys.map(j => j.distance);
            const maxValue = (Math.max(...distances)/1000).toFixed(1);  
            if (maxValue === "-Infinity") {
                return (
                    <div>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/>
                        <span className="loadingText">Loading...</span>
                    </div>
                )
            } else {
            return maxValue;
            }
        }
    }

    function findShortestTrip(journeys) {
        if(journeys) {
            const distances = journeys.map(j => j.distance);
            const minValue = Math.min(...distances);
            if (minValue === Infinity) {
                return (
                    <div>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/>
                        <span className="loadingText">Loading...</span>
                    </div>
                )
            } else {
                return minValue
            }
        }
    }
    

    function findLongestTripMin(journeys) {
        if(journeys) {
            const durations = journeys.map(j => j.duration);
            const maxValue = (Math.max(...durations)/120).toFixed(0);
            if (maxValue === "-Infinity") {
                return (
                    <div>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/>
                        <span className="loadingText">Loading...</span>
                    </div>
                )
            } else {
                return maxValue;
            }
        }
    }

    function findShortestTripMin(journeys) {
        if(journeys) {
            const durations = journeys.map(j => j.duration);
            const minValue = (Math.min(...durations)/60).toFixed(1);
            if( minValue === "Infinity") {
                return (
                    <div>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/>
                        <span className="loadingText"> Loading...</span>
                    </div>
                )
                
            } else {
                return minValue;
            }
        }
    }

    function calculateAverageDistance(journeys) {
        if(journeys) {
            const distances = journeys.map(j => j.distance/1000);
            const sum = distances.reduce((total, current) => total + current, 0);
            const lkm = distances.length
            const average = (sum / lkm ).toFixed(1);
            if (average === "NaN") {
                return (
                    <div>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/>
                        <span className="loadingText"> Loading...</span>
                    </div>
                )
            } else {
                return average;
            }
        } 
    }

    function topFiveReturnStations() {
        if (journeysDepartureId) {
            const returnStationsNames = journeysDepartureId.map(j => j.return_name);
            const stationList = new Map();

            for (const station of returnStationsNames) {
                if (!stationList.has(station)) {
                    stationList.set(station, 1);
                } else {
                    const count = stationList.get(station);
                    stationList.set(station, (count + 1));
                }
            }
            const number = stationList.size;
            console.log("Return stations number: ", number);

            const sortedList = Array.from(stationList).sort((a, b) => b[1] - a[1])
            const topFive = sortedList.slice(0, 5).map(journey => <tr><td>{journey[0]}</td> <td>{journey[1]}</td></tr>)
            console.log(topFive)

            return topFive;
        }
    }
    


    return ( 
        <div>
            
            <div className="row">
                <div className="col-sm-6">
                    <img className="journeyPicture" src="https://cdn.pixabay.com/photo/2014/12/02/03/16/winding-road-553481__340.jpg" />
                </div>
                <div className="col-sm-6">
                    <h2> {showName()} </h2>
                    <table className="table table-sm table-borderless stationDetail">
                        <tbody>
                            <tr>
                                <th scope="col"> ID </th>
                                <td> { idStation } </td>
                            </tr>
                            <tr>
                                <th scope="col"> Osoite </th>
                                <td> {showAddress()} </td>
                            </tr>
                            <tr>
                                <th scope="col"> Kapasiteetti </th>
                                <td> {showKapasiteet()} </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
                

            <div className="row">
                <div className="col-sm-6 departureStationDetail">
                <table className="table table-sm table-borderless">
                    <tbody className="journeyDetailTable">
                        <tr>
                            <th className="headerRow" scope="col"> Asemalta lähdettyjen matkojen määrä: </th>
                            <td className="headerRow" > {numberOfJourneys(journeysDepartureId)} </td> 
                        </tr>
                        <tr>
                            <td > Lyhyin matka (m): </td>
                            <td> {findShortestTrip(journeysDepartureId)} </td>
                        </tr>
                        <tr>
                            <td > Pisin matka (km): </td>
                            <td> {findLongestTrip(journeysDepartureId)} </td>
                        </tr>
                        <tr>
                            <td > Tehtyjen matkojen keskiarvo (km): </td>
                            <td> {calculateAverageDistance(journeysDepartureId)} </td>
                        </tr>
                        <tr>
                            <td > Nopein matka (min): </td>
                            <td> {findShortestTripMin(journeysDepartureId)} </td>
                        </tr>
                       
                        <tr>
                            <td > Pisin matka (h): </td>
                            <td> {findLongestTripMin(journeysDepartureId)} </td>
                        </tr>
                        <tr><th> Viisi yleisintä määränpäätä: </th></tr>
                        {topFiveReturnStations()}

                    </tbody>
                </table>
                
            </div>

            <div className="col-sm-6">  
                <table className="table table-sm table-borderless">
                    <tbody className="journeyDetailTable">

                        <tr>
                            <th className="headerRow" scope="col"> Asemalle palattujen matkojen määrä: </th>
                            <td className="headerRow" > {numberOfJourneys(journeysReturnId)} </td>
                        </tr>
                        <tr>
                            <td > Lyhyin matka (m): </td>
                            <td> {findShortestTrip(journeysReturnId)} </td>
                        </tr>
                        <tr>
                            <td > Pisin matka (km): </td>
                            <td> {findLongestTrip(journeysReturnId)} </td>
                        </tr>
                        <tr>
                            <td > Tehtyjen matkojen keskiarvo (km): </td>
                            <td> {calculateAverageDistance(journeysReturnId)} </td>
                        </tr>
                        <tr>
                            <td > Nopein matka (min): </td>
                            <td> {findShortestTripMin(journeysReturnId)} </td>
                        </tr>
                        
                        <tr>
                            <td > Pisin matka (h): </td>
                            <td> {findLongestTripMin(journeysReturnId)} </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            </div>
            <nav className="navbar fixed-bottom navbar-dark bg-dark">
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