import { useState, useEffect } from 'react';
import stationService from '../services/stations';
import './station.css'
import { FilterComponent } from './filterComponent';


const StationsTable = ({stations}) => {
    const maxStationsToShow = 15;

    if (stations.length === 0 ) {
        console.log("stations lenght: 0")
        return null;

    } else if (stations.length < 50 ) {
        console.log("stations lenght: <50")
        return (
            stations.map(s => 
                <div key={s.ID}>
                    <p> { s.Nimi } </p>
                </div>
            )
        )

    } else {
        console.log("stations lenght:", stations.length)
        const stationsToShow = stations.slice(0, maxStationsToShow);

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
}



const Stations = () => {
    const [stations, setStations] = useState([]);

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
            <FilterComponent />
            {stations ?
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
                            <StationsTable stations={stations}/>
                        </tbody>
                    </table>
                </div>
                :
                <div> No data </div>
            }
            
        </div>
    )

}

export { Stations }