
import { Routes, Route } from 'react-router-dom';
import { StationsView } from '../station/stationsView';
import { JourneysView } from '../journeys/journeysView';
import { StationDetail } from '../station/stationDetail';
import { CardComponent } from '../cards/card';
import { FindJourneys } from '../journeys/findJourneys';
import { NewJourney } from '../journeys/newJourney';
import { NewStation } from '../station/newStation';
import '../App.css';
import notebook from '../images/notebook.jpg';
import road from '../images/road.jpg';
import station from '../images/station.jpg';



const MainPage = () => {

    return (
        <div className="row cardRow">
        <CardComponent 
            picture={station} 
            text={"Kaupunkipyöräasemat"} 
            navigateTo={"/stations"} />        
        <CardComponent 
            picture={road} 
            text={"Matkat"} 
            navigateTo={"/journeys"} />
        <CardComponent 
            picture={notebook} 
            text={"Luo uusi"} 
            navigateTo={"/journeys"} 
            createNew={true}            
            />

      </div>
    )
}

const Main = () => {
    return (
        <main>
            <Routes>
                <Route path="/" element={ < MainPage /> } />
                <Route path="/stations" element={ < StationsView /> } />
                <Route path="/journeys" element={ < JourneysView /> } />
                <Route path="/stations/:id" element={ <StationDetail /> } />
                <Route path ="/journeys/find" element={<FindJourneys />}/>
                <Route path="/newJourney" element={ <NewJourney />} />
                <Route path="/newStation" element={ <NewStation />} />
            </Routes>
        </main>
    )
}

export {  Main, MainPage }