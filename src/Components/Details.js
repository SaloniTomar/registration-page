import React, { Component } from 'react';
import {Form, FormControl, Row, Col, FormGroup, Button} from 'react-bootstrap';
import moment from 'moment'
import {Link} from 'react-router-dom';
import Userdata from './Userdata';
import '../App.css';

moment().local();
var today=moment().format('YYYY-MM-DD');

class Details extends Component {
    constructor(props){
    super(props);
    this.state={
        FirstName : this.getValue('FirstName'),
        LastName : this.getValue('LastName'),
        StartDate:'',
        EndDate:'',
        Origin:'',
        Destination:'',
        startdate:'',
        errorStartDate:'',
        errorEndDate:'',
        errorOrigin:'',
        errorDestination:'',
        showData:false,
        output:JSON.parse(localStorage.userData)
    };
    this.getValue=this.getValue.bind(this);
    this.onChange=this.onChange.bind(this);
    this.validateVal=this.validateVal.bind(this);
    this.validateForm=this.validateForm.bind(this);
    this.clearData=this.clearData.bind(this);
    this.showData=this.showData.bind(this);
}

onChange(e) {
    var fieldVal = e.target.value;
    var fieldName = e.target.name;
    this.setState( { [fieldName]: fieldVal});
    this.validateVal(fieldName, fieldVal);
}
validateVal(fieldName, fieldVal){
    if(fieldName==='Origin'|| fieldName==='Destination'){
        var validVal=/^[a-zA-Z ]+$/;
    }
    else{
        validVal= /^20(1?[7-9]|2[0-9])[/-](0?[1-9]|1[012])[/-](0?[1-9]|[12][0-9]|3[01])$/;
    }
    var errorField='error'+fieldName;
    if(!validVal.test(fieldVal) || fieldVal===' '){
        this.setState({[errorField]: 'Enter valid values'});
        return false;
    }
    else{
        this.setState({ [errorField]: ''});
        return true;
    }
}
validateForm(e) {
    e.preventDefault();
    var checkStartDate = this.validateVal('StartDate', this.state.StartDate);
    var checkEndDate = this.validateVal('EndDate', this.state.EndDate);
    var checkOrigin = this.validateVal('Origin', this.state.Origin);
    var checkDestination = this.validateVal('Destination', this.state.Destination);
    if( checkStartDate && checkEndDate && checkOrigin && checkDestination){
        var output = {
            FirstName : this.state.FirstName,
            LastName : this.state.LastName,
            StartDate : this.state.StartDate,
            EndDate : this.state.EndDate,
            Origin : this.state.Origin,
            Destination : this.state.Destination
        };
        this.state.output.push(output);
        var data= JSON.stringify(this.state.output);
        localStorage.setItem('userData', data);
    }
}
 
showData(e){
    e.preventDefault();
    this.setState({showData: !(this.state.showData)});
}

clearData(e){
    e.preventDefault();
    this.setState({
        output:[],
        showData:false
    });
}

getValue(name){
    var formData= localStorage.getItem('formData');
    var obj= JSON.parse(formData);
    return obj[name];
}

render() {
return (
    <div>
      <Link className='home' to='/'>New User</Link>
      <div className='container'>
        <h1>Registration for Travelling</h1>
        <hr/>
        <Form>
            <Row marginWidth={50}>
            <Col smOffset={2} lgOffset={2} sm={4} lg={4}>
                <span><b>First Name : </b>{this.state.FirstName}</span>
            </Col>
            <Col sm={4} lg={4}>
                <span><b>Last Name: </b>{this.state.LastName}</span>
            </Col>
            </Row>
            <Row>
            <Col smOffset={2} lgOffset={2} sm={4} lg={4}>
                <FormGroup>
                <span><b>Start Date:</b></span>
                <FormControl type='date' name='StartDate' min= {today} onChange={this.onChange}/>
                <span className='error'>{this.state.errorStartDate}</span>
                </FormGroup>
            </Col>
            <Col sm={4} lg={4}>
                <FormGroup>
                <span><b>End Date:</b></span>
                <FormControl type='date' format='DD MM YYYY' name='EndDate' min={this.state.StartDate} onChange={this.onChange}/>
                <span className='error'>{this.state.errorEndDate}</span>
                </FormGroup>
            </Col>
            </Row>
            <Row>
            <Col  smOffset={2} lgOffset={2} sm={4} lg={4}>
                <FormGroup>
                <span><b>Origin:</b></span>
                <FormControl type='text' name='Origin' onChange={this.onChange}/>
                <span className='error'>{this.state.errorOrigin}</span>
                </FormGroup>
            </Col>
            <Col sm={4} lg={4}>
                <FormGroup>
                <span><b>Destination:</b></span>
                <FormControl type='text' name='Destination' onChange={this.onChange}/>
                <span  className='error'>{this.state.errorDestination}</span>
                </FormGroup>
            </Col>
            </Row>
            <Col smOffset={2} lgOffset={5} lg={1} >
                <Button bsStyle="primary" type='submit' marginHeight='5' onClick={this.validateForm}>Submit</Button>
                <hr/>
                <Button bsStyle="primary" type='submit' onClick={this.showData}>Show User Data</Button>
                <Button bsStyle="primary" type='submit' onClick={this.clearData}>Clear User Data</Button>
            </Col>
            <Userdata output= {this.state.output} showData={ this.state.showData }/>
        </Form>
      </div>
    </div>
   );
   }
}
export default Details;
