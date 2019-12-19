import React from 'react';
import axios from 'axios';
import { Form, Icon, Input, Button } from 'antd';
import {Redirect} from 'react-router-dom';
import {reactLocalStorage} from 'reactjs-localstorage';

import {createReactClass} from 'create-react-class';


var createClass = require('create-react-class');


var ForgotEmail = createClass({
    render: function() {
        //const { getFieldDecorator }  = this.props.form;
        return(
            <div>
                <Form onSubmit={this.handleSubmit} >  
                    <Form.Item name = "emailId" >
                    <Input
                        name="emailId"
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)'}} />}
                        placeholder="Email"
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

export default ForgotEmail;