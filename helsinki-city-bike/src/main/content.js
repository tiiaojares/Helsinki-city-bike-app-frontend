
import { Link, Routes, Route } from 'react-router-dom';
import { MainPage } from './MainPage';
import { StationsView } from '../station/stationsView';
import { JourneysView } from '../journeys/journeysView';

const Navigation = () => {
    return (
        <nav>
            <Link to="/" />
            <Link to="/stations" />
            <Link to="journeys" />
        </nav>
    )
}

const Main = () => {
    return (
        <main>
            <Routes>
                <Route path="/" element={ < MainPage /> } />
                <Route path="/stations" element={ < StationsView /> } />
                <Route path="/journeys" element={ < JourneysView /> } />
            </Routes>
        </main>
    )
}

export { Navigation, Main }