import React from 'react';
import axios from 'axios';
import '../App.css';
import { Form, Icon, Input, Button,Spin,Checkbox } from 'antd';
import CollegeSignup from './CollegeSignup';
import CollegeRequests from './CollegeRequests';
import {reactLocalStorage} from 'reactjs-localstorage';
import {Link, Redirect} from 'react-router-dom';

class College extends React.Component{

    constructor(props){
        super(props);
        this.signupPage = this.signupPage.bind(this);
    }
    state = {
        email:'',
        password:'',
        toSignupPage:false,
        login:true,
        redirect:false
      }
    
      handleChange = event => {
        this.setState({ 
          password: event.target.elements.password.value,
         });
      }
    
      handleSubmit = (e) => {
        this.setState({
          msg:'',
          email: e.target.elements.emailId.value
        })
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
        axios.post('http://127.0.0.1:8000/api/college/signin',{
        email : e.target.elements.emailId.value,
        password : e.target.elements.password.value,
        })
        .then(res => {
        console.log(res.data);
        if(res.data == "True"){
            console.log('redirecting to feed');
            //console.log(emailId);
            reactLocalStorage.set('email',this.state.email);
            reactLocalStorage.set('college',true);
            console.log(reactLocalStorage.get('email'));
            this.setState({
                redirect:true
            })    
        }   
        else{
            this.setState({
                msg: 'Incorrecr email and/or password'
            })
        }
        }) 
        

    }

    signupPage(){
        this.setState({
            login:false,
            toSignupPage:true
        })
    }    
      
      
    
        render(){
            const { getFieldDecorator }  = this.props.form;
            return (
              <div>
              <h6 style={{color:'red'}}>{this.state.msg}</h6>  
              {this.state.redirect?<Redirect to="/collegeAccount"/>:null}  
              {this.state.toSignupPage?<CollegeSignup/>:null}
              <Form onSubmit={this.handleSubmit}>  
                
                    {this.state.login?
                    <div>                        
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
                        <h6>OR</h6><br/>
                        <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.signupPage}>
                                    Create College Account
                        </Button><br/>    

                    </div>:null}                    
                    
              </Form> 
                      
              </div>
            );
          }
}
const WrappedNormalLoginForm = Form.create()(College);
export default WrappedNormalLoginForm;