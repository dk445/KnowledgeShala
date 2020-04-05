import React from 'react';
import axios from 'axios';
import '../App.css';
import { Layout, Menu, Icon, List, Avatar , Spin } from 'antd';
import {Link} from 'react-router-dom';
import Sidenav from '../components/Sidenav';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {reactLocalStorage} from 'reactjs-localstorage';
import CollegeSidenav from '../components/CollegeSidenav';
const {Content } = Layout;

class ListAll extends React.Component{    
    
    state = {
        list : [],
        loggedinuser :'',
        load:true
    }

    componentDidMount() {

        axios.post('http://127.0.0.1:8000/college/listch',{
            uniId: reactLocalStorage.get('uniId')
        })
        .then(res => {
            
            console.log(res.data);
            this.setState({
                list : res.data,
                load:false
            })
        })
    }
    

    render(){
        return(
            <Layout>
                <CollegeSidenav  navPosition={'3'} email ={this.state.loggedinuser}/>
                
                <Layout style={{ marginLeft: 200 }}>
                <Header/>
                <div style={{position:'absolute' , left:'57%' , top:'25%'}}>{this.state.load ? <Spin size="large" /> : null}</div>                                           
                <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                
                    <div style={{ padding: 24, background: '#fff', textAlign: 'left' , marginLeft: '60px'}}> 

                        <List
                            itemLayout="horizontal"
                            dataSource={this.state.list}
                            renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                //avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title={<Link to={{
                                        pathname:"/account-detail",
                                        state:{
                                            email : item.email,                                            
                                        }
                                    }}><h5>{item.name}</h5></Link>}                          
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

export default ListAll;