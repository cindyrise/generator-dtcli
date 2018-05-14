import React from 'react';
import { NavLink } from "react-router-dom"; 
export default class NoExist extends React.Component {
  render() {
    return <div className="g-404">
      <div className="content" style={{
        textAlign: 'center'
      }}>
        <h3 style={{
          fontSize: 128,
          color: '#ddd',
          marginTop: 80
        }}>404</h3>
        <p>访问出错，<NavLink to="/auth/login">点此</NavLink> 返回</p>
      </div>
    </div>
  }
}
