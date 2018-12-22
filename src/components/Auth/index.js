
import CustomAuth from './CustomAuth';
import AuthenticationApi from '../../services/AuthenticationApi';
import Cookies from 'universal-cookie';
import base64 from './base64';

const cookieName = 'gamer_tkn';

class Auth extends CustomAuth {

    async validate() {
        const self = this;
        const result = await self.validateAccess();
        return this.saveToken(result.token);
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
        const cookies = new Cookies();
        return cookies.remove(cookieName);
    }


}

export default Auth;