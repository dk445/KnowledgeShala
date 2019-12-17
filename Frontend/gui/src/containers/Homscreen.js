import React from 'react';
import axios from 'axios';
import '../App.css';
import { Layout, Menu, Icon, List, Avatar } from 'antd';
import Sidenav from '../components/Sidenav';
import history from '../history';
import{ Link } from 'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;


class Homescreen extends React.Component{    
    
    state = {
        posts : [],
        loggedinuser : ''
    }

    componentDidMount() {

        this.setState({
            loggedinuser : this.props.location.email
        })
        console.log(this.state.loggedinuser);
        axios.post('http://127.0.0.1:8000/feed/',{
            email: this.state.loggedinuser
        })
        .then(res => {
            
            console.log(res.data);
            this.setState({
                posts : res.data
            })
        })
    }    

  

    render(){
        return(
            <Layout>
                <Sidenav navPosition={'2'}/>
                <Layout style={{ marginLeft: 200 }}>
                <Header style={{  background: '#fff', padding: 0 ,textAlign:'center',fontSize:'50px'}} > KnowledgeShala</Header>
                <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                    <div style={{ padding: 24, background: '#fff', textAlign: 'left', marginLeft:'60px', marginRight:'110px' }}>                        
                        
                   
                        
                    <List
                        itemLayout="vertical"
                        size="large"
                        pagination={{
                        onChange: page => {
                            console.log(page);
                        },
                        pageSize: 4 ,
                        }}
                        dataSource={this.state.posts}
                        footer={
                        <div>
                            
                        </div>
                        }
                        renderItem={item => (
                        <List.Item
                            key={item.owner}
                            actions={[
                            
                            ]}
                            //extra={
                            
                            //}
                        >
                            <List.Item.Meta
                            //avatar={<Avatar src={item.avatar} />}
                                title={item.owner}
                                description={item.createDate + ' '+ item.createTime}
                            />
                                {item.description}
                            </List.Item>
                        )}
                    />                                     
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>        
        );
    }
}

export default Homescreen;  

