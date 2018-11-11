import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import {
    Email as IconEmail,
    Fingerprint as IconPassword
} from '@material-ui/icons';
import { translate } from 'react-i18next';

class UserCredentials extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    onEnter () {
        this.props.onEnter(this.state.email, this.state.password);
    }

    onReset () {
        this.props.onReset(this.state.email);
    }

    render() {
        const { classes, t } = this.props;
        return (
            <div className={"login-content"}>
                <TextField
                    className={'text-field'}
                    id="email-field"
                    placeholder={t('email')}
                    value={this.state.email}
                    onChange={(event) => {this.setState({email: event.target.value})}}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <IconEmail/>
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    className={'text-field'}
                    id="password-field"
                    type={"password"}
                    value={this.state.password}
                    placeholder={t('password')}
                    onChange={(event) => {this.setState({password: event.target.value})}}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <IconPassword/>
                            </InputAdornment>
                        ),
                    }}
                />
                <Button variant="contained" color="primary" onClick={() => {this.onEnter()}}>
                    {t('access')}
                </Button>
                <Button color="secondary" onClick={() => {this.onReset()}}>
                    {t('forgot-password')}
                </Button>
            </div>
        );
    }
}

export default translate('login')(UserCredentials);