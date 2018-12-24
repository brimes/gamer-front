
import React from 'react';
import TableCell from '@material-ui/core/TableCell';

class EnhancedTableCell extends React.Component {
    render() {
        const { params, row, className } = this.props;


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