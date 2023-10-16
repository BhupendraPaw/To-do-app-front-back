import axios from "axios";


const BASE_URL = "http://127.0.0.1:5000";


export async function makePostRequest(endpoint, requestData) {
    try {
        const response = await axios.post(BASE_URL + endpoint, requestData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data; // Return the response data
    } catch (error) {
        // Handle errors
        console.error('API ERROR: ', error);
        throw error; // Re-throw the error for further handling
    }
}
export async function makeGetRequest(endpoint) {
    try {
        const response = await axios.get(BASE_URL + endpoint);

        return response.data;
    } catch (error) {
        console.error("API ERROR: ", error);
        throw error;
    }
}

