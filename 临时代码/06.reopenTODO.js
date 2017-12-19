/**
 * Created by yang on 2017/11/9.
 * 1. 此组件为重新打开任务组件
 */

import React from 'react';
import {Modal, Checkbox, Form, Input} from 'antd';
import './reopen-todo.less';

const FormItem = Form.Item;

class ReopenTODO extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            loading: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleChange(e){
        this.setState({
            visible: true
        });
        console.log(e);
        if(this.props.onSubmitSuccess){
            this.props.onSubmitSuccess();
        }
    }

    handleCancel(){
        this.setState({
            visible: false
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <span className="reopen-todo">
                <Checkbox checked={true} onChange={() => {this.handleChange(this.props)}}/>
                <Modal
                    title='编辑待办'
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    maskClosable={false}
                >
                    <Form layout='vertical'>
                        <FormItem label='标题'>
                            {
                                getFieldDecorator('taskTitle', {
                                    rules: [
                                        { required: true, message: '请输入待办标题' },
                                    ]
                                })(
                                    <Input placeholder="请输入标题"/>
                                )
                            }
                        </FormItem>

                    </Form>
                </Modal>
            </span>
        )
    }
}

export default Form.create()(ReopenTODO);