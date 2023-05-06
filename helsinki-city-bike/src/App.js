import React from 'react';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import './App.css';
import  { Logo }  from './images/logo';
import { FilterComponent } from './bicycleStation/filterComponent';
import { CardComponent } from './cards/card';


const App = () => {
  const [stations, setStations] = useState([]);
  const [filterInput, setFilterInput] = useState("");


  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a> 
          < Logo />
          Helsinki city bike -application
        </a>
      </div>
    </nav>
    <div className="container">
      <div className="row" >
        <CardComponent pictureUrl={"https://cdn.pixabay.com/photo/2017/08/17/17/44/the-little-yellow-car-2652215_960_720.jpg"} text={"Bicycle stations"} />
        <CardComponent pictureUrl={"https://cdn.pixabay.com/photo/2014/12/02/03/16/winding-road-553481__340.jpg"} text={"Journeys"} />
      </div>
    </div>
    </div>
        

   
  );
}

export default App;
