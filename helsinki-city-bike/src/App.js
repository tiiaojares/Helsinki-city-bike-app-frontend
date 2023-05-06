import React from 'react';
import { useState } from 'react';
import './App.css';
import  { Logo }  from './images/logo';
import { FindStation } from './bicycleStation/findStation';


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
    <body className="container">
      < FindStation />
    </body>
    </div>
        

   
  );
}

export default App;
