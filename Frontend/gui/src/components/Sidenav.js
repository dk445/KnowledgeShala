import React from 'react';
import axios from 'axios';
import { Layout, Menu, Icon, Button, Badge } from 'antd';
import{ Link, Redirect } from 'react-router-dom';
import { reactLocalStorage } from 'reactjs-localstorage';


const { Header, Content, Footer, Sider } = Layout;

class Sidenav extends React.Component{

  state = {
    loggedinuser  : '',
    req: false,
    logout:false
  }
  constructor(props){
    super(props)
    this.state = {
      loggedinuser  : '',
      req: false,
    }
  
  }
  

  logout(){
    axios.post('http://127.0.0.1:8000/signout/',{
      uniId:reactLocalStorage.get('uniId')
    })    
    .then(res => {
      if(res.data == 'True'){
        reactLocalStorage.clear();
        window.location = '/';
        //window.location.hash="/#";
        window.location.hash="Again-No-back-button";//again because google chrome don't insert first hash into history
        window.onhashchange=function(){window.location.hash="/#";} 
      }
    })
  }

  componentDidMount(){
    axios.post('http://127.0.0.1:8000/request/reqCount',{
          uniId: reactLocalStorage.get('uniId')
        })
        .then(res => {            
            console.log(res.data);
            if(res.data == 'True'){
              this.setState({
                  req : true
              })
            }
        })       
  }

  
  render(){
    return(
      <div>
        {this.state.logout?<Redirect to='/'/>:null}
        <Sider
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                }}>
                
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={this.props.navPosition}>
                    <Menu.Item key="0">                        
                        <span className="nav-text" style={{color:'white',marginLeft:'0%',fontWeight:'bold',fontSize:'17px'}}>Knowledge Shala</span>
                    </Menu.Item>
                    
                  
                    <Menu.Item key="1">
                      <Link to={{
                        pathname :"/account",
                        state : {
                          email: reactLocalStorage.get('email')
                        }
                      }}>                    
                        <Icon type="user" />
                        <span className="nav-text"><Button type='link' style={{color:'white'}}>Profile</Button></span>
                      </Link>
                    </Menu.Item>

                    <Menu.Item key="2">
                      <Link to="/feed">
                        <Icon type="home" />
                        <span className="nav-text" ><Button type='link' style={{color:'white'}}> Feed</Button></span>
                      </Link>
                    </Menu.Item>


                    <Menu.Item key="3">
                      <Link to="/post">
                        <Icon type="upload" />
                        <span className="nav-text"><Button type='link' style={{color:'white'}}> Make Post</Button></span>
                      </Link>
                    </Menu.Item>             

                    <Menu.Item key="4">
                      <Link to="/requests">
                        <Icon type="user-add" />
                        <span className="nav-text"><Button type='link' style={{color:'white'}}> Requests</Button></span>
                        {this.state.req ? <Badge color={'red'} /> : null}
                      </Link>
                    </Menu.Item>                  
                    
                    <Menu.Item key="5">
                      <Link to={{
                        pathname:"/search",
                        state:{
                          college:false
                        }
                      }}>
                        <Icon type="search" />
                        <span className="nav-text"><Button type='link' style={{color:'white'}}> Search</Button></span>
                      </Link>
                    </Menu.Item>

                    <Menu.Item key="6">
                      <Link to= "/mates">
                        <Icon type="team" />
                        <span className="nav-text"><Button type='link' style={{color:'white'}}>Mates</Button></span>
                      </Link>
                    </Menu.Item>

                    <Menu.Item key="7">
                      <Link to="/">
                        <Icon type="logout"  />
                        <span className="nav-text"><Button onClick = {this.logout} type='link' style={{color:'white'}}> Logout</Button></span>
                      </Link>
                    </Menu.Item>
                </Menu>
                </Sider>
                </div>
    );
  }

}
export default Sidenav;