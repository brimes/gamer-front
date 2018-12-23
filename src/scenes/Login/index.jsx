import React from 'react';
import BaseScene from '../BaseScene.jsx';
import UserCredentials from './UserCredentials.jsx';
import { translate } from 'react-i18next';
import Auth from '../../components/Auth';
import Typography from '@material-ui/core/Typography';

class LoginScene extends BaseScene {
    constructor() {
        super();
        this.isPublic = true;
        this.template = 'empty';
        (new Auth()).logout();
    }

    homeScene() {
        let loginTo = "/";
        try {
            const location = this.props.location.state.from;
            loginTo = location.pathname && location.pathname !== '/login' ? location.pathname : "/home";
        } catch (e) {}
        this.props.history.push(loginTo);
    }

    showError(error) {
        if (typeof error === 'object' && error.code) {
            this.showModal(error.code);
            return;
        }
        this.showModal(error);
    }

    loginOAuth(type) {
        const self = this;
        let auth = new Auth();
        auth.type = type;
        auth.validate().then(() => {
            self.homeScene();
        }).catch((error) => {
            self.showError(error);
        });
    }

    loginEmail(email, password) {
        const self = this;
        let auth = new Auth();
        auth.type = 'email';
        auth.email = email;
        auth.password = password;
        auth.validate().then(() => {
            self.homeScene();
        }).catch((error) => {
            self.showError(error);
        });
    }

    loginNewEmail(email, password) {
        const self = this;
        let auth = new Auth();
        auth.type = 'newEmail';
        auth.email = email;
        auth.password = password;
        auth.validate().then(() => {
            self.homeScene();
        }).catch((error) => {
            self.showError(error);
        });
    }

    resetPassword(email) {
        if (!email) {
            this.showModal('email-required-for-reset');
            return;
        }
        const self = this;
        let auth = new Auth();
        auth.type = 'resetPassword';
        auth.email = email;
        auth.reset().then(() => {
            self.showModal('email-reset-sent');
        }).catch((error) => {
            self.showError(error.code);
        });
    }

    view() {
        const {  t } = this.props;
        return (
            <div
                style={{
                    backgroundSize: "cover",
                    borderWidth: 1,
                    backgroundColor: '#2B2B2B',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <div className={"login-panel"}>
                    <Typography variant="title">
                        <img src={"img/funcionalLogo.png"} width={250}/>
                    </Typography>
                    <UserCredentials
                        onEnter={(email, password) => {
                            this.loginEmail(email, password);
                        }}
                        onOAuth={(type) => {
                            this.loginOAuth(type);
                        }}
                        onCreate={(email, password) => {
                            this.loginNewEmail(email, password);
                        }}
                        onReset={(email) => {
                            this.resetPassword(email);
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default translate('login')(LoginScene);