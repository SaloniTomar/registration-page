import React, { Component } from 'react';
import {Form, FormControl, Row, Col, FormGroup, Button} from 'react-bootstrap';
import createBrowserHistory from 'history/createBrowserHistory';

import '../App.css';


class App extends Component {
  constructor(){
    super();

    this.state = {
      FirstName: '',
      LastName: '',
      errorFirstName:'',
      errorLastName:''
    }
    this.validateForm=this.validateForm.bind(this);
    this.validateVal=this.validateVal.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  history = createBrowserHistory();

  onChange(e) {
    const validName=/^[a-zA-z]+$/;
    var fieldVal = e.target.value;
    var fieldName = e.target.name;
    this.setState({ 
      [fieldName]: fieldVal
     },
       () => {
      localStorage.setItem('formData', JSON.stringify(this.state)); 
    });

    this.validateVal(fieldName, fieldVal);
  }

  validateVal(fieldName, fieldVal){
    var validVal=/^[a-zA-Z ]+$/;
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
    var check1 = this.validateVal('FirstName', this.state.FirstName);
    var check2 = this.validateVal('LastName', this.state.LastName);

    if(check1 && check2){
      this.history.push("/details");
    }
    else{
      e.preventDefault();
    }
  }

  render() {
    return (
      <div className='container'>
        <h1>Registration for Travelling</h1>
        <hr/>
        <Form  inline>  
            <Row>
              <Col sm={4} lg={6}>
                <FormGroup>
                  <span><b>First Name:</b></span>
                  <FormControl type='text' name='FirstName' onChange={this.onChange}/>
                  <span className='error'>{this.state.errorFirstName}</span>
                </FormGroup>
              </Col>
              <Col sm={4} lg={6}>
                <FormGroup>
                  <span><b>Last Name:</b></span>
                  <FormControl type='text' name='LastName' onChange={this.onChange}/>
                  <span className='error'>{this.state.errorLastName}</span>
                </FormGroup>
              </Col>
            </Row>
            <Col smOffset={2} lgOffset={5} >
              <Button bsStyle="primary" type='submit' onClick={this.validateForm}>Submit</Button>
            </Col>
          </Form>
        </div>
      );
  }
}

export default App;
