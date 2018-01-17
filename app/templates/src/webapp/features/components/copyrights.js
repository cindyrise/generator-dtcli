import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

export default function Copyrights() {
  return <Footer className="m-copyrights">
    <div>
      <b>©Copyright </b>
      { (new Date()).getFullYear() } 杭州玳数科技有限公司 浙ICP备15044486号-1
    </div>
  </Footer>
}
