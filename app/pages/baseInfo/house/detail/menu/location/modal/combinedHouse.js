/*
* creator: 厉樟瑞 2016-11-10 11:30
* editor: 厉樟瑞 2017-2-15 17:50
*/

import React, { Component } from 'react'
import { Row, Col, Input, Modal, AutoComplete } from 'antd'
import { connect } from 'react-redux'

import {
  fetchHousebzdz,
  fetchHouseCombineBuilding,
} from 'actions/houseAddressDetail'

const AOption = AutoComplete.Option

@connect(
  (state) => ({
    config: state.config,
    houseBzdzResult: state.houseBzdzResult,
    houseCombineBuildingResult: state.houseCombineBuildingResult,
  })
)

export default class combinedHouse extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fbldid: '',
    }
    this.searchDz = this.searchDz.bind(this)
    this.saveDz = this.saveDz.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // 确定提交操作
  handleSubmit() {
    this.props.dispatch(fetchHouseCombineBuilding({ bldid: this.props.addressId, fbldid: this.state.fbldid }, () => {
      const result = this.props.houseCombineBuildingResult
      this.props.bindBuilding({ fbldid: result.id, fbzdz: result.fbzdz })
    }))
  }

  // 搜索地址
  searchDz(value) {
    this.props.dispatch(fetchHousebzdz({ keyword: value }))
  }

  // 保存地址id
  saveDz(e) {
    this.state.fbldid = e
  }

  render() {
    const { houseBzdzResult, houseCombineBuildingResult } = this.props
    return (
      <Modal
        className="modal-header"
        title={this.props.title}
        visible={this.props.visible}
        onCancel={this.props.onCancel}
        onOk={this.handleSubmit}
        confirmLoading={houseCombineBuildingResult.loading}
      >
        <div className="combinedHouse-lzr">
          <Row gutter={16}>
            <Col span="3">
              <span className="combinedHouse-address">主地址</span>
            </Col>
            <Col span="21">
              <Input
                className="mainAddress"
                value={this.props.mainAddress}
                placeholder="地名办命名的道、路、街、巷" readOnly disabled
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span="3">
              <span className="combinedHouse-address">辅地址</span>
            </Col>
            <Col span="21">
              <AutoComplete
                style={{ width: '100%' }}
                onChange={this.searchDz}
                onSelect={this.saveDz}
              >
              {
                houseBzdzResult.list.map(sub => (
                  <AOption key={sub.id}>{sub.bzdz}</AOption>
                ))
              }
              </AutoComplete>
            </Col>
          </Row>
        </div>
      </Modal>
    )
  }
}
