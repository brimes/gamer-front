
import i18next from 'i18next';
import Api from './Api';

export default class AuthenticationApi extends Api {
    constructor() {
        super();
        this.endpoint = "api/public";
        this.query = 'mutation createToken ($email: String!, $password: String!)' +
            '{ createToken (login: $email, password: $password) {' +
            '  token' +
            '} }';
    }

    validate(email, password) {
        if (!email) {
            throw "auth/email-required";
        }

        var expression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!expression.test(String(email).toLowerCase())) {
            throw "auth/invalid-email";
        }


        if (!password) {
            throw "auth/password-required";
        }
    }

    async authenticate(email, password) {

        this.validate(email, password);

        this.variables = {
            email: email,
            password: password,
            locale: i18next.language ? i18next.language.replace('-', '_') : ''
        }
        const result = await this.send();
        const createToken = result.data ? result.data.createToken : null;
        let response = { token: null, message: '' };

        if (createToken == null) {
            throw result.errors[0].message;
        }

        response.token = createToken.token;
        return response;
    }
}
