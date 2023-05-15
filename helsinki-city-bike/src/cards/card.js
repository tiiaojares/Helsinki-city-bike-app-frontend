import React from 'react';
import Card from 'react-bootstrap/Card';
import './cards.css'
import { useNavigate } from 'react-router-dom';

const CardComponent = ({picture, text, navigateTo, createNew}) => {

    const navigate = useNavigate();


    return (
        <Card 
            className={createNew ? "card  createNew" : "card"}
            onClick={
                () => {!createNew && navigate(navigateTo) } }>
            
            <Card.Header 
                className="cardHeader">
                <img className="card-img-top" 
                src={picture} />
                {createNew && 
                    <div className="createNewButtons"> 
                        <button 
                            className="btn btn-dark btn-sm createNewButton"
                            onClick={() => navigate("/newJourney")}>
                            Luo uusi matka
                        </button>
                        <button 
                            className="btn btn-dark btn-sm createNewButton"
                            onClick={() => navigate("/newStation")}>
                            Luo uusi asema
                        </button> 
                    </div>
                }
                
            </Card.Header>
            
            <Card.Body>
                <Card.Text 
                    className="cardText">
                    { text }
                </Card.Text>
            </Card.Body>

        </Card>
    )
}

export { CardComponent }