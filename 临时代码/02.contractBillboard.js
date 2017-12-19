/**
 * Created by yang on 2017/10/26.
 */
/**
 * Created by yang on 2017/9/27.
 * 1. 此组件为合同面板显示组件
 */

import React from 'react';
import NavTitle from './NavTitle';
import EditContract from '../ContractInfo/EditContract/index';
import AddContractInfo from '../ContractInfo/AddContractInfo/index';
import * as contractService from '../../actions/contract-service';
import './ContractBillboard.less';
import {Button} from 'antd';
import ViewAllImage from '../../images/all-detail.png';


class ContractBillboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            totalCount: 0,
            showCount: 0,
            contractData: [],
        };
        this.refreshContract = this.refreshContract.bind(this);
        this.viewAll = this.viewAll.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmitSuccess = this.onSubmitSuccess.bind(this);
        this.refreshContract();
    }

    refreshContract() {
        let borrowerId = this.props.params.id;
        contractService.fetchContractInfoBy(borrowerId)
            .then((res) => {
                if (!res.isSuccess && (res.content || res.error || res.message)) {
                    return
                }
                this.setState({
                    contractData: res.filter(function (item, index) {
                        return index < 3
                    }),
                    totalCount: res.length,

                })
            })
    }

    viewAll() {
        let borrowerId = this.props.params.id;
        contractService.fetchContractInfoBy(borrowerId)
            .then((res) => {
                this.setState({
                    contractData: res,
                })
            })
    }

    renderButton() {
        let contractData = this.state.contractData;
        let totalCount = this.state.totalCount;
        if(totalCount < 4){
            return;
        }
        if (contractData.length > 3) {
            return (
                <div className="viewAll">

                    <Button onClick={this.refreshContract}>
                        <img src={ViewAllImage}/>收起
                    </Button>

                </div>
            )
        } else {
            return (
                <div className="viewAll">

                    <Button onClick={this.viewAll}>
                        <img src={ViewAllImage}/>查看全部({totalCount})
                    </Button>

                </div>
            )
        }
    }

    onChange(item, index){
        const contractData = [...this.state.contractData];
        contractData[index] = item;
        this.setState({contractData});
    }

    onSubmitSuccess(){
        this.refreshContract();
        if(this.props.onChange) {
            this.props.onChange();
        }
    }

    render() {
        let contractData = this.state.contractData;
        return (
            <div className="contract-billboard">
                <NavTitle title="合同信息">
                    <span className="operation">
                        <AddContractInfo {...this.props} onSubmitSuccess={this.onSubmitSuccess}/>
                    </span>
                </NavTitle>

                <div className="contract-info">
                    <div className="left">
                        {contractData.length > 0 ? <h3>签订律所</h3> : null}
                        {
                            (contractData.length > 0) ? (
                                contractData.map(function (item, index) {
                                    return (
                                        <p key={index} className="law-firm">{item.lawFirmUnitCode}</p>
                                    )
                                })
                            ) : (null)
                        }
                    </div>
                    {contractData.length > 0 ? <h3 className="status-title">合同签订情况</h3> : null}
                    {
                        (contractData.length > 0) ? (
                            contractData.map(function (item, index) {
                                let status = '审批中';
                                switch (item.status) {
                                    case '1017000001':
                                        status = '行内洽谈中';
                                        break;
                                    case '1017000002':
                                        status = '行内审批中';
                                        break;
                                    case '1017000003':
                                        status = '已正式签订';
                                        break;
                                }
                                return (
                                    <div className="right" key={index}>
                                        <div className="status">
                                            <span>{status}</span>
                                            <EditContract item={item} index={index} {...this.props} onChange={this.onChange}/>
                                        </div>

                                    </div>
                                )
                            }, this)
                        ) : (null)
                    }
                    {contractData.length > 0 ? null : <div>暂无信息</div>}
                </div>

                {this.renderButton()}

            </div>
        )
    }
}

export default ContractBillboard;