import { useNavigate } from 'react-router-dom';
import { SelectStation } from './selectStation'
import { useState, useEffect } from 'react';
import journeyService from '../services/journeys';
import './journeys.css'
import { ArrowNext, ArrowPrevious, ArrowUp, ArrowDown } from '../images/arrows';

const JourneyData = ({selectedDepartureStation, selectedReturnStation}) => {
    const [foundJourneys, setFoundJourneys] = useState(null);
    const [sortType, setSortType] = useState("")
    const [sortTypeUpward, setSortTypeUpward] = useState(true);
    const [maxIndexToShow, setMaxIndexToShow] = useState(15);
    const [minIndexToShow, setMinIndexToShow] = useState(1);

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

    const from = minIndexToShow - 1;
    const to = maxIndexToShow - 1;

    function showJourneys() {
        if(foundJourneys) {
            const journeysToShow = foundJourneys.slice(from, to)
            const tableData = journeysToShow.map( j => 
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
        } else {
            setSortTypeUpward(true);
            setSortType(type);
        }
    }

    
    function next() {
        if (maxIndexToShow + 15 > foundJourneys.length){
            setMinIndexToShow(minIndexToShow + 15)
            setMaxIndexToShow(foundJourneys.length);
        } else {
            setMinIndexToShow(minIndexToShow + 15)
            setMaxIndexToShow(maxIndexToShow + 15)
        }
    }

    function previous() {
        if (maxIndexToShow - minIndexToShow < 15){
            setMaxIndexToShow(minIndexToShow - 1);
            setMinIndexToShow(minIndexToShow-15)
        } else if(minIndexToShow - 15 <= 0) {
            setMinIndexToShow(1);
            setMaxIndexToShow(15);    
        } else {
            setMinIndexToShow(minIndexToShow - 15);
            setMaxIndexToShow(maxIndexToShow - 15);  
        }
    }

    if(foundJourneys) {
        if (foundJourneys.length === 0) {
            return <div> Lähtö- ja paluuaseman välillä ei tehtyjä matkoja</div>
        } else {
            return (
            <div>
                {foundJourneys.length <= 15 && <span> Matkoja löytyi: {foundJourneys.length}</span>}
                {foundJourneys.length > 15 &&
                    <div aria-label="Page navigation example">
                        { maxIndexToShow > 15 && <span className="arrow" onClick={() => previous()}> <ArrowPrevious /> </span> }
                        <span className="stationPagination"> Matkat {minIndexToShow}-{maxIndexToShow} / {foundJourneys.length}</span>
                        { maxIndexToShow < foundJourneys.length && <span className="arrow" onClick={() => next()}> <ArrowNext /> </span> }
                    </div>
                }


                <div className="table-responsive tableView"> 
                    <table className="table">
                        <thead>
                            <tr>
                                <th 
                                className={sortType === "distance" ? "selectedUpward" : "sort"} 
                                onClick={() => changeSortType("distance")}> 
                                    Matkan pituus (km) 
                                    { sortType === "distance" && sortTypeUpward === false && <ArrowDown /> }
                                    { sortType === "distance" && sortTypeUpward === true && <ArrowUp /> }
                                </th>

                                <th 
                                className={sortType === "duration" ? "selectedUpward" : "sort"} 
                                onClick={() => changeSortType("duration")}>
                                    Matkan kesto (min) 
                                    { sortType === "duration" && sortTypeUpward === false && <ArrowDown /> }
                                    { sortType === "duration" && sortTypeUpward === true && <ArrowUp /> }
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {showJourneys()}
                        </tbody>
                    </table>
                </div>
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
        {selectedDepartureStation && selectedReturnStation ? 
        <div className="headerSection">
            <h2> 
                { selectedDepartureStation.Nimi } - { selectedReturnStation.Nimi } 
            </h2> 
            <button 
                className="btn btn-dark btn-sm newSearchButton"
                onClick={() => refresh()}> 
                Uusi haku
            </button>
        
        </div>: 
        <h2> Hae matkoja: </h2>}

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