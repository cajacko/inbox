import fetch from 'node-fetch';

const fetchApi = (endpoint: string, postData?: { [key: string]: any }) =>
  fetch(`http://localhost:5000/inbox-981dc/us-central1/${endpoint}`, {
    body: postData ? JSON.stringify(postData) : undefined,
    method: postData ? 'POST' : 'GET',
  }).then(res => res.json());

export default fetchApi;
