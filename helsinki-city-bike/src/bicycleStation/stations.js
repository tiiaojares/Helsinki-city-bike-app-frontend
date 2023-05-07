import { useState, useEffect } from 'react';
import stationService from '../services/stations';


const ShowStations = ({stations}) => {
    const maxStationsToShow = 15;


    if (stations.length === 0 ) {
        console.log("stations lenght: 0")
        return <div>no matches</div>;
    } else if (stations.length < 50 ) {
        console.log("stations lenght: <50")
        return stations.map(s => {
            <div
            key={s.ID}>
                <p> { s.Nimi } </p>
            </div>
        })
    } else {
        console.log("stations lenght:", stations.length)
        const stationsToShow = stations.slice(0, maxStationsToShow);
        console.log("stationToShow: ", stationsToShow)
        console.log("ensimmäinen station:", stationsToShow[0].Nimi)

        return (
            stationsToShow.map(s =>
            <div
            key={s.ID}>
                <p> { s.Nimi } </p>
            </div>
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
            Stations:
            <ShowStations stations={stations}/>
        </div>
    )

}

export { Stations }