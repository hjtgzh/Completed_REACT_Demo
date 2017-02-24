/**
 * Created by 余金彪 on 2016/12/27.
 * editor:余金彪 2017-2-14 在头部添加文件修改记录
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Button, Popconfirm, message } from 'antd'
import {
  fetchQueryXfxxXfqc,
  fetchDeleteXfxxXfqc,
  fetchQueryXfqcDetail,
} from 'actions/groupFireMessage'
import GroupFireEquipmentModal from './groupFireEquipmentModal'
import FireEquipmentDetail from './fireEquipmentDetail'
@connect(
  (state, props) => ({
    config: state.config,
  })
)
export default class groupFireEquipmentIndex extends Component {
  constructor(props) {
    super(props)
    this.state = {
      groupFireEquipment: false,
      fireEquipmentDetail: false,
      list: [],
      loading: true,
      defaultValue: {},
    }
    this.showModal = this.showModal.bind(this)
    this.fireDetails = this.fireDetails.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.showDetailModal = this.showDetailModal.bind(this)
    this.hideDetailModal = this.hideDetailModal.bind(this)
    this.onOk = this.onOk.bind(this)
    this.deletedXFQC = this.deletedXFQC.bind(this)
    this.submitDetailModal = this.submitDetailModal.bind(this)
  }

  // 组件已经加载到dom中
  componentDidMount() {
    this.searchQueryXfxxXfqc()
  }

// 消防器材详情
  fireDetails(id) {
    const self = this
    return function () {
      self.props.dispatch(fetchQueryXfqcDetail({ id: id }, (result) => {
        if (result.data) {
          self.setState({ defaultValue: result.data, fireEquipmentDetail: true })
        }
      }))
    }
  }

  showModal() {
    this.setState({
      groupFireEquipment: true,
    })
  }

  onCancel() {
    this.setState({
      groupFireEquipment: false,
    })
  }

  showDetailModal() {
    this.setState({
      fireEquipmentDetail: true,
    })
  }

  hideDetailModal() {
    this.setState({
      fireEquipmentDetail: false,
    })
  }

  onOk() {
    this.setState({
      groupFireEquipment: false,
      loading: true,
    })
    this.searchQueryXfxxXfqc()
  }

  //删除消防器材
  deletedXFQC(id) {
    const self = this
    return function () {
      self.props.dispatch(fetchDeleteXfxxXfqc({ id: id }, (result) => {
        message.success(result.msg)
        self.searchQueryXfxxXfqc()
      }))
    }
  }

  submitDetailModal() {
    this.setState({
      fireEquipmentDetail: false,
    })
    this.searchQueryXfxxXfqc()
  }

  // 消防器材查询
  searchQueryXfxxXfqc() {
    const departmentId = this.props.departmentId || this.props.params.departmentId || 1
    this.props.dispatch(fetchQueryXfxxXfqc({ dptId: departmentId }, (result) => {
      if (result.data != undefined) {
        this.setState({
          list: result.data.list,
          loading: false,
        })
      }
    }))
  }

  render() {
    const departmentId = this.props.departmentId || this.props.params.departmentId || 1
    const self = this
    const columns = [
      {
        title: '灭火器类型',
        dataIndex: 'mhqxh',
        key: 'mhqxh',
      },
      {
        title: '数量',
        dataIndex: 'mhqsl',
        key: 'mhqsl',
      },
      {
        title: '有效期限',
        dataIndex: 'bcnx',
        key: 'bcnx',
      },
      {
        title: '详细内容',
        dataIndex: 'detail',
        key: 'detail',
        render: function (text, record, index) {
          return (
            <span>
              <a className="left" onClick={self.fireDetails(record.id)}>详情</a>
              <Popconfirm
                title="是否删除"
                placement="left"
                onConfirm={self.deletedXFQC(record.id)}
              >
                <a className="right">删除</a>
              </Popconfirm>
            </span>
          );
        },
      },

    ];

    return (
      <div className="detail-content">
        <Table
          columns={columns}
          bordered
          dataSource={this.state.list}
          pagination={false}
          loading={this.state.loading}
        />
        <div className="ability-button">
          <Button onClick={this.showModal}>新增消防器材</Button>
        </div>
        {
          this.state.groupFireEquipment ?
            <GroupFireEquipmentModal
              visible={this.state.groupFireEquipment}
              showModal={this.showModal}
              onCancel={this.onCancel}
              onOk={this.onOk}
              dptId={departmentId}
            /> : null
        }
        {
          this.state.fireEquipmentDetail ?
            <FireEquipmentDetail
              visible={this.state.fireEquipmentDetail}
              showDetailModal={this.showDetailModal}
              onCancel={this.hideDetailModal}
              defaultValue={this.state.defaultValue}
              onOk={this.submitDetailModal}
              dptId={departmentId}
            /> : null
        }
      </div>
    )
  }
}
