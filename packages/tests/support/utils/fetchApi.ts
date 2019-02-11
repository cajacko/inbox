import fetch from 'node-fetch';

const fetchApi = (endpoint: string) =>
  fetch(`http://localhost:5000/inbox-981dc/us-central1/${endpoint}`).then(res =>
    res.json());

export default fetchApi;
