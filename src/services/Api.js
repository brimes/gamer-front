import axios from 'axios';
import Auth from "../components/Auth";

export default class Api {

    constructor() {
        this.type = 'post';
        this.query = '';
        this.host = "http://10.11.0.53/";
        this.endpoint = 'api';
        this.variables =  {};
    }

    async send() {
        const auth = new Auth();
        let result = null;
        try {
            result = await axios({
                method: this.type,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + auth.getToken()
                },
                url: this.host + this.endpoint,
                data: {
                    query: this.query,
                    variables: this.variables
                }
            });
        } catch (e) {
            return {
                data: null,
                errors: [
                    {message: e.message}
                ]
            };
        }

        if (result.status !== 200) {
            return {
                data: null,
                errors: [
                    {message: "Error: " + result.status}
                ]
            };
        }
        return result.data;
    }
}
