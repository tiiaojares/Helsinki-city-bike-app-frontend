import React from 'react';
import './App.css';
import  { Logo }  from './images/logo';
import { Main } from './main/content';
import { useNavigate } from 'react-router-dom';


const App = () => {

  const navigate = useNavigate();

  return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <a onClick={() => navigate("/")}> 
              < Logo />
              <span className="navHeader"> Helsinki city bike </span>
            </a>
          </div>
        </nav>
        <div className="container">
          < Main />
        </div>
        <nav className="navbar mainPageBottom fixed-bottom navbar-dark bg-dark" />


      </div>
  );
}

export default App;
