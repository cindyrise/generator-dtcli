import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

export default function Foot() {
  return <Footer>
    <div style={{textAlign:"center"}}>
      <b>©Copyright </b>
      { (new Date()).getFullYear() } 杭州玳数科技有限公司 浙ICP备15044486号-1
    </div>
  </Footer>
}
