
import AuthenticationApi from '../../services/AuthenticationApi';
import Cookies from 'universal-cookie';
import base64 from './base64';
import Firebase from "./Firebase";

const cookieName = 'gamer_tkn';

class Auth extends Firebase {

    async validate() {
        const self = this;
        const result = await self.validateAccess();
        const token = await result.user.getIdToken(false);
        if (!result.user.emailVerified) {
            if (result.additionalUserInfo.isNewUser) {
                this.sendConfirmationEmail()
                throw 'confirmation-email-sent';
            }
            throw 'email-not-confirmed';
        }
        return this.getAppToken(result.user.email, token);
    }

    async getAppToken(email, token) {
        const authApi = new AuthenticationApi();
        const response = await authApi.authenticate(email, token);
        if (!response.token) {
            throw {
                code: 'auth/api-error',
                message: "Login error " + response.message
            };
        }
        return this.saveToken(response.token);
    }


    async reset() {
        return this.resetPassword();
    }

    saveToken(token) {
        const cookies = new Cookies();
        cookies.set(cookieName, token);
        return true;
    }

    getToken() {
        const cookies = new Cookies();
        const token = cookies.get(cookieName);
        return token;
    }

    isLogged() {
        const token = this.getToken();
        return token !== undefined && token !== false && token !== null && token !== '';
    }

    tokenPayload() {
        const token = this.getToken();
        if (!token) {
            return null;
        }
        return JSON.parse(base64.decode(token.split('.')[1]));
    }

    logout() {
        this.singOut();
        const cookies = new Cookies();
        return cookies.remove(cookieName);
    }
}

export default Auth;