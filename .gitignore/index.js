import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Details from './Components/Details';
  
  
  import './App.css';
    
  class Root extends Component {
    render() {
      return (
        <Router>
       <div>
         <Route exact path="/" component={App}/>
         <Route path="/details" component={Details}/>
       </div>
     </Router>
      );
    }
  }

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
