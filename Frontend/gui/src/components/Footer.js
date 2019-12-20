import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

class FooterCost extends React.Component{

  render(){
    return(
        <div>
            <Footer style={{ textAlign: 'center' }}>Designed By Ant</Footer>
        </div>
    );
  }

}
export default FooterCost;