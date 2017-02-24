/**
 * Created by lzr on 2016/11/18 0018.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Table, Button, Tabs } from 'antd'

// 声明组件  并对外输出
export default class HandleRelyType extends Component {
    // 初始化页面常量 绑定事件方法
    constructor(props) {
        super(props)
        this.state = {
            activeTab: 'list' ,
        }
        this._add = this._add.bind(this)
        this._exportData = this._exportData.bind(this)
        this._delete = this._delete.bind(this)
    }

    // 新增依靠力量
    _add() {
        // this.props.dispatch(resetAmList())
        // this.props.dispatch(resetHouseCheckListQuery())
    }

    //导出数据
    _exportData() {
        // this.props.dispatch(resetAmList())
        // this.props.dispatch(resetHouseCheckListQuery())
    }

    //批量删除
    _delete() {
        // this.props.dispatch(resetAmList())
        // this.props.dispatch(resetHouseCheckListQuery())
    }

    render(){
        return(
            <div>
                <Button onClick={this._add}>新增依靠力量</Button>
                <Button>导出数据</Button>
                <Button>批量删除</Button>
            </div>
        )
    }
}