import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import  { Logo }  from './images/logo';
import stationService from './services/stations';
import { Main } from './main/content';
import {HashRouter as Router} from 'react-router-dom';


const App = () => {
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
    <Router>
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
          < Main />
        </div>
      </div>
    </Router>
  );
}

export default App;
