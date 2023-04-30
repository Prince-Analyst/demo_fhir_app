import axios from "axios";

const FHIR = 'http://localhost:8090';
const OPENEHR = 'http://localhost:8080';


export const fhir = axios.create({
  baseURL: `${FHIR}/fhir`,
  headers: {
    "Cache-Control": "no-cache",
  },
});

export const openehr = axios.create({
  baseURL: `${OPENEHR}/ehrbase/rest`,
  headers: {
    Accept: "application/json",
  },
});
