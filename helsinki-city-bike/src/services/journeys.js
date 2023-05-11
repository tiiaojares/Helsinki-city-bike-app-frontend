import axios from 'axios';

const baseUrl = '/api/journeys'

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
}

const getJourneysDepartureId = (id) => {
    const request = axios.get('/api/journeys/departure/'+id);
    return request.then(response => response.data);
}

const getJourneysReturnId = (id) => {
    const request = axios.get('/api/journeys/return/'+id);
    return request.then(response => response.data);
}

const getJourneysDepartureAndReturnStation = (dep, ret) => {
    const request = axios.get('api/journeys/find/'+dep+'/'+ret);
    return request.then(response => response.data);
}

export default { getAll, getJourneysDepartureId, getJourneysReturnId, getJourneysDepartureAndReturnStation }