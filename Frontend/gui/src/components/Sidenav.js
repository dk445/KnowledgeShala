import React from 'react';
import { Layout, Menu, Icon, Button } from 'antd';
import{ Link, Redirect } from 'react-router-dom';


const { Header, Content, Footer, Sider } = Layout;

class Sidenav extends React.Component{
  state = {
    loggedinuser  : '',

  }

  componentDidMount(){
   
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
                    
                    <Menu.Item key="1">
                    <Icon type="user" />
                    <span className="nav-text"><Button type='link' style={{color:'white'}}><Link to="/account">
                                                Profile</Link></Button></span>
                    </Menu.Item>
                    <Menu.Item key="2">
                    <Icon type="home" />
                    <span className="nav-text" ><Button type='link' style={{color:'white'}}><Link to="/feed"> Feed</Link></Button></span>
                    </Menu.Item>


                    <Menu.Item key="3">
                    <Icon type="upload" />
                    <span className="nav-text"><Button type='link' style={{color:'white'}}><Link to="/post"> Post</Link></Button></span>
                    </Menu.Item>                                
                    
                    <Menu.Item key="4">
                    <Icon type="user-add" />
                    <span className="nav-text"><Button type='link' style={{color:'white'}}><Link to="/request"> Requests</Link></Button></span>
                    </Menu.Item>
                    <Menu.Item key="5">
                    <Icon type="team" />
                    <span className="nav-text"><Button type='link' style={{color:'white'}}><Link to= "/mates">Mates</Link></Button></span>
                    </Menu.Item>
                    <Menu.Item key="6">
                    <Icon type="logout" />
                    <span className="nav-text"><Button type='link' style={{color:'white'}}><Link to="/"> Logout</Link></Button></span>
                    </Menu.Item>
                </Menu>
                </Sider>
                </div>
    );
  }

}
export default Sidenav;