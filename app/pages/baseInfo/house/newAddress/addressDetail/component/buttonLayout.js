/**
 * Created by 黄建停---实有房屋(新增地址)--处理获取的数据
 */
import React, { Component } from 'react'
import { Spin } from 'antd'
import StateButton from './stateButton'

export default class buttonLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showList: {},
    }
    this.setBtnArr = this.setBtnArr.bind(this)
  }

  // 处理从父组件获取的数据
  componentWillReceiveProps(nextProps) {
    const arrs = nextProps.arrs
    const showList = {}
    for (let i = 0; i < arrs.length; i += 1) {
      showList[arrs[i].key] = { ...this.state.showList[arrs[i].key], ...arrs[i] }
      showList[arrs[i].key].show = false
    }
    for (const item of Object.keys(showList)) {
      if (showList[item].content === nextProps.areaStation ||
        showList[item].content === nextProps.countryStation ||
        showList[item].content === nextProps.villageStation ||
        showList[item].content === nextProps.roadStation ||
        showList[item].content === nextProps.houseMarkStation ||
        showList[item].content === nextProps.houseMarkNameStation
        ) {
        showList[item].show = true
      }
    }
    this.setState({ showList: showList })
    // console.log(showList)
    // console.log(nextProps.areaStation)
  }

  // 处理从父组件获取的数据
  componentWillMount() {
    const arrs = this.props.arrs
    const showList = {}
    for (let i = 0; i < arrs.length; i += 1) {
      showList[arrs[i].key] = { ...this.state.showList[arrs[i].key], ...arrs[i] }
    }
    this.setState({ showList: showList })
  }

  // 获取后的数据传给下一级子组件
  setBtnArr(btn) {
    const showList = this.state.showList
    showList[btn.value] = btn
    for (const n of Object.keys(showList)) {
      if (n === btn.value) {
        showList[n].show = true
      } else {
        showList[n].show = false
      }
    }
    this.setState({ showList: showList })
    this.props.onClick(btn.value, btn.grade)
  }

  render() {
    const arrs = this.props.arrs
    return (
      <Spin spinning={this.props.loading}>
        <div style={{ width: '340px' }} className="hjt-addressList-listWrap">
          {arrs.map((arr, i) =>
            <div key={`a${i}`} className="listItem">
              <StateButton
                key={i}
                setBtnArr={this.setBtnArr}
                name={arr.key} grade={arr.grade}
                show={this.state.showList[arr.key].show || false}
              >
                {arr.content}
              </StateButton>
            </div>
          )}
        </div>
      </Spin>
    )
  }
}
