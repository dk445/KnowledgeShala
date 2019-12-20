import React from 'react';
import { Layout } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

class HeaderCost extends React.Component{

  render(){
    return(
        <div>
            <Header style={{background: '#fff' ,textAlign:'center',fontSize:'45px'}} > KnowledgeShala</Header>
        </div>
    );
  }

}
export default HeaderCost;