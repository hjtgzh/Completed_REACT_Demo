import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Table, Button, Tabs,Input } from 'antd'
import Panel from 'components/panel'


const TabPane = Tabs.TabPane;

//连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
    (state, props) => ({
        config: state.config,
        houseCheckSearchQuery: state.houseCheckSearchQuery,
        houseCheckSearchResult: state.houseCheckSearchResult,
        amList: state.amList,
    })
    /*function(state, props){
     console.log(state)
     console.log(props)
     return {
     config: state.config,
     houseCheckSearchQuery: state.houseCheckSearchQuery,
     houseCheckSearchResult: state.houseCheckSearchResult,

     }
     }*/
)

// 声明组件  并对外输出
export default class cardHolder extends Component {


    // 组件已经加载到dom中
    componentDidMount() {

    }


    // 列表与地图模式切换的回调函数
    _typeChange(key){
        this.setState({ activeTab: key })
    }




    render() {
        const {
            houseCheckSearchQuery,
            houseCheckSearchResult,
            hasSubmitBtn,
            hasResetBtn,
        } = this.props

        return (
            <Panel>
               once
                <Input/>
            </Panel>
        )
    }
}
