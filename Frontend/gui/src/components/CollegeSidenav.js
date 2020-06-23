import React from 'react';
import axios from 'axios';
import { Layout, Menu, Icon, Button, Badge } from 'antd';
import{ Link, Redirect } from 'react-router-dom';
import { reactLocalStorage } from 'reactjs-localstorage';


const { Header, Content, Footer, Sider } = Layout;

class CollegeSidenav extends React.Component{
  state = {
    loggedinuser  : '',
    req: false
  }

  logout(){
    axios.post('http://127.0.0.1:8000/college/logout' , {
        uniId: reactLocalStorage.get('uniId')
    })
    .then(res => {
      console.log(res.data)
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
    axios.post('http://127.0.0.1:8000/clg/reqCount',{
            uniId: reactLocalStorage.get('uniId')
        })
        .then(res => {            
            console.log(res.data);
            if(res.data == 'True')
            this.setState({
                req : true
            })
        })       
  }

  render(){
    return(
      <div>
        <Sider
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                }}>
                
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={this.props.navPosition}>
                    
                  
                    <Menu.Item key="1" disabled>
                      <Link to={{
                        pathname :"/account-detail",
                        state : {
                          uniId: reactLocalStorage.get('uniId')
                        }
                      }}>                    
                        <Icon type="user" />
                        <span className="nav-text"><Button type='link' style={{color:'white'}}>Profile</Button></span>
                      </Link>
                    </Menu.Item> 


                    <Menu.Item key="2">
                      <Link to="/collegeAccount">
                        <Icon type="user-add" />
                        <span className="nav-text"><Button type='link' style={{color:'white'}}> Requests</Button></span>
                        {this.state.req ? <Badge color={'red'} /> : null}
                      </Link>
                    </Menu.Item>                 


                    <Menu.Item key="3">
                      <Link to= "/list">
                        <Icon type="team" />
                        <span className="nav-text"><Button type='link' style={{color:'white'}}>List Of Students</Button></span>
                      </Link>
                    </Menu.Item>


                    <Menu.Item key="4">
                      <Link to={{
                        pathname :"/college-info",
                        state : {
                          uniId: reactLocalStorage.get('uniId')
                        }
                      }}>                    
                        <Icon type="user" />
                        <span className="nav-text"><Button type='link' style={{color:'white'}}>College Profile</Button></span>
                      </Link>
                    </Menu.Item>


                    <Menu.Item key="5">
                      
                        <Icon type="logout" />
                        <span className="nav-text"><Link to="/"><Button onClick = {this.logout} type='link' style={{color:'white'}}> Logout</Button> </Link></span>
                    </Menu.Item>
                </Menu>
                </Sider>
                </div>
    );
  }

}
export default CollegeSidenav;