import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import LoginForm from './containers/Login';
import SignupForm from './containers/Signup';
import {reactLocalStorage} from 'reactjs-localstorage';
import {Link} from 'react-router-dom';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showLoginComponent: false,
      showSignupComponent: false,
    };
    this._onButtonClick = this._onButtonClick.bind(this);
    this._onButton2Click = this._onButton2Click.bind(this);
  }

  state={
    email:'',
    redirect:false
  }
  _onButtonClick() {
    this.setState({
      showLoginComponent: true,
      showSignupComponent: false,
    });
  }
  _onButton2Click() {
    this.setState({
      showLoginComponent: false,
      showSignupComponent: true,
    });
  }
  
  

componentDidMount(){ 
      if(reactLocalStorage.get('email')){
        this.setState({
          redirect:true
        })
      }
      window.location.hash="/";
      window.location.hash="Again-No-back-button";//again because google chrome don't insert first hash into history
      window.onhashchange=function(){window.location.hash="/";} 
      reactLocalStorage.clear();    
}


  render(){
      return (
        <div className="App">
          {this.state.redirect ? <Link to="/feed"></Link> : null}
          <h1>Welcome to KNOWLEDGESHALA</h1>
          <br/>
          <button className="btn btn-link" onClick={this._onButtonClick}>Login</button>
          <button className="btn btn-link" onClick={this._onButton2Click}>Signup</button>
          <br/>        <br/>
          <div>
            {this.state.showLoginComponent ?
            <LoginForm/>:
            null
            }
            {this.state.showSignupComponent ?
            <SignupForm/>:
            null
            }
          </div>
        </div>
      );
  }
}

export default App;
