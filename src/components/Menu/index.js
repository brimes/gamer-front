
import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';

// Icons
import DraftsIcon from '@material-ui/icons/Drafts';
import GradeIcon from '@material-ui/icons/Grade';
import PersonIcon from '@material-ui/icons/Person';
import ExitIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupUsersIcon from '@material-ui/icons/Group';


let counter = 0;

class Menu extends React.Component {
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
                            {item.icon}
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
        itens.push({icon: (<GroupUsersIcon/>), label: t('users'), path: "/users"});
        return itens;

    }

    normal() {
        const { t } = this.props;
        return [
            {icon: (<GradeIcon />), label: t('ranking'), path: "/ranking"},
        ]

    }

    master() {
        const { t } = this.props;
        let itens = this.admin();
        itens.push({icon: (<SettingsIcon />), label: t('configurations'), path: "/config"});
        return itens;

    }

    public() {
        const { t } = this.props;
        return (
            <List>
                <Link to="/profile">
                    <ListItem button>
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary={t('profile')} />
                    </ListItem>
                </Link>
                <Link to="/logout">
                    <ListItem button>
                        <ListItemIcon>
                            <ExitIcon />
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