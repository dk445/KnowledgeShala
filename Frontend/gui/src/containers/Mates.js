import React from 'react';
import axios from 'axios';
import '../App.css';
import { Layout, Menu, Icon, List, Avatar } from 'antd';
import Sidenav from '../components/Sidenav';
import { Link } from 'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;

class Mates extends React.Component{    
    
    state = {
        mates : [],
        loggedinuser :''
    }

    componentDidMount() {
        this.setState({
            loggedinuser : this.props.email
        })
        console.log(this.state.loggedinuser);
        axios.post('http://127.0.0.1:8000/mates/',{
            email: this.state.loggedinuser
        })
        .then(res => {
            
            console.log(res.data);
            this.setState({
                mates : res.data
            })
        })
    }
    

    render(){
        return(
            <Layout>
                <Sidenav  navPosition={'4'}/>
                
                <Layout style={{ marginLeft: 200 }}>
                <Header style={{  background: '#fff', padding: 0 ,textAlign:'center',fontSize:'50px'}} > KnowledgeShala</Header>
                <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                    <div style={{ padding: 24, background: '#fff', textAlign: 'left' , marginLeft: '60px'}}>                        
                        <List
                            itemLayout="horizontal"
                            dataSource={this.state.mates}
                            renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                //avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title={<a href="https://ant.design">{item.mateName}</a>}                          
                                    description= {item.mateEmail + item.mateClg} //{item.mateClg}
                                />                
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

export default Mates;