import React from 'react'
import { findDOMNode } from 'react-dom';
import { ActionSheet, WingBlank, WhiteSpace, Button, Toast } from 'antd-mobile';
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
    wrapProps = {
        onTouchStart: e => e.preventDefault(),
    };
}
export default class Dropdown extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
    }
    componentWillMount() {

    }
    componentWillUnmount() {
    }
    showActionSheet = () => {
        const BUTTONS = ['Operation1', 'Operation2', 'Operation2', 'Delete', 'Cancel'];
        ActionSheet.showActionSheetWithOptions({
            options: BUTTONS,
            maskClosable: true,
            'data-seed': 'logId',
            wrapProps,
        },
            (buttonIndex) => {
                this.setState({ clicked: BUTTONS[buttonIndex] });
            });
    }
    render() {
        return (
            <Button onClick={this.showActionSheet}>showActionSheet</Button>
        )
    }
}