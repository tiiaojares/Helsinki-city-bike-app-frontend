import { useNavigate } from 'react-router-dom';
import { SelectStation } from './selectStation'
import { useState } from 'react';
import './journeys.css'


const FindJourneys = () => {
    const [selectedDepartureStation, setSelectedDepartureStation] = useState("")
    const [selectedReturnStation, setSelectedReturnStation] = useState("")

    const navigate = useNavigate();

    return (
    <div>
        <h2> Etsi matkoja: </h2>
        <div className="picture">
            <img className="journeysViewPicture" src="https://cdn.pixabay.com/photo/2014/12/02/03/16/winding-road-553481__340.jpg" />
        </div>

        <div className="container findJourneyComponent"> 
            <div className="row">
                    <div className="col-sm-6">
                        
                        {!selectedDepartureStation ?
                        <div>
                            <h4> Etsi lähtöasema: </h4>
                            <SelectStation 
                                stationType="departure"
                                setSelectedDepartureStation={setSelectedDepartureStation}
                            />
                        </div> :
                        <div>
                            <h4> Lähtöasema: </h4>
                            <p> { selectedDepartureStation.Nimi } </p>
                        </div>
                        }
                    </div>

                    <div className="col-sm-6"> 
                        {!selectedReturnStation ?
                        <div>
                            <h4> Etsi paluuasema: </h4>   
                            <SelectStation 
                            stationType="return"
                            setSelectedReturnStation={setSelectedReturnStation}/>
                        </div> :
                        <div>
                            <h4> Paluuasema: </h4>
                            <p> { selectedReturnStation.Nimi } </p> 
                        </div>
                        }
                    </div>
                    {selectedDepartureStation && selectedReturnStation ?
                    <div> hakutulos</div>
                    :
                    <div> ei vielä </div>
                    }
            
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

export { FindJourneys }