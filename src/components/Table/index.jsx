import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import EnhancedTableHead from './EnhancedTableHead';
import EnhancedTableToolbar from './EnhancedTableToolbar';
import {tableStyles} from './styles';
import EnhancedTableCell from "./EnhancedTableCell";

class EnhancedTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            order: 'asc',
            orderBy: 'calories',
            selected: [],
            page: 0,
            rowsPerPage: 15,
        };
    }

    handleRequestSort(property) {
        const orderBy = property;
        let order = 'desc';
        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }
        this.setState({order, orderBy});
    };

    handleSelectAllClick(checked) {
        const {data} = this.props;
        if (checked) {
            this.setState(state => ({selected: data.map(n => n.id)}));
            return;
        }
        this.setState({selected: []});
    };

    handleClick(event, id) {
        const {selected} = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        this.setState({selected: newSelected});
    };

    handleChangePage(event, page) {
        this.setState({page});
    };

    handleChangeRowsPerPage(event) {
        this.setState({rowsPerPage: event.target.value});
    };

    isSelected(id) {
        return this.state.selected.indexOf(id) !== -1;
    }

    render() {
        const {classes, columns, title, data, onDeleteItems, hasCheckbox} = this.props;
        const {order, orderBy, selected, rowsPerPage, page} = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        return (
            <Paper className={classes.root}>
                <EnhancedTableToolbar numSelected={selected.length} tableTitle={title} onDeleteButton={() => {onDeleteItems(selected)}}/>
                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <EnhancedTableHead
                            columnData={columns}
                            numSelected={selected.length}
                            order={order}
                            hasCheckbox={hasCheckbox}
                            orderBy={orderBy}
                            onSelectAllClick={(event, checked) => {this.handleSelectAllClick(checked)}}
                            onRequestSort={(property) => {this.handleRequestSort(property)}}
                            rowCount={data.length}
                        />
                        <TableBody>
                            {data
                                .map(row => {
                                    const isSelected = this.isSelected(row.id);
                                    return (
                                        <TableRow
                                            hover
                                            onClick={event => this.handleClick(event, row.id)}
                                            aria-checked={isSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={isSelected}
                                        >
                                            {hasCheckbox && (
                                                <TableCell padding="checkbox" width={50}>
                                                    <Checkbox checked={isSelected}/>
                                                </TableCell>
                                            )}
                                            {columns.map((col) => {
                                                const key = col.id + "-" + row.id;
                                                return (<EnhancedTableCell key={key} params={col} row={row}/>);
                                            })}
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{height: 49 * emptyRows}}>
                                    <TableCell colSpan={6}/>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </Paper>
        );
    }
}

EnhancedTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(tableStyles)(EnhancedTable);