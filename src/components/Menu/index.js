
import React from 'react';
import List from '@material-ui/core/List';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';

let counter = 0;

class Menu extends React.Component {
    constructor(props) {
        super(props)
    }

    userMenu(type) {
        let menuItens = this.normal();
        if (type === 'admin') {
            menuItens = this.admin();
        }

        if (type === 'master') {
            menuItens = this.master();
        }

        const list = menuItens.map((item) => {
            counter++;
            return (
                <Link key={counter} to={item.path}>
                    <ListItem button>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary={item.label} />
                    </ListItem>
                </Link>
            )
        });
        return (<List>{list}</List>);
    }

    admin() {
        const { t } = this.props;
        let itens = this.normal();
        itens.push({icon: (<DraftsIcon />), label: t('ranking'), path: "/ranking"});
        itens.push({icon: (<DraftsIcon />), label: t('users'), path: "/users"});
        return itens;

    }

    normal() {
        const { t } = this.props;
        return [
            {icon: (<DraftsIcon />), label: t('dashboard'), path: "/dashboard"},
            {icon: (<DraftsIcon />), label: t('api-docs'), path: "/api/docs"}
        ]

    }

    master() {
        const { t } = this.props;
        let itens = this.admin();
        itens.push({icon: (<DraftsIcon />), label: t('configurations'), path: "/config"});
        return itens;

    }

    public() {
        const { t } = this.props;
        return (
            <List>
                <Link to="/profile">
                    <ListItem button>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary={t('profile')} />
                    </ListItem>
                </Link>
                <Link to="/logout">
                    <ListItem button>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary={t('logout')} />
                    </ListItem>
                </Link>
            </List>
        )
    }

    render() {
        if (this.props.type !== 'public') {
            return this.userMenu(this.props.type);
        }
        return this.public();
    }

}

export default translate('menu')(Menu);