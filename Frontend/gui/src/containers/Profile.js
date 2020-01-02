import React from 'react';
import axios from 'axios';
import '../App.css';
import { Layout, List, Avatar ,Collapse , Button , Spin} from 'antd';
import {reactLocalStorage} from 'reactjs-localstorage';
import Sidenav from '../components/Sidenav';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Blur from 'react-css-blur';
const {Content} = Layout;
const { Panel } = Collapse;





class Profile extends React.Component{    
    
    state = {
        email :'',
        loggedinuser:'',
        data: [],
        posts:[],
        self : false,
        unfriend : false,
        req: false ,
        load : false,
        comingReq:false,
        add:false,        
               
    }

    constructor(props) {

        super(props);
        this.MakeReq = this.MakeReq.bind(this);
        this.CancelReq = this.CancelReq.bind(this);
        this.DeleteMate = this.DeleteMate.bind(this);
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
        
        if(emailId==reactLocalStorage.get('email')){
                this.setState({
                self : true
            })
        }
        //console.log()
        console.log(emailId)
        axios.post('http://127.0.0.1:8000/account/',{
            email:emailId,
            uniId:reactLocalStorage.get('uniId')
        })
        .then(res => {            
            console.log(res.data);
            if(res.data.userMates){
                this.setState({
                    unfriend:true,
                })
            }
            else if(res.data.userRequests){
                this.setState({
                    req:true,
                    //unfriend:false,
                })
            }
            else if(res.data.comingReq){
                this.setState({
                    comingReq:true
                })
            }
            else{
                this.setState({
                    add:true
                })
            }
            this.setState({
                data : res.data.userdata,
                posts: res.data.userposts,
                load : false,
            })
        })
    }

    MakeReq(){
        var uniId = reactLocalStorage.get('uniId')
        var reqEmail = this.state.email;
        axios.post('http://127.0.0.1:8000/request/makeReq',{
            uniId:uniId,
            reqUser : reqEmail

        }).then(res=>{
            console.log(res.data);
            if(res.data=='success'){
                this.setState({
                    req:true,                    
                })
            }
        })

    }

    DeleteMate(){
        var uniId = reactLocalStorage.get('uniId')
        var reqEmail = this.state.email;
        axios.post('http://127.0.0.1:8000/mates/remove',{
            uniId:uniId,
            reqUser : reqEmail

        }).then(res=>{
            console.log(res.data);
            if(res.data=='success'){
                this.setState({
                    req:false,  
                    unfriend:false,
                    add:true
                    
                })
            }
        })        
    }

    CancelReq() {
        var uniId = reactLocalStorage.get('uniId')
        var reqEmail = this.state.email;
        axios.post('http://127.0.0.1:8000/request/cancelReq',{
            uniId:uniId,
            reqUser : reqEmail

        }).then(res=>{
            console.log(res.data);
            if(res.data=='success'){
                this.setState({
                    req:false,
                    add:true                                        
                })
            }
        })
    }

    AcceptReq(){
        var uniId = reactLocalStorage.get('uniId')
        var reqEmail = this.state.email;
        axios.post('http://127.0.0.1:8000/request/acceptReq',{
            uniId:uniId,
            reqUser : reqEmail

        }).then(res=>{
            console.log(res.data);
            if(res.data=='success'){
                this.setState({
                    comingReq:false,
                    unfriend:true                                        
                })
            }
        })        
    }

    RejectReq(){
        var uniId = reactLocalStorage.get('uniId')
        var reqEmail = this.state.email;
        axios.post('http://127.0.0.1:8000/request/rejectReq',{
            uniId:uniId,
            reqUser : reqEmail

        }).then(res=>{
            console.log(res.data);
            if(res.data=='success'){
                this.setState({
                    comingReq:false,
                    add:true                                        
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
                <Sidenav navPosition={'1'}/>
                
                <Layout style={{ marginLeft: 200 }}>
                <Header/>
                <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                    
                    <div style={{ padding: 24, background: '#fff', textAlign: 'left' , marginLeft: '60px'}}>      
                    <div style={{position:'absolute' , left:'57%' , top:'40%'}}>{this.state.load ? <Spin size="large" /> : null}</div>                                                                                   
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
                            {!this.state.self ? <div>
                                {this.state.unfriend ? <Button type="primary" title="Delete as mate" onClick={this.DeleteMate}>Unfriend</Button> : 
                                    <div>
                                        {this.state.req ? <div><Button type="primary" title="Cancel Request" onClick={this.CancelReq}>Requsted</Button></div>
                                            :
                                            <div>
                                                {this.state.comingReq ? <div>
                                                                            <Button type="primary" title="Accept Request" onClick={this.AcceptReq}>Accept Request</Button>
                                                                            <Button type="primary" title="Reject Request" onClick={this.RejectReq} style={{left:'10%'}}>Reject Request</Button>
                                                                        </div>:
                                                                        <div>
                                                                        {this.state.add ? 
                                                                        <div>
                                                                            <Button type="primary" title="Make Request" onClick={this.MakeReq}>Make Request</Button>
                                                                        </div>:null}
                                                                        </div>
                                                                        }
                                            </div>
                                            }
                                    </div>}
                                    </div>:null}
                                
                            
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

export default Profile;