/*
* creator: 汤俊 2016-11-10 11:30
* editor: 汤俊 2017-2-13 13:00
*/

import React, { Component } from 'react'
import { Button, message, Spin, Table, Popconfirm } from 'antd'
import { connect } from 'react-redux'
import {
  fetchPeoplePunishList,
  deletePeoplePunishItem,
  updataPeoplePunishItem,
  addPeoplePunishItem,
  getPeoplePunishItem,
} from 'actions/people'
import AddPunishModal from './addPunishModal'
import PunishDetails from './punishDetails'

import 'style/punish.css'

@connect(
  (state, props) => ({
    config: state.config,
    peoplePunishResule: state.peoplePunishResule, // 获取列表
    deletePunishResult: state.deletePunishResult, // 删除处罚记录
    updataPunishResult: state.updataPunishResult, // 更新处罚记录
    addPunishResult: state.addPunishResult, // 新增处罚记录
    getPunishItemResult: state.getPunishItemResult, //查询处罚记录详情
  })
)

export default class Punish extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      addPunishLoading: false,
      updataPunishLoading: false,
      addPunishVisiable: false,
      updataPunishVisiable: false,
    }
    this.showPunishModal = this.showPunishModal.bind(this)
    this.addPunishOk = this.addPunishOk.bind(this)
    this.addPunishCancle = this.addPunishCancle.bind(this)
    this.updataPunishOk = this.updataPunishOk.bind(this)
    this.updataPunishCancle = this.updataPunishCancle.bind(this)
    this.getPunishDetails = this.getPunishDetails.bind(this)
    this.deletePunish = this.deletePunish.bind(this)
  }

  // props对象更新
  componentWillReceiveProps(nextProps) {
    if (this.props.peoplePunishResule !== nextProps.peoplePunishResule) {
      this.setState({ loading: false })
    } else if (this.props.addPunishResult !== nextProps.addPunishResult) {
      this.setState({ addPunishLoading: false })
    } else if (this.props.updataPunishResult !== nextProps.updataPunishResult) {
      this.setState({ updataPunishLoading: false })
    }
  }

  // 组件已加载在dom中
  componentDidMount() {
    this.baseId = this.props.baseId || this.props.params.baseId || 1
    this.getPunishList()
  }

  getPunishList() {
    this.setState({ loading: true })
    this.props.dispatch(fetchPeoplePunishList({ baseid: this.baseId }))
  }

  // 新增处罚记录
  showPunishModal() {
    this.setState({ addPunishVisiable: true })
  }

  // 新增组件新增回调
  addPunishOk(values) {
    this.setState({ addPunishLoading: true })
    const param = { ...values, baseid: this.baseId }
    this.props.dispatch(addPeoplePunishItem(param, (result) => {
      message.success('新增处罚记录成功', 3)
      this.setState({ addPunishVisiable: false })
      this.getPunishList()
    }))
  }

  // 新增组件取消回调
  addPunishCancle() {
    this.setState({ addPunishVisiable: false })
  }

  // 处罚记录详情
  getPunishDetails(baseid) {
    const param = { id: baseid }
    return () => {
      this.props.dispatch(getPeoplePunishItem(param, (result) => {
        this.setState({ updataPunishVisiable: true })
      }))
    }
  }

  // 删除处罚记录
  deletePunish(baseid) {
    const param = { id: baseid }
    return () => {
      this.props.dispatch(deletePeoplePunishItem(param, (result) => {
        message.success('删除处罚记录成功', 3)
        this.getPunishList()
      }))
    }
  }

  // 修改组件确认
  updataPunishOk(values) {
    this.setState({ updataPunishLoading: true })
    this.props.dispatch(updataPeoplePunishItem(values, (result) => {
      message.success('修改记录成功', 3)
      this.getPunishList()
      this.setState({ updataPunishVisiable: false })
    }))
  }

  // 修改组件取消
  updataPunishCancle() {
    this.setState({ updataPunishVisiable: false })
  }

  // 表格展示的配置
  columns() {
    const _self = this
    return [{
      title: '案件编号',
      dataIndex: 'ajjlbh',
      key: 'ajjlbh',
    }, {
      title: '处罚时间',
      dataIndex: 'cfrqStr',
      key: 'cfrqStr',
    }, {
      title: '处罚原因',
      dataIndex: 'cfyy',
      key: 'cfyy',
    }, {
      title: '承办民警',
      dataIndex: 'cbmj',
      key: 'cbmj',
    }, {
      title: '处罚措施',
      dataIndex: 'cfcs',
      key: 'cfcs',
    }, {
      title: '处理内容',
      dataIndex: 'clnr',
      key: 'clnr',
    }, {
      title: '操作',
      dataIndex: 'oprate',
      key: 'oprate',
      render: function (text, record, index) {
        return (
          <span>
            <a onClick={_self.getPunishDetails(record.id)}>详情</a>|
            <Popconfirm title="确认删除该记录？" onConfirm={_self.deletePunish(record.id)}>
              <a>删除</a>
            </Popconfirm>
          </span>
              );
      },
    }]
  }

  render() {
    const {
      peoplePunishResule,
      getPunishItemResult,
    } = this.props
    return (
      <div className="nav-second-nextContent">
        <Spin tip="Loading..." spinning={this.state.loading}>
          <div className="tab-main">
            <div className="detail-content">
              <Table
                columns={this.columns()}
                dataSource={peoplePunishResule.list}
                pagination={false}
                scroll={{ x: 1100, y: true }}
              />
            </div>
            <div className="ability-button">
              <Button type="button" onClick={this.showPunishModal} >新增处罚记录</Button>
            </div>
          </div>
        </Spin>

        { this.state.addPunishVisiable ?
          <AddPunishModal
            visiable={this.state.addPunishVisiable}
            loading={this.state.addPunishLoading}
            addPunishOk={this.addPunishOk}
            addPunishCancle={this.addPunishCancle}
          /> : null
        }

        { this.state.updataPunishVisiable ?
          <PunishDetails
            fieldsValues={getPunishItemResult}
            visiable={this.state.updataPunishVisiable}
            loading={this.state.updataPunishLoading}
            updataPunishOk={this.updataPunishOk}
            updataPunishCancle={this.updataPunishCancle}
          /> : null
        }
      </div>
    )
  }
}
