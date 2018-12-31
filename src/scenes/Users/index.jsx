import React from 'react';
import BaseScene from '../BaseScene.jsx';
import {translate} from 'react-i18next';
import { Redirect } from 'react-router-dom'
import EnhancedTable from '../../components/Table'
import UserApi from "../../services/UserApi";
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

//Icons
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import FaceIcon from '@material-ui/icons/Face';
import MoreIcon from '@material-ui/icons/MoreVert';

const style = {
    paper: {
        position: 'absolute',
        // backgroundColor: theme.palette.background.paper,
        // boxShadow: theme.shadows[5],
        // padding: theme.spacing.unit * 4,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
};

class UsersScene extends BaseScene {
    constructor(props) {
        super(props);
        this.title = props.t('users');
        this.state = {
            data: [],
            pagination: {},
            modalOpen: false
        };

    }

    componentDidMount() {
        this.updateTable();
    }

    updateTable(pagination) {
        let self = this;
        let users = new UserApi();
        users.setPagination(pagination);
        this.setState({data: []});
        users.get().then(response => {
            if (!response) {
                return;
            }
            const data = response.data;
            const pagination = {
                totalRows: response.total,
                rowsPerPage: response.per_page,
                page: response.current_page
            };
            self.setState({data, pagination});
        }).catch(error => {
            console.log(error);
            self.showModal(error.toString());
        });
    }

    async bulkDelete(items) {
        for (let x in items) {
            let id = items[x];
            let users = new UserApi();
            await users.delete(id);
        }
        return true;
    }

    deleteItems(items) {
        let self = this;
        this.bulkDelete(items).then(() => {
            self.updateTable();
        }).catch(error => {
            self.showModal(error);
        });
    }

    redirectToProfile(userId) {
        this.props.history.push('/profile/' + userId);
        return true;
    }

    inputScore(userId) {
        this.setState({modalOpen: true});
    }

    columns() {
        const {t} = this.props;
        return [
            {id: 'name', type: 'text', label: t('name')},
            {id: 'team', type: 'text', label: t('team')},
            {id: 'email', type: 'text', label: t('email')},
            {id: 'role', type: 'text', label: t('role')},
            {id: 'sign_in_provider', type: 'text', label: t('sign-in-provider')},
            {id : 'created_at', type: 'text', label: t('created-at')},
            {id: 'btns', param: 'id', type: 'buttons', actions: [
                {icon: (<ThumbUpIcon/>), action: (userId) => {this.inputScore(userId)}},
                {icon: (<FaceIcon/>), action: (userId) => {this.redirectToProfile(userId)}},
                //{icon: (<MoreIcon/>), action: (params) => {console.log("more", params)}},
            ]},

        ];
    }

    view() {
        const {t} = this.props;
        const message = "aaaa";
        const isModalOpen = false; //this.state.modalOpen;
        return (
            <div>
                <EnhancedTable
                    title={t('users')}
                    columns={this.columns()}
                    data={this.state.data}
                    pagination={this.state.pagination}
                    onDeleteItems={items => {
                        this.deleteItems(items)
                    }}
                    onChangePagination={pagination => {
                        this.updateTable(pagination)
                    }}
                />
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={isModalOpen}
                    onClose={() => {
                        this.setState({modalOpen: false});
                    }}>
                    <div style={style.paper}>
                        <Typography variant="title" id="modal-user-title">
                            Envio de pontos
                        </Typography>
                        <Typography variant="subheading" id="modal-users-description">
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
            </div>
        );
    }
}

export default translate('users')(UsersScene);