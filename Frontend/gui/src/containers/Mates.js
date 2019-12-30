import React from 'react';
import axios from 'axios';
import '../App.css';
import { Layout, Menu, Icon, List, Avatar , Spin } from 'antd';
import {Link} from 'react-router-dom';
import Sidenav from '../components/Sidenav';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {reactLocalStorage} from 'reactjs-localstorage';
const {Content } = Layout;

class Mates extends React.Component{    
    
    state = {
        mates : [],
        loggedinuser :'',
        load:true
    }

    componentDidMount() {

        axios.post('http://127.0.0.1:8000/mates/',{
            email: reactLocalStorage.get('email')
        })
        .then(res => {
            
            console.log(res.data);
            this.setState({
                mates : res.data,
                load:false
            })
        })
    }
    

    render(){
        return(
            <Layout>
                <Sidenav  navPosition={'6'} email ={this.state.loggedinuser}/>
                
                <Layout style={{ marginLeft: 200 }}>
                <Header/>
                <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                
                    <div style={{ padding: 24, background: '#fff', textAlign: 'left' , marginLeft: '60px'}}> 
                    <div style={{position:'absolute' , left:'57%' , top:'40%'}}>{this.state.load ? <Spin size="large" /> : null}</div>                                           
                        <List
                            itemLayout="horizontal"
                            dataSource={this.state.mates}
                            renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                //avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title={<Link to={{
                                        pathname:"/account",
                                        state:{
                                            email : item.mateEmail,                                            
                                        }
                                    }}>{item.mateName}</Link>}                          
                                    description= {'College: '+item.mateClg + ' Department : ' +item.mateDept} //{item.mateClg}
                                />                
                            </List.Item>
                            )}
                        />                                                
                    </div>
                </Content>
                <Footer/>
                </Layout>
            </Layout>        
        );
    }
}

export default Mates;