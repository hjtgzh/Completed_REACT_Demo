/**
 * Created by 余金彪 on 2016/12/27.
 * editor:余金彪 2017-2-14 在头部添加文件修改记录
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'
import GroupFireMessageDetail from './groupFireMessageDetail'
import GroupFireMessageModal from './groupFireMessageModal'
import {
  fetchQueryXfxx,
} from 'actions/groupFireMessage'

@connect(
  (state, props) => ({
    config: state.config,

  })
)
export default class groupFireMessageIndex extends Component {
  constructor(props) {
    super(props)
    this.state = {
      groupFireMessage: false,
      messageModal: false,
      detailValue: {},
    }

    this.showFireModal = this.showFireModal.bind(this)
    this.showMessageModal = this.showMessageModal.bind(this)
    this.hideMessageModal = this.hideMessageModal.bind(this)
    this.handMessageModal = this.handMessageModal.bind(this)
  }


  // 组件已经加载到dom中
  componentDidMount() {
    this.searchQueryXfxx()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.departmentId !== this.props.departmentId) {
      this.searchQueryXfxx(nextProps.departmentId)
    }
  }

  // 查询消防信息
  searchQueryXfxx(id) {
    const departmentId = id || this.props.departmentId || this.props.params.departmentId || 1
    this.props.dispatch(fetchQueryXfxx({ dptId: departmentId }, (result) => {
      if (result.status == 1 && result.data != undefined) {
        this.setState({
          groupFireMessage: true,
          detailValue: result.data,
        })
      } else {
        this.setState({
          groupFireMessage: false,
        })
      }
    }))
  }

  showFireModal() {
    this.setState({
      messageModal: true,
    })
  }

  showMessageModal() {
    this.setState({
      messageModal: true,
    })
  }

  hideMessageModal() {
    this.setState({
      messageModal: false,
    })
  }

  handMessageModal() {
    this.setState({
      messageModal: false,
    })
    this.searchQueryXfxx()
  }

  render() {
    const departmentId = this.props.departmentId || this.props.params.departmentId || 1
    return (
      <div className="detail-content">
        {this.state.groupFireMessage ?
          <GroupFireMessageDetail
            detailValue={this.state.detailValue}
            dptId={departmentId}
          /> :
          <div className="list-tab nav-first-nextContent">
            <div className="detail-content"></div>
            <div className="ability-button">
              <Button onClick={this.showFireModal}>新增消防信息</Button>
            </div>
            {
              <GroupFireMessageModal
                visible={this.state.messageModal}
                showDetailModal={this.showMessageModal}
                onCancel={this.hideMessageModal}
                onOk={this.handMessageModal}
                dptId={departmentId}
                // visibleForModel = {this.state.visibleForModel}
              />
            }
          </div>
        }
      </div>
    )
  }
}
