/**
 * Created by 余金彪 on 2016/12/14.检查记录
 * editor:余金彪 2017-2-14 在头部添加文件修改记录
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Button, message, Popconfirm } from 'antd'
import {
  fetchCheckRecordInfo,
  fetchQueryJcjlDetail,
  fetchDleteJcjl,
  fetchGetDepartmentJdy,
  fetchGetDepartmentJdyRecordByid,
  fetchDeleteDepartmentJdy,
} from 'actions/groupCheckRecord'
import GroupCheckRecordModal from './groupCheckRecordModal/groupCheckRecordModal'
import GroupCheckRecordDetail from './groupCheckRecordModal/groupCheckRecordDetail'
import CroupOtherCheck from './groupCheckRecordModal/CroupOtherCheck'
// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    getCheckRecordResult: state.getCheckRecordResult,
    insertCheckRecordResult: state.insertCheckRecordResult,
  })
)
export default class groupCheckRecord extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checkDetail: false,
      recordMoadl: false,
      list: [],
      arr: [],
      loading: true,
      type: false,
      openDetail: false,
      modal: false,
      detailValue: {},
      id: '',
      detailJdyValue: {},
      jdyRecordId: '',
    }
    this.checkDetails = this.checkDetails.bind(this)
    this.showModal = this.showModal.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.onOK = this.onOK.bind(this)
    this.showDetailModal = this.showDetailModal.bind(this)
    this.hideDetailModal = this.hideDetailModal.bind(this)
    this.handlDetailModal = this.handlDetailModal.bind(this)
    this.deleted = this.deleted.bind(this)
    this.showJdyDtetail = this.showJdyDtetail.bind(this)
    this.backCheck = this.backCheck.bind(this)
    this.deletedJdyRecord = this.deletedJdyRecord.bind(this)
  }

  componentDidMount() {
    const state = sessionStorage.getItem('jdybq')
    if (state != undefined) {
      this.setState({
        type: true,
      })
      this.searchGetDepartmentJdy()
    } else {
      this.searchCheckRecord()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.departmentId !== this.props.departmentId) {
      this.searchCheckRecord(nextProps.departmentId)
      this.searchGetDepartmentJdy(nextProps.departmentId)
    }
  }

  // 查询检查记录
  searchCheckRecord(id) {
    const departmentId = id || this.props.departmentId || this.props.params.departmentId || 1
    this.props.dispatch(fetchCheckRecordInfo({ dptId: departmentId }, (result) => {
      if (result.data.list) {
        this.setState({
          list: result.data.list,
          loading: result.loading,
        })
      }
    }))
  }

  // 查询寄递业检查记录
  searchGetDepartmentJdy(id) {
    const departmentId = id || this.props.departmentId || this.props.params.departmentId || 1
    this.props.dispatch(fetchGetDepartmentJdy({ dptId: departmentId }, (result) => {
      if (result.data.list) {
        for (const i in result.data.list) {
          result.data.list[i].dwmc = sessionStorage.getItem('dwmc')
          result.data.list[i].sjdz = sessionStorage.getItem('sjdz')
        }
        this.setState({
          arr: result.data.list,
          loading: result.loading,
        })
      }
    }))
  }

  // 检查记录详情
  checkDetails(id) {
    const self = this
    return function () {
      self.props.dispatch(fetchQueryJcjlDetail({ id: id }, (result) => {
        if (result.data) {
          self.setState({ checkDetail: true, id: id, detailValue: result.data })
        }
      }))
    }
  }

  // 寄递业检查记录详情
  openDetails(id) {
    const self = this
    return function () {
      self.props.dispatch(fetchGetDepartmentJdyRecordByid({ id: id }, (result) => {
        self.setState({
          jdyRecordId: id,
          detailJdyValue: result.data,
          openDetail: true,
        })
      }))
    }
  }

  showDetailModal() {
    this.setState({
      checkDetail: true,
    })
  }

  hideDetailModal() {
    this.setState({
      checkDetail: false,
    })
  }

  handlDetailModal() {
    this.setState({
      checkDetail: false,
    })
    this.searchCheckRecord()
  }

  showModal() {
    this.setState({
      recordMoadl: true,
    })
  }

  onCancel() {
    this.setState({
      recordMoadl: false,
    })
  }

  onOK() {
    this.setState({
      recordMoadl: false,
    })
    this.searchCheckRecord()
  }

  // 删除检查记录
  deleted(id) {
    const self = this
    return function () {
      self.props.dispatch(fetchDleteJcjl({ id: id }, (result) => {
        message.success(result.msg)
        self.onOK()
      }))
    }
  }

  showJdyDtetail() {
    this.setState({
      type: false,
      openDetail: true,
    })
  }

  // 寄递业检查记录返回
  backCheck() {
    this.setState({
      type: true,
      openDetail: false,
    })
    this.searchGetDepartmentJdy()
  }

  // 删除寄递业检查记录
  deletedJdyRecord(id) {
    const self = this
    return function () {
      self.props.dispatch(fetchDeleteDepartmentJdy({ id: id }, (result) => {
        message.success(result.msg)
        self.searchGetDepartmentJdy()
      }))
    }
  }

  render() {
    const departmentId = this.props.departmentId || this.props.params.departmentId || 1
    const self = this
    const columns = [
      {
        title: '记录编号',
        dataIndex: 'jlbh',
        key: 'jlbh',
      },
      {
        title: '检查时间	',
        dataIndex: 'jcrqStr',
        key: 'jcrqStr',
      },
      {
        title: '检查部位',
        dataIndex: 'jcbw',
        key: 'jcbw',
      },
      {
        title: '检查人',
        dataIndex: 'jcr',
        key: 'jcr',
      },
      {
        title: '详细内容',
        dataIndex: 'xxnr',
        key: 'xxnr',
        render: function (text, record) {
          return (
            <span>
              <a className="left" onClick={self.checkDetails(record.id)}>详情</a>
              <Popconfirm title="是否删除" placement="left" onConfirm={self.deleted(record.id)}>
                <a className="right">删除</a>
              </Popconfirm>
            </span>
          )
        },
      },
    ];
    const details = [
      {
        title: '单位名称',
        dataIndex: 'dwmc',
        key: 'dwmc',
      },
      {
        title: '单位地址	',
        dataIndex: 'dwdz',
        key: 'dwdz',
      },
      {
        title: '所属品牌',
        dataIndex: 'sspp',
        key: 'sspp',
      },
      {
        title: '检查时间',
        dataIndex: 'jcsj',
        key: 'jcsj',
      },
      {
        title: '操作',
        dataIndex: 'cz',
        key: 'cz',
        render: function (text, record) {
          return (
            <span>
              <a className="left" onClick={self.openDetails(record.id)}>详情</a>
              <Popconfirm
                title="是否删除"
                placement="left"
                onConfirm={self.deletedJdyRecord(record.id)}
              >
                <a className="right">删除</a>
              </Popconfirm>
            </span>
          )
        },
      },
    ];
    return (
      <div className="nav-second-nextContent maTop-jxy ">
        {
          this.state.openDetail ?
            <CroupOtherCheck
              backCheck={this.backCheck}
              detailJdyValue={this.state.detailJdyValue}
              dptId={this.props.departmentId}
              jdyRecordId={this.state.jdyRecordId}
            /> :
            <div className="detail-content">
              {
                this.state.type ?
                  <div className="detail-content">
                    <Table
                      columns={details}
                      bordered
                      dataSource={this.state.arr}
                      pagination={false}
                    />
                    <div className="ability-button">
                      <Button type="button" onClick={this.showJdyDtetail}>新增</Button>
                    </div>
                  </div>
                  :
                  <div className="detail-content">
                    <Table
                      columns={columns}
                      bordered
                      loading={this.state.loading}
                      dataSource={this.state.list}
                      pagination={false}
                    />
                    <div className="ability-button">
                      <Button type="button" onClick={this.showModal}>新增检查信息</Button>
                    </div>
                  </div>
              }
              {
                <GroupCheckRecordModal
                  visible={this.state.recordMoadl}
                  showModal={this.showModal}
                  onCancel={this.onCancel}
                  onOk={this.onOK}
                  dptId={departmentId}
                />
              }
              {
                this.state.checkDetail ?
                  <GroupCheckRecordDetail
                    visible={this.state.checkDetail}
                    showDetailModal={this.showDetailModal}
                    onCancel={this.hideDetailModal}
                    detailValue={this.state.detailValue}
                    onOk={this.handlDetailModal}
                    id={this.state.id}
                    dptId={departmentId}
                  /> : null
              }
            </div>
        }
      </div>
    )
  }
}

