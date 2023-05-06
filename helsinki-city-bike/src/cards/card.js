import React from 'react';
import Card from 'react-bootstrap/Card';
import './cards.css'

const CardComponent = ({pictureUrl, text}) => {

    return (
        <Card className="card">
            <Card.Header className="cardHeader">
                <img className="card-img-top" src={pictureUrl} />
            </Card.Header>
            <Card.Body>
                <Card.Text className="cardText">
                    { text }
                </Card.Text>
            </Card.Body>
      </Card>

    )
}

export { CardComponent }