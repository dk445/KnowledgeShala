import  React from 'react';
import {Form,Input,Tooltip,Icon,Select,Radio,Checkbox,Button,Spin} from 'antd';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import Collage from './College';

const { Option } = Select;

class CollegeSignup extends React.Component{

    state = {
        confirmDirty: false,
        msg:'',
        clgPortal: false,
        redirect:false,
        adminPwd:true,
        load:false
      };
    
      handleSubmit = e => {
        this.setState({
            msg:''
        })
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
          
        });          

  
       if(this.state.clgPortal){
            const clgEmail = e.target.elements.email.value
            const clgId = e.target.elements.clgid.value
            const clgName = e.target.elements.name.value
            const clgMobile = e.target.elements.mobile.value
            const clgCity = e.target.elements.city.value
            const clgPassword = e.target.elements.pwd.value
            
            if(clgMobile.length>10){
                this.setState({
                    msg:'mobile number is not valid'
                })
                return;
            }
            this.setState({
              load:true
            })
            axios.post('http://127.0.0.1:8000/signup/clg',{
              email : clgEmail,
              name : clgName,
              mobile : clgMobile,
              clgId : clgId,
              city : clgCity,
              password : clgPassword
            })
            .then(res => {
                console.log(res);
                console.log(res.data);
                if(res.data == "False"){
                    this.setState({
                        msg:'Error in Registration'
                    })
                }
                else{
                    this.setState({
                        clgPortal:false,
                        redirect:true
                    })
                  }
              })
            .the(res=>{
              this.setState({
                load:false
              })
            })
              
        }
        

        else{

            const   pwd = e.target.elements.adminPassword.value;
            if(pwd== "") return;
        
            axios.post('http://127.0.0.1:8000/request/college/auth',{
            adminPassword:pwd
            })
            .then(res => {
            console.log(res.data);
            if(res.data=="True"){
                this.setState({
                    msg:'',
                    adminPwd:false,
                    clgPortal:true
                })          
            }
            else{
                this.setState({
                msg: 'Incorrecr admin password'
                })
            }
        
            })  
            
        }
                
      };
    
      handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
      };
    
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
  
      componentDidMount(){
               
     
    }
    
      
    render() {
        const { getFieldDecorator } = this.props.form;        
    
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
        const tailFormItemLayout = {
          wrapperCol: {
            xs: {
              span: 24,
              offset: 0,
            },
            sm: {
              span: 16,
              offset: 8,
            },
          },
        };
        const prefixSelector = getFieldDecorator('prefix', {
          initialValue: '86',
        })(
          <Select style={{ width: 70 }}>
            <Option value="91">+91</Option>
            <Option value="63">+63</Option>
          </Select>,
        ); 
    
        
    
        return (
          <div>            
            {this.state.redirect?<Collage/>:null}
            <div style={{position:'absolute' , left:'48%' , top:'60%'}}>{this.state.load ? <Spin size="large" /> : null}</div>
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <h6 style={{color:'red'}}>{this.state.msg}</h6>            
            {!this.state.clgPortal ? <div>
                    {this.state.adminPwd ? <div>
                        <Form.Item name="adminPassword">
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please enter admin Password!' }],
                            })(
                                <Input
                                name="adminPassword"
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Admin Password"
                                />,
                            )}
                        </Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Submit
                        </Button><br/> 
                    </div>:null}</div>:    
                <div>
                <Form.Item
                    label={
                        <span>
                            College Name &nbsp;
                            <Tooltip title="your college name">
                            <Icon type="question-circle-o" />
                            </Tooltip>
                        </span>
                        }
                    >
                    {getFieldDecorator('nickname', {
                        rules: [{ required: true, message: 'Please input college name!', whitespace: true }],
                        })(<Input name='name'></Input>)}
                </Form.Item>


                <Form.Item label="E-mail" name='email'>
                    {getFieldDecorator('email', {
                    rules: [
                        {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                        },
                        {
                        required: true,
                        message: 'Please input your E-mail!',
                        },
                    ],
                    })(<Input name='email'></Input>)}
                </Form.Item>
                    
                <Form.Item label="College Id" name='clgid'>            
                    <Input name='clgid'/>            
                </Form.Item>
                
                <Form.Item label="Phone Number" name='mobile'>
                    {getFieldDecorator('phone', {
                    rules: [{ required: true, message: 'Please input your phone number!' }],
                    })(<Input name='mobile' addonBefore={prefixSelector} style={{ width: '100%' }} />)}
                </Form.Item>
    
                
  
                <Form.Item label="City" name='city'>            
                    <Input name='city'/>            
                </Form.Item>
  
  
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
              
  
                <Form.Item {...tailFormItemLayout}>
                    {getFieldDecorator('agreement', {
                    valuePropName: 'checked',
                    })(
                    <Checkbox>
                        I have read the <a href="">agreement</a>
                    </Checkbox>,
                    )}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                    Register
                    </Button>
                </Form.Item>
                </div>}
            </Form>
            
          </div>
        );
      }

}
const WrappedSignupForm = Form.create()(CollegeSignup);
  export default WrappedSignupForm;