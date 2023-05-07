import React from 'react';
import Card from 'react-bootstrap/Card';
import './cards.css'
import { useNavigate } from 'react-router-dom';

const CardComponent = ({pictureUrl, text, navigateTo}) => {

    const navigate = useNavigate();

    return (
        <Card 
            className="card"
            onClick={() => navigate(navigateTo) } >
            
            <Card.Header 
                className="cardHeader">
                <img className="card-img-top" 
                src={pictureUrl} />
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