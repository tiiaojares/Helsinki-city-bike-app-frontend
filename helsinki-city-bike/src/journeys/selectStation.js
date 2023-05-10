import { useState, useEffect } from 'react';
import stationService from '../services/stations';


const SelectStation = ({
    stationType, 
    setSelectedDepartureStation, 
    setSelectedReturnStation}) => {

    const [stations, setStations] = useState([]);
    const [nameInput, setNameInput] = useState("");

    useEffect(() => {
        stationService
          .getAll()
          .then(response => {
            setStations(response);
          })
      }, []);

    const setStationsName = (event) => {
        setNameInput(event.target.value)
    }

    const foundStations = stations
        .filter(s => s.Nimi.toLowerCase().startsWith(nameInput))

    const selectStation = (station) => {
        console.log("klikattu")
        if (stationType == "departure") {
            setSelectedDepartureStation(station)
            console.log("valittu lähtöasema: ", station.Nimi)
    
        } else if ( stationType == "return") {
            setSelectedReturnStation(station)
            console.log("valittu apuuasema: ", station.Nimi)
        }
    }

    const showStation = foundStations.map( s =>
        <div key={s.ID} 
            onClick={() => selectStation(s)}
            className="stationRow">
            <p> {s.Nimi} </p> 
        </div>
    )
    
    return (<div>
        <input 
            className="findInput" 
            type="text" 
            value={nameInput} 
            onChange={setStationsName} 
        />
        <div>
        {foundStations.length <100 &&
          
            showStation
            
        }
        </div>
    </div>
    )
}

export { SelectStation }