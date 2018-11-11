import React from 'react';
import BaseScene from '../BaseScene.jsx';
import { translate } from 'react-i18next';
import EnhancedTable from '../../components/Table'
import UserApi from "../../services/UserApi";

class UsersScene extends BaseScene {
    constructor(props) {
        super(props);
        this.title = props.t('users');
        this.state = {
            data: [
                {
                    id: 1,
                    picture: 1,
                    name: 1,
                    email: 1,
                    role: 1

                }
            ],
        };

    }

    componentDidMount() {
        this.updateTable();
    }

    updateTable() {
        let self = this;
        let users = new UserApi();
        this.setState({data: []});
        users.get().then(data => {
            self.setState({data});
        }).catch(error => {
            self.showModal(error);
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

    columns() {
        const { t } = this.props;
        return [
            {id: 'photoUrl', type: 'image', disablePadding: true, label: t('picture')},
            {id: 'name', type: 'text', disablePadding: true, label: t('name')},
            {id: 'email', type: 'text', disablePadding: true, label: t('email')},
            {id: 'emailVerified', type: 'text', disablePadding: true, label: t('email-verified')},
            {id: 'role', type: 'text', disablePadding: true, label: t('role')},
            {id: 'singInProvider', type: 'text', disablePadding: true, label: t('sing-in-provider')},
            {id: 'created_at', type: 'text', disablePadding: true, label: t('created-at')},
        ];
    }

    view() {
        const { t } = this.props;
        return (
            <EnhancedTable
                title={t('users')}
                columns={this.columns()}
                data={this.state.data}
                onDeleteItems={items => {this.deleteItems(items)}}
            />
        );
    }
}

export default translate('users')(UsersScene);