
import { Link, Routes, Route } from 'react-router-dom';
import { StationsView } from '../station/stationsView';
import { JourneysView } from '../journeys/journeysView';
import { StationDetail } from '../station/stationDetail';
import { CardComponent } from '../cards/card';
import '../App.css'


const MainPage = () => {

    return (
        <div className="row cardRow">
        <CardComponent 
            pictureUrl={"https://cdn.pixabay.com/photo/2017/08/17/17/44/the-little-yellow-car-2652215_960_720.jpg"} 
            text={"Kaupunkipyöräasemat"} 
            navigateTo={"/stations"} />        
        <CardComponent 
            pictureUrl={"https://cdn.pixabay.com/photo/2014/12/02/03/16/winding-road-553481__340.jpg"} 
            text={"Matkat"} 
            navigateTo={"/journeys"} />
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
            </Routes>
        </main>
    )
}

export {  Main, MainPage }