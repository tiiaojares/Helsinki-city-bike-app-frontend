import { useState, useEffect } from 'react';
import stationService from '../services/stations';
import './station.css'
import { FilterComponent } from './filterComponent';
import { useNavigate } from 'react-router-dom';
import { ArrowNext, ArrowPrevious } from '../images/arrows';


const StationsTable = ({
    stations, 
    idFilterInput,
    nameFilterInput,
    addressFilterInput,
    kapasiteetFilterInput,
    setStationsFoundNumber,
    minIndexToShow,
    maxIndexToShow
    }) => {
    

    const foundStations = stations
        .filter(s => s.ID.toString().startsWith(idFilterInput))
        .filter(s => s.Nimi.toLowerCase().startsWith(nameFilterInput.toLowerCase()))
        .filter(s => s.Osoite.toLowerCase().startsWith(addressFilterInput.toLowerCase()))
        .filter(s => s.Kapasiteet.toString().startsWith(kapasiteetFilterInput))
    
    useEffect(() => {
        setStationsFoundNumber(foundStations.length);
    }, [foundStations.length, setStationsFoundNumber])
    
    const from = minIndexToShow - 1;
    const to = maxIndexToShow - 1;

    const stationsToShow = foundStations.slice(from, to);
    console.log("show stations index ", from, "-", to)


    const navigate = useNavigate();

    const selectStation = (station) => {
        const id = station.ID
        navigate("/stations/"+id)
    }

    return (
        stationsToShow.map(s =>
        <tr key={s.ID} 
            onClick={() => selectStation(s)}
            className="stationRow">
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
    const [maxIndexToShow, setMaxIndexToShow] = useState(15);
    const [minIndexToShow, setMinIndexToShow] = useState(1);

    //get stations from the backend
    useEffect(() => {
      stationService
        .getAll()
        .then(response => {
          setStations(response);
        })
    }, []);

    const navigate = useNavigate();

    function next() {
        if (maxIndexToShow + 15 > stations.length){
            setMinIndexToShow(minIndexToShow + 15)
            setMaxIndexToShow(stations.length);
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
            
            {stationsFindNumber > 15 &&
            <div aria-label="Page navigation example">
                
                 { maxIndexToShow > 15 && <span className="arrow" onClick={() => previous()}> <ArrowPrevious /> </span> }
                <span className="stationPagination">Asemat {minIndexToShow}-{maxIndexToShow} / {stationsFindNumber}</span>
                { maxIndexToShow < stations.length && <span className="arrow" onClick={() => next()}> <ArrowNext /> </span> }
            </div>
            }
            
            {stations &&
                <div className="table-responsive tableView">
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
                                maxIndexToShow={maxIndexToShow}
                                minIndexToShow={minIndexToShow}
                                />
                        </tbody>
                    </table>
                </div>
            }
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

export { StationsView }