/*
* creator: 厉樟瑞 2016-11-10 11:30
* editor: 厉樟瑞 2017-2-15 17:50
*/

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Button, Popconfirm } from 'antd'
import WindowSize from 'components/windowSize'
import {
  fetchRewardList, updateRewardList, insertRewardList, deleteRewardList } from 'actions/popRely'
import FormDetail from './modal/formDetail'

@connect(
    (state) => ({
      config: state.config,
      relyRewardListResult: state.relyRewardListResult,
      updateRewardListResult: state.updateRewardListResult,
      insertRewardListResult: state.insertRewardListResult,
      deleteRewardListResult: state.deleteRewardListResult,
    })
)

// 声明组件  并对外输出
export default class rewardInfo extends Component {
    // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props)
    this.state = {
      // nameId:this.props.nameId,
      nameId: this.props.nameId,
      activeTab: 'list',
      record: {},
    }
    this.deleteList = this.deleteList.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.showNotice = this.showNotice.bind(this)
    this.saveHandle = this.saveHandle.bind(this)
    this.updateState = this.updateState.bind(this)
  }

  // 组件已经加载到dom中
  componentDidMount() {
    this.props.dispatch(fetchRewardList({ ykllBaseId: this.state.nameId }))
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.nameId !== nextProps.nameId) {
      this.props.dispatch(fetchRewardList({ ykllBaseId: nextProps.nameId }))
    }
  }

  // 删除列表项
  deleteList(value) {
    this.props.dispatch(deleteRewardList({ id: value },
      () => { this.props.dispatch(fetchRewardList({ ykllBaseId: this.state.nameId })) }))
  }

  // 取消弹窗
  handleCancel() {
    this.setState({
      visible: false,
    })
  }

  // 显示弹窗
  showNotice(record) {
      // this.refs.form.setBtn(this.state.btnArr)
    this.setState({ visible: true, record: record })
  }

  // 保存操作
  saveHandle(value) {
    this.setState({ visible: false })
    if (value.id) {
      this.props.dispatch(updateRewardList(value,
        () => { this.props.dispatch(fetchRewardList({ ykllBaseId: this.state.nameId })) }))
    } else {
      this.props.dispatch(insertRewardList(value,
        () => { this.props.dispatch(fetchRewardList({ ykllBaseId: this.state.nameId })) }))
    }
    // this.props.dispatch(fetchRewardList({ ykllBaseId: -10 }))
  }

  updateState() {
    this.setState({})
  }

  // 表格展示项的配置
  columns() {
    const self = this
    const typeName = {
      1: '志愿者',
      2: '群防群治',
      3: '治安信息员',
      4: '社区干部',
      5: '社会知名人士',
    }
    return [
      {
        title: '奖惩类型',
        dataIndex: 'type',
        key: 'type',
        render: function (text, record, index) {
          return (
            <span>
              {typeName[record.type]}
            </span>
          )
        },
      },
      {
        title: '奖惩时间	',
        dataIndex: 'jcsjLabel',
        key: 'jcsj',
      },
      {
        title: '奖惩内容	',
        dataIndex: 'jcnr',
        key: 'jcnr',
      },
      {
        title: '奖惩录入时间	',
        dataIndex: 'cjsjLabel',
        key: 'cjsj',
      },
      {
        title: '操作',
        dataIndex: 'politicalName',
        key: 'politicalName',
        width: '10%',
        render: function (text, record, index) {
          return (
            <div>
              <a className="left" type="primary" size="small" onClick={() => self.showNotice(record)}>详情</a>
              <Popconfirm title="是否删除？" onConfirm={() => self.deleteList(record.id)}>
                <a className="right" type="primary" size="small" >删除</a>
              </Popconfirm>
            </div>
          )
        },
      },
    ]
  }
  render() {
    const { relyRewardListResult } = this.props

    const content = (
      <FormDetail onCancel={this.handleCancel} record={this.state.record}
        saveHandle={this.saveHandle}
      />
    )
    return (
      <div>
        <div
          className="list-tab detail-info-content"
          style={{ height: `${$GLOBALCONFIG.PAGEHEIGHT - 140}px`, overflowY: 'auto', overflowX: 'hidden' }}
        >
          <WindowSize updateState={this.updateState} />
          <Table
            className="detail-content"
            columns={this.columns()}
            dataSource={relyRewardListResult.jcList}
            currentPage={100}
            scroll={{ x: 1000 }}
            loading={relyRewardListResult.loading}
          />
        </div>
        {this.state.visible ? content : null}
        <div className="ability-button">
          <Button onClick={() => this.showNotice({ ykllBaseId: this.state.nameId, type: '1' })}>新增奖惩信息</Button>
        </div>
      </div>
		)
  }
}
