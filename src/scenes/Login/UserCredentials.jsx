import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import {
    Email as IconEmail,
    Fingerprint as IconPassword
} from '@material-ui/icons';
import {translate} from 'react-i18next';

class UserCredentials extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    onEnter() {
        this.props.onEnter(this.state.email, this.state.password);
    }

    onCreate() {
        this.props.onCreate(this.state.email, this.state.password);
    }

    loginOAuth(type) {
        this.props.onOAuth(type);
    }

    onReset() {
        this.props.onReset(this.state.email);
    }

    oAuthButton(imageLink, type, name) {
        return (
            <div className={"button-content-login"}>
                <Button variant="contained" color="primary" onClick={() => {
                    this.loginOAuth(type)
                }}>
                    <img
                        style={{marginRight: 12}}
                        src={imageLink}
                        width={40}
                        height={40}
                    /> {name}
                </Button>
            </div>
        );
    }

    render() {
        const {classes, t} = this.props;
        return (
            <div className={"login-content"}>
                <div className={"button-content-login"}>
                    <TextField
                        className={'text-field'}
                        id="email-field"
                        placeholder={t('email')}
                        value={this.state.email}
                        onChange={(event) => {
                            this.setState({email: event.target.value})
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IconEmail/>
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>
                <div className={"button-content-login"}>
                    <TextField
                        className={'text-field'}
                        id="password-field"
                        type={"password"}
                        value={this.state.password}
                        placeholder={t('password')}
                        onChange={(event) => {
                            this.setState({password: event.target.value})
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IconPassword/>
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>
                <div className={"login-content-buttons"}>
                    <div className={"button-content-login"}>
                        <Button variant="contained" color="primary" onClick={() => {
                            this.onCreate()
                        }}>
                            {t('create-account')}
                        </Button>
                    </div>
                    <div className={"button-content-login"}>
                        <Button variant="contained" color="primary" onClick={() => {
                            this.onEnter()
                        }}>
                            {t('access')}
                        </Button>
                    </div>
                </div>

                <div className={"login-content-buttons-oauth"}>
                    {this.oAuthButton("https://assets-cdn.github.com/images/modules/logos_page/Octocat.png", 'github', 'Acessar com github')}
                    {this.oAuthButton("https://www.gstatic.com/mobilesdk/160512_mobilesdk/auth_service_google.svg", 'google', 'Acessar com google')}
                </div>

                <Button color="secondary" onClick={() => {
                    this.onReset()
                }}>
                    {t('forgot-password')}
                </Button>
            </div>
        );
    }
}

export default translate('login')(UserCredentials);