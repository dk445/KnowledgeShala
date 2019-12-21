import  React from 'react';
import {Form,Input,Tooltip,Icon,Menu,Cascader,Select,Radio,Col,Checkbox,Button,AutoComplete,DropDown} from 'antd';
import axios from 'axios';
  
  const { Option } = Select;
  
  
  class SignupForm extends React.Component {
    state = {
      confirmDirty: false,
      ClgList: [],
      lable:'',
      value:''
    };
  
    handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
        
      });


    try{
      const emailId = e.target.elements.email.value
      const sname = e.target.elements.name.value
      const smobile = e.target.elements.mobile.value
      const sclgName = e.target.elements.clgName.value
      const sdeptId = e.target.elements.deptId.value
      const srole = e.target.elements.role.value
      const spassword = e.target.elements.pwd.value
    


      axios.post('http://127.0.0.1:8000/',{
        email : emailId,
        name : sname,
        mobile : smobile,
        clgName: sclgName,
        deptId: sdeptId,
        role: srole,
        password : spassword
     })
    .then(res => {
      console.log(res);
      console.log(res.data);
    })
   
    }catch  (error){
      return;
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
       const List = []
       const obj = {
         label:'',
         value:''
       }
       axios.get('http://127.0.0.1:8000/get/clg').then(res=> {
         console.log(res.data);
         for(var i=0 ; i< res.data.length ;i++){
           List.push({
             label : res.data[i].clgId + ' - ' + res.data[i].label + '  '+ res.data[i].city,
             value: res.data[i].value
           })
         } 
          console.log(List)
         this.setState({
             ClgList:List
           })
       })       
   
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
          
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
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

            <Form.Item
              label={
                <span>
                  Fullname&nbsp;
                  <Tooltip title="your name including surname">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              }
            >
              {getFieldDecorator('nickname', {
                rules: [{ required: true, message: 'Please input your name!', whitespace: true }],
              })(<Input name='name'></Input>)}
            </Form.Item>

            <Form.Item label="Phone Number" name='mobile'>
              {getFieldDecorator('phone', {
                rules: [{ required: true, message: 'Please input your phone number!' }],
              })(<Input name='mobile' addonBefore={prefixSelector} style={{ width: '100%' }} />)}
            </Form.Item>

            <Form.Item label="College" name='clgName'>       
                  {getFieldDecorator('residence', {
                    initialValue: ['zhejiang', 'hangzhou', 'xihu'],
                    rules: [
                      { type: 'array', required: true, message: 'Please select your college' },
                    ],
                  })(<Cascader options={this.state.ClgList} />)}
            </Form.Item>


            <Form.Item label="Department Id" name='deptId'>            
                <Input name='deptId'/>            
            </Form.Item>


            <Form.Item label="Role">            
              <Radio.Group name='role' defaultValue={0}>
                  <Radio value={0}>Student</Radio>
                  <Radio value={1}>Instructor</Radio>
              </Radio.Group>                        
            </Form.Item>


            <Form.Item label="Password" name='pass' hasFeedback>
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
          </Form>
        </div>
      );
    }
  }
  
  const WrappedSignupForm = Form.create()(SignupForm);
  export default WrappedSignupForm;

  
  