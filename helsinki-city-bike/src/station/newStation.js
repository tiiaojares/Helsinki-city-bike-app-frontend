import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './station.css';
import stationService from '../services/stations';



const NewStation = () => {
    const [stations, setStations] = useState([]);
    const [newName, setName] = useState("");
    const [newAddress, setAddress] = useState("");
    const [newCity, setCity] = useState("");
    const [newKapasiteet, setKapasiteet] = useState("");
    const [newId, setId] = useState(0);
    const [saveSelected, changeSaveSelected] = useState(false);
    const [saveSuccess, changeSaveSuccess] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        stationService
            .getAll()
            .then(response => {
                setStations(response);
                getId(response)
        })
    
      }, []);

    function getId(stations) {
        const idList = stations.map(s => s.ID);
        const maxId = Math.max(...idList);
        setId(maxId+1);
      }

    function save() {
        if (!saveSuccess) {
            console.log("klik")
            changeSaveSelected(true);
            if (newName && newAddress && newCity && newKapasiteet) {
                const stationObject = {
                    ID: newId, 
                    Nimi: newName, 
                    Osoite: newAddress, 
                    Kaupunki: newCity, 
                    Kapasiteet: newKapasiteet
                }
                console.log("new station: ", stationObject);
                stationService
                    .createStation(stationObject)
                    .then( response => {
                            changeSaveSuccess(true)
                            setTimeout(() => {
                                changeSaveSuccess(false)
                                changeSaveSelected(false)
                                navigate("/")
                            }, 3000)
                    })
                    
                    .catch(error => {
                        console.log(error.response.data.error)
                    })
            } else {
                console.log("tietoja puuttuu")
            }
        }
    }

    function success() {
        console.log("save success")
        return (
            <div className="succesInfo">
                <p className="successText"> Uusi kaupunkipyöräasema tallennettu! </p>
            </div>
        )
    }


    function checkKapasiteet(event) {
        const input = event;
        const number = parseInt(input) 
        if (number) {
            setKapasiteet(number)
        } else {
            setKapasiteet("");
        }
    }

    return (
        <div>
            <div className={ saveSelected && saveSuccess ? "hide" : "createNewComponent"}> 
                <h2> Luo uusi kaupunkipyöräasema: </h2>
                    <div className="id"> ID: {newId} </div> 
                    <div className={(saveSelected && !newName) ? "alertNotification" : null}> 
                        Nimi: 
                        <input 
                            className="findInput" 
                            type="text" 
                            value={newName} 
                            onChange={(event) => setName(event.target.value) }>
                        </input>
                    </div>
                    <div className={(saveSelected && !newAddress) ? "alertNotification" : null}> 
                        Osoite: 
                        <input 
                            className="findInput" 
                            type="text" 
                            value={newAddress} 
                            onChange={(event) => setAddress(event.target.value) }>
                        </input>
                    </div>
                    <div className={(saveSelected && !newCity) ? "alertNotification" : null}> 
                            Kaupunki: 
                            <input 
                                className="findInput" 
                                type="text" 
                                value={newCity} 
                                onChange={(event) => setCity(event.target.value) }>
                            </input>
                    </div>
                    <div className={(saveSelected && !newKapasiteet) ? "alertNotification" : null}> 
                            Kapasiteetti: 
                            <input 
                                className="findInput" 
                                type="text" 
                                value={newKapasiteet} 
                                onChange={(event) => checkKapasiteet(event.target.value) }>
                            </input>
                    </div>
                    <div className="button">
                    <button 
                        className="btn btn-dark btn-sm createNewStationButton"
                        onClick={() => save()}>
                        Tallenna
                    </button> 
                        </div>
            </div>
            { saveSelected && saveSuccess ? success() : null }
                    
            
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



export { NewStation }