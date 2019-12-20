import React from 'react';
import axios from 'axios';
import '../App.css';
import { Layout, List, Avatar ,Collapse , Button} from 'antd';
import {reactLocalStorage} from 'reactjs-localstorage';
import Sidenav from '../components/Sidenav';
import Header from '../components/Header';
import Footer from '../components/Footer';
const {Content} = Layout;
const { Panel } = Collapse;





class Profile extends React.Component{    
    
    state = {
        email :'',
        loggedinuser:'',
        data: [],
        posts:[]
    }

    callback(key) {
        console.log(key);
    }    
    

    componentDidMount() {
        var email = this.props.location.state.email;
        if(email==reactLocalStorage.get('email')){
                this.setState({
                email : true
            })
        }
        //console.log()
        console.log(email)
        axios.post('http://127.0.0.1:8000/account/',{
            email:email
        })
        .then(res => {
            
            console.log(res.data);
            this.setState({
                data : res.data.userdata,
                posts: res.data.userposts

            })
        })
    }
    
    DeletePost(key){
        
        console.log(key);
    }

    render(){
        return(
            <Layout>
                <Sidenav navPosition={'1'}/>
                
                <Layout style={{ marginLeft: 200 }}>
                <Header/>
                <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                    <div style={{ padding: 24, background: '#fff', textAlign: 'left' , marginLeft: '60px'}}>      
                                                
                                                
                        <List
                            itemLayout="horizontal"
                            dataSource={this.state.data}
                            renderItem={item => (
                            
                            <Collapse >
                                <h5 style={{marginLeft:'15px'}}>{item.name}</h5>
                                <Panel header="Email" key="1">
                                <p>{item.email}</p>
                                </Panel>
                                <Panel header="Role" key="2">
                                <p>{item.role}</p>
                                </Panel>
                                <Panel header="College" key="3">
                                <p>{item.clgName}</p>
                                </Panel>
                                <Panel header="Department" key="4">
                                <p>{item.deptName}</p>
                                </Panel>
                            </Collapse>
                                
                            )}
                        />   

                        <br/><hr/>
                    

                    <List
                        itemLayout="vertical"
                        style={{padding:'2px'}}
                        size="large"
                        pagination={{
                        onChange: page => {
                            console.log(page);
                        },
                        pageSize: 50 ,
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
                                title={item.owner }                                 
                                description={item.createDate + ' '+ item.createTime}
                                />                                
                                {item.description}
                                <div >
                                    {this.state.email ?
                                        <Button type="link" style={{marginLeft:'1000px',height:'25px',fontSize:'15px'}} onClick={() => {
                                            console.log(item.postid);
                                            axios.post('http://127.0.0.1:8000/feed/delete/',{
                                                pk: item.postid
                                            }).then(res=>{
                                                window.location.reload();
                                            })
                                            }}>delete
                                        </Button> 
                                        : null
                                    }
                                </div>                                                                 
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

export default Profile;