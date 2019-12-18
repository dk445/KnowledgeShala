import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import{ Link } from 'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;

class Sidenav extends React.Component{
  state = {
    loggedinuser  : ''
  }

  componentDidMount(){
      this.setState({
          loggedinuser: this.props.email
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
                    <Menu.Item key="1">
                    <Icon type="user" />
                    <span className="nav-text"><Link to={{
                                                    pathname: "/account",
                                                    state: {
                                                        email : this.state.loggedinuser
                                                    }
                                                }}>
                                                Profile</Link></span>
                    </Menu.Item>
                    <Menu.Item key="2">
                    <Icon type="home" />
                    <span className="nav-text"><Link to="/feed"> Feed</Link></span>
                    </Menu.Item>


                    <Menu.Item key="3">
                    <Icon type="upload" />
                    <span className="nav-text"><Link to="/post"> Post</Link></span>
                    </Menu.Item>                                
                    
                    <Menu.Item key="4">
                    <Icon type="user-add" />
                    <span className="nav-text"><Link to="/request"> Requests</Link></span>
                    </Menu.Item>
                    <Menu.Item key="5">
                    <Icon type="team" />
                    <span className="nav-text"><Link to= "/mates">Mates</Link></span>
                    </Menu.Item>
                    <Menu.Item key="6">
                    <Icon type="logout" />
                    <span className="nav-text"><Link to="/"> Logout</Link></span>
                    </Menu.Item>
                </Menu>
                </Sider>
                </div>
    );
  }

}
export default Sidenav;