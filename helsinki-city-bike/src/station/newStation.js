import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './station.css';
import stationService from '../services/stations';
import { SuccessIcon, FailIcon } from '../images/alertSymbols';


const NewStation = () => {
    const [stations, setStations] = useState([]);
    const [newName, setName] = useState(null);
    const [newAddress, setAddress] = useState(null);
    const [newCity, setCity] = useState(null);
    const [newKapasiteet, setKapasiteet] = useState(null);
    const [newId, setId] = useState(0);
    const [success, setSuccess] = useState(false);
    const [fail, setFail] = useState(false);


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
   

    const save = () => {
        if (newName && newAddress && newCity && newKapasiteet) {
            const kapasiteetNumber = parseInt(newKapasiteet);
            if (kapasiteetNumber) {
                const stationObject = {ID: newId, Nimi: newName, Osoite: newAddress, Kaupunki: newCity, Kapasiteet: newKapasiteet}
                console.log("new station: ", stationObject);
                stationService
                    .createStation(stationObject)
                    .then( response => {
                        setName("");
                        setAddress("");
                        setCity("");
                        setKapasiteet("")
                        setSuccess(true);

                        setTimeout( () => {
                            navigate("/")
                        }, 3000)
                    })
                    .catch(error => {
                        setFail(true);
                        console.log(error.response.data.error)
                        setTimeout( () => {
                            setFail(false)
                        }, 4000)
                    })
               
            } else {
                console.log("kapasiteet ei numero")
                setFail(true)
                setFail(true);
                setTimeout( () => {
                    setFail(false)
                }, 4000)
            }
        } else {
            console.log("tieto puuttuu")
            setFail(true);
            setTimeout( () => {
                setFail(false)
            }, 4000)
        }      
    }
    
    if (!success && !fail) {
        return (
        <div>
            <div> 
                <h2> Luo uusi kaupunkipyöräasema: </h2>
                <div className="newStationComponent">
                    <div className="newStationId"> ID: {newId} </div> 
                    <div className="newStationRow"> 
                            Nimi: 
                            <input 
                                className="newStationInput" 
                                type="text" 
                                value={newName} 
                                onChange={(event) => setName(event.target.value) }>
                            </input>
                    </div>
                    <div className="newStationRow"> 
                            Osoite: 
                            <input 
                                className="newStationInput" 
                                type="text" 
                                value={newAddress} 
                                onChange={(event) => setAddress(event.target.value) }>
                            </input>
                    </div>
                    <div className="newStationRow"> 
                            Kaupunki: 
                            <input 
                                className="newStationInput" 
                                type="text" 
                                value={newCity} 
                                onChange={(event) => setCity(event.target.value) }>
                            </input>
                    </div>
                    <div className="newStationRow"> 
                            Kapasiteetti: 
                            <input 
                                className="newStationInput" 
                                type="text" 
                                value={newKapasiteet} 
                                onChange={(event) => setKapasiteet(event.target.value) }>
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

    if (success) {
        return (
            <div className="successInfo">   
                < SuccessIcon />
                <p> Uuden kaupunkipyöräaseman tallennus <u> onnistui! </u></p> 
            </div>
        )
    }

    if (fail) {
        return (
            <div className="successInfo fail">   
                < FailIcon />
                <p> Uuden kaupunkipyöräaseman tallennus <u>epäonnistui!</u></p> 
                <p>Tarkista, että kaikki kentät on täytetty oikein. </p>  
            </div>
        )

    }
}

export { NewStation }