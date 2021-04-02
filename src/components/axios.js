import axios from 'axios';

const instance = axios.create({
    baseUrl: 'http://localhost:5001/clone-2fd96/us-central1/api'
});

export default instance;

//axios config file not working?