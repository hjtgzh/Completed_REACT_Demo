/*
 *Create By 韩卿
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Icon } from 'antd'

// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
  })
)

export default class taobao extends Component {
  constructor(props) {
    super(props)
    this.state = {
      heightState: false,
    }
    this.handleSelect = this.handleSelect.bind(this)
    this._getDataList = this._getDataList.bind(this)
    this._getGroup = this._getGroup.bind(this)
    this.handleHight = this.handleHight.bind(this)
  }

  componentWillMount() {
    // console.log('singleSelect componentWillMount')
    // const showState = this.props.show
    // this.setState({ showState })
    this.state.showState = this.props.show && (this.props.items.length > 0)
  }

  componentWillReceiveProps(nextProps) {
    // console.log('singleSelect componentWillReceiveProps')
    // if(nextProps.items.length>0)
      // debugger
    const showState = nextProps.show && (nextProps.items.length > 0)
    this.setState({ showState })
  }

  // 点击选择标签
  handleSelect(item) {
    this.setState({ showState: false })
    this.props.getComponentInternalData({ item: item, action: 'add', type: 'single' })
  }

  // 切换行高度
  handleHight() {
    const heightState = !this.state.heightState
    this.setState({ heightState })
  }

  // 从后台获取标签数据 并且通过对比 将每项的数量填充上
  // changeNum(item, data) {
  //   data.map(item => (
  //     this.state.resData.data.map((option) => {
  //       if (option.id === item.id) {
  //         item.num = option.num
  //       }
  //     })
  //   ))
  //   const dataState = data
  //   this.setState({ dataState })
  // }

  // 公用方法  渲染待选择列表
  _getDataList() {
    const { needNum } = this.props
    return this.props.items.map(item => (
      <span
        key={item.id}
        className="item"
        onClick={() => this.handleSelect(item)}
      >
        <span className="name">{item.name}</span>
        {
          needNum ? <span className="num">({item.num})</span> : null
        }
      </span>)
    )
  }

  // 公用方法 获取整行列表
  _getGroup() {
    const rowShow = this.state.showState
    const { needArrowIcon } = this.props
    const height = this.state.heightState
    const label = this.props.label
    return (
      rowShow ?
        <div className={height ? 'group' : 'group smallgroup'}>
          <Row gutter={16}>
            <Col lg={{ span: 2 }} xs={{ span: 4 }} style={{ width: 80 }}>
              {label}
            </Col>
            <Col lg={{ span: 20 }} xs={{ span: 18 }} className="list-wrap">
              {this._getDataList()}
            </Col>
            <Col xs={{ span: 2 }} style={{ width: 100 }}>
              {
                needArrowIcon ?
                  <Icon
                    className="rowSlide"
                    type={height === false ? 'down' : 'up'}
                    onClick={this.handleHight}
                  /> : null
              }
            </Col>
          </Row>
        </div>
      : null
    )
  }

  render() {
    return this._getGroup()
  }
}
