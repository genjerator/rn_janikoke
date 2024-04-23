import axios from "axios";
import {API_URL} from "../Constants";

export const fetchChallengesData = async () => {
    const url = API_URL + '/round/1';
    try {
        const response = await axios.get(url);
        return response.data.data;
    } catch (error) {
        console.log(error, "Error:"+url);
    }
};

export const postInsidePolygon = async (payload) => {
    try {
        const url =API_URL + '/round/inside/1';
        console.log(url,":url");
        const response = await axios.post(url, payload);
        console.log(payload,"payload");
    } catch (error) {
        console.log(error, "Error");
    }
};
