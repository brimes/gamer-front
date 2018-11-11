import React from 'react';
import BaseScene from '../BaseScene.jsx';
import { Redirect } from 'react-router-dom'
import { translate } from 'react-i18next';

class HomeScene extends BaseScene {
    constructor(props) {
        super(props);
        this.title = props.t('home');
        this.isPublic = false;
    }

    view() {
        return (<Redirect to={
            {
                pathname: "/ranking",
                state: { from: this.props.location }
            }
        }/>);
    }
}

export default translate('home')(HomeScene);