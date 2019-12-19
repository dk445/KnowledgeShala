import React from 'react';
import axios from 'axios';
import '../App.css';
import { Layout, List, Avatar , Form , Input , Button} from 'antd';
import Sidenav from '../components/Sidenav';
import {Redirect} from 'react-router-dom';
import {reactLocalStorage} from 'reactjs-localstorage';
const { Header, Content, Footer, Sider } = Layout;
const { TextArea } = Input;


class MakePost extends React.Component{


    state={
        loggedinuser : '',
        desc: '',
        redirect: false
    }

    handleSubmit = e => {
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
            <Header style={{  background: '#00152A', padding: 0 ,textAlign:'center',fontSize:'50px' ,color:'white'}} > KnowledgeShala</Header>
            <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                <div style={{ padding: 24, background: '#fff', textAlign: 'left' , marginLeft: '60px'}}> 

            <Form onSubmit={this.handleSubmit}  > 
                <Form.Item name = "desc">

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
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>        
            </div>
        );
    }


}

export default MakePost;