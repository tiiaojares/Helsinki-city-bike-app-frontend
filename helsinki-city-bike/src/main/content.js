
import { Link, Routes, Route } from 'react-router-dom';
import { MainPage } from './MainPage';
import { Stations } from '../bicycleStation/stations';
import { Journeys } from '../journeys/journeys';

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
                <Route path="/stations" element={ < Stations /> } />
                <Route path="/journeys" element={ < Journeys /> } />
            </Routes>
        </main>
    )
}

export { Navigation, Main }