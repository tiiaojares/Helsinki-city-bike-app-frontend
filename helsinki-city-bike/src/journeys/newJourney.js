
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SelectStation } from './selectStation'

const NewJourney = () => {
    const [selectedDepartureStation, setSelectedDepartureStation] = useState("");
    const [selectedReturnStation, setSelectedReturnStation] = useState("");

    const navigate = useNavigate();


    return (
    <div> 
        <h2> Tallenna uusi matka: </h2>
        <div>
            {!selectedDepartureStation ?
                <div>
                    <h4> Etsi lähtöasema: </h4>
                    <SelectStation 
                        stationType="departure"
                        setSelectedDepartureStation={setSelectedDepartureStation}
                    />
                </div> :
                <div>
                    {!selectedReturnStation ?
                        <div>
                        <h5> Lähtöasema: </h5>
                        <p> { selectedDepartureStation.Nimi } </p>
                        
                    
                            <h4> Etsi paluuasema: </h4>   
                            <SelectStation 
                            stationType="return"
                            setSelectedReturnStation={setSelectedReturnStation}/>
                     </div>
                     :
                     <div>
                     <h5> Lähtöasema: </h5> <p> { selectedDepartureStation.Nimi }  </p>
                     <h5> Paluuasema: </h5> <p> { selectedReturnStation.Nimi }  </p> 
                     </div>
                     }
            </div>
            } 
           
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

export { NewJourney }