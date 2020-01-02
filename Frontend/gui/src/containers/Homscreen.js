import React from 'react';
import axios from 'axios';
import '../App.css';
import { Layout, List, Avatar , Spin } from 'antd';
import Sidenav from '../components/Sidenav';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {Link} from 'react-router-dom';
import {reactLocalStorage} from 'reactjs-localstorage';
const { Content} = Layout;


class Homescreen extends React.Component{    
    
    state = {
        posts : [],
        loggedinuser : '',
        load : true
    }

    componentDidMount() {
        this.setState({
            load :true,
        })
        axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/feed/',
            data: reactLocalStorage.get('uniId')
        })
        .then(res => {
            
            console.log(res.data);
            this.setState({
                posts : res.data
            })
        })
        this.setState({
            load :false,
        })
    }    

  

    render(){
        return(
            <Layout>
                <Sidenav navPosition={'2'} email ={this.state.loggedinuser}/>
                <Layout style={{ marginLeft: 200 }}>
                <Header/>
                <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                    <div style={{position:'absolute' , left:'57%' , top:'40%'}}>{this.state.load ? <Spin size="large" /> : null}</div>                    
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
                                title={<Link to={{
                                    pathname:"/account",
                                    state:{
                                        email : item.email,                                        
                                    }
                                }}>{item.owner}</Link>}
                                description={item.createDate + ' '+ item.createTime}
                            />
                                {item.description}
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

export default Homescreen;  

