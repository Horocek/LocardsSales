import React, { Component } from 'react';
import {BootstrapTable, 
       TableHeaderColumn} from 'react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import '../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css';
import '../../src/Table.css';
 
 
function rowClass(row, rowIdx) {
  return row['isCanceled'] === 'отменена' ? 
    'CancelRow' : 'Other-Row';
}
class Table extends Component {
  render() {
    return (
      <div>
        <BootstrapTable data={this.props.data}
        trClassName={rowClass}>
        <TableHeaderColumn isKey
                             dataField='date'
                             dataAlign='center'
                             headerAlign="center"
                             width="120"
                             thStyle={
                                 {backgroundColor: '#31d3fa'}}>
            Дата
          </TableHeaderColumn>
          <TableHeaderColumn dataField='amount'
                             dataAlign='center'
                             headerAlign="center"
                             width="100"
                             thStyle={
                                {backgroundColor: '#31d3fa'}}>
            Сумма<br></br>
            чека
          </TableHeaderColumn>
          <TableHeaderColumn dataField='write'
                             dataAlign='center'
                             width="100"
                             headerAlign="center"
                             thStyle={
                                {backgroundColor: '#31d3fa'}}>
            Оплачено <br></br>
            бонусами
          </TableHeaderColumn>
          <TableHeaderColumn dataField='charge'
                             dataAlign='center'
                             width="120"
                             headerAlign="center"
                             thStyle={
                                {backgroundColor: '#31d3fa'}}>
            Накопленно <br></br>
            бонусов
          </TableHeaderColumn>
          <TableHeaderColumn dataField='isCanceled'
                             dataAlign='center'
                             width="100"
                             headerAlign="center"
                             thStyle={
                                {backgroundColor: '#31d3fa'}}>
            Статус <br></br>
            операции
          </TableHeaderColumn>
          <TableHeaderColumn dataField='salePoint'
                             dataAlign='center'
                             width="140"
                             headerAlign="center"
                             thStyle={
                                {backgroundColor: '#31d3fa'}}>
            Точка <br></br>
            продаж
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}
 
export default Table;