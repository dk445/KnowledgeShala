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





class CollegeProfile extends React.Component{    
    
    state = {
        email :'',
        loggedinuser:'',
        data: [],
        posts:[],
        redirect:false,
        verified:false,  
        load:false,
        status:false        
    }

    constructor(props) {

        super(props);
        this.Remove = this.Remove.bind(this);
        this.AcceptReq = this.AcceptReq.bind(this);
        this.RejectReq = this.RejectReq.bind(this);
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
        axios.post('http://127.0.0.1:8000/account/',{
            email:emailId,
            uniId:reactLocalStorage.get('uniId')
        })
        .then(res => {            
            console.log(res.data);
            if(res.data.verified){
                this.setState({
                    verified:true,
                })
            }
            this.setState({
                data : res.data.userdata,
                posts: res.data.userposts,
                load : false,
                status:true
            })
        })
    }

    

    Remove(){
        this.setState({
            load:true
        })
        var reqEmail = this.state.email;
        axios.post('http://127.0.0.1:8000/college/remove',{
            reqUser : reqEmail
        }).then(res=>{
            console.log(res.data);
            if(res.data){
                this.setState({
                    verified:false,
                    load:false,
                    redirect:true
                })
            }
        })        
    }

    
    AcceptReq(){
        this.setState({
            load:true
        })
        var reqEmail = this.state.email;
        axios.post('http://127.0.0.1:8000/college/accept',{
            reqUser : reqEmail

        }).then(res=>{
            console.log(res.data);
            if(res.data){
                this.setState({
                    verified:true,
                    load:false                                        
                })
            }
        })        
    }


    RejectReq(){
        this.setState({
            load:true
        })
        var reqEmail = this.state.email;
        axios.post('http://127.0.0.1:8000/college/reject',{
            reqUser : reqEmail

        }).then(res=>{
            console.log(res.data);
            if(res.data){
                this.setState({
                    verified:false,
                    redirect:true,
                    load:false                             
                })
            }
        })

    }
    
    DeletePost(key){
        
        console.log(key);
    }

    render(){
        return(
            <Layout>
                <CollegeSidenav navPosition={'1'}/>
                <div style={{position:'absolute' , left:'57%' , top:'40%'}}>{this.state.load ? <Spin size="large" /> : null}</div>
                <Layout style={{ marginLeft: 200 }}>
                <Header/>
                <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                    {this.state.redirect?<Redirect to="/collegeAccount"/>:null}
                    
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
                        /> <br/>

                        <div>
                            {this.state.status?
                            this.state.verified ? <div>
                                <Button type="primary" title="Remove" onClick={this.Remove}>Remove</Button>
                                </div>:
                            <div>
                                <Button type="primary" title="Accept" onClick={this.AcceptReq}>Accept</Button>
                                <Button type="primary" title="Reject Request" onClick={this.RejectReq} style={{left:'10%'}}>Reject</Button>
                            </div>:
                            null}                               
                            
                        </div>
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
                                    {this.state.self ?
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

export default CollegeProfile;