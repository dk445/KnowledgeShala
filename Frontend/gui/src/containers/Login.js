
import  React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import {reactLocalStorage} from 'reactjs-localstorage';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Homscreen from './Homscreen';



class LoginForm extends React.Component {

  state = {
    email:'',
    password:'',
    redirect: false
  }

  handleChange = event => {
    this.setState({ 
      email: event.target.elements.emailId.value,
      password: event.target.elements.password.value,
     });
  }
  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });

    const   emailId = e.target.elements.emailId.value;
    const   pwd = e.target.elements.password.value;
    if(emailId=="" || pwd== "") return;

    console.log(emailId , pwd);
    

    axios.post('http://127.0.0.1:8000/api/signin/',{
      email : emailId,
      password : pwd
     })
    .then(res => {
      console.log(res);
      console.log(res.data);
      if(res.data == "login success"){
        console.log('redirecting to feed');
        console.log(emailId);
        reactLocalStorage.set('email',emailId);
        console.log(reactLocalStorage.get('email'));
        this.setRedirect();
        
      }
      else{
        window.location.reload();
      }

    })  

  };
  
  
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/feed'/>
    }
  }

      render(){
        const { getFieldDecorator }  = this.props.form;
        return (
          <div>
          {this.renderRedirect()}
          <Form onSubmit={this.handleSubmit}  >  
            <Form.Item name = "emailId">
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input
                  name="emailId"
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)'}} />}
                  placeholder="Email"
                />,
              )}
            </Form.Item>
            <Form.Item name="password">
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input
                  name="password"
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox>Remember me</Checkbox>)}
              <a className="login-form-forgot" href="/forgot">
                Forgot password
              </a><br/>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button><br/>
             
            </Form.Item>
          </Form>
          </div>
        );
      }  
}

const WrappedNormalLoginForm = Form.create()(LoginForm);
export default WrappedNormalLoginForm;