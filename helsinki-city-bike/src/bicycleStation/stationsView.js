import { useState, useEffect } from 'react';
import stationService from '../services/stations';
import './station.css'
import { FilterComponent } from './filterComponent';


const StationsTable = ({stations, 
    idFilterInput,
    nameFilterInput,
    addressFilterInput,
    kapasiteetFilterInput,
    setStationsFoundNumber}) => {
    
    const maxStationsToShow = 15;
    console.log("stations lenght:", stations.length)

    const foundStations = stations
        .filter(s => s.ID.toString().startsWith(idFilterInput))
        .filter(s => s.Nimi.toLowerCase().startsWith(nameFilterInput.toLowerCase()))
        .filter(s => s.Osoite.toLowerCase().startsWith(addressFilterInput.toLowerCase()))
        .filter(s => s.Kapasiteet.toString().startsWith(kapasiteetFilterInput))
    
    useEffect(() => {
        setStationsFoundNumber(foundStations.length);
    }, [foundStations.length, setStationsFoundNumber])
    

    const stationsToShow = foundStations.slice(0, maxStationsToShow);
    console.log("found stations: ", foundStations.length)

    return (
        stationsToShow.map(s =>
        <tr key={s.ID}>
            <td> {s.ID} </td> 
            <td> {s.Nimi} </td> 
            <td> {s.Osoite} </td> 
            <td> {s.Kapasiteet} </td>
        </tr>
        )
    )
}

const StationsView = () => {
    const [stations, setStations] = useState([]);
    const [idFilterInput, setIdFilterInput] = useState("");
    const [nameFilterInput, setNameFilterInput] = useState("");
    const [addressFilterInput, setAddressFilterInput] = useState("");
    const [kapasiteetFilterInput, setKapasiteetFilterInput] = useState("");
    const [stationsFindNumber, setStationsFoundNumber] = useState("");

    //get stations from the backend
    useEffect(() => {
      stationService
        .getAll()
        .then(response => {
          setStations(response);
        })
    }, []);

    return (
        <div> 
            <FilterComponent 
                idFilterInput={idFilterInput}
                setIdFilterInput={setIdFilterInput}
                nameFilterInput={nameFilterInput}
                setNameFilterInput={setNameFilterInput}
                addressFilterInput={addressFilterInput}
                setAddressFilterInput={setAddressFilterInput}
                kapasiteetFilterInput={kapasiteetFilterInput}
                setKapasiteetFilterInput={setKapasiteetFilterInput}
                stationsFindNumber={stationsFindNumber}

            />
            <span className="infoForMobileUser"> Hakutuloksilla löytyy {stationsFindNumber} asemaa </span>
            {stationsFindNumber > 15 &&
            <div className="listInfoText">
                Asemat 1-15 / {stationsFindNumber}
            </div>
            }
            
            {stations &&
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col"> ID </th> 
                            <th scope="col"> Nimi </th> 
                            <th scope="col">  Osoite </th> 

                            <th scope="col"> Kapasiteetti </th> 
                        </tr>
                        </thead>
                        <tbody>
                            <StationsTable 
                                stations={stations}
                                idFilterInput={idFilterInput}
                                nameFilterInput={nameFilterInput}
                                addressFilterInput={addressFilterInput}
                                kapasiteetFilterInput={kapasiteetFilterInput}
                                setStationsFoundNumber={setStationsFoundNumber}
                                />
                        </tbody>
                    </table>
                </div>
            }
            
        </div>
    )

}

export { StationsView }