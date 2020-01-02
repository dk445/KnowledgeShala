import React from 'react';
import axios from 'axios';
import '../App.css';
import { Layout, List, Avatar , Spin } from 'antd';
import CollegeSidenav from '../components/CollegeSidenav';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {Link} from 'react-router-dom';
import {reactLocalStorage} from 'reactjs-localstorage';
const { Content} = Layout;


class CollegeRequests extends React.Component{    
    
    state = {
        requests : [],
        uniId : reactLocalStorage.get('uniId'),
        load : true
    }    

    componentDidMount() {
        this.setState({
            load :true,
        })
        const uniId = this.state.uniId         
        axios.post('http://127.0.0.1:8000/college/requests',{
            uniId: uniId
        })
        .then(res => {
            
            console.log(res.data);
            this.setState({
                requests : res.data
            })
        })
        this.setState({
            load :false,
        })
    }      

    render(){
        return(
            <Layout>
                <CollegeSidenav navPosition={'2'} email ={this.state.loggedinuser}/>
                <Layout style={{ marginLeft: 200 }}>
                <Header/>
                <div style={{position:'absolute' , left:'57%' , top:'40%'}}>{this.state.load ? <Spin size="large" /> : null}</div>                    
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
                        dataSource={this.state.requests}
                        footer={
                        <div>
                            
                        </div>
                        }
                        renderItem={item => (
                        <List.Item
                            key={item.name}
                            actions={[
                            
                            ]}
                            
                        >
                            <List.Item.Meta
                                title={<Link to={{
                                    pathname:"/account-detail",
                                    state:{
                                        email : item.email,
                                    }
                                }}>{item.name}</Link>}
                                description={'Department : '+item.deptName + '  Role : '+ item.role}
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

export default CollegeRequests;  

