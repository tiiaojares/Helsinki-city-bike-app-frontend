import axios from 'axios';

const baseUrl = '/api/stations'

const getAll = () => {
    const request = axios.get(baseUrl);
    
    return request.then(response => response.data);
}

const getReturnStations = (id) => {
    const request = axios.get('/api/journeys/departure/'+id)
    return request.then(response => response.data);
}

export default { getAll, getReturnStations }