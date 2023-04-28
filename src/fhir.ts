import axios from 'axios';

// Set the 'Access-Control-Allow-Origin' header to allow requests from the frontend app
axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:5173';
const username = 'Admin';
const password = 'admin123'
//const FHIR = 'http://localhost:8090';
const OPENEHR = 'http://localhost:8080/ehrbase';
const FHIR = 'http://localhost/api/api_fhir_r4';

// Create a new instance of axios with the base URL of the FHIR server
export const fhir = axios.create({
  baseURL: `${FHIR}`,
  //auth: {
  //  username: 'Admin',
  //  password: 'admin123',
  //},
  headers: {
    "Cache-Control": "no-cache",
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'Authorization': `Basic ${btoa(`${username}:${password}`)}`
  },
});

export const openehr = axios.create({
    baseURL: `${OPENEHR}/rest`,
    headers: {
        Accept: "application/json",
    },
});