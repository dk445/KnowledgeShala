import React from 'react';
import axios from 'axios';
import '../App.css';
import { Layout, List, Avatar ,Collapse , Button , Spin} from 'antd';
import {reactLocalStorage} from 'reactjs-localstorage';
import CollegeSidenav from '../components/CollegeSidenav';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {Redirect} from 'react-router-dom';
const {Content} = Layout;
const { Panel } = Collapse;





class CollegeInfo extends React.Component{    
    
    state = {
        email :'',
        loggedinuser:'',
        data: [],
        load:false,        
    }

    callback(key) {
        console.log(key);
    }    
    
    
    componentDidMount() {
        var emailId = this.props.location.state.email;
        this.setState({
            email : emailId,
            load :true,
        })
        
        console.log(emailId)
        axios.post('http://127.0.0.1:8000/college/details',{
            email:reactLocalStorage.get('email')
        })
        .then(res => {            
            console.log(res.data);
            this.setState({
                data : res.data,
                load : false,
            })
        })
    }

    

    render(){
        return(
            <Layout>
                <CollegeSidenav navPosition={'4'}/>
                
                <Layout style={{ marginLeft: 200 }}>
                <Header/>
                <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                    
                    <div style={{ padding: 24, background: '#fff', textAlign: 'left' , marginLeft: '60px'}}>      
                    <div style={{position:'absolute' , left:'57%' , top:'25%'}}>{this.state.load ? <Spin size="large" /> : null}</div>                                                                                   
                        <List
                            itemLayout="horizontal"
                            dataSource={this.state.data}
                            renderItem={item => (
                            
                            <Collapse >
                                <h5 style={{marginLeft:'15px'}}>{item.clgName}</h5>
                                <Panel header="Email" key="1">
                                <p>{item.email}</p>
                                </Panel>
                                <Panel header="College" key="2">
                                <p>{item.clgName}</p>
                                </Panel>
                                <Panel header="City" key="3">
                                <p>{item.city}</p>
                                </Panel>
                                <Panel header="College Id" key="4">
                                <p>{item.clgId}</p>
                                </Panel>
                            </Collapse>
                                
                            )}
                        /> <br/>
                                      
                    </div>
                </Content>
                <Footer/>
                </Layout>
            </Layout>        
        );
    }
}

export default CollegeInfo;