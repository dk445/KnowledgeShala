import  React from 'react';
import {Form,Input,Tooltip,Icon,Select,Radio,Checkbox,Button,Spin} from 'antd';
import axios from 'axios';
  
  const { Option } = Select;
  
  
  class SignupForm extends React.Component {
    
    constructor(props){
      super(props);
      this.state = {
        confirmDirty: false,
        ClgList: [],
        DeptList:[],
        lable:'',
        value:'',
        load:false,
        msg:''        
      };
      this.onCollegeChange=this.onCollegeChange.bind(this);
    }
    
    onCollegeChange(e){
      const deptList = []
      this.setState({
        load:true
      })
      axios.post('http://127.0.0.1:8000/get/clg-dept',{
        clgName : e.target.value
      }).then(res=> {
         console.log(res.data);
         for(var i=0 ; i< res.data.length ;i++){
           deptList.push({
             label : res.data[i].deptId +' - '+res.data[i].deptName,
             value: res.data[i].deptId
           })
         } 
          console.log(deptList)
         this.setState({
              DeptList:deptList,
              load:false
           })
       })
    }
  
    handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
        
      });


    
      const emailId = e.target.elements.email.value
      const sname = e.target.elements.name.value
      const smobile = e.target.elements.mobile.value
      const sclgName = e.target.elements.clgName.value
      const sdeptId = e.target.elements.deptId.value
      const srole = e.target.elements.role.value
      const spassword = e.target.elements.pwd.value
      
      console.log(sdeptId);
      console.log(sclgName)

      this.setState({
        load:true
      })

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
      if(res.data=='True'){
        this.setState({
          msg:'Registered successfully'
        })
          alert('Regstration successfull');
        

      }
      else{
        this.setState({
          msg:'Error in registration!'
        })
          alert('Regstration Failed');        
      }
      this.setState({
        load:false,
        msg:true
      })
    })
    .then(res=>{
      return window.location.reload();    
    })
          
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
       const clgList = []
       this.setState({
         load:true
       })
       axios.get('http://127.0.0.1:8000/get/clg').then(res=> {
         console.log(res.data);
         for(var i=0 ; i< res.data.length ;i++){
           clgList.push({
             label : res.data[i].clgId + ' - ' + res.data[i].label + '  '+ res.data[i].city,
             value: res.data[i].value
           })
         } 
          console.log(clgList)
         this.setState({
             ClgList:clgList,
             load:false
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
        initialValue: '91',
      })(
        <Select style={{ width: 70 }}>
          <Option value="86">+86</Option>
          <Option value="63">+63</Option>
        </Select>,
      ); 
  
      
  
      return (
        <div>
          <h6 style={{color:'red'}}>{this.state.msg}</h6> 
          <div style={{position:'absolute' , left:'48%' , top:'60%'}}>{this.state.load ? <Spin size="large" /> : null}</div> 
          <Form {...formItemLayout} onSubmit={this.handleSubmit} style={{fontSize:'20px'}}>
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
              })(<Input style={{'marginLeft':'10px'}} name='email'></Input>)}
            </Form.Item>

            <Form.Item style={{marginTop:'-20px'}}
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
              })(<Input style={{'marginLeft':'10px'}} name='name'></Input>)}
            </Form.Item>

            <Form.Item label="Phone Number" name='mobile' style={{marginTop:'-20px'}}>
              {getFieldDecorator('phone', {
                rules: [{ required: true, message: 'Please input your phone number!' }],
              })(<Input  name='mobile' addonBefore={prefixSelector} style={{ width: '100%' , marginLeft:'10px'}} />)}
            </Form.Item>
          
            <Form.Item label="College" name='clgName' style={{marginTop:'-20px'}}>    
                  <select style={{'marginLeft':'10px'}} name = 'clgName' onChangeCapture={this.onCollegeChange}>
                    {this.state.ClgList.map(function(data,label){return(
                    <option key={label} value={data.value} >{data.label}</option>
                    )})}
                  </select>                                  
            </Form.Item>

            
            <Form.Item label="Department" name='deptId' style={{marginTop:'-20px'}}>                     
                  <select name = 'deptId'>
                    {this.state.DeptList.map(function(data,label){return(
                    <option key={label} value={data.value}>{data.label}</option>
                    )})}
                  </select>

            </Form.Item>

            

            <Form.Item label="Role" style={{marginTop:'-20px'}}>            
              <Radio.Group name='role' defaultValue={0}>
                  <Radio value={0}>Student</Radio>
                  <Radio value={1}>Instructor</Radio>
              </Radio.Group>                        
            </Form.Item>


            <Form.Item label="Password" name='pass' hasFeedback style={{marginTop:'-20px'}}>
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
              })(<Input.Password style={{'marginLeft':'10px'}} name='pwd'/>)}
            </Form.Item>

            <Form.Item label="Confirm Password" hasFeedback style={{marginTop:'-20px'}}>
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
              })(<Input.Password style={{'marginLeft':'10px'}} onBlur={this.handleConfirmBlur} />)}
            </Form.Item>
            

            <Form.Item {...tailFormItemLayout} style={{marginTop:'-20px'}}>
              {getFieldDecorator('agreement', {
                valuePropName: 'checked',
              })(
                <Checkbox>
                  I have read the <a href="">agreement</a>
                </Checkbox>,
              )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout} style={{marginTop:'-20px'}}>
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

  
  