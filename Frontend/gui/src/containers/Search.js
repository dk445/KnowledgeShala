import React from 'react';
import axios from 'axios';
import '../App.css';
import { Layout, List, Input} from 'antd';
import {Link} from 'react-router-dom'
import Sidenav from '../components/Sidenav';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Spin } from 'antd';

const {Content} = Layout;
const { Search } = Input;

class SearchAction extends React.Component{
    
    state = {
        result : [],
        query : '',
        msg:false,
        load:false
    }

    constructor(){
        super();
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch() {
        this.setState({
            load :true,
        })
        var searchQuery = document.getElementById('search').value
        console.log(searchQuery);
        if(searchQuery == '') return; 

        axios.post('http://127.0.0.1:8000/search/',{
            search : searchQuery
        }).then(res=>{
            console.log(res.data);
            this.setState({
                query : searchQuery,
                result:res.data,
                msg:true
            });
        });
        this.setState({
            load :false,
        })
    }

    render(){

        return(
            <Layout>
                <Sidenav navPosition={'5'}/>                
                <Layout style={{ marginLeft: 200 }}>
                    <Header/>
                    <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                        <div style={{ padding: 24, background: '', textAlign: 'left' , marginLeft: '60px'}}>      
                            <Search placeholder="input search text" id="search" onSearch={this.handleSearch} enterButton />
                        </div>
                        {this.state.msg ? <h6 style={{marginLeft:'80px'}}>Showing result for '{this.state.query}'</h6> : null}
                        
                        <div style={{ padding: 24, background: '#fff', textAlign: 'left' , marginLeft: '60px'}}>   
                        <div style={{position:'absolute' , left:'57%' , top:'40%'}}>{this.state.load ? <Spin size="large" /> : null}</div>                          
                            {this.state.result ? 
                                <List
                                    itemLayout="horizontal"
                                    dataSource={this.state.result}
                                    renderItem={item => (
                                        <List.Item>
                                            <List.Item.Meta
                                            //avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                                title={<Link to={{
                                                    pathname:"/account",
                                                    state:{
                                                        email : item.email
                                                    }
                                                }}>{item.name}</Link>}                          
                                                description= {'College: '+item.clgName + '\tDepartment : ' +item.deptName} //{item.mateClg}
                                            />                
                                        </List.Item>
                                    )}
                                    />                                           
                            :<h1></h1>}
                        </div>
                    </Content>
                    <Footer/>
                </Layout>
            </Layout>
        );

    }

}

export default SearchAction;