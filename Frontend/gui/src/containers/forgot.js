import React from 'react';
import axios from 'axios';
import '../App.css';
import { Form, Icon, Input, Button,Spin } from 'antd';
import {reactLocalStorage} from 'reactjs-localstorage';
import {Link} from 'react-router-dom';

class Forgot extends React.Component{

    state = {
        showotp:false,
        showemail:true,
        pwdreset:false,
        redirect:false,
        load:false,
        msg:""
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
        this.setState({
            load:true,
            msg:""
        })
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

            axios.post('http://127.0.0.1:8000/api/signin/forgot/verifyOtp',{
                email : emailId,
                otp : e.target.elements.otp.value
            })
            .then(res => {
                console.log(res.data)
                if(res.data == "True"){
                    console.log('correct');
                    this.setState({
                        showotp:false,
                        showemail:false,
                        pwdreset:true,
                        load:false
                    })
                    reactLocalStorage.set('email',emailId);
                }
                else{
                    this.setState({
                        msg:"Wrong Otp",
                        load:false
                    })
                }
            })
            
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
                    redirect:true,
                    load:false
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
                if(res.data == "True"){
                    this.setState({
                        showotp:true,
                        load:false
                    });            
                }
                else{
                    this.setState({
                        msg:"User not found",
                        load:false
                    })
                }
            }) 
            
        }
        
    };      
   

render(){
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
                <div style={{position:'absolute' , left:'57%' , top:'40%'}}>
                    {this.state.load ? <Spin size="large" /> : null}
                </div>                                           
                {this.state.redirect ? <Link to="/#"/>:null}
                <h1>Welcome to KNOWLEDGESHALA</h1><hr/>
                <br/><br/>
                <Form  onSubmit={this.handleSubmit} >  
                        
                        <h6 color="red">{this.state.msg}</h6>
                        {this.state.pwdreset ?                             
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

                        : null}


                    
                        {this.state.showemail ?                         
                            <div>
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
                            </div>

                        : null}
                    
                    
                        {this.state.showotp ?                        
                            <div>
                                <Form.Item name = "otp">
                                    <Input
                                        required
                                        name="otp"
                                        prefix={<Icon type="form" style={{ color: 'rgba(0,0,0,.25)'}} />}
                                        placeholder="Enter OTP sent to your above email"
                                    />
                                </Form.Item>                        
                            </div>
                        : null}
                    

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