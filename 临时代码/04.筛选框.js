import React from 'react';
import { Form,Icon,Tooltip} from 'antd';
import customFetch from '../../utils/customFetch';
import ParameterOption from './query/ParameterOption';
import './QuerySection.less';
export default class QuerySection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            parameterOptions: [],
            selectedOptions:[]
        };
        this._getQuerySchemaFromUrl(1);
        this.changeSelectedOptions = this.changeSelectedOptions.bind(this);
        this.removeSelectedOption = this.removeSelectedOption.bind(this);
        this.showAllFilter = this.showAllFilter.bind(this);
        this.eliminate = this.eliminate.bind(this);
        this.renderButton = this.renderButton.bind(this);
        this.closeButton = this.closeButton.bind(this);
    }
    _getQuerySchemaFromUrl(num) {
        const option = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        };

        customFetch(this.props.schemaUrl, option)
            .then(data => {
                this.setState({parameterOptions: data.items.filterCount(num)});
            });
    }
    showAllFilter(){
        this._getQuerySchemaFromUrl(3)
    }
    closeButton(){
        this._getQuerySchemaFromUrl(1)
    }
    renderButton(){
        let filterCount = this.state.parameterOptions.length;
        if(filterCount < 2){
            return (
                <div onClick={this.showAllFilter}>
                    <Icon type="down">
                        展开全部搜索选项
                    </Icon>
                </div>
            )
        } else {
            return (
                <div onClick={this.closeButton}>
                    <Icon type="up">
                        收起
                    </Icon>
                </div>
            )
        }
    }
    changeSelectedOptions({label,value,name,title}){
        let _selectedOptions = this.state.selectedOptions.filter((selectedOption)=>(selectedOption.title!==title));
        if(!value){
            this.setState({selectedOptions:_selectedOptions});
        }else {
            _selectedOptions = [..._selectedOptions, {name, value, label, title}];
            this.setState({selectedOptions: _selectedOptions});
        }
        this.props.changeSearchCondition({label,value,name,title})
        // console.log('_selectedOptions', _selectedOptions);
    }
    removeSelectedOption(title) {
        return () => {
            let _selectedOptions = this.state.selectedOptions.filter((selectedOption) => selectedOption.title !== title);
            this.setState({selectedOptions: _selectedOptions});
            // console.log('_selectedOptions', _selectedOptions);
            this.props.removeSearchCondition(title)
        };
    }
    eliminate(){
        this.setState({selectedOptions:[]});
        this.props.eliminateAll()
    }
    render() {
        return (
            <div className="query-section">
                <div className="selected-options">
                    <span className="search-result-label">全部结果 &gt; </span>
                    <span className="search-result-item">
            {this.state.selectedOptions.map((selectedOption,index)=>selectedOption?
                <span key={index}><span className="search-result-name"> <Tooltip placement="topLeft" title={selectedOption.label}>{selectedOption.title} : {selectedOption.label}</Tooltip></span><span className="search-result-operation"><Icon type="close" onClick={this.removeSelectedOption(selectedOption.title)}/></span></span>:'')}
            </span>
                    <span className="search-result-count">共{this.props.count}个结果</span>
                    <span className="eliminate" onClick={this.eliminate}>清空搜索</span>
                </div>
                <Form layout="inline">
                    { this.state.parameterOptions.map((parameterSchema, index) => (<ParameterOption selectedOptions={this.state.selectedOptions} onSelected={this.changeSelectedOptions} key={index} schema={parameterSchema} />)) }
                </Form>
                {this.renderButton()}
            </div>
        );
    }

}

Array.prototype.filterCount = function(num) {
    return this.filter((item,index) => {
        return index < num;
    });

};












