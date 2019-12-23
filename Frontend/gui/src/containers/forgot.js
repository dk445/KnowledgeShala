import React from 'react';
import axios from 'axios';
import '../App.css';
import { Form, Icon, Input, Button,Spin } from 'antd';
import {Redirect} from 'react-router-dom';
import {reactLocalStorage} from 'reactjs-localstorage';
import LoginForm from './Login';
import {createReactClass} from 'create-react-class';
import {Link} from 'react-router-dom';

class Forgot extends React.Component{



    state = {
        showotp:false,
        showemail:true,
        pwdreset:false,
        redirect:false
      }
    compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!');
    } else {
        callback();
    }
    };

    validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
    }
    callback();
    };

    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    handleSubmit = e => {
        console.log('in handle');
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
    
        
        
        if(this.state.showotp){
            const   emailId = e.target.elements.emailId.value;
            console.log(emailId)         
            console.log(e.target.elements.otp.value);
            console.log(reactLocalStorage.get('otp'))
            if(e.target.elements.otp.value === reactLocalStorage.get('otp')){
                console.log('correct');
                this.setState({
                    showotp:false,
                    showemail:false,
                    pwdreset:true
                })
                reactLocalStorage.set('email',emailId);
            }
            else{
                console.log('wrong');
            }
        }
        else if(this.state.pwdreset){
            console.log(e.target.elements.pwd.value);
            axios.post('http://127.0.0.1:8000/api/signin/forgot/reset',{
            email : reactLocalStorage.get('email'),
            password : e.target.elements.pwd.value
            })
            .then(res=>{
                console.log(res.data);
                this.setState({
                    redirect:true
                })
            })

        }

        else{
            const   emailId = e.target.elements.emailId.value;
            console.log(emailId)
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
    //const { getFieldDecorator }  = this.props.form;
    var createReactClass = require('create-react-class');


    var Otp = createReactClass({
        render: function() {
            //const { getFieldDecorator }  = this.props.form;
            return(
                
            <div>{this.state.redirect ? <Link to="/#"/>:null}
                          <Form.Item name = "otp">
                            <Input
                                required
                                name="otp"
                                prefix={<Icon type="form" style={{ color: 'rgba(0,0,0,.25)'}} />}
                                placeholder="Enter OTP sent to your above email"
                            />
                        </Form.Item>
                    
                        </div>
                
                
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

    var PwdReset = createReactClass({
        render: function() {
            
            
            return(
                        
                <div>
                    <Form.Item label="Password" name='pwd' hasFeedback>
                        {getFieldDecorator('password', {
                            rules: [
                                {
                                required: true,
                                message: 'Please input your password!',
                                },
                                {
                                validator: this.validateToNextPassword,
                                },
                            ],
                            })(<Input.Password  name='pwd'/>)}
                    </Form.Item>

                    <Form.Item label="Confirm Password" hasFeedback>
                        {getFieldDecorator('confirm', {
                            rules: [
                                {
                                required: true,
                                message: 'Please confirm your password!',
                                },
                                {
                                validator: this.compareToFirstPassword,
                                },
                            ],
                        })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                    </Form.Item>                   
                </div>  
                
            );
        }
    });

    const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },     
        },
      };  
    const { getFieldDecorator }  = this.props.form;

    return(

            <div className="App">
                <h1>Welcome to KNOWLEDGESHALA</h1>
                <br/>
                <Form  {...formItemLayout} onSubmit={this.handleSubmit} style={{marginLeft:'90px',marginRight:'5px'}}>  
                        {this.state.pwdreset ? <PwdReset/> : <h1></h1>}
                    
                        {this.state.showemail ? <ForgotEmail/> : <h1></h1>}
                    
                    
                        {this.state.showotp ? <Otp name = "otp" /> : <h1></h1>}
                    
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Submit
                        </Button><br/>                    
                    </Form.Item>
                </Form>
            </div>

    );
        
    

}

}
const WrappedNormalForgot = Form.create()(Forgot);
export default WrappedNormalForgot;