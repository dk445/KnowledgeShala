import React from 'react';
import axios from 'axios';
import { Form, Icon, Input, Button } from 'antd';
import {Redirect} from 'react-router-dom';
import {reactLocalStorage} from 'reactjs-localstorage';

import {createReactClass} from 'create-react-class';


var createClass = require('create-react-class');

var Otp = createClass({
    render: function() {
//        const { getFieldDecorator }  = this.props.form;
        return(
            <div>
                <Form onSubmit={this.otpsubmit}>
                    <Form.Item name = "otp" >
                           <Input
                            required
                            name="OTP"
                            prefix={<Icon type="form" style={{ color: 'rgba(0,0,0,.25)'}} />}
                            placeholder="OTP"
                            />
                        
                    </Form.Item>
                    <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Submit
                    </Button><br/>
                    
                    </Form.Item>
                </Form>
            </div>
            
        );
    }
});

export default Otp;