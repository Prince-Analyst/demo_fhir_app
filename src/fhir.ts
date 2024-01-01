import axios from "axios";

const FHIR = 'http://localhost:8091';
const OPENEHR = 'http://localhost:8081';


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
