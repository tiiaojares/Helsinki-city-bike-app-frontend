
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SelectStation } from './selectStation'
import journeyService from '../services/journeys'

const NewJourney = () => {
    const [selectedDepartureStation, setSelectedDepartureStation] = useState();
    const [selectedReturnStation, setSelectedReturnStation] = useState();
    const [newDuration, setDuration] = useState("") ;
    const [newDistance, setDistance] = useState("");
    const [saveSelected, changeSaveSelected] = useState(false);
    const [saveSuccess, changeSaveSuccess] = useState(false);
    const [successFail, changeSuccessFail] = useState("");

    const navigate = useNavigate();

    function getId(id) {
        if (id < 10) {
            return "00" + id;
        } else if (id < 100) {
            return "0" + id
        } else {
            return "" + id;
        }

    }


    function save() {
        if (!saveSuccess) {
            console.log("klik")
            changeSaveSelected(true);
            if (selectedDepartureStation && selectedReturnStation && newDuration && newDistance) {
                const journeyObject = {
                    departure_id: getId(selectedDepartureStation.ID),
                    departure_name: selectedDepartureStation.Nimi,
                    return_id: getId(selectedReturnStation.ID),
                    return_name: selectedReturnStation.Nimi,
                    distance: newDistance,
                    duration: (newDuration * 60),
                }
                console.log("new journey: ", journeyObject);
                journeyService
                    .createJourney(journeyObject)
                    .then( response => {
                        changeSaveSuccess(true)
                        setTimeout(() => {
                            changeSaveSuccess(false)
                            changeSaveSelected(false)
                            navigate("/")
                        }, 3000)
                    })
                    .catch(error => {
                        console.log("error")
                        console.log(error.response.data.error)
                        changeSuccessFail(error.response.data.error)
                        setTimeout(() => {
                            changeSuccessFail("");
                        }, 5000)
                    })
            } else {
                console.log("tietoja puuttuu")
            }
        
        }
    }

    function checkDuration(event) {
        const input = event;
        const number = parseInt(input) 
        if (number) {
            setDuration(number)
        }
        else {
            setDuration("")
        }
    }

    function success() {
        console.log("save success")
        return (
            <div className="succesInfo">
                <p className="successText"> Uusi matka tallennettu! </p>
            </div>
        )
    }

    function fail() {
        return (
            <div className="succesInfo">
                <p className="successText"> Tietojen tallennus epäonnistui:<br/> {successFail}</p>
            </div>
        )
    }



    function checkDistance(event) {
        const input = event;
        const number = parseInt(input) 
        if (number) {
            setDistance(number)
        }
        else {
            setDistance("")
        }
    }


    return (
    <div>
        <div className={ saveSelected && saveSuccess ? "hide" : "createNewComponent"}> 
            <h2> Tallenna uusi matka: </h2>
            <div className="createNewComponent">

                <div className={(saveSelected && !selectedDepartureStation) ? "alertNotification" : null}>
                    Etsi lähtöasema: 
                    <SelectStation 
                        stationType="departure"
                        setSelectedDepartureStation={setSelectedDepartureStation}
                    />
                </div> 
        
                <div className={(saveSelected && !selectedReturnStation) ? "alertNotification" : null}>
                    Etsi paluuasema:
                    <SelectStation 
                        stationType="return"
                        setSelectedReturnStation={setSelectedReturnStation}
                    />
                </div>
                <div className={(saveSelected && (!newDuration)) ? "alertNotification": null}>
                    Matkan kesto minuutteina:
                    <input 
                    className="findInput" 
                    type="text" 
                    value={newDuration} 
                    onChange={ event => checkDuration(event.target.value) } 
                    />
                </div>
                <div className={(saveSelected && (!newDistance)) ? "alertNotification" : null}>
                    Matkan pituus metreinä:
                    <input 
                    className="findInput" 
                    type="text" 
                    value={newDistance} 
                    onChange={ event => checkDistance(event.target.value) } 
                    />
                </div>
                <button 
                    className="btn btn-dark btn-sm createNewStationButton"
                    onClick={() => save()}>
                    Tallenna
                </button> 
                    
            </div>
        </div>
        { saveSelected && saveSuccess ? success() : null }
        { saveSelected && successFail ? fail() : null }

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