import React from 'react'
import { Flex, Button, WingBlank, WhiteSpace, List, InputItem, Toast } from 'antd-mobile';
import { Link } from 'react-router-dom'
import './style.scss'
import { errortip } from '../../components/errorTip'
const logo = require('../../public/assets/images/logo.png')
export default class Login extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        console.log(this.props);
    }
    componentWillReceiveProps(nextProps) {

    }
    state = {
        codeTip: "获取验证码",
        isSms: true
    }
    codeTip = "获取验证码"
    formData = {
        phone: '',
        code: '',
        account: '',
        pwd: ''
    }
    getSmsCode = (e) => {
        let _this = this, count = 30;
        let isPhone = this.verify({ phone: this.formData.phone.state.value,code:'' })[0];
        console.log(isPhone);
        if (this.state.codeTip.indexOf('秒') > -1) return;
        if (isPhone) {
            this.timer = setInterval(() => {
                count--;
                if (count < 1) {
                    window.clearInterval(_this.timer);
                    _this.setState({ codeTip: `获取验证码` })
                } else {
                    _this.setState({ codeTip: `${count}秒` })
                }
            }, 1000);
            //请求api接口
        } else {
            Toast.info(errortip('手机号输入有误。'), 3);
        }
    }
    verify = (params) => {
        let telReg = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
        let codeReg = /^[A-Za-z0-9]{6}$/;
        let accoutReg = /^[A-Za-z0-9]{6}$/, pwdReg = /^[A-Za-z0-9]{6}$/;;
        console.log(params, 90000);
        return this.state.isSms ? [telReg.test(params['phone'].replace(/\s/g, '')), codeReg.test(params['code'].replace(/\s/g, ''))] :
            [true, true];
    }
    submit = () => {
        let params = this.state.isSms ? {
            phone: this.formData.phone.state.value,
            code: this.formData.code.state.value
        } : {
                account: this.formData.account.state.value,
                pwd: this.formData.pwd.state.value
            };
        if (!this.verify(params).includes(false)) {
            //请求api接口
            //this.props.reqLogin(params);
            this.props.history.push('/');
        } else {
            Toast.info(errortip('手机号或者验证码输入有误。'), 3);
        }
    }
    render() {
        const { isSms } = this.state;
        return (
            <div>
                <Flex className="login-logo">
                    <Flex.Item><img src={logo} alt="logo" /></Flex.Item>
                </Flex>
                <WingBlank size="lg">
                    {isSms ? <div><div>
                        <InputItem
                            className="top-input"
                            placeholder="请输入手机号"
                            type="phone"
                            ref={el => this.formData.phone = el}
                        /></div>
                        <div className="splice-line"></div>
                        <InputItem
                            className="bottom-input"
                            placeholder="请输入6位验证码"
                            ref={el => this.formData.code = el}
                            extra={<div style={{ color: "#1A76D2" }} > <span onClick={this.getSmsCode.bind(this)}>{this.state.codeTip}</span></div>}
                        /></div> :
                        <div>
                            <div>
                                <InputItem
                                    className="top-input"
                                    placeholder="请输入您的账号"
                                    type="text"
                                    ref={el => this.formData.accout = el}
                                /></div>
                            <div className="splice-line"></div>
                            <InputItem
                                className="bottom-input"
                                type="password"
                                placeholder="请输入您的密码"
                                ref={el => this.formData.pwd = el}
                            /></div>}
                    <WhiteSpace size="lg" />
                    <Button type="primary" onClick={this.submit}>登录</Button>
                </WingBlank>
                <div className="login-switch" onClick={() => { this.setState({ isSms: !isSms }) }}>{isSms ? "账号密码登录" : '手机验证码登录'}</div>
            </div>);
    }
}