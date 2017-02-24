/*
 *Create By 韩卿
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Row, Col, Icon, Checkbox } from 'antd'

// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
  })
)

export default class taobao extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleSelect = this.handleSelect.bind(this)
    this.handleSelectSet = this.handleSelectSet.bind(this)
    // this.handleCancelSelect=this.handleCancelSelect.bind(this)
    this.handelMultiSelect = this.handelMultiSelect.bind(this)
    this.handleMultiOk = this.handleMultiOk.bind(this)
    this.handleToggleCheckbox = this.handleToggleCheckbox.bind(this)
    this.handleHight = this.handleHight.bind(this)
    this._getDataList = this._getDataList.bind(this)
    this._getCheckboxList = this._getCheckboxList.bind(this)
    this._getGroup = this._getGroup.bind(this)
    // this.changeNum=this.changeNum.bind(this)
  }

  componentWillMount() {
    let dataState
    let showState
    const multiShowState = false
    const heightState = false
    const { prePid = '', preLv = 1, preId = '', preType = '' } = this.props.preSet
    const lastOne = { id: preId, lv: preLv, pid: prePid, type: preType };
    if (preType === 'single') {
      dataState = this.getItem(parseInt(lastOne.lv, 10) + 1, lastOne.id, this.props.items)
    } else {
      dataState = this.getItem(parseInt(lastOne.lv, 10), lastOne.pid, this.props.items)
    }
    if (dataState.length === 0) {
      showState = false
    } else {
      showState = true
    }

    this.state.dataState = dataState
    this.state.showState = showState
    this.state.multiShowState = multiShowState
    this.state.heightState = heightState

    // console.log(dataState)
    // this.setState({ dataState })
    // this.setState({ showState })
    // this.setState({ multiShowState })
    // this.setState({ heightState })
  }

  componentWillReceiveProps(nextProps) {
    // console.log('taobao componentWillReceiveProps')
    const preSet = this.props.preSet
    const nextPreSet = nextProps.preSet
    if (preSet !== nextPreSet) {
      let showState
      let dataState
      if (nextPreSet.preType === 'single') {
        dataState = this.getItem(parseInt(nextPreSet.preLv, 10) + 1, nextPreSet.preId, nextProps.items)
      } else {
        dataState = this.getItem(parseInt(nextPreSet.preLv || '1', 10), nextPreSet.prePid || '', nextProps.items)
      }
      if (dataState.length === 0) {
        showState = false
      } else {
        showState = true
      }
      this.setState({ dataState })
      this.setState({ showState })
    }
  }

  // 获取当前要显示的标签数组
  getItem(lv, pid, sort) {
    const arr = []
    sort.map(item => {
      // if(sort.length>0){
      //   debugger
      // }
      if (item.lv === String(lv) && item.pid === String(pid)) {
        arr.push(item)
      }
    })
    return arr
  }

  // 点击选择标签
  handleSelect(item, items) {
    // const self = this
    const data = this.getItem(parseFloat(parseInt(item.lv, 10) + 1), item.id, items)
    this.handleSelectSet(item, data)
    this.props.getComponentInternalData({ item: [item], action: 'add', type: 'single', currentLv: item.lv })
  }

  // 选择某个标签之后的数据处理
  handleSelectSet(item, data) {
    // const self = this
    let showState
    if (data.length === 0) {
      showState = false
    } else {
      showState = true
    }
    this.setState({ showState })
    const dataState = data
    this.setState({ dataState })
    // self.changeNum(item, data)
  }

  // 从后台获取标签数据 并且通过对比 将每项的数量填充上
  // changeNum(item, data) {
  //   const self = this
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

  // 点击多选
  handelMultiSelect(val) {
    const multiShowState = val
    this.setState({ multiShowState })
  }

  // 多选确定
  handleMultiOk(val) {
    const dataMap = this.state.dataState
    const multiShowState = val
    this.setState({ multiShowState })

    const arr = []
    dataMap.map((item) => {
      if (item.checked === true) {
        arr.push(item)
      }
    })

    this.props.getComponentInternalData({ item: arr, type: 'multiple', action: 'add', currentLv: dataMap[0].lv })
  }

  // checkbox的状态改变
  handleToggleCheckbox(option) {
    return () => {
      option.checked = !option.checked;
      /*
        下面这行代码虽然没做任何的赋值等操作  但是因为设置了state 导致render的变化
        从而可以让CheckBox的选中状态发生变化
      */
      this.setState({})
    }
  }

  // 切换行高度
  handleHight() {
    const heightState = !this.state.heightState
    this.setState({ heightState })
  }

  // 公用方法  渲染待选择列表
  _getDataList() {
    const { needNum } = this.props
    return this.state.dataState.map(item => (
      <span
        key={item.id}
        className="item"
        // onClick={this.handleSelect.bind(event, item, this.props.items)}
        onClick={() => { this.handleSelect(item, this.props.items) }}
      >
        <span className="name">{item.name}</span>
        <span className="num">{needNum ? `(${item.num || 0})` : null}</span>
      </span>)
    )
  }

  // 公用方法  渲染多选列表
  _getCheckboxList(arr) {
    const self = this
    return arr.map(item => (
      <label className="check-label" key={item.id} htmlFor={item.id}>
        <Checkbox
          className="checkbox"
          checked={item.checked}
          type="checkbox"
          value={item.id}
          onChange={self.handleToggleCheckbox(item)}
        />
        <span>{item.name}</span>
      </label>)
    )
  }

  // 公用方法 获取整行列表
  _getGroup() {
    const rowShow = this.state.showState
    // const rowShow = 1
    const multiShow = this.state.multiShowState
    const height = this.state.heightState
    const dataState = this.state.dataState
    const label = this.props.label
    const { needMulti, needArrowIcon } = this.props
    // console.warn('render Taobao...')
    return (
      rowShow ?
        <div >
        {
          multiShow ?
            <div className="check-wrap">
              <Row>
                <Col style={{ width: '80px' }} xs={{ span: 2 }}>{label}</Col>
                <Col xs={{ span: 22 }}>
                  <div className="checks">
                    {this._getCheckboxList(dataState)}
                  </div>
                </Col>
              </Row>
              <div className="btns">
                <Button
                  type="primary"
                  size="small"
                  onClick={() => this.handleMultiOk(false)}
                >确定
                </Button>
                <Button
                  size="small"
                  onClick={() => this.handelMultiSelect(false)}
                >取消
                </Button>
              </div>
            </div>
            :
            <Row gutter={16} className={height ? 'group' : 'group smallgroup'}>
              <Col lg={{ span: 2 }} xs={{ span: 4 }} style={{ width: 80 }}>
                {label}
              </Col>
              <Col lg={{ span: 20 }} xs={{ span: 18 }} className="list-wrap">
                {this._getDataList()}
              </Col>
              <Col lg={{ span: 2 }} xs={{ span: 5 }} style={{ width: 100 }}>
                {
                  needMulti ?
                    <Button
                      size="small"
                      onClick={() => this.handelMultiSelect(true)}
                    >多选
                    </Button> : null
                }
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
        }
        </div>
      : null
    )
  }

  render() {
    // console.log('render taobao...')
    return this._getGroup()
  }
}
