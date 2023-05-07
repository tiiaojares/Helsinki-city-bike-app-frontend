import React from 'react';
import './App.css';
import  { Logo }  from './images/logo';
import { Main } from './main/content';
import {HashRouter as Router} from 'react-router-dom';


const App = () => {

  return (
    <Router>
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
    </Router>
  );
}

export default App;
