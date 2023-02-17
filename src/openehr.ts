import axios from 'axios';

export const openehr = axios.create(
    {baseURL:"http://localhost:8080/rest/openehr/v1/"
    //headers: {
    //    Accept: "application/json",
    //    }
    }
);