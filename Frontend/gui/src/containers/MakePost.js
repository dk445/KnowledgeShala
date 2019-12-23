import React from 'react';
import axios from 'axios';
import '../App.css';
import { Layout, List, Avatar , Form , Input , Button,Spin} from 'antd';
import Sidenav from '../components/Sidenav';
import {Redirect} from 'react-router-dom';
import {reactLocalStorage} from 'reactjs-localstorage';
import Header from '../components/Header';
import Footer from '../components/Footer';
const { Content} = Layout;
const { TextArea } = Input;


class MakePost extends React.Component{


    state={
        loggedinuser : '',
        desc: '',
        redirect: false,
        load:false
    }

    handleSubmit = e => {
        this.setState({
            load :true
        })
        e.preventDefault();
        const desc = e.target.elements.desc.value;
        
        if(desc=="") return;

        console.log(desc);
        axios.post('http://127.0.0.1:8000/feed/post/',{
            email : reactLocalStorage.get('email'),
            desc: desc
        }).then(res=>{
            console.log(res.data);
            if(res.data=="success"){
                this.setRedirect();
            }
            else{
                console.log('failed to post');
            }
        })
        this.setState({
            load :false,
        })
    }

    setRedirect = () => {
        this.setState({
          redirect: true
        })
      }

    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/feed'/>
        }
    }

    render() {
        return(
            <div>
            {this.renderRedirect()}
            <Layout>
            <Sidenav  navPosition={'3'}/>
            <Layout style={{ marginLeft: 200 }}>
            <Header/>
            <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div style={{position:'absolute' , left:'57%' , top:'40%'}}>{this.state.load ? <Spin size="large" /> : null}</div>
                <div style={{ padding: 24, background: '#fff', textAlign: 'left' , marginLeft: '60px'}}> 
                
            <Form onSubmit={this.handleSubmit}  > 
                <Form.Item name = "desc">
                <b>Post content</b>
                        <TextArea name="desc" rows={4}/>

                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Post
                    </Button>
                </Form.Item>
            </Form>
            </div>
                </Content>
                <Footer/>
                </Layout>
            </Layout>        
            </div>
        );
    }


}

export default MakePost;