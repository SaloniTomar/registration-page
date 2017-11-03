import React, { Component } from 'react';
import {Form, FormControl, Row, Col, FormGroup, Button} from 'react-bootstrap';
import moment from 'moment'
import {Link} from 'react-router-dom';
import '../App.css';

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
        startdate:moment(),
        errorStartDate:'',
        errorEndDate:'',
        errorOrigin:'',
        errorDestination:'',
        output:''
    };
    this.getValue=this.getValue.bind(this);
    this.onChange=this.onChange.bind(this);
    this.validateField=this.validateField.bind(this);
    this.validateForm=this.validateForm.bind(this);
}

onChange(e) {
    var fieldVal = e.target.value;
    console.log(fieldVal);
    var fieldName = e.target.name;
    this.setState( { [fieldName]: fieldVal});
    if(fieldName==='Origin'|| fieldName==='Destination'){
        var validVal=/[a-zA-Z]/;
    }
    else{
        validVal= /^20(1?[7-9]|2[0-9])[/-](0?[1-9]|1[012])[/-](0?[1-9]|[12][0-9]|3[01])$/;
    }
    var errorField='error'+fieldName;
    if(!validVal.test(fieldVal)){
       this.setState({
       [errorField]: 'Enter valid values'
      });
    }
    else{
      this.setState({
        [errorField]: ''
       });
    }
}

validateField(fieldName){
    if(fieldName==='Origin'|| fieldName==='Destination'){
        var validVal=/[a-zA-Z]/;
    }
    else{
        validVal= /^20(1?[7-9]|2[0-9])[/-](0?[1-9]|1[012])[/-](0?[1-9]|[12][0-9]|3[01])$/;
    }
    var fieldVal = this.state[fieldName];
    var errorField='error'+fieldName;
    if(!validVal.test(fieldVal)){
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
    var checkStartDate = this.validateField('StartDate');
    var checkEndDate = this.validateField('EndDate');
    var checkOrigin = this.validateField('Origin');
    var checkDestination = this.validateField('Destination');
    if( checkStartDate && checkEndDate && checkOrigin && checkDestination){
        var output = {
            FirstName : this.state.FirstName,
            LastName : this.state.LastName,
            StartDate:this.state.StartDate,
            EndDate:this.state.EndDate,
            Origin:this.state.Origin,
            Destination:this.state.Destination,
        };

        this.setState({output:JSON.stringify(output)})
    }
    else{
        this.setState({disabledStatus: true });
    }
}
getValue(name){
    var formData= localStorage.getItem('formData');
    var obj= JSON.parse(formData);
    return obj[name];
}

render() {
return (
    <div>
      <Link className='home' to='/'>Home</Link>
      
      <div className='container'>
      <h1>Registration for Travelling</h1>
      <hr/>
        <Form>
        <Row marginWidth={50}>
          <Col sm={4} lg={4}>
            <span><b>First Name : </b>{this.state.FirstName}</span>
          </Col>
          <Col sm={4} lg={4}>
            <span><b>Last Name: </b>{this.state.LastName}</span>
          </Col>
        </Row>
        <Row>
        <Col sm={4} lg={4}>
          <FormGroup>
            <span><b>Start Date:</b></span>
            <FormControl type='date' name='StartDate' onChange={this.onChange}/>
            <span className='error'>{this.state.errorStartDate}</span>
          </FormGroup>
          </Col>
          <Col sm={4} lg={4}>
          <FormGroup>
            <span><b>End Date:</b></span>
            <FormControl type='date' name='EndDate' onChange={this.onChange}/>
            <span className='error'>{this.state.errorEndDate}</span>
          </FormGroup>
          </Col>
        </Row>
        <Row>
            <Col sm={4} lg={4}>
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
        <Button bsStyle="primary" type='submit' onClick={this.validateForm}>Submit</Button>
        <p>{this.state.output}</p>
      </Form>
    </div>
</div>
);
}
}

export default Details;