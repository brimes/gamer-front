import React from 'react';
import BaseScene from '../BaseScene.jsx';
import Typography from '@material-ui/core/Typography';
import { translate } from 'react-i18next';


class ProfileScene extends BaseScene {
    constructor() {
        super();
        this.isPublic = false;
    }

    view() {
        const {  t } = this.props;
        return (
            <div style={{
                height: "100%"
            }}>
                <Typography variant="title">
                    Em breve
                </Typography>
            </div>
        );
    }
}

export default translate('profile')(ProfileScene);