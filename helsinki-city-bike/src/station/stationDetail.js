import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import journeysService from '../services/journeys';
import axios from 'axios';

const StationDetail = () => {
    const [journeysDepartureId, setJourneysDepartureId] = useState([]);
    const [journeysReturnId, setJourneysReturnId] = useState([]);

    const params = useParams();
    const id = params.id;


    useEffect(() => {
        const request1 = axios.get('/api/journeys/departure/'+id);
        request1.then(response1 => setJourneysDepartureId(response1.data));
        const request2 = axios.get('/api/journeys/return/'+id);
        request2.then(response2 => setJourneysReturnId(response2.data));
      }, []);


    return <div>
        detail-info {id}
        </div>
}

export { StationDetail }