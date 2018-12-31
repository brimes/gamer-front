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
        };
        this.defaultPagination = {
            totalRows: 0,
            rowsPerPage: 15,
            page: 0
        }
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
        this.props.onChangePagination({
            page: (page + 1),
            rowsPerPage: this.defaultPagination.rowsPerPage
        });
    };

    handleChangeRowsPerPage(event) {
        this.props.onChangePagination({
            page: 1,
            rowsPerPage: event.target.value
        });
    };

    isSelected(id) {
        return this.state.selected.indexOf(id) !== -1;
    }

    render() {
        const {classes, columns, title, data, onDeleteItems, hasCheckbox, pagination} = this.props;
        this.defaultPagination = (!pagination || !pagination.totalRows) ? this.defaultPagination : pagination;
        const {order, orderBy, selected} = this.state;
        const {rowsPerPage, page, totalRows} = this.defaultPagination;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length * rowsPerPage);

        return (
            <Paper className={classes.root}>
                {/*<EnhancedTableToolbar numSelected={selected.length} tableTitle={title} onDeleteButton={() => {onDeleteItems(selected)}}/>*/}
                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <EnhancedTableHead
                            className={classes.tableCell}
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
                                    const isSelected = false; //this.isSelected(row.id);
                                    return (
                                        <TableRow
                                            hover
                                            onClick={event => this.handleClick(event, row.id)}
                                            aria-checked={isSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={isSelected}
                                            classes={{
                                                "hover": "show-buttons",
                                            }}
                                        >
                                            {hasCheckbox && (
                                                <TableCell padding="checkbox" width={50}>
                                                    <Checkbox checked={isSelected}/>
                                                </TableCell>
                                            )}
                                            {columns.map((col) => {
                                                const key = col.id + "-" + row.id;
                                                return (<EnhancedTableCell  className={classes.tableCell} key={key} params={col} row={row}/>);
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
                {pagination && (<TablePagination
                    component="div"
                    count={totalRows}
                    rowsPerPage={rowsPerPage}
                    page={page - 1}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={(event, page) => {this.handleChangePage(event, page)}}
                    onChangeRowsPerPage={(event) => {this.handleChangeRowsPerPage(event)}}
                />)}
            </Paper>
        );
    }
}

EnhancedTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(tableStyles)(EnhancedTable);