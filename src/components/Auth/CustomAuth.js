import AuthenticationApi from "../../services/AuthenticationApi";

const config = {
    apiKey: "AIzaSyB_a96QuSdMHIbse5KgQ9mQAqjRydo9pLQ",
};

class CustomAuth {
    constructor() {
        this.email = null;
        this.password = null;
    }

    validateAccess() {
        if (this.type === 'email') {
            return this.emailAccess();
        }
        return null;
    }

    emailAccess() {
        const self = this;
        return new Promise((resolve, reject) => {
            const authApi = new AuthenticationApi();
            authApi.authenticate(self.email, self.password).then((response) => {
                resolve(response);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    resetPassword() {
        const self = this;
        return new Promise((resolve, reject) => {
            // firebase
            //     .auth()
            //     .sendPasswordResetEmail(self.email)
            //     .then(resolve)
            //     .catch(reject);
        });
    }
}

export default CustomAuth;
