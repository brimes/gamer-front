import React from 'react';
import BaseScene from '../BaseScene.jsx';
import { translate } from 'react-i18next';
import EnhancedTable from '../../components/Table'
import RankingApi from "../../services/RankingApi";


class RankingScene extends BaseScene {
    constructor(props) {
        super(props);
        this.title = props.t('ranking');
        this.isPublic = false;
        this.state = {
            data: [],
        };
    }

    componentDidMount() {
        this.updateTable();
    }

    parserData(data) {
        return data.map(row => {
            row.name = row.position + " - " + row.name;
            return row;
        })
    }

    updateTable() {
        let self = this;
        this.setState({data: []});
        (new RankingApi()).get().then(data => {
            const newData = self.parserData(data);
            self.setState({data: newData});
        }).catch(error => {
            console.log(error);
            self.showModal(error);
        });
    }

    columns() {
        const { t } = this.props;
        return [
            {id: 'avatar', type: 'image', disablePadding: false, label: t('picture')},
            {id: 'name', type: 'text', disablePadding: false, label: t('name')},
            {id: 'score', type: 'numeric', disablePadding: false, label: t('score'), width: 10},
            {id: 'email', type: 'text', disablePadding: false, label: t('email')},
            {id: 'team', type: 'text', disablePadding: false, label: t('team')},
            {id: 'xp', type: 'numeric', disablePadding: false, label: t('experience')},
        ];
    }

    view() {
        const { classes, t } = this.props;
        return (
            <div>
                <EnhancedTable
                    title={t('Ranking')}
                    columns={this.columns()}
                    data={this.state.data}
                    onDeleteItems={items => {this.deleteItems(items)}}
                    hasCheckbox={false}
                />
            </div>
        );
    }
}

export default translate('ranking')(RankingScene);