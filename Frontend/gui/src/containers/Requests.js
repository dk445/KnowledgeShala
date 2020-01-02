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

class Requests extends React.Component{    
    
    state = {
        req : [],
        loggedinuser :'',
        load:true,
    }

    componentDidMount() {

        axios.post('http://127.0.0.1:8000/request/displayReq',{
            uniId: reactLocalStorage.get('uniId')
        })
        .then(res => {
            
            console.log(res.data);
            this.setState({
                req : res.data,
                load:false
            })
        })
    }
    

    render(){
        return(
            <Layout>
                <Sidenav  navPosition={'4'} email ={this.state.loggedinuser}/>
                
                <Layout style={{ marginLeft: 200 }}>
                <Header/>
                <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                
                    <div style={{ padding: 24, background: '#fff', textAlign: 'left' , marginLeft: '60px'}}> 
                    <div style={{position:'relative' , left:'48%' , top:'100 px'}}>{this.state.load ? <Spin size="large" /> : null}</div>                                           
                        <List
                            itemLayout="horizontal"
                            dataSource={this.state.req}
                            renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                //avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title={<Link to={{
                                        pathname:"/account",
                                        state:{
                                            email : item.email,
                                        }
                                    }}>{item.name}</Link>}                          
                                    description= {'College: '+item.clgName + ' Department : ' +item.deptName} //{item.mateClg}
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

export default Requests;