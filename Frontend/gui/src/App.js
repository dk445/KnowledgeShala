import React, { Component } from 'react';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import LoginForm from './containers/Login';
import SignupForm from './containers/Signup';
import College from './containers/College';
import {reactLocalStorage} from 'reactjs-localstorage';
import {Link, Redirect} from 'react-router-dom';


class App extends Component {

  state={
    email:'',
    redirectTologin:false,
    redirectTocollege:false,
    clgAdminPwd:false
  }
  constructor(props) {
    super(props);
    this.state = {
      showLoginComponent: false,
      showSignupComponent: false,
      redirect: false
    };
    this._onButtonClick = this._onButtonClick.bind(this);
    this._onButton2Click = this._onButton2Click.bind(this);
    this._onButton3Click = this._onButton3Click.bind(this);
  }

  _onButtonClick() {
    this.setState({
      showLoginComponent: true,
      showSignupComponent: false,
      clgAdminPwd:false
    });
  }
  _onButton2Click() {
    this.setState({
      showLoginComponent: false,
      showSignupComponent: true,
      clgAdminPwd:false
    });
  }  
  _onButton3Click = () => {
    this.setState({
      showLoginComponent: false,
      showSignupComponent: false,
      clgAdminPwd:true
    })
  }

componentDidMount(){ 
      //var uniId = reactLocalStorage.get('uniId')
      if(reactLocalStorage.get('uniId')){
        if(reactLocalStorage.get('college') == "false"){
          this.setState({
            redirectTologin:true
          })
        }
        else{
          this.setState({
            redirectTocollege:true
          })
        }
      }
      else{
      
      window.location.hash="/";
      window.location.hash="Again-No-back-button";//again because google chrome don't insert first hash into history
      window.onhashchange=function(){window.location.hash="/";} 
      }//reactLocalStorage.clear();    
}


  render(){
      return (
        <div className="App">
          {this.state.clgRedirect?<Redirect to='/college'/>:null}
          {this.state.redirectTologin?<Redirect to='/feed'/>:null}
          {this.state.redirectTocollege?<Redirect to='/collegeAccount'/>:null}
          <br/><h1 style={{color:'rgb(232, 249, 246)', marginLeft:'5%'}}>Welcome To KnowledgeShala</h1>
          <hr style={{width:'110%',marginLeft:'-2%'}}/>
          <div style={{width:'110%',marginLeft:'-4%'}}>
            <button className="btn btn-link" style={{color:'#b4edf3', fontSize:'20px',fontWeight:'bold' , }} onClick={this._onButtonClick}>Login</button>
            <button className="btn btn-link" style={{color:'#b4edf3', fontSize:'20px',fontWeight:'bold' , }} onClick={this._onButton2Click}>Signup</button>
            <button className="btn btn-link" style={{color:'#b4edf3', fontSize:'20px',fontWeight:'bold' , }} onClick={this._onButton3Click}>College Authority</button>
          </div>
          <br/>
          <div>
            {this.state.showLoginComponent ?
            <LoginForm clg = "false"/>:
            null
            }
            {this.state.showSignupComponent ?
            <SignupForm/>:
            null
            }
            {this.state.clgAdminPwd ?
            <College/>:
            null
            }
          </div>
        </div>
      );
  }
}

export default App;
