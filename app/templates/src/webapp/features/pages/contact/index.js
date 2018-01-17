import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Row, Col } from 'antd';
import './style.scss';
export default class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
  }
  componentWillReceiveProps(nextProps) {

  }
  shouldComponentUpdate(nextProps, nextState) {
    return this.props != nextProps || this.state != nextState;
  }

  render() {
    return (
        <div className="contact-content">
             <div className="contact-item">
               <div className="contact_list">
                    <div className="item_top qq"></div>
                    <div className="item_middle">产品经理在线QQ</div>   
                    <div className="item_bottom">
                        <a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=2991945746&site=qq&menu=yes"><img src="img/donglang.png" alt="点击这里给我发消息" title="点击这里给我发消息"/></a>
                     </div>
                </div>
             </div>
             <div className="contact-item">
                <div className="contact_list">
                    <div className="item_top wx"></div>
                    <div className="item_middle">微信联系我们</div>
                    <div className="item_bottom"><img src="img/qr.jpg" /></div>
                </div>
             </div>
             <div className="contact-item">
                <div className="contact_list">
                     <div className="item_top other"></div>
                     <div className="item_middle">其他方式</div>
                     <div className="item_bottom">
                      <a className="btn btn-w-m btn-info">
                           <i className="fa fa-qq"></i>
                            <span>QQ交流群：496371021</span>
                      </a>
                      <a className="btn btn-w-m btn-info" href="mailto:support@dtstack.com">
                             <i className="fa fa-envelope"></i>
                            <span>邮箱：support@dtstack.com</span>
                       </a>
                    </div>
                </div>
             </div>
        </div>
//      <div className="wrapper" style="padding:0;">
//     <div className="content-body log-default-outer-bg" style={{minHeight:"700px"}}>
//         <div className="row" style={{margin-top: 50px;">
//             <div className="col-lg-4">
//                 <div className="contact_list">
//                     <div className="item_top qq"></div>
//                     <div className="item_middle">产品经理在线QQ</div>
//                     <div className="item_bottom">
//                         <a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=2991945746&site=qq&menu=yes"><img border="0" src="img/donglang.png" alt="点击这里给我发消息" title="点击这里给我发消息"/></a>
//                     </div>
//                 </div>
//             </div>
//             <div className="col-lg-4">
//                 <div className="contact_list">
//                     <div className="item_top wx"></div>
//                     <div className="item_middle">微信联系我们</div>
//                     <div className="item_bottom"><img src="img/qr.jpg" /></div>
//                 </div>
//             </div>
//             <div className="col-lg-4">
//                 <div className="contact_list">
//                     <div className="item_top other"></div>
//                     <div className="item_middle">其他方式</div>
//                     <div className="item_bottom">
//                         <a className="btn btn-w-m btn-info">
//                             <i className="fa fa-qq"></i>
//                             <span>QQ交流群：496371021</span>
//                         </a>
//                         <a className="btn btn-w-m btn-info" href="mailto:support@dtstack.com">
//                             <i className="fa fa-envelope"></i>
//                             <span>邮箱：support@dtstack.com</span>
//                         </a>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
// </div>
    )
  }
}