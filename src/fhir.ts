import axios from 'axios';

const token = "ZWhyYmFzZTplaHJiYXNl"


export const FHIR = axios.create(
    { baseURL: "http://localhost:8090/fhir" }
);


//export const openehr = axios.create(
//    {baseURL:"http://localhost:8081/rest/openehr/v1",
//    headers: {
//        Accept: "application/json",
//        "Access-Control-Allow-Origin": "http://localhost:5173",
//        //"Access-Control-Allow-Credentials": true,
//        //Authorization: `Basic ${token}`,
//        },
//    }
//);

export const openehr = axios.create({baseURL:"http://localhost:8081/rest/openehr/v1",
headers: {
    Accept: "application/json",
}});