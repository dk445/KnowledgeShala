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
    reactLocalStorage.clear();
    
  }

  componentDidMount(){
    axios.post('http://127.0.0.1:8000/clg/reqCount',{
            email: reactLocalStorage.get('email')
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
                        email: reactLocalStorage.get('email')
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
                        email: reactLocalStorage.get('email')
                        }
                      }}>                    
                        <Icon type="user" />
                        <span className="nav-text"><Button type='link' style={{color:'white'}}>College Profile</Button></span>
                      </Link>
                    </Menu.Item>


                    <Menu.Item key="5">
                      <Link to="/">
                        <Icon type="logout" />
                        <span className="nav-text"><Button onClick = {this.logout} type='link' style={{color:'white'}}> Logout</Button></span>
                      </Link>
                    </Menu.Item>
                </Menu>
                </Sider>
                </div>
    );
  }

}
export default CollegeSidenav;