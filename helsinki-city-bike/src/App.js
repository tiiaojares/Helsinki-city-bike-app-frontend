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
              Helsinki city bike
            </a>
          </div>
        </nav>
        <div className="container">
          < Main />
        </div>
      </div>
  );
}

export default App;
