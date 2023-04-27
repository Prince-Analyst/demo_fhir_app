import axios from 'axios';

const FHIR = 'http://localhost:8090';
const OPENEHR = 'http://localhost:8080/ehrbase';

export const fhir = axios.create({
    baseURL: `${FHIR}/fhir`,
    headers: {
        "Cache-Control": "no-cache",
    },
});

export const openehr = axios.create({
    baseURL: `${OPENEHR}/rest`,
    headers: {
        Accept: "application/json",
    },
});