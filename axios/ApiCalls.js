import axios from "axios";
import {API_URL} from "../Constants";

export const fetchChallengesData = async () => {
    const url = API_URL + '/round/8';
    try {
        const response = await axios.get(url);
        return response.data.data;
    } catch (error) {
        console.log(error, "Error:"+url);
    }
};

export const postInsidePolygon = async (payload) => {
    try {
        const response = await axios.post(API_URL + '/round/inside/8', payload);
        console.log(payload,"payload");
    } catch (error) {
        console.log(error, "Error");
    }
};