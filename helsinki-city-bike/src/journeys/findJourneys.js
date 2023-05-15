import { useNavigate } from 'react-router-dom';
import { SelectStation } from './selectStation'
import { useState, useEffect } from 'react';
import journeyService from '../services/journeys';
import './journeys.css'

const JourneyData = ({selectedDepartureStation, selectedReturnStation}) => {
    const [foundJourneys, setFoundJourneys] = useState(null);
    const [sortType, setSortType] = useState("")
    const [sortTypeUpward, setSortTypeUpward] = useState(true);

    useEffect(() => {
        journeyService
            .getJourneysDepartureAndReturnStation(selectedDepartureStation.Nimi, selectedReturnStation.Nimi)
            .then(response => {
                setFoundJourneys(response)
                console.log("found journeys: ", response.length)
            })
    }, []);


    if (sortType === "distance" ) {
        if (sortTypeUpward === true) {
            foundJourneys.sort((a, b) => a.distance - b.distance)
        } else {
            foundJourneys.sort((a, b) => b.distance - a.distance)
        }
    } else if (sortType === "duration") {
        if (sortTypeUpward === true) {
            foundJourneys.sort((a, b) => a.duration - b.duration)
        } else {
            foundJourneys.sort((a, b) => b.duration - a.duration)
        }
    }

    function showJourneys() {
        if(foundJourneys) {
            const tableData = foundJourneys.map( j => 
                <tr key={j._id}>
                    <td> {j.distance / 1000} </td>
                    <td> {(j.duration / 60).toFixed(1)} </td>
                </tr>)
         
            
            return tableData;
        }
    }

    function changeSortType(type) {
        if (sortType === type) {
            setSortTypeUpward(!sortTypeUpward);
            console.log("sort type: ", type)
        } else {
            setSortTypeUpward(true);
            setSortType(type);
            console.log("sort type: ", type)
        }

    }

    if(foundJourneys) {
        if (foundJourneys.length === 0) {
            return <div> Lähtö- ja paluuaseman välillä ei tehtyjä matkoja</div>
        } else {
            return (
            <div className="table-responsive tableView"> Matkoja: {foundJourneys.length} 
                <table className="table">
                    <thead>
                        <tr>
                            <th onClick={() => changeSortType("distance")}> Matkan pituus (km) </th>
                            <th onClick={() => changeSortType("duration")}> Matkan kesto (min) </th>
                        </tr>
                    </thead>
                    <tbody>
                        {showJourneys()}
                    </tbody>
                </table>
            </div>
            )
        } 
    } else {
        return (
            <div>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/>
                <span className="loadingText">Loading...</span>
            </div>
        )
    }
    

}



const FindJourneys = () => {
    const [selectedDepartureStation, setSelectedDepartureStation] = useState("");
    const [selectedReturnStation, setSelectedReturnStation] = useState("");
    

    const navigate = useNavigate();

    const refresh = () => {
        setSelectedDepartureStation("");
        setSelectedReturnStation("");
    }

    

    return (
    <div>
        {selectedDepartureStation && selectedReturnStation ? <h2> { selectedDepartureStation.Nimi } - { selectedReturnStation.Nimi } </h2> : <h2> Hae matkoja: </h2>}
        <div className="picture">
            <img className="journeysViewPicture" src="https://cdn.pixabay.com/photo/2014/12/02/03/16/winding-road-553481__340.jpg" />
        </div>

        <div className="container findJourneyComponent"> 

                    <div>
                        
                        {!selectedDepartureStation ?
                            <div>
                                <h4> Lähtöasema: </h4>
                                <SelectStation 
                                    stationType="departure"
                                    setSelectedDepartureStation={setSelectedDepartureStation}
                                />
                            </div> :
                            <div>
                                {!selectedReturnStation &&
                                    <div>
                                    <h5> Lähtöasema: </h5>
                                    <p> { selectedDepartureStation.Nimi } </p>
                                    
                                
                                        <h4> Paluuasema: </h4>   
                                        <SelectStation 
                                        stationType="return"
                                        setSelectedReturnStation={setSelectedReturnStation}/>
                                    </div>
                                }
                            </div>
                        }
                    </div>

                    <div> 
                        
                    
                    {selectedDepartureStation && selectedReturnStation ?
                        <div>
                            <JourneyData
                            selectedDepartureStation={selectedDepartureStation}
                            selectedReturnStation={selectedReturnStation} 
                            />
                            <div >
                                <button 
                            className="btn btn-dark btn-sm newSearchButton"
                            onClick={() => refresh()}> 
                            Uusi haku
                            </button>
                            </div>
                        </div> :
                        <div/>
                    }   
                    </div>
  
        </div>

        <nav className="navbar fixed-bottom navbar-dark bg-dark">
            <div className="container"> 
                <a 
                className="navbar-brand bottom"
                onClick={() => navigate('/journeys')}>
                Takaisin
                </a>
            </div>
        </nav>
    </div>
    )
}

export { FindJourneys }