import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import '../App.css';


class Userdata extends Component {
  render() {
      if(this.props.showData){
        return (
            <div className='container'>
                <BootstrapTable data={this.props.output} striped hover>
                  <TableHeaderColumn isKey={true} dataField='FirstName' width='15%' filter={ { type: 'TextFilter', placeholder: 'Enter the first name' } }>First Name </TableHeaderColumn>
                  <TableHeaderColumn dataField='LastName' width='15%' filter={ { type: 'TextFilter', placeholder: 'Enter the last name' } }>Last Name</TableHeaderColumn>
                  <TableHeaderColumn dataField='Origin' width='15%' filter={ { type: 'TextFilter', placeholder: 'Enter the origin' } }>Origin</TableHeaderColumn>
                  <TableHeaderColumn dataField='Destination' width='20%' filter={{ type: 'TextFilter', placeholder: 'Enter the destination'}}>Destination</TableHeaderColumn>
                  <TableHeaderColumn dataField='StartDate' width='20%' filter={{ type: 'DateFilter', placeholder: 'Enter the destination'}}>Start Date</TableHeaderColumn>
                  <TableHeaderColumn dataField='EndDate' width='20%' filter={{ type: 'DateFilter', placeholder: 'Enter the destination'}}>End Date</TableHeaderColumn>
              </BootstrapTable>        
              </div>
            );
      }
      else{
          return null;
      }
  }
}

export default Userdata;