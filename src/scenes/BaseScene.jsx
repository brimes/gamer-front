import React, {Component} from 'react';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import blueGrey from '@material-ui/core/colors/blueGrey';
import indigo from '@material-ui/core/colors/indigo';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom'
import Auth from '../components/Auth';
import Template from './Template';

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            light: '#545454',
            main: '#2b2b2b',
            dark: '#000000',
            contrastText: '#fff',
        },
        secondary: indigo,
    }
});


const style = {
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
};

export default class BaseScene extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.isPublic = false;
        this.template = null;
        this.title = '';
        this.modal = {
            open: false,
            title: '',
            message: ''
        }
        this.auth = new Auth();
        this.session = this.auth.tokenPayload();
    }

    showModal(message) {
        this.modal.open = true;
        this.modal.message = message;
        this.setState({modal: this.modal});
    }

    closeModal() {
        this.modal.open = false;
        this.modal.message = '';
        this.setState({modal: this.modal});
    }

    modalContent() {
        const { t } = this.props;
        const isOpen = typeof this.state.modal !== 'undefined' ? this.state.modal.open : false;
        const message = typeof this.state.modal !== 'undefined' ? this.state.modal.message : '';
        return (
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={isOpen}
                onClose={() => {
                    this.closeModal()
                }}>
                <div style={style.paper}>
                    <Typography variant="title" id="modal-title">
                        {this.modal.title}
                    </Typography>
                    <Typography variant="subheading" id="modal-description">
                        {t(message)}
                    </Typography>
                    <div style={{
                        display: "flex",
                        width: '100%',
                        flexDirection: "row-reverse"
                    }}>
                        <Button onClick={() => {this.closeModal()}}>
                            {t('close')}
                        </Button>
                    </div>
                </div>
            </Modal>
        )
    }

    content() {
        if (this.template === 'empty') {
            return (
                <div style={{height: '100%'}}>
                    {this.view()}
                </div>
            );
        }

        return (
            <Template title={this.title} session={this.session}>
                {this.view()}
            </Template>
        );

    }

    render() {
        if (!this.isPublic && !this.auth.isLogged()) {
            return (<Redirect to={
                {
                    pathname: "/login",
                    state: { from: this.props.location }
                }
            }/>);
        }

        return (
            <MuiThemeProvider theme={theme}>
                {this.content()}
                {this.modalContent()}
            </MuiThemeProvider>
        )
    }
}