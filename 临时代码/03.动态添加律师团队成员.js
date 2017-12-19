/**
 * Created by yang on 2017/10/31.
 */
/**
 * Created by yang on 2017/10/22.
 * 1. 重构添加律师面板
 */


import React from 'react';
import * as lawyerService from '../../../../actions/lawyer-service';
import {Icon, Modal, Form, Input, Button, Select, Radio} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group

let uuid = 0;
class AddLawyer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            confirmLoading: false,
            blurLawyer: []
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.add = this.add.bind(this);
        this.handleAddLawyer = this.handleAddLawyer.bind(this);
        this.onSearch = this.onSearch.bind(this);

    }

    handleClick(){
        this.setState({
            visible: true
        })
    }

    handleCancel(){
        this.setState({
            visible: false
        })
    }

    onSelect(k, e){
        let blurLawyer = this.state.blurLawyer;
        let currentIndex = parseInt(e);
        let selectedData = blurLawyer.find((item,index) => {
            return item.userId === currentIndex
        });
        debugger
        let _setFieldValues = {};
        _setFieldValues[`lawFirmName-${k}`] = selectedData.lawFirmName;
        _setFieldValues[`mobile-${k}`] = selectedData.mobile;
        setTimeout(() => {
            this.props.form.setFieldsValue(_setFieldValues);
        })

    }

    onSearch(e){

        if(this.timeoutId) {
            clearTimeout(this.timeoutId);
        }

        if(e){
            this.timeoutId = setTimeout(() => {
                lawyerService.fetchLawyerList(e)
                    .then((res) => {
                        this.setState({
                            blurLawyer: res
                        });
                    })
            }, 1000)
        }
    }

    remove(k){
        const {form} = this.props;

        const keys = form.getFieldValue('keys');

        if(keys.length === 1){
            return;
        }
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    };

    handleAddLawyer(e){
        e.preventDefault();
        let {getFieldValue} = this.props.form;



        this.props.form.validateFields((error, value) => {
            if(!error){
                console.log(value);
                // console.log(value['lawyerName-0']);
                let applyMemberDTOs = [];
            }


        });


    }

    add(){
        uuid++;
        const {form} = this.props;
        // 你也可以通过数据绑定去获取表单的值 (给虚拟DOM元素设置 ref 属性)
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(uuid);

        //  set form value 设置一组输入控件的值
        form.setFieldsValue({
            keys: nextKeys
        })

    };

    render(){

        let blurLawyer = this.state.blurLawyer;
        const {getFieldDecorator, getFieldValue} = this.props.form;
        const formItemLayout = {
            labelCol: {
                sm: {span: 8},
            },
            wrapperCol: {
                sm: {span: 10, offset: 1},
            },
        };

        getFieldDecorator('keys', {initialValue: [0]});
        const keys = getFieldValue('keys');



        const formItems = keys.map((k, index) => {
            Object.assign(k, {
                lawFirmName: getFieldValue(`lawyerName-${k}`),
                mobile: getFieldValue(`mobile-${k}`),
            });
            return (
                <div key={k}>
                    <FormItem label='律师姓名' {...formItemLayout}>
                        {getFieldDecorator(`lawyerName-${k}`, {
                            rules:[
                                {required: true, message: '请输入律师姓名'}
                            ]
                        })(
                            <Select
                                style={{width: '80%', marginRight: 8}}
                                onSearch={this.onSearch}
                                showSearch
                                optionFilterProp="children"
                                onSelect={this.onSelect.bind(this,`${k}`)}
                            >
                                {
                                    blurLawyer.map((item,index) => {
                                        return(
                                            <Option value={item.userId + ''} key={index}>
                                                {item.lawyerName}
                                            </Option>
                                        )
                                    })
                                }
                            </Select>
                        )}
                        {
                            keys.length > 1 ? (
                                <Icon
                                    className="dynamic-delete-button"
                                    type="minus-circle-o"
                                    disabled={keys.length === 1}
                                    onClick={this.remove.bind(this,k)}
                                />
                            ) : null
                        }
                    </FormItem>

                    <FormItem label='所在律所' {...formItemLayout}>
                        {getFieldDecorator(`lawFirmName-${k}`, {
                            rules:[
                                {required: true, message: '请输入律师姓名'}
                            ]
                        })(
                            <Input placeholder="请输入律师姓名" style={{width: '80%', marginRight: 8}}/>
                        )}
                    </FormItem>

                    <FormItem label='手机号码' {...formItemLayout}>
                        {getFieldDecorator(`mobile-${k}`, {
                            rules:[
                                {required: true, message: '请输入律师姓名'}
                            ]
                        })(
                            <Input placeholder="请输入律师姓名" style={{width: '80%', marginRight: 8}}/>
                        )}
                    </FormItem>
                </div>
            )
        });
        return(

            <span>
                <Icon type="usergroup-add" onClick={this.handleClick}/>
                <Modal
                    title='添加律师团队'
                    visible={this.state.visible}
                    confirmLoading={this.state.confirmLoading}
                    onCancel={this.handleCancel}
                    maskClosable={false}
                    onOk={this.handleAddLawyer}
                >

                    <Form>

                        <FormItem
                            label="办案方式"
                            {...formItemLayout}
                        >
                             {getFieldDecorator(`workMethod`, {
                                 rules: [{
                                     required: true, message: '办案方式',
                                 }],
                             })(
                                 <RadioGroup>
                                     <Radio value="1011000001">个人办案</Radio>
                                     <Radio value="1011000002">团队办案</Radio>
                                 </RadioGroup>
                             )}
                         </FormItem>
                        {formItems}

                        <FormItem>
                            <Button onClick={this.add}  type='primary' size='default' style={{marginLeft: "38%"}}>
                                <Icon type="plus"/> 添加团队成员
                            </Button>
                        </FormItem>


                    </Form>



                </Modal>
            </span>
        )
    }
}

export default Form.create()(AddLawyer);