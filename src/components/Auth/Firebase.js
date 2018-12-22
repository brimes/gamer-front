
import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyC48E-Px4DIVBpAHCHWmoFFK6SOUpDZr7Q",
    authDomain: "gamelization-d8281.firebaseapp.com",
    databaseURL: "https://gamelization-d8281.firebaseio.com",
    projectId: "gamelization-d8281",
    storageBucket: "gamelization-d8281.appspot.com",
    messagingSenderId: "285910022319"
};

firebase.initializeApp(config);

class Firebase {
    constructor() {
        this.type = null;
        this.email = null;
        this.password = null;
    }

    provider() {
        if (this.type === 'github') {
            return new firebase.auth.GithubAuthProvider();
        }
        if (this.type === 'google') {
            return new firebase.auth.GoogleAuthProvider();
        }
    }

    oAuthAccess() {
        const provider = this.provider();
        return new Promise((resolve, reject) => {
            firebase
                .auth()
                .signInWithPopup(provider)
                .then(resolve)
                .catch(reject);
        });
    }

    isOAuth() {
        const oAuhtList = [
            'github',
            'google'
        ];

        return oAuhtList.indexOf(this.type) >= 0

    }

    validateAccess() {
        if (this.isOAuth()) {
            return this.oAuthAccess();
        }

        if (this.type === 'email') {
            return this.emailAccess();
        }

        if (this.type === 'newEmail') {
            return this.newEmailAccess();
        }

        return null;
    }

    emailAccess() {
        const self = this;
        return new Promise((resolve, reject) => {
            firebase
                .auth()
                .signInWithEmailAndPassword(self.email, self.password)
                .then(resolve)
                .catch(reject);
        });
    }

    newEmailAccess() {
        const self = this;
        return new Promise((resolve, reject) => {
            firebase
                .auth()
                .createUserWithEmailAndPassword(self.email, self.password)
                .then(resolve)
                .catch(reject);
        });
    }

    resetPassword() {
        const self = this;
        return new Promise((resolve, reject) => {
            firebase
                .auth()
                .sendPasswordResetEmail(self.email)
                .then(resolve)
                .catch(reject);
        });
    }

    singOut() {
        return new Promise((resolve, reject) => {
            firebase.auth().signOut().then(resolve, reject);
        });
    }

    sendConfirmationEmail() {
        return new Promise((resolve, reject) => {
            firebase.auth().currentUser.sendEmailVerification().then(resolve, reject);
        });
    }

}

export default Firebase;
