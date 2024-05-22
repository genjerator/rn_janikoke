import axios from "axios";
import {API_URL} from "../Constants";
import {useChallenges} from "../context/ChallengesContext";

export const fetchChallengesData = async () => {

    const url = API_URL + '/round/1';

    try {
        const response = await axios.get(url);

        return response.data;
    } catch (error) {
        console.log(error, "Error:"+url);
    }
};

export const postInsidePolygon = async (payload) => {
    try {
        const url =API_URL + '/round/inside/1';
        console.log(url,":url");
        console.log(payload,"payload");
        const response = await axios.post(url, payload);
        console.log(response,":response");
    } catch (error) {
        console.log(error, "Error");
    }
};

export const fetchResults = async () => {

    const url = API_URL + '/round/1/result';

    try {
        const response = await axios.get(url);

        return response.data;
    } catch (error) {
        console.log(error, "Error:"+url);
    }
};