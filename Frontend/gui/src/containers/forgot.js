import React from 'react';
import axios from 'axios';
import { Form, Icon, Input, Button,Spin } from 'antd';
import {Redirect} from 'react-router-dom';
import {reactLocalStorage} from 'reactjs-localstorage';
import LoginForm from './Login';
import {createReactClass} from 'create-react-class';
import Otp from '../components/Otp';
import ForgotEmail from '../components/ForgotEmail';
class Forgot extends React.Component{



    state = {
        showotp:false,
        showemail:true,
      }

    handleSubmit = e => {
        console.log('in handle');
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
    
        const   emailId = e.target.elements.emailId.value;
    
        console.log(emailId)
        
        if(this.state.showotp){         
            console.log(e.target.elements.otp.value);
            console.log(reactLocalStorage.get('otp'))
            if(e.target.elements.otp.value === reactLocalStorage.get('otp')){
                console.log('correct');
                this.setState({
                    showotp:false,
                    showemail:false
                })
            }
            else{
                console.log('wrong');
            }
        }

        else{
            axios.post('http://127.0.0.1:8000/api/signin/forgot',{
            email : emailId,
            })
            .then(res => {
            console.log(res);
            console.log(res.data);
            reactLocalStorage.set('otp',res.data);
            this.setState({
                showotp:true
            });            
            }) 
            
        }
    };      
   

render(){
    const { getFieldDecorator }  = this.props.form;
    var createReactClass = require('create-react-class');


    var Otp = createReactClass({
        render: function() {
            //const { getFieldDecorator }  = this.props.form;
            return(
                
                    
                          <Form.Item name = "otp">
                            <Input
                                required
                                name="otp"
                                prefix={<Icon type="form" style={{ color: 'rgba(0,0,0,.25)'}} />}
                                placeholder="Enter OTP sent to your above email"
                            />
                        </Form.Item>
                    
                    
                
                
            );
        }
    });

    var ForgotEmail = createReactClass({
        render: function() {
            //const { getFieldDecorator }  = this.props.form;
            return(
                
                    
                          <Form.Item name = "emailId">
                                {getFieldDecorator('username', {
                                    rules: [{ required: true, message: 'Please input your email!' }],
                                })(
                                    <Input
                                    name="emailId"
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)'}} />}
                                    placeholder="Email"
                                    />,
                                )}
                            </Form.Item>
                    
                    
                
                
            );
        }
    });


    return(
        
            
            <Form onSubmit={this.handleSubmit}>  
                
                    {this.state.showemail ? <ForgotEmail/> : <h1></h1>}
                
                
                    {this.state.showotp ? <Otp name = "otp" /> : <h1></h1>}
                
                <Form.Item>
                <Button  type="primary" htmlType="submit" className="login-form-button">
                    Submit
                </Button><br/>
                
                </Form.Item>
            </Form>

        

    );
        
    

}

}
const WrappedNormalForgot = Form.create()(Forgot);
export default WrappedNormalForgot;