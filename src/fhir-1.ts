import axios from 'axios';
//import { Buffer } from 'buffer';
//const { createProxyMiddleware } = require('http-proxy-middleware');

const user = 'Admin';
const pass = 'admin123';
//const token = Buffer.from(`${user}:${pass}`, 'utf8').toString('base64')
const OPENIMIS_USER = "Admin";
const OPENIMIS_PASSWORD = "Muhammad__1234";

//const FHIR = 'http://localhost:8090';
const OPENEHR = 'http://localhost:8080/ehrbase';
const FHIR = 'http://localhost/api/api_fhir_r4';


export const fhir = axios.create({
    baseURL: `${FHIR}/fhir`,
    auth: {
        username: `${user}`,
        password: `${pass}`
    },
    headers: {
        "Cache-Control": "no-cache",'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    },
    withCredentials: true,
});

export const openehr = axios.create({
    baseURL: `${OPENEHR}/rest`,
    headers: {
        Accept: "application/json",
    },
});

//export const openimis = axios.create({
//    baseURL: `{OPENIMIS}/`,
//    headers: {
//        Accept: "application/json",
//        'Authorization': `Basic ${token}`
//        }
//    },
//});
