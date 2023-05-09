
import { Link, Routes, Route } from 'react-router-dom';
import { MainPage } from './MainPage';
import { StationsView } from '../station/stationsView';
import { JourneysView } from '../journeys/journeysView';
import { StationDetail } from '../station/stationDetail';


const Main = () => {
    return (
        <main>
            <Routes>
                <Route path="/" element={ < MainPage /> } />
                <Route path="/stations" element={ < StationsView /> } />
                <Route path="/journeys" element={ < JourneysView /> } />
                <Route path="/stations/:id" element={ <StationDetail /> } />
            </Routes>
        </main>
    )
}

export {  Main }