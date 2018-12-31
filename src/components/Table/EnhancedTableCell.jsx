
import React from 'react';
import TableCell from '@material-ui/core/TableCell';

class EnhancedTableCell extends React.Component {

    renderButton() {
        const { params, row, className } = this.props;
        const key = params.id + "-" + params.id;
        const width = 40 * params.actions.length;
        let value = row[params.param];
        const buttons = params.actions.map((item, index) => {
            return (<div key={index} onClick={() => {item.action(value)}}>{item.icon}</div>);
        });
        let buttonValue = params.icon;
        return (<TableCell className={"icon-column"} key={key} numeric={true} width={width}>
            <span className={"row-button"}>
                <div className={"buttons-row"}>{buttons}</div>
            </span>
        </TableCell>)
    }

    render() {
        const { params, row, className } = this.props;
        if (params.type == 'buttons') {
            return this.renderButton();
        }

        const isNumeric = params.type === 'numeric';
        const key = params.id + "-" + params.id;
        let value = row[params.id];
        let width = params.width;
        if (params.type === 'image') {
            value = (<img src={value} width="50" height="50" style={{
                borderRadius: '50%'
            }}/>);
            width = 55;
        }

        return (<TableCell className={className} key={key} numeric={isNumeric} width={width}>{value}</TableCell>)
    }
}

export default EnhancedTableCell;