import { useState, useEffect } from 'react';
import stationService from '../services/stations';
import './station.css'
import { FilterComponent } from './filterComponent';
import { useNavigate } from 'react-router-dom';
import { ArrowNext, ArrowPrevious, ArrowDown, ArrowUp } from '../images/arrows';


const StationsTable = ({
    stations, 
    idFilterInput,
    nameFilterInput,
    addressFilterInput,
    kapasiteetFilterInput,
    setStationsFoundNumber,
    minIndexToShow,
    maxIndexToShow,
    sortType,
    sortUpward
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

   //sort list
    if (sortType === "id") {
        if (sortUpward === true) {
            const sortedList = foundStations.sort((a, b) => a.ID - b.ID)
        } else {
            const sortedList = foundStations.sort((a, b) => b.ID - a.ID)
        }
    } else if (sortType === "name") {
        if (sortUpward === true) {
            const sortedList = foundStations.sort((a, b) => a.Nimi.localeCompare(b.Nimi) )
        } else {
            const sortedList = foundStations.sort((a, b) => b.Nimi.localeCompare(a.Nimi) )
        }
    } else if (sortType === "address") {
        if (sortUpward === true) {
            const sortedList = foundStations.sort((a, b) => a.Osoite.localeCompare(b.Osoite))
        } else {
            const sortedList = foundStations.sort((a, b) => b.Osoite.localeCompare(a.Osoite))
        }
    } else if (sortType === "kapasiteet") {
        if (sortUpward === true) {
            const sortedList = foundStations.sort((a, b) => a.Kapasiteet - b.Kapasiteet)
        } else {
            const sortedList = foundStations.sort((a, b) => b.Kapasiteet - a.Kapasiteet)
        }
    }


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
            <td> {s.Nimi } </td> 
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
    const [sortType, setSortType] = useState("name")
    const [sortUpward, changeSortUpward] = useState(true);

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

    function changeSortType(type) {
        if (sortType === type) {
            changeSortUpward(!sortUpward);
        } else {
            changeSortUpward(true);
            setSortType(type);
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
                            <th 
                            className={sortType === "id" ? "selected" : "sort"}  
                            onClick={() => changeSortType("id")}> 
                                ID 
                                { sortType === "id" && sortUpward === false && <ArrowDown /> }
                                { sortType === "id" && sortUpward === true && <ArrowUp /> }
                            </th> 
                            <th 
                            className={sortType === "name" ? "selected" : "sort"} 
                            onClick={() => changeSortType("name")}> 
                                Nimi 
                                { sortType === "name" && sortUpward === false && <ArrowDown /> }
                                { sortType === "name" && sortUpward === true && <ArrowUp /> }
                            </th> 
                            <th 
                            className={sortType === "address" ? "selected" : "sort"} 
                            onClick={() => changeSortType("address")}>  
                                Osoite 
                                { sortType === "address" && sortUpward === false && <ArrowDown /> }
                                { sortType === "address" && sortUpward === true && <ArrowUp /> }
                            </th> 
                            <th 
                            className={sortType === "kapasiteet" ? "selected" : "sort"} 
                            onClick={() => changeSortType("kapasiteet")}> 
                                Kapasiteetti 
                                { sortType === "kapasiteet" && sortUpward === false && <ArrowDown /> }
                                { sortType === "kapasiteet" && sortUpward === true && <ArrowUp /> }
                             </th> 
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
                                sortType={sortType}
                                sortUpward={sortUpward}
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